/*
  # Create SOL-X Challenge Database Schema

  1. New Tables
    - `challenges`
      - `id` (text, primary key) - Challenge identifier
      - `name` (text) - Challenge display name
      - `description` (text) - Challenge description
      - `category` (text) - Challenge category
      - `icon` (text) - Lucide icon name
      - `gradient` (text) - CSS gradient classes
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prizes`
      - `id` (uuid, primary key)
      - `challenge_id` (text, foreign key) - References challenges.id
      - `position` (integer) - Prize position (1st, 2nd, 3rd)
      - `title` (text) - Prize title
      - `description` (text) - Prize description
      - `value` (text, optional) - Prize value display
      - `created_at` (timestamp)
    
    - `participants`
      - `id` (uuid, primary key)
      - `challenge_id` (text, foreign key) - References challenges.id
      - `name` (text) - Participant name
      - `avatar` (text) - Emoji avatar
      - `score` (integer) - Participant score
      - `rank` (integer) - Current rank
      - `badge` (text, optional) - Badge type (gold, silver, bronze)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a public leaderboard)
    - Add policies for authenticated users to manage data
*/

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  icon text NOT NULL DEFAULT 'Star',
  gradient text NOT NULL DEFAULT 'from-blue-600 to-purple-600',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prizes table
CREATE TABLE IF NOT EXISTS prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id text NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  position integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  value text,
  created_at timestamptz DEFAULT now()
);

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id text NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar text NOT NULL DEFAULT '👤',
  score integer NOT NULL DEFAULT 0,
  rank integer NOT NULL DEFAULT 1,
  badge text CHECK (badge IN ('gold', 'silver', 'bronze')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to challenges"
  ON challenges
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to prizes"
  ON prizes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to participants"
  ON participants
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to manage data
CREATE POLICY "Allow authenticated users to manage challenges"
  ON challenges
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage prizes"
  ON prizes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage participants"
  ON participants
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prizes_challenge_id ON prizes(challenge_id);
CREATE INDEX IF NOT EXISTS idx_participants_challenge_id ON participants(challenge_id);
CREATE INDEX IF NOT EXISTS idx_participants_rank ON participants(challenge_id, rank);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();