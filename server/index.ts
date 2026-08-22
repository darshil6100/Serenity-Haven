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
};

type CountRow = RowDataPacket & { total: number };
type DetailPageRow = RowDataPacket & Record<string, string | number | null>;
type DetailItemRow = RowDataPacket & Record<string, string | number | null>;
type ItineraryDayRow = RowDataPacket & { id: number; title: string; date_label: string };

const packageListDefaults: Record<string, { inclusions: string[]; complementary: string[]; addOns: string[] }> = {
  pkg1: {
    inclusions: ['Personalized Doctor consultation', 'Morning Yoga and Breathwork', 'Satvik & Balanced Meals', 'Guided Meditation Sessions'],
    complementary: ['Personalized Diet Plans from doctor', 'Herbal welcome drink & detox tea'],
    addOns: [],
  },
  pkg2: {
    inclusions: ['Resort-ambience premium wellness suites', 'Personalized Doctor consultation', 'Satvik & Balanced Meals', 'Morning Yoga and Breathwork', 'Guided Meditation Sessions', 'Fun Group Activities'],
    complementary: ['Personalized Diet Plans from Doctor', 'Acupuncture/Sujok therapy', 'Health talks & wellness guidance', 'Evening herbal detox drinks'],
    addOns: ['Spa Therapies'],
  },
};

const detailDefaults = {
  page: {
    package_id: 'pkg2',
    page_title: 'Wellness Retreat Brochure',
    hero_image: '/package_details/images/about-banner-1.jpg',
    hero_badge: 'Limited seats · Book now',
    hero_eyebrow: '12–13 September 2026 · 2 Days / 1 Night',
    hero_title: 'A 2-Day',
    hero_emphasis: 'Wellness',
    hero_suffix: 'Retreat',
    hero_subtitle: 'Step away from the routine. Reset your body, calm your mind, and reconnect with you — through yoga, pranayama, meditation, nourishing food and quiet time in nature.',
    intro_eyebrow: 'Why this retreat',
    intro_quote: 'A complete reset for your body, mind and lifestyle. Learn. Heal. Grow — together.',
    intro_body: 'Tucked away amidst trees and open lawns, this retreat is built around one idea: that two unhurried days of movement, stillness and real food can reset months of routine.',
    facilitator_eyebrow: 'Your Facilitator',
    facilitator_name: 'Dr. Aakanksha Koshti',
    facilitator_role: 'Diet & Lifestyle Counsellor · Wellness Mentor',
    facilitator_image: '/package_details/images/facilator.jpeg',
    facilitator_tag: 'BNYS · Wellness Mentor',
    itinerary_eyebrow: 'The Trail Ahead',
    itinerary_heading: 'Your Two Days, Hour by Hour',
    rooms_eyebrow: "Where You'll Stay",
    rooms_heading: 'Rooms Amidst the Trees',
    food_eyebrow: 'Nourishment',
    food_heading: 'Food That Works With You, Not Against',
    food_image: '/package_details/images/card-room2.jpg',
    food_body: "Every meal on this retreat is planned around the day's practice — light and easy to digest before a session, warm and wholesome after one.",
    food_badge: '🌿 All meals included · No hidden costs',
    activities_eyebrow: 'Beyond The Mat',
    activities_heading: 'Play, Move & Connect',
    pricing_eyebrow: 'Join Us',
    pricing_heading: 'All-Inclusive Package',
    pricing_ribbon: 'Book before 31 Aug',
    early_bird_label: 'Early Bird/Until 1st Sept',
    early_bird_price: '₹9,999 / person',
    regular_price: '₹11,999',
    pricing_duration: '2 Days / 1 Night',
    practical_eyebrow: 'Good To Know',
    practical_heading: 'Practical Details',
    terms_eyebrow: 'Please Read',
    terms_heading: 'Terms & Conditions',
  },
  heroMeta: [
    ['Check-in', '11:00 AM, Day 1', null],
    ['Check-out', '10:00 AM, Day 2', null],
    ['Early bird/until 1st sept', '₹9,999 / person', '₹11,999'],
    ['Facilitator', 'Dr. Aakanksha Koshti, BNYS', null],
  ],
  introPillars: ['Yoga', 'Pranayama', 'Meditation', 'Nutrition', 'Nature Walks', 'Lifestyle'],
  practice: [
    ['/package_details/images/yoga.jpg', 'Yoga', 'Guided asana practice, twice a day'],
    ['/package_details/images/meditation.jpg', 'Meditation', 'Sunset stillness & sunrise reflection'],
    ['/package_details/images/nature-walk.jpg', 'Nature Walk', 'A slow, guided walk through the grounds'],
    ['/package_details/images/consultation.png', 'Lifestyle Consultation', '1:1 diet & lifestyle session with Dr. Aakanksha'],
  ],
  facilitatorParagraphs: [
    'Dr. Aakanksha brings a BNYS foundation and years of one-on-one counselling into every session of this retreat.',
    'Across the retreat, she leads the daily yoga and pranayama practice, guided meditation, and personal diet & lifestyle counselling.',
  ],
  facilitatorCreds: [['Focus', 'Diet & Lifestyle'], ['Practice', 'Naturopathy & Yoga'], ['Sessions', 'Daily, guided']],
  itineraryDays: [
    {
      title: 'Day One — Arrive & Unwind',
      date: 'Saturday, 12th September',
      items: [
        ['11:00 AM', 'Check-in & Welcome Drink', 'Settle into your room and meet fellow guests over a chilled herbal welcome drink.'],
        ['12:00 PM', 'Orientation Circle', 'An introductory session with Dr. Aakanksha — the why behind the next two days.'],
        ['1:00 PM', 'Sattvic Lunch', 'A wholesome, plant-forward welcome meal.'],
        ['4:00 PM', 'Guided Nature Walk', 'A slow walk through the grounds, led by our in-house guide.'],
        ['7:00 PM', 'Sunset Meditation', 'A guided stillness practice to close the day.'],
      ],
    },
    {
      title: 'Day Two — Practice & Depart',
      date: 'Sunday, 13th September',
      items: [
        ['5:30 AM', 'Sunrise Yoga', 'A full guided asana practice to greet the morning.'],
        ['7:00 AM', 'Guided Meditation', 'A quiet reflection circle to sit with everything so far.'],
        ['8:00 AM', '1:1 Diet & Lifestyle Session', 'Personal counselling with Dr. Aakanksha — habits you can keep.'],
        ['10:00 AM', 'Check-out', 'Depart refreshed — and hopefully, a little transformed.'],
      ],
    },
  ],
  rooms: [
    ['/package_details/images/best-resort-near-gandhinagar-10.jpg', 'Super Delux Room', 'Warm, contemporary rooms with a private sit-out — comfortable and quiet after a full day of sessions.'],
    ['/package_details/images/valley-view-villa2.jpg', 'Valley View Villa', 'Spacious villa rooms with wide windows that open straight onto green views.'],
  ],
  food: [
    ['Day 1, 1:00 PM', 'Sattvic welcome lunch'],
    ['Day 1, 6:00 PM', 'Herbal evening tea & snacks'],
    ['Day 1, 8:00 PM', 'Wholesome dinner by the bonfire'],
    ['Day 2, 8:45 AM', 'Farewell breakfast'],
  ],
  activities: [
    ['/package_details/images/rope-climbing.jpg', 'High Rope Course'],
    ['/package_details/images/camel-cart-ridding.jpg', 'Camel Cart Ride'],
    ['/package_details/images/corporate-fun.jpg', 'Group Fun Activities'],
    ['/package_details/images/carrom-board1.jpg', 'Carrom'],
  ],
  pricingInclusions: [
    ['🛏', 'Stay', '1 night in your chosen room type'],
    ['🍽', 'All Meals', 'Lunch, tea, dinner, tea & breakfast'],
    ['🧘', 'All Sessions', 'Yoga, pranayama, meditation & counselling'],
    ['🎯', 'Activities', 'Rope course, carrom, TT, cycling & more'],
    ['🌳', 'Nature Walk', 'Guided walk through the grounds'],
    ['🎁', 'Wellness Kit', 'A surprise take-home gift for every guest'],
  ],
  practical: [
    ['Check-in', '11:00 AM', 'Saturday, 12th September 2026. Rooms ready and welcome drink served on arrival.'],
    ['Check-out', '10:00 AM', 'Sunday, 13th September 2026, right after breakfast and the closing circle.'],
    ['What to bring', 'Pack Light', 'Comfortable yoga wear, walking shoes, a water bottle, and a light shawl for the evenings.'],
  ],
  terms: [
    ['Booking Confirmation', 'Seats are limited and bookings are confirmed only after full payment or an approved advance payment is received.'],
    ['Package Inclusions', 'The package includes stay, listed meals, wellness sessions, selected resort activities and the wellness kit.'],
    ['Schedule Changes', 'The itinerary may be adjusted due to weather, operational requirements or guest safety considerations.'],
    ['Cancellation & Refunds', 'Cancellation, refund or date-change requests will be handled as per the policy shared at the time of booking.'],
    ['Health Responsibility', 'Guests should inform the team in advance about any medical condition, injury, allergy or special dietary requirement.'],
    ['Resort Guidelines', 'Guests are expected to follow resort rules and participate in activities at their own comfort level.'],
  ],
};

function escapeIdentifier(value: string) {
  return `\`${value.replace(/`/g, '``')}\``;
}

function parseJsonList(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value.split(',').map(item => item.trim()).filter(Boolean);
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

async function seedPackagesIfEmpty(connection: mysql.Connection) {
  const [rows] = await connection.query<CountRow[]>('SELECT COUNT(*) AS total FROM packages');
  if ((rows[0]?.total ?? 0) > 0) return;

  await connection.query(
    `
      INSERT INTO packages (id, title, subtitle, duration, focus, inclusions, complementary, add_ons, image, badge, seats_left, offer_ends_at, sort_order, is_active)
      VALUES
      (?, ?, ?, ?, ?, CAST(? AS JSON), CAST(? AS JSON), CAST(? AS JSON), ?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, CAST(? AS JSON), CAST(? AS JSON), CAST(? AS JSON), ?, ?, ?, ?, ?, ?)
    `,
    [
      'pkg1', 'One Day Serenity Experience', 'A day to pause. A lifetime to breathe.', 'Full Day (Dawn to Dusk)', 'Stress Decompression & Mental Clarity',
      JSON.stringify(packageListDefaults.pkg1.inclusions), JSON.stringify(packageListDefaults.pkg1.complementary), JSON.stringify(packageListDefaults.pkg1.addOns),
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80', 'POPULAR', 1, '2026-09-01 23:59:59', 1, 1,
      'pkg2', 'Nourish & Revive Vitality Retreat', 'Reconnect with your inner rhythm.', '2 Days, 1 Night', 'Lifestyle Reset with Relaxation & Recreation',
      JSON.stringify(packageListDefaults.pkg2.inclusions), JSON.stringify(packageListDefaults.pkg2.complementary), JSON.stringify(packageListDefaults.pkg2.addOns),
      'https://images.unsplash.com/photo-1540206395-68808572332f?w=900&q=80', 'BEST VALUE', 1, '2026-09-01 23:59:59', 2, 1,
    ],
  );
}

async function createDetailTables(connection: mysql.Connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS package_detail_pages (
      package_id VARCHAR(50) PRIMARY KEY,
      page_title VARCHAR(255) NOT NULL,
      hero_image VARCHAR(1000) NOT NULL,
      hero_badge VARCHAR(120) NULL,
      hero_eyebrow VARCHAR(255) NULL,
      hero_title VARCHAR(255) NOT NULL,
      hero_emphasis VARCHAR(120) NULL,
      hero_suffix VARCHAR(120) NULL,
      hero_subtitle TEXT NULL,
      intro_eyebrow VARCHAR(120) NULL,
      intro_quote TEXT NULL,
      intro_body TEXT NULL,
      facilitator_eyebrow VARCHAR(120) NULL,
      facilitator_name VARCHAR(255) NULL,
      facilitator_role VARCHAR(255) NULL,
      facilitator_image VARCHAR(1000) NULL,
      facilitator_tag VARCHAR(120) NULL,
      itinerary_eyebrow VARCHAR(120) NULL,
      itinerary_heading VARCHAR(255) NULL,
      rooms_eyebrow VARCHAR(120) NULL,
      rooms_heading VARCHAR(255) NULL,
      food_eyebrow VARCHAR(120) NULL,
      food_heading VARCHAR(255) NULL,
      food_image VARCHAR(1000) NULL,
      food_body TEXT NULL,
      food_badge VARCHAR(255) NULL,
      activities_eyebrow VARCHAR(120) NULL,
      activities_heading VARCHAR(255) NULL,
      pricing_eyebrow VARCHAR(120) NULL,
      pricing_heading VARCHAR(255) NULL,
      pricing_ribbon VARCHAR(120) NULL,
      early_bird_label VARCHAR(120) NULL,
      early_bird_price VARCHAR(120) NULL,
      regular_price VARCHAR(120) NULL,
      pricing_duration VARCHAR(120) NULL,
      practical_eyebrow VARCHAR(120) NULL,
      practical_heading VARCHAR(255) NULL,
      terms_eyebrow VARCHAR(120) NULL,
      terms_heading VARCHAR(255) NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_detail_page_package FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
    )
  `);
  await ensureDetailPageColumns(connection);

  const detailTables = [
    `CREATE TABLE IF NOT EXISTS package_detail_hero_meta (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, label VARCHAR(120) NOT NULL, value VARCHAR(255) NOT NULL, old_value VARCHAR(120) NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_intro_pillars (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, title VARCHAR(120) NOT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_practice_items (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, image VARCHAR(1000) NOT NULL, title VARCHAR(255) NOT NULL, tag VARCHAR(255) NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_facilitator_paragraphs (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, body TEXT NOT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_facilitator_creds (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, label VARCHAR(120) NOT NULL, value VARCHAR(255) NOT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_itinerary_days (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, title VARCHAR(255) NOT NULL, date_label VARCHAR(120) NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_itinerary_items (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, day_id INT UNSIGNED NOT NULL, time_label VARCHAR(80) NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (day_id) REFERENCES package_detail_itinerary_days(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_rooms (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, image VARCHAR(1000) NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_food_items (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, time_label VARCHAR(120) NOT NULL, title VARCHAR(255) NOT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_activities (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, image VARCHAR(1000) NOT NULL, title VARCHAR(255) NOT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_pricing_inclusions (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, icon VARCHAR(20) NULL, title VARCHAR(255) NOT NULL, description TEXT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_practical_items (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, label VARCHAR(120) NOT NULL, value VARCHAR(255) NOT NULL, description TEXT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS package_detail_terms (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, package_id VARCHAR(50) NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NULL, sort_order INT NOT NULL DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`,
  ];

  for (const sql of detailTables) await connection.query(sql);
}

async function ensureDetailPageColumns(connection: mysql.Connection) {
  const columns: Array<[string, string]> = [
    ['hero_image', 'VARCHAR(1000) NULL'],
    ['hero_badge', 'VARCHAR(120) NULL'],
    ['hero_eyebrow', 'VARCHAR(255) NULL'],
    ['hero_title', 'VARCHAR(255) NULL'],
    ['hero_emphasis', 'VARCHAR(120) NULL'],
    ['hero_suffix', 'VARCHAR(120) NULL'],
    ['hero_subtitle', 'TEXT NULL'],
    ['intro_eyebrow', 'VARCHAR(120) NULL'],
    ['intro_quote', 'TEXT NULL'],
    ['intro_body', 'TEXT NULL'],
    ['facilitator_eyebrow', 'VARCHAR(120) NULL'],
    ['facilitator_name', 'VARCHAR(255) NULL'],
    ['facilitator_role', 'VARCHAR(255) NULL'],
    ['facilitator_image', 'VARCHAR(1000) NULL'],
    ['facilitator_tag', 'VARCHAR(120) NULL'],
    ['itinerary_eyebrow', 'VARCHAR(120) NULL'],
    ['itinerary_heading', 'VARCHAR(255) NULL'],
    ['rooms_eyebrow', 'VARCHAR(120) NULL'],
    ['rooms_heading', 'VARCHAR(255) NULL'],
    ['food_eyebrow', 'VARCHAR(120) NULL'],
    ['food_heading', 'VARCHAR(255) NULL'],
    ['food_image', 'VARCHAR(1000) NULL'],
    ['food_body', 'TEXT NULL'],
    ['food_badge', 'VARCHAR(255) NULL'],
    ['activities_eyebrow', 'VARCHAR(120) NULL'],
    ['activities_heading', 'VARCHAR(255) NULL'],
    ['pricing_eyebrow', 'VARCHAR(120) NULL'],
    ['pricing_heading', 'VARCHAR(255) NULL'],
    ['pricing_ribbon', 'VARCHAR(120) NULL'],
    ['early_bird_label', 'VARCHAR(120) NULL'],
    ['early_bird_price', 'VARCHAR(120) NULL'],
    ['regular_price', 'VARCHAR(120) NULL'],
    ['pricing_duration', 'VARCHAR(120) NULL'],
    ['practical_eyebrow', 'VARCHAR(120) NULL'],
    ['practical_heading', 'VARCHAR(255) NULL'],
    ['terms_eyebrow', 'VARCHAR(120) NULL'],
    ['terms_heading', 'VARCHAR(255) NULL'],
  ];

  for (const [columnName, definition] of columns) {
    const [rows] = await connection.query<CountRow[]>(
      `
        SELECT COUNT(*) AS total
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'package_detail_pages' AND COLUMN_NAME = ?
      `,
      [databaseName, columnName],
    );

    if ((rows[0]?.total ?? 0) === 0) {
      await connection.query(`ALTER TABLE package_detail_pages ADD COLUMN ${columnName} ${definition}`);
    }
  }
}

async function insertRows(connection: mysql.Connection, table: string, packageId: string, rows: unknown[][], columns: string[]) {
  for (let index = 0; index < rows.length; index += 1) {
    const placeholders = ['?', ...columns.map(() => '?'), '?'].join(', ');
    await connection.query(
      `INSERT INTO ${table} (package_id, ${columns.join(', ')}, sort_order) VALUES (${placeholders})`,
      [packageId, ...rows[index], index + 1],
    );
  }
}

async function seedPackageDetails(connection: mysql.Connection) {
  const packageId = 'pkg2';
  const [rows] = await connection.query<CountRow[]>('SELECT COUNT(*) AS total FROM package_detail_pages WHERE package_id = ?', [packageId]);

  const page = detailDefaults.page;
  if ((rows[0]?.total ?? 0) === 0) {
    await connection.query(
      `
        INSERT INTO package_detail_pages (
          package_id, page_title, hero_image, hero_badge, hero_eyebrow, hero_title, hero_emphasis, hero_suffix, hero_subtitle,
          intro_eyebrow, intro_quote, intro_body, facilitator_eyebrow, facilitator_name, facilitator_role, facilitator_image,
          facilitator_tag, itinerary_eyebrow, itinerary_heading, rooms_eyebrow, rooms_heading, food_eyebrow, food_heading,
          food_image, food_body, food_badge, activities_eyebrow, activities_heading, pricing_eyebrow, pricing_heading,
          pricing_ribbon, early_bird_label, early_bird_price, regular_price, pricing_duration, practical_eyebrow,
          practical_heading, terms_eyebrow, terms_heading
        ) VALUES (${Array.from({ length: 39 }, () => '?').join(', ')})
      `,
      Object.values(page),
    );
  } else {
    const pageEntries = Object.entries(page).filter(([key]) => key !== 'package_id');
    await connection.query(
      `
        UPDATE package_detail_pages
        SET ${pageEntries.map(([key]) => `${key} = COALESCE(${key}, ?)`).join(', ')}
        WHERE package_id = ?
      `,
      [...pageEntries.map(([, value]) => value), packageId],
    );
  }

  const [detailRows] = await connection.query<CountRow[]>('SELECT COUNT(*) AS total FROM package_detail_hero_meta WHERE package_id = ?', [packageId]);
  if ((detailRows[0]?.total ?? 0) > 0) return;

  await insertRows(connection, 'package_detail_hero_meta', packageId, detailDefaults.heroMeta, ['label', 'value', 'old_value']);
  await insertRows(connection, 'package_detail_intro_pillars', packageId, detailDefaults.introPillars.map(title => [title]), ['title']);
  await insertRows(connection, 'package_detail_practice_items', packageId, detailDefaults.practice, ['image', 'title', 'tag']);
  await insertRows(connection, 'package_detail_facilitator_paragraphs', packageId, detailDefaults.facilitatorParagraphs.map(body => [body]), ['body']);
  await insertRows(connection, 'package_detail_facilitator_creds', packageId, detailDefaults.facilitatorCreds, ['label', 'value']);

  for (let dayIndex = 0; dayIndex < detailDefaults.itineraryDays.length; dayIndex += 1) {
    const day = detailDefaults.itineraryDays[dayIndex];
    const [result] = await connection.query<mysql.ResultSetHeader>(
      'INSERT INTO package_detail_itinerary_days (package_id, title, date_label, sort_order) VALUES (?, ?, ?, ?)',
      [packageId, day.title, day.date, dayIndex + 1],
    );

    for (let itemIndex = 0; itemIndex < day.items.length; itemIndex += 1) {
      await connection.query(
        'INSERT INTO package_detail_itinerary_items (day_id, time_label, title, description, sort_order) VALUES (?, ?, ?, ?, ?)',
        [result.insertId, ...day.items[itemIndex], itemIndex + 1],
      );
    }
  }

  await insertRows(connection, 'package_detail_rooms', packageId, detailDefaults.rooms, ['image', 'title', 'description']);
  await insertRows(connection, 'package_detail_food_items', packageId, detailDefaults.food, ['time_label', 'title']);
  await insertRows(connection, 'package_detail_activities', packageId, detailDefaults.activities, ['image', 'title']);
  await insertRows(connection, 'package_detail_pricing_inclusions', packageId, detailDefaults.pricingInclusions, ['icon', 'title', 'description']);
  await insertRows(connection, 'package_detail_practical_items', packageId, detailDefaults.practical, ['label', 'value', 'description']);
  await insertRows(connection, 'package_detail_terms', packageId, detailDefaults.terms, ['title', 'description']);
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
    await createDetailTables(connection);
    await seedPackageDetails(connection);
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

function pageToSections(page: DetailPageRow) {
  return {
    hero: {
      image: page.hero_image,
      badge: page.hero_badge,
      eyebrow: page.hero_eyebrow,
      title: page.hero_title,
      emphasis: page.hero_emphasis,
      suffix: page.hero_suffix,
      subtitle: page.hero_subtitle,
      meta: [],
    },
    intro: { eyebrow: page.intro_eyebrow, quote: page.intro_quote, body: page.intro_body, pillars: [] },
    practice: { eyebrow: 'The Practice, In Pictures', heading: 'What Each Session Actually Looks Like', items: [] },
    facilitator: {
      eyebrow: page.facilitator_eyebrow,
      name: page.facilitator_name,
      role: page.facilitator_role,
      image: page.facilitator_image,
      tag: page.facilitator_tag,
      paragraphs: [],
      creds: [],
    },
    itinerary: { eyebrow: page.itinerary_eyebrow, heading: page.itinerary_heading, days: [] },
    rooms: { eyebrow: page.rooms_eyebrow, heading: page.rooms_heading, items: [] },
    food: { eyebrow: page.food_eyebrow, heading: page.food_heading, image: page.food_image, body: page.food_body, badge: page.food_badge, items: [] },
    activities: { eyebrow: page.activities_eyebrow, heading: page.activities_heading, items: [] },
    pricing: {
      eyebrow: page.pricing_eyebrow,
      heading: page.pricing_heading,
      ribbon: page.pricing_ribbon,
      earlyBirdLabel: page.early_bird_label,
      earlyBirdPrice: page.early_bird_price,
      regularPrice: page.regular_price,
      duration: page.pricing_duration,
      inclusions: [],
    },
    practical: { eyebrow: page.practical_eyebrow, heading: page.practical_heading, items: [] },
    terms: { eyebrow: page.terms_eyebrow, heading: page.terms_heading, items: [] },
  };
}

async function getRows(table: string, packageId: string) {
  const [rows] = await pool.query<DetailItemRow[]>(`SELECT * FROM ${table} WHERE package_id = ? ORDER BY sort_order ASC`, [packageId]);
  return rows;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/packages', async (_req, res) => {
  try {
    const [rows] = await pool.query<PackageRow[]>(`
      SELECT id, title, subtitle, duration, focus, inclusions, complementary, add_ons, image, badge, seats_left, offer_ends_at
      FROM packages
      WHERE is_active = 1
      ORDER BY sort_order ASC, created_at DESC
    `);
    res.json({ packages: rows.map(mapPackage) });
  } catch (error) {
    console.error('Failed to load packages:', error);
    res.status(500).json({ error: 'Failed to load packages' });
  }
});

app.get('/api/packages/:id/details', async (req, res) => {
  try {
    const packageId = req.params.id;
    const [pages] = await pool.query<DetailPageRow[]>('SELECT * FROM package_detail_pages WHERE package_id = ? AND is_active = 1', [packageId]);

    if (!pages[0]) {
      const [fallbackPages] = await pool.query<DetailPageRow[]>('SELECT * FROM package_detail_pages WHERE package_id = ? AND is_active = 1', ['pkg2']);
      if (!fallbackPages[0]) return res.json({ packageId, sections: {} });
      pages[0] = fallbackPages[0];
    }

    const sections = pageToSections(pages[0]);
    const sourcePackageId = String(pages[0].package_id);

    const [
      heroMeta, introPillars, practice, facilitatorParagraphs, facilitatorCreds,
      days, rooms, food, activities, pricingInclusions, practical, terms,
    ] = await Promise.all([
      getRows('package_detail_hero_meta', sourcePackageId),
      getRows('package_detail_intro_pillars', sourcePackageId),
      getRows('package_detail_practice_items', sourcePackageId),
      getRows('package_detail_facilitator_paragraphs', sourcePackageId),
      getRows('package_detail_facilitator_creds', sourcePackageId),
      getRows('package_detail_itinerary_days', sourcePackageId),
      getRows('package_detail_rooms', sourcePackageId),
      getRows('package_detail_food_items', sourcePackageId),
      getRows('package_detail_activities', sourcePackageId),
      getRows('package_detail_pricing_inclusions', sourcePackageId),
      getRows('package_detail_practical_items', sourcePackageId),
      getRows('package_detail_terms', sourcePackageId),
    ]);

    sections.hero.meta = heroMeta.map(row => ({ label: row.label, value: row.value, oldValue: row.old_value }));
    sections.intro.pillars = introPillars.map(row => row.title);
    sections.practice.items = practice.map(row => ({ image: row.image, title: row.title, tag: row.tag }));
    sections.facilitator.paragraphs = facilitatorParagraphs.map(row => row.body);
    sections.facilitator.creds = facilitatorCreds.map(row => ({ label: row.label, value: row.value }));
    sections.rooms.items = rooms.map(row => ({ image: row.image, title: row.title, description: row.description }));
    sections.food.items = food.map(row => ({ time: row.time_label, title: row.title }));
    sections.activities.items = activities.map(row => ({ image: row.image, title: row.title }));
    sections.pricing.inclusions = pricingInclusions.map(row => ({ icon: row.icon, title: row.title, description: row.description }));
    sections.practical.items = practical.map(row => ({ label: row.label, value: row.value, description: row.description }));
    sections.terms.items = terms.map(row => ({ title: row.title, description: row.description }));

    const dayItems = await Promise.all(days.map(day =>
      pool.query<DetailItemRow[]>('SELECT * FROM package_detail_itinerary_items WHERE day_id = ? ORDER BY sort_order ASC', [day.id])
        .then(([items]) => ({
          title: (day as ItineraryDayRow).title,
          date: (day as ItineraryDayRow).date_label,
          items: items.map(item => ({ time: item.time_label, title: item.title, description: item.description })),
        })),
    ));
    sections.itinerary.days = dayItems;

    res.json({ packageId, sections });
  } catch (error) {
    console.error('Failed to load package details:', error);
    res.status(500).json({ error: 'Failed to load package details' });
  }
});

async function startServer() {
  try {
    await ensureDatabaseReady();
    app.listen(port, () => {
      console.log(`Serenity Haven API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Could not start API:', error);
    process.exit(1);
  }
}

startServer();
