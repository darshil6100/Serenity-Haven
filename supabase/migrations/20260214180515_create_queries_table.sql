/*
  # Create queries table for storing user inquiries in PostgreSQL

  1. New Tables
    - `queries`
      - `id` (serial, primary key) - Unique identifier for each query
      - `name` (text) - User's full name
      - `email` (text) - User's email address
      - `phone` (text) - User's phone number
      - `package_interest` (text) - Package user is interested in
      - `message` (text) - User's query message
      - `status` (text) - Query status (new, read, responded)
      - `created_at` (timestamp) - Timestamp when query was submitted
*/

CREATE TABLE IF NOT EXISTS queries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  package_interest VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_queries_email ON queries(email);
CREATE INDEX IF NOT EXISTS idx_queries_created_at ON queries(created_at);