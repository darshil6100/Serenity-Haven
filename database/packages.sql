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
  CONSTRAINT fk_detail_page_package
    FOREIGN KEY (package_id) REFERENCES packages(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_hero_meta (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  label VARCHAR(120) NOT NULL,
  value VARCHAR(255) NOT NULL,
  old_value VARCHAR(120) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_intro_pillars (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  title VARCHAR(120) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_practice_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  image VARCHAR(1000) NOT NULL,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_facilitator_paragraphs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  body TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_facilitator_creds (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  label VARCHAR(120) NOT NULL,
  value VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_itinerary_days (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  date_label VARCHAR(120) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_itinerary_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  day_id INT UNSIGNED NOT NULL,
  time_label VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (day_id) REFERENCES package_detail_itinerary_days(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_rooms (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  image VARCHAR(1000) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_food_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  time_label VARCHAR(120) NOT NULL,
  title VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_activities (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  image VARCHAR(1000) NOT NULL,
  title VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_pricing_inclusions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  icon VARCHAR(20) NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_practical_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  label VARCHAR(120) NOT NULL,
  value VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS package_detail_terms (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
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
