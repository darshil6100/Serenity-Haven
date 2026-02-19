import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import brevo from '@getbrevo/brevo';
import { Pool, QueryResult } from 'pg';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL setup
const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'SerenityHaven'
});

// Test database connection
pool.on('error', (err: Error) => {
    console.error('✗ PostgreSQL pool error:', err);
});

async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create queries table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS queries (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          package_interest VARCHAR(255),
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      
      CREATE INDEX IF NOT EXISTS idx_queries_email ON queries(email);
      CREATE INDEX IF NOT EXISTS idx_queries_created_at ON queries(created_at);
    `);
    
    client.release();
    console.log('✓ Connected to PostgreSQL');
    console.log('✓ Database: SerenityHaven');
  } catch (error) {
    console.error('✗ Database initialization error:', error);
  }
}

// Brevo Configuration
const transactionalEmailApi = new brevo.TransactionalEmailsApi();
transactionalEmailApi.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.VITE_BREVO_API_KEY as string
);

interface QueryData {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

app.post('/api/submit-query', async (req: Request, res: Response) => {
  try {
    const queryData: QueryData = req.body;

    // Validate input
    if (!queryData.name || !queryData.email || !queryData.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let queryId = null;

    // Save to PostgreSQL
    try {
      const result: QueryResult = await pool.query(
        'INSERT INTO queries (name, email, phone, package_interest, message, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [
          queryData.name,
          queryData.email,
          queryData.phone,
          queryData.package_interest || null,
          queryData.message,
          'new'
        ]
      );
      
      queryId = result.rows[0].id;
      console.log('✓ Query saved to PostgreSQL:', queryId);
    } catch (dbError) {
      console.error('✗ Database save error:', dbError);
      return res.status(500).json({ error: 'Failed to save query to database' });
    }

    // Send email notification via Brevo
    if (process.env.EMAIL_USER && process.env.RECIPIENT_EMAIL && process.env.VITE_BREVO_API_KEY) {
      try {
        const emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0; border-bottom: 3px solid #2c5aa0; padding-bottom: 10px;">
              New Query from Serenity Haven
            </h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${queryData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${queryData.email}">${queryData.email}</a></p>
              <p><strong>Package Interest:</strong> ${queryData.package_interest || 'Not specified'}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #2c5aa0;">Message:</h3>
              <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c5aa0; line-height: 1.6;">
                ${queryData.message}
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
            <p style="color: #666; font-size: 12px;">
              <em>Submitted at: ${new Date().toLocaleString()}</em><br/>
              <em>Query ID: ${queryId}</em>
            </p>
          </div>
        `;

        const sendSmtpEmail = {
          to: [{ email: process.env.RECIPIENT_EMAIL }],
          replyTo: { email: queryData.email, name: queryData.name },
          sender: { name: 'Serenity Haven', email: process.env.EMAIL_USER },
          subject: `New Query: ${queryData.name} - ${queryData.package_interest || 'General Inquiry'}`,
          htmlContent: emailContent
        };

        await transactionalEmailApi.sendTransacEmail(sendSmtpEmail);

        console.log('✓ Email sent successfully via Brevo to', process.env.RECIPIENT_EMAIL);
      } catch (emailError) {
        console.error('✗ Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('⚠ Email configuration incomplete');
    }

    res.json({
      success: true,
      message: 'Query submitted successfully',
      id: queryId
    });

  } catch (error) {
    console.error('✗ Error processing query:', error);
    res.status(500).json({
      error: 'Failed to process query',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all queries (for admin dashboard - optional)
app.get('/api/queries', async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query(
      'SELECT * FROM queries ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('✗ Error fetching queries:', error);
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
});

// Update query status
app.put('/api/queries/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result: QueryResult = await pool.query(
      'UPDATE queries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Query not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('✗ Error updating query:', error);
    res.status(500).json({ error: 'Failed to update query' });
  }
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
    console.log(`✓ Query endpoint: POST http://localhost:${PORT}/api/submit-query`);
    console.log(`✓ Get queries: GET http://localhost:${PORT}/api/queries\n`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠ Shutting down...');
  await pool.end();
  console.log('✓ PostgreSQL connection closed');
  process.exit(0);
});

startServer();