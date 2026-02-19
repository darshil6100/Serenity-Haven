# Serenity Haven - PostgreSQL & Free Email Integration Setup Guide

## Overview
Your contact form is now connected to **PostgreSQL** (database: SerenityHaven) and integrated with **free email services**. When users submit the form:
1. **Saved to PostgreSQL** - Queries stored in SerenityHaven database
2. **Sent via Email** - Notification to your email address using free SMTP services

---

## Prerequisites

### 1. **PostgreSQL Installation**
- Download & install PostgreSQL: https://www.postgresql.org/download/
- During installation, remember your **postgres password**
- Default port: 5432

**Verify Installation:**
```bash
psql --version
```

### 2. **Free Email Service** (Choose One)
Pick one of these free email services:

#### **Option A: Brevo (Recommended - Easiest)**
- Sign up: https://www.brevo.com/
- Free tier: 300 emails/day
- Get SMTP credentials from Settings > SMTP & API
- No credit card required initially

#### **Option B: Mailgun**
- Sign up: https://www.mailgun.com/
- Free tier: 5,000 emails/month
- Setup your domain
- Get SMTP credentials from dashboard

#### **Option C: SendGrid**
- Sign up: https://sendgrid.com/
- Free tier: 100 emails/day
- Create an API key
- Use `apikey` as username

---

## Installation Steps

### Step 1: Create PostgreSQL Database
Open PowerShell and run:

```bash
psql -U postgres
```

Enter your postgres password, then:

```sql
CREATE DATABASE "SerenityHaven";
\q
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create `.env` File
Copy `.env.example` to `.env` and fill in your credentials:

```bash
# PostgreSQL Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_postgres_password
DATABASE_NAME=SerenityHaven

# Choose one email provider below:

# ===== BREVO (Recommended) =====
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-brevo-smtp-key
RECIPIENT_EMAIL=owner-email@gmail.com

# ===== OR MAILGUN =====
# EMAIL_HOST=smtp.mailgun.org
# EMAIL_PORT=587
# EMAIL_USER=postmaster@your-domain.mailgun.org
# EMAIL_PASSWORD=your-mailgun-key
# RECIPIENT_EMAIL=owner-email@gmail.com

# ===== OR SENDGRID =====
# EMAIL_HOST=smtp.sendgrid.net
# EMAIL_PORT=587
# EMAIL_USER=apikey
# EMAIL_PASSWORD=your-sendgrid-api-key
# RECIPIENT_EMAIL=owner-email@gmail.com

# API Configuration
VITE_API_URL=http://localhost:3000

# Server
PORT=3000
NODE_ENV=development
```

### Step 4: Test Connection
```bash
npm run dev:server
```

You should see:
```
✓ Connected to PostgreSQL
✓ Database: SerenityHaven
✓ Email service ready
```

---

## Running the Application

### Development Mode (Both Frontend & Backend)
Open **two terminals**:

**Terminal 1** - Backend:
```bash
npm run dev:server
```

**Terminal 2** - Frontend:
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

---

## Database Schema

### PostgreSQL `queries` Table
```sql
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
email VARCHAR(255) NOT NULL
phone VARCHAR(20) NOT NULL
package_interest VARCHAR(255)
message TEXT NOT NULL
status VARCHAR(50) DEFAULT 'new'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

**Query Status Values:**
- `new` - Fresh query, not yet reviewed
- `read` - Query has been read
- `responded` - Response sent to customer

---

## Features

### ✓ PostgreSQL Database
- Reliable open-source relational database
- Perfect for production use
- Automatic table creation on first run
- Indexed for fast queries

### ✓ Free Email Services
- No credit card required (most providers)
- Generous free tiers
- Professional SMTP integration
- HTML formatted emails

### ✓ Form Validation
- All required fields validated
- Email format checking
- Error handling

### ✓ Additional API Endpoints
```
GET  /api/queries           - Get all queries
PUT  /api/queries/:id       - Update query status
POST /api/submit-query      - Submit new query
```

---

## Troubleshooting

### Issue: "FATAL: Ident authentication failed for user 'postgres'"
- Run: `psql -U postgres -h localhost`
- Or update .env: `DATABASE_HOST=127.0.0.1`

### Issue: "Connection refused" on port 5432
- Check PostgreSQL is running:
  - Windows: Services > PostgreSQL
  - Or: `pg_ctl status`
- Restart if needed: `pg_ctl restart`

### Issue: Database "SerenityHaven" doesn't exist
- Run: `psql -U postgres` and create it:
  ```sql
  CREATE DATABASE "SerenityHaven";
  ```

### Issue: "Email sending failed"
- Verify credentials in .env file
- Check email provider SMTP settings
- Ensure EMAIL_USER and EMAIL_PASSWORD are correct
- For Brevo: Use API key, not password

### Issue: Can't connect to email provider
- Check firewall settings
- Verify email provider SMTP host/port
- Check EMAIL_HOST spelling

---

## File Structure

```
project/
├── src/
│   └── components/
│       └── ContactForm.tsx          # Updated form component
│
├── server/
│   └── index.ts                     # Express server with PostgreSQL
│
├── supabase/
│   └── migrations/
│       └── 20260214180515_...sql    # PostgreSQL schema
│
├── .env                             # Your credentials (CREATE THIS)
├── .env.example                     # Template
└── package.json                     # Dependencies
```

---

## Email Providers Comparison

| Provider | Free Tier | Setup Difficulty | Speed | Notes |
|----------|-----------|-----------------|-------|-------|
| **Brevo** | 300/day | ⭐ Easy | Fast | Recommended for beginners |
| **Mailgun** | 5,000/month | ⭐⭐ Medium | Fast | Domain verification needed |
| **SendGrid** | 100/day | ⭐⭐ Medium | Very Fast | Popular, reliable |

---

## Getting SMTP Keys by Provider

### Brevo
1. Sign up at https://www.brevo.com
2. Go to Settings → SMTP & API
3. Copy SMTP Key (under "SMTP Credentials")
4. Use as EMAIL_PASSWORD

### Mailgun
1. Create account at https://www.mailgun.com
2. Add your domain
3. Go to Sending → Domain Settings
4. Copy SMTP credentials (host, user, password)

### SendGrid
1. Sign up at https://sendgrid.com
2. Create API Key under Settings → API Keys
3. Use `apikey` as EMAIL_USER
4. Use generated key as EMAIL_PASSWORD

---

## Next Steps

1. **Install PostgreSQL** if not already installed
2. **Create SerenityHaven database**
3. **Sign up for free email service** (pick one above)
4. **Create .env file** with your credentials
5. **Run: `npm install`**
6. **Start both servers** (frontend + backend)
7. **Test the form** and check your email

---

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review server logs (console output)
3. Verify database and email credentials
4. Ensure PostgreSQL is running
5. Check email provider SMTP settings

---

**Happy querying!** 🌿✨
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_HOST` | ✓ | PostgreSQL host |
| `DATABASE_PORT` | ✓ | PostgreSQL port (default: 5432) |
| `DATABASE_USER` | ✓ | PostgreSQL username |
| `DATABASE_PASSWORD` | ✓ | PostgreSQL password |
| `DATABASE_NAME` | ✓ | Database name (SerenityHaven) |
| `EMAIL_HOST` | ✓ | SMTP server host |
| `EMAIL_PORT` | ✓ | SMTP port (usually 587) |
| `EMAIL_USER` | ✓ | Email sender address |
| `EMAIL_PASSWORD` | ✓ | SMTP password/key |
| `RECIPIENT_EMAIL` | ✓ | Your email to receive notifications |
| `PORT` | ✗ | Server port (default: 3000) |

---
