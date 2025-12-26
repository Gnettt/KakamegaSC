/*
  # Initialize Kakamega Sports Club Database Schema

  1. New Tables
    - `news` - Store club news and announcements
    - `events` - Store club events and tournaments
    - `gallery` - Store gallery images metadata
    - `team_members` - Store leadership and committee members

  2. Security
    - Enable RLS on all tables
    - Set up read-only policies for public access
    - No write access from frontend (only admin via API)
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published gallery images"
  ON gallery
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  committee text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read team members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (true);
