import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';
import type { Pool, RowDataPacket } from 'mysql2/promise';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const databaseName = process.env.MYSQL_DATABASE || 'serenity_haven';
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
};

app.use(cors());
app.use(express.json());

let pool: Pool;

type PackageRow = RowDataPacket & {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  focus: string;
  inclusions: unknown;
  complementary: unknown;
  add_ons: unknown;
  image: string;
  badge: string | null;
  seats_left: number | null;
  offer_ends_at: Date | string | null;
  sort_order: number;
};

type CountRow = RowDataPacket & {
  total: number;
};

const packageListDefaults: Record<string, {
  inclusions: string[];
  complementary: string[];
  addOns: string[];
}> = {
  pkg1: {
    inclusions: [
      'Personalized Doctor consultation',
      'Morning Yoga and Breathwork',
      'Satvik & Balanced Meals',
      'Guided Meditation Sessions',
    ],
    complementary: [
      'Personalized Diet Plans from doctor',
      'Herbal welcome drink & detox tea',
    ],
    addOns: [],
  },
  pkg2: {
    inclusions: [
      'Resort-ambience premium wellness suites',
      'Personalized Doctor consultation',
      'Satvik & Balanced Meals',
      'Morning Yoga and Breathwork',
      'Guided Meditation Sessions',
      'Fun Group Activities',
    ],
    complementary: [
      'Personalized Diet Plans from Doctor',
      'Acupuncture/Sujok therapy',
      'Health talks & wellness guidance',
      'Evening herbal detox drinks',
    ],
    addOns: ['Spa Therapies'],
  },
};

function escapeIdentifier(value: string) {
  return `\`${value.replace(/`/g, '``')}\``;
}

async function seedPackagesIfEmpty(connection: mysql.Connection) {
  const [rows] = await connection.query<CountRow[]>('SELECT COUNT(*) AS total FROM packages');

  if ((rows[0]?.total ?? 0) > 0) {
    await backfillPackageLists(connection);
    return;
  }

  await connection.query(
    `
      INSERT INTO packages (
        id,
        title,
        subtitle,
        duration,
        focus,
        inclusions,
        complementary,
        add_ons,
        image,
        badge,
        seats_left,
        offer_ends_at,
        sort_order,
        is_active
      ) VALUES
      (?, ?, ?, ?, ?, CAST(? AS JSON), CAST(? AS JSON), CAST(? AS JSON), ?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, CAST(? AS JSON), CAST(? AS JSON), CAST(? AS JSON), ?, ?, ?, ?, ?, ?)
    `,
    [
      'pkg1',
      'One Day Serenity Experience',
      'A day to pause. A lifetime to breathe.',
      'Full Day (Dawn to Dusk)',
      'Stress Decompression & Mental Clarity',
      JSON.stringify([
        'Personalized Doctor consultation',
        'Morning Yoga and Breathwork',
        'Satvik & Balanced Meals',
        'Guided Meditation Sessions',
      ]),
      JSON.stringify([
        'Personalized Diet Plans from doctor',
        'Herbal welcome drink & detox tea',
      ]),
      JSON.stringify([]),
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
      'POPULAR',
      1,
      '2026-09-01 23:59:59',
      1,
      1,
      'pkg2',
      'Two Day Serenity Experience',
      'A day to pause. A lifetime to breathe.',
      'Full Day (Dawn to Dusk)',
      'Stress Decompression & Mental Clarity',
      JSON.stringify([
        'Personalized Doctor consultation',
        'Morning Yoga and Breathwork',
        'Satvik & Balanced Meals',
        'Guided Meditation Sessions',
      ]),
      JSON.stringify([
        'Personalized Diet Plans from doctor',
        'Herbal welcome drink & detox tea',
      ]),
      JSON.stringify([]),
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
      'POPULAR',
      1,
      '2026-09-01 23:59:59',
      2,
      1,
    ],
  );
}

async function backfillPackageLists(connection: mysql.Connection) {
  await connection.query(
    `
      UPDATE packages
      SET
        inclusions = CASE id
          WHEN 'pkg1' THEN CAST(? AS JSON)
          WHEN 'pkg2' THEN CAST(? AS JSON)
          ELSE inclusions
        END,
        complementary = CASE id
          WHEN 'pkg1' THEN CAST(? AS JSON)
          WHEN 'pkg2' THEN CAST(? AS JSON)
          ELSE complementary
        END,
        add_ons = CASE id
          WHEN 'pkg1' THEN CAST(? AS JSON)
          WHEN 'pkg2' THEN CAST(? AS JSON)
          ELSE add_ons
        END
      WHERE id IN ('pkg1', 'pkg2')
        AND (
          JSON_LENGTH(inclusions) = 0
          OR JSON_LENGTH(complementary) = 0
          OR add_ons IS NULL
        )
    `,
    [
      JSON.stringify([
        'Personalized Doctor consultation',
        'Morning Yoga and Breathwork',
        'Satvik & Balanced Meals',
        'Guided Meditation Sessions',
      ]),
      JSON.stringify([
        'Resort-ambience premium wellness suites',
        'Personalized Doctor consultation',
        'Satvik & Balanced Meals',
        'Morning Yoga and Breathwork',
        'Guided Meditation Sessions',
        'Fun Group Activities',
      ]),
      JSON.stringify([
        'Personalized Diet Plans from doctor',
        'Herbal welcome drink & detox tea',
      ]),
      JSON.stringify([
        'Personalized Diet Plans from Doctor',
        'Acupuncture/Sujok therapy',
        'Health talks & wellness guidance',
        'Evening herbal detox drinks',
      ]),
      JSON.stringify([]),
      JSON.stringify(['Spa Therapies']),
    ],
  );
}

async function ensureDatabaseReady() {
  const connection = await mysql.createConnection(dbConfig);
  const escapedDatabaseName = escapeIdentifier(databaseName);

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${escapedDatabaseName}`);
    await connection.query(`USE ${escapedDatabaseName}`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS packages (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        duration VARCHAR(120) NOT NULL,
        focus VARCHAR(255) NOT NULL,
        inclusions JSON NOT NULL,
        complementary JSON NOT NULL,
        add_ons JSON NULL,
        image VARCHAR(1000) NOT NULL,
        badge VARCHAR(60) NULL,
        seats_left INT UNSIGNED NULL,
        offer_ends_at DATETIME NULL,
        sort_order INT NOT NULL DEFAULT 0,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await seedPackagesIfEmpty(connection);
  } finally {
    await connection.end();
  }

  pool = mysql.createPool({
    ...dbConfig,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  });
}

function parseJsonList(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }
}

function formatOfferEnd(value: Date | string | null) {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

function mapPackage(row: PackageRow) {
  const defaults = packageListDefaults[row.id];
  const inclusions = parseJsonList(row.inclusions);
  const complementary = parseJsonList(row.complementary);
  const addOns = parseJsonList(row.add_ons);

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    duration: row.duration,
    focus: row.focus,
    inclusions: inclusions.length > 0 ? inclusions : defaults?.inclusions ?? [],
    complementary: complementary.length > 0 ? complementary : defaults?.complementary ?? [],
    addOns: addOns.length > 0 ? addOns : defaults?.addOns ?? [],
    image: row.image,
    badge: row.badge || undefined,
    seatsLeft: row.seats_left ?? undefined,
    offerEndsAt: formatOfferEnd(row.offer_ends_at),
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/packages', async (_req, res) => {
  try {
    const [rows] = await pool.query<PackageRow[]>(`
      SELECT
        id,
        title,
        subtitle,
        duration,
        focus,
        inclusions,
        complementary,
        add_ons,
        image,
        badge,
        seats_left,
        offer_ends_at,
        sort_order
      FROM packages
      WHERE is_active = 1
      ORDER BY sort_order ASC, created_at DESC
    `);

    res.json({ packages: rows.map(mapPackage) });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Failed to load packages: MySQL access denied. Check MYSQL_USER and MYSQL_PASSWORD in .env.');
    } else if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_BAD_DB_ERROR') {
      console.error(`Failed to load packages: MySQL database "${databaseName}" does not exist or cannot be selected.`);
    } else if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_NO_SUCH_TABLE') {
      console.error('Failed to load packages: packages table does not exist. Run database/packages.sql in MySQL.');
    } else {
      console.error('Failed to load packages:', error);
    }
    res.status(500).json({ error: 'Failed to load packages' });
  }
});

async function startServer() {
  try {
    await ensureDatabaseReady();

    app.listen(port, () => {
      console.log(`Serenity Haven API running on http://localhost:${port}`);
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Could not start API: MySQL access denied. Check MYSQL_USER and MYSQL_PASSWORD in .env.');
    } else {
      console.error('Could not start API:', error);
    }

    process.exit(1);
  }
}

startServer();
