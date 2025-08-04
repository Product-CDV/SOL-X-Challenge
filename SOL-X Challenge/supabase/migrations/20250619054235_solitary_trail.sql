/*
  # SOL-X Hero Stories System

  1. New Tables
    - `user_ranks` - Configurable user ranks (Captain, Chief Engineer, etc.)
    - `vessels` - Configurable vessel names (Eagle Bintulu, Eagle Kinabalu, etc.)
    - `story_features` - Configurable feature tags (Fall Detection, Broadcast Message, etc.)
    - `stories` - User submitted stories with published/featured flags
    - `story_feature_tags` - Junction table for story-feature relationships

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Authenticated users can manage all content

  3. Sample Data
    - Pre-populated ranks, vessels, and features
    - Sample stories for demonstration
*/

-- Create user_ranks table
CREATE TABLE IF NOT EXISTS user_ranks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create vessels table
CREATE TABLE IF NOT EXISTS vessels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create story_features table
CREATE TABLE IF NOT EXISTS story_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  color text DEFAULT 'blue',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_rank_id uuid REFERENCES user_ranks(id),
  vessel_id uuid REFERENCES vessels(id),
  story text NOT NULL,
  avatar text DEFAULT '👤',
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create story_feature_tags junction table
CREATE TABLE IF NOT EXISTS story_feature_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE,
  feature_id uuid REFERENCES story_features(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, feature_id)
);

-- Enable RLS
ALTER TABLE user_ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_feature_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_ranks
CREATE POLICY "Allow public read access to user_ranks"
  ON user_ranks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage user_ranks"
  ON user_ranks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for vessels
CREATE POLICY "Allow public read access to vessels"
  ON vessels
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage vessels"
  ON vessels
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for story_features
CREATE POLICY "Allow public read access to story_features"
  ON story_features
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage story_features"
  ON story_features
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for stories
CREATE POLICY "Allow public read access to published stories"
  ON stories
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow authenticated users to manage stories"
  ON stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for story_feature_tags
CREATE POLICY "Allow public read access to story_feature_tags"
  ON story_feature_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage story_feature_tags"
  ON story_feature_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add updated_at trigger for stories
CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO user_ranks (name, display_order) VALUES
  ('Captain', 1),
  ('Chief Engineer', 2),
  ('Chief Officer', 3),
  ('Second Engineer', 4),
  ('Navigation Officer', 5),
  ('Safety Officer', 6),
  ('Deck Officer', 7),
  ('Engineer', 8)
ON CONFLICT (name) DO NOTHING;

INSERT INTO vessels (name, display_order) VALUES
  ('Eagle Bintulu', 1),
  ('Eagle Kinabalu', 2),
  ('MV Ocean Pioneer', 3),
  ('SS Maritime Star', 4),
  ('MV Sea Guardian', 5),
  ('SS Blue Horizon', 6),
  ('MV Atlantic Voyager', 7)
ON CONFLICT (name) DO NOTHING;

INSERT INTO story_features (name, color, display_order) VALUES
  ('Fall Detection', 'red', 1),
  ('Broadcast Message', 'blue', 2),
  ('Steps Tracking', 'green', 3),
  ('Heart Rate Monitoring', 'pink', 4),
  ('Heat Stress Alert', 'orange', 5),
  ('Geofencing', 'purple', 6),
  ('Emergency Response', 'red', 7),
  ('Wellness Tracking', 'teal', 8),
  ('Safety Compliance', 'indigo', 9),
  ('Incident Prevention', 'yellow', 10)
ON CONFLICT (name) DO NOTHING;

-- Insert sample stories with feature tags
DO $$
DECLARE
  story1_id uuid := gen_random_uuid();
  story2_id uuid := gen_random_uuid();
  story3_id uuid := gen_random_uuid();
  story4_id uuid := gen_random_uuid();
  story5_id uuid := gen_random_uuid();
BEGIN
  -- Insert sample stories with predefined UUIDs
  INSERT INTO stories (id, user_name, user_rank_id, vessel_id, story, avatar, published, featured) VALUES
    (story1_id, 'Captain Anderson', 
     (SELECT id FROM user_ranks WHERE name = 'Captain' LIMIT 1), 
     (SELECT id FROM vessels WHERE name = 'Eagle Bintulu' LIMIT 1), 
     'The SOL-X fall detection system saved one of our crew members during a night shift. The system immediately detected when our engineer slipped on the wet deck and alerted the bridge crew. We were able to respond within minutes and provide immediate medical assistance. This technology has truly revolutionized our safety protocols at sea.', 
     '👨‍✈️', true, true),
    
    (story2_id, 'Chief Engineer Martinez', 
     (SELECT id FROM user_ranks WHERE name = 'Chief Engineer' LIMIT 1), 
     (SELECT id FROM vessels WHERE name = 'Eagle Kinabalu' LIMIT 1), 
     'Using SOL-X broadcast messaging during our recent emergency drill was incredible. I was able to instantly communicate critical safety instructions to all crew members simultaneously, regardless of their location on the vessel. The system ensured everyone received the same clear, consistent message, improving our emergency response time by 40%.', 
     '👷‍♂️', true, true),
    
    (story3_id, 'Captain Sarah Chen', 
     (SELECT id FROM user_ranks WHERE name = 'Captain' LIMIT 1), 
     (SELECT id FROM vessels WHERE name = 'Eagle Bintulu' LIMIT 1), 
     'The steps tracking feature has motivated our entire crew to stay more active during long voyages. We now have friendly competitions between shifts, and I''ve noticed improved morale and better physical fitness among the crew. The wellness aspect of SOL-X goes beyond safety - it''s building a healthier, more engaged team.', 
     '👩‍✈️', true, false),
    
    (story4_id, 'Chief Engineer David Kim', 
     (SELECT id FROM user_ranks WHERE name = 'Chief Engineer' LIMIT 1), 
     (SELECT id FROM vessels WHERE name = 'Eagle Kinabalu' LIMIT 1), 
     'Heart rate monitoring helped us identify early signs of heat stress in our engine room crew during a particularly hot crossing. The system alerted us before anyone felt seriously unwell, allowing us to implement cooling measures and adjust work schedules. This proactive approach to crew health is game-changing.', 
     '👨‍🔧', true, false),
    
    (story5_id, 'Captain Lisa Park', 
     (SELECT id FROM user_ranks WHERE name = 'Captain' LIMIT 1), 
     (SELECT id FROM vessels WHERE name = 'Eagle Bintulu' LIMIT 1), 
     'SOL-X has transformed how we approach crew safety and wellness. The integrated approach - combining fall detection, health monitoring, and communication tools - gives us unprecedented visibility into our crew''s wellbeing. It''s not just about compliance anymore; it''s about genuinely caring for our people at sea.', 
     '👩‍✈️', true, true);

  -- Add feature tags to stories
  INSERT INTO story_feature_tags (story_id, feature_id) VALUES
    (story1_id, (SELECT id FROM story_features WHERE name = 'Fall Detection' LIMIT 1)),
    (story2_id, (SELECT id FROM story_features WHERE name = 'Broadcast Message' LIMIT 1)),
    (story3_id, (SELECT id FROM story_features WHERE name = 'Steps Tracking' LIMIT 1)),
    (story4_id, (SELECT id FROM story_features WHERE name = 'Heart Rate Monitoring' LIMIT 1)),
    (story5_id, (SELECT id FROM story_features WHERE name = 'Fall Detection' LIMIT 1)),
    (story5_id, (SELECT id FROM story_features WHERE name = 'Heart Rate Monitoring' LIMIT 1)),
    (story5_id, (SELECT id FROM story_features WHERE name = 'Broadcast Message' LIMIT 1));
END $$;