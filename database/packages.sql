CREATE DATABASE IF NOT EXISTS serenity_haven;
USE serenity_haven;

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
);

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
(
  'pkg1',
  'One Day Serenity Experience',
  'A day to pause. A lifetime to breathe.',
  'Full Day (Dawn to Dusk)',
  'Stress Decompression & Mental Clarity',
  JSON_ARRAY(
    'Personalized Doctor consultation',
    'Morning Yoga and Breathwork',
    'Satvik & Balanced Meals',
    'Guided Meditation Sessions'
  ),
  JSON_ARRAY(
    'Personalized Diet Plans from doctor',
    'Herbal welcome drink & detox tea'
  ),
  JSON_ARRAY(),
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
  'POPULAR',
  1,
  '2026-09-01 23:59:59',
  1,
  1
),
(
  'pkg2',
  'Two Day Serenity Experience',
  'A day to pause. A lifetime to breathe.',
  'Full Day (Dawn to Dusk)',
  'Stress Decompression & Mental Clarity',
  JSON_ARRAY(
    'Personalized Doctor consultation',
    'Morning Yoga and Breathwork',
    'Satvik & Balanced Meals',
    'Guided Meditation Sessions'
  ),
  JSON_ARRAY(
    'Personalized Diet Plans from doctor',
    'Herbal welcome drink & detox tea'
  ),
  JSON_ARRAY(),
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
  'POPULAR',
  1,
  '2026-09-01 23:59:59',
  2,
  1
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  subtitle = VALUES(subtitle),
  duration = VALUES(duration),
  focus = VALUES(focus),
  inclusions = VALUES(inclusions),
  complementary = VALUES(complementary),
  add_ons = VALUES(add_ons),
  image = VALUES(image),
  badge = VALUES(badge),
  seats_left = VALUES(seats_left),
  offer_ends_at = VALUES(offer_ends_at),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);
