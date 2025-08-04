/*
  # Update leaderboard structure and story features

  1. Database Changes
    - Update story_features with new SOL-X feature tags
    - Add new leaderboard structure for crew and vessel tracking
    - Update challenges table with new metrics

  2. New Tables
    - `crew_leaderboards` - Individual crew member performance
    - `vessel_leaderboards` - Vessel-level aggregated performance

  3. Updated Features
    - Replace existing story features with new SOL-X specific tags
    - Add proper leaderboard tracking for different challenge types
*/

-- Update story features with new SOL-X specific tags
DELETE FROM story_feature_tags;
DELETE FROM story_features;

INSERT INTO story_features (id, name, color, display_order) VALUES
  (gen_random_uuid(), 'Heat Stress Response', 'red', 1),
  (gen_random_uuid(), 'Fatigue Management', 'orange', 2),
  (gen_random_uuid(), 'Rest & Recovery', 'green', 3),
  (gen_random_uuid(), 'Heart Rate Monitoring', 'pink', 4),
  (gen_random_uuid(), 'Noise Exposure', 'purple', 5),
  (gen_random_uuid(), 'Hazard Avoidance', 'yellow', 6),
  (gen_random_uuid(), 'Broadcast Communication', 'blue', 7),
  (gen_random_uuid(), 'Zone Compliance', 'indigo', 8),
  (gen_random_uuid(), 'Physical Activity & Steps', 'teal', 9),
  (gen_random_uuid(), 'Cold Exposure & Protection', 'blue', 10);

-- Create crew leaderboards table
CREATE TABLE IF NOT EXISTS crew_leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id text NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  crew_name text NOT NULL,
  vessel_name text NOT NULL,
  metric_value numeric NOT NULL DEFAULT 0,
  metric_unit text NOT NULL DEFAULT 'points',
  rank integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vessel leaderboards table
CREATE TABLE IF NOT EXISTS vessel_leaderboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id text NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  vessel_name text NOT NULL,
  metric_value numeric NOT NULL DEFAULT 0,
  metric_unit text NOT NULL DEFAULT 'percentage',
  rank integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE crew_leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE vessel_leaderboards ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public read access to crew_leaderboards"
  ON crew_leaderboards
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage crew_leaderboards"
  ON crew_leaderboards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to vessel_leaderboards"
  ON vessel_leaderboards
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage vessel_leaderboards"
  ON vessel_leaderboards
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_crew_leaderboards_challenge_id ON crew_leaderboards(challenge_id);
CREATE INDEX IF NOT EXISTS idx_crew_leaderboards_rank ON crew_leaderboards(challenge_id, rank);
CREATE INDEX IF NOT EXISTS idx_vessel_leaderboards_challenge_id ON vessel_leaderboards(challenge_id);
CREATE INDEX IF NOT EXISTS idx_vessel_leaderboards_rank ON vessel_leaderboards(challenge_id, rank);

-- Add triggers for updated_at
CREATE TRIGGER update_crew_leaderboards_updated_at
  BEFORE UPDATE ON crew_leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vessel_leaderboards_updated_at
  BEFORE UPDATE ON vessel_leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample crew leaderboard data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
  -- Put a Ring on Me - Safe Zones, Smart Moves
  ('geofence', 'Alex Chen', 'MV Ocean Pioneer', 2, 'breaches', 1),
  ('geofence', 'Sarah Johnson', 'SS Maritime Star', 3, 'breaches', 2),
  ('geofence', 'Mike Rodriguez', 'MV Sea Guardian', 4, 'breaches', 3),
  ('geofence', 'Emma Davis', 'SS Blue Horizon', 5, 'breaches', 4),
  ('geofence', 'James Wilson', 'MV Atlantic Voyager', 6, 'breaches', 5),
  
  -- Walk the Deck - My Every Step Counts
  ('steps-count', 'Captain Anderson', 'MV Ocean Pioneer', 45, 'days', 1),
  ('steps-count', 'Chief Martinez', 'SS Maritime Star', 42, 'days', 2),
  ('steps-count', 'Officer Taylor', 'MV Sea Guardian', 38, 'days', 3),
  ('steps-count', 'Engineer White', 'SS Blue Horizon', 35, 'days', 4),
  ('steps-count', 'Navigator Zhang', 'MV Atlantic Voyager', 32, 'days', 5),
  
  -- Smart-Up - Track It. Use It. Own It.
  ('overall-utilisation', 'Rachel Green', 'MV Ocean Pioneer', 28, 'days', 1),
  ('overall-utilisation', 'Mark Thompson', 'SS Maritime Star', 25, 'days', 2),
  ('overall-utilisation', 'Olivia Johnson', 'MV Sea Guardian', 22, 'days', 3),
  ('overall-utilisation', 'Daniel Lee', 'SS Blue Horizon', 20, 'days', 4),
  ('overall-utilisation', 'Grace Liu', 'MV Atlantic Voyager', 18, 'days', 5),
  
  -- Heartbeat of the Sea - Reduce Your Resting Heart Rate
  ('heart-rate', 'Michael Foster', 'MV Ocean Pioneer', 35, 'days', 1),
  ('heart-rate', 'Jennifer Davis', 'SS Maritime Star', 32, 'days', 2),
  ('heart-rate', 'Steven Wang', 'MV Sea Guardian', 28, 'days', 3),
  ('heart-rate', 'Nicole Adams', 'SS Blue Horizon', 25, 'days', 4),
  ('heart-rate', 'Jason Miller', 'MV Atlantic Voyager', 22, 'days', 5),
  
  -- Sizzling Seas - Stop, Cool, Continue
  ('heat-stress', 'Amanda Wilson', 'MV Ocean Pioneer', 95.5, 'percentage', 1),
  ('heat-stress', 'Brian Chen', 'SS Maritime Star', 92.3, 'percentage', 2),
  ('heat-stress', 'Carmen Rodriguez', 'MV Sea Guardian', 89.7, 'percentage', 3),
  ('heat-stress', 'Derek Johnson', 'SS Blue Horizon', 87.2, 'percentage', 4),
  ('heat-stress', 'Elena Garcia', 'MV Atlantic Voyager', 84.8, 'percentage', 5);

-- Insert sample vessel leaderboard data
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
  -- Put a Ring on Me - Vessel Compliance Rate
  ('geofence', 'MV Ocean Pioneer', 98.5, 'percentage', 1),
  ('geofence', 'SS Maritime Star', 96.8, 'percentage', 2),
  ('geofence', 'MV Sea Guardian', 94.2, 'percentage', 3),
  ('geofence', 'SS Blue Horizon', 91.7, 'percentage', 4),
  ('geofence', 'MV Atlantic Voyager', 89.3, 'percentage', 5),
  
  -- Walk the Deck - Average Steps per Crew
  ('steps-count', 'MV Ocean Pioneer', 8450, 'steps', 1),
  ('steps-count', 'SS Maritime Star', 7920, 'steps', 2),
  ('steps-count', 'MV Sea Guardian', 7380, 'steps', 3),
  ('steps-count', 'SS Blue Horizon', 6850, 'steps', 4),
  ('steps-count', 'MV Atlantic Voyager', 6320, 'steps', 5),
  
  -- Smart-Up - Average Usage per Crew
  ('overall-utilisation', 'MV Ocean Pioneer', 7.8, 'hours', 1),
  ('overall-utilisation', 'SS Maritime Star', 7.2, 'hours', 2),
  ('overall-utilisation', 'MV Sea Guardian', 6.9, 'hours', 3),
  ('overall-utilisation', 'SS Blue Horizon', 6.5, 'hours', 4),
  ('overall-utilisation', 'MV Atlantic Voyager', 6.1, 'hours', 5),
  
  -- Heartbeat of the Sea - % Crew Within Threshold
  ('heart-rate', 'MV Ocean Pioneer', 87.5, 'percentage', 1),
  ('heart-rate', 'SS Maritime Star', 84.2, 'percentage', 2),
  ('heart-rate', 'MV Sea Guardian', 81.8, 'percentage', 3),
  ('heart-rate', 'SS Blue Horizon', 78.9, 'percentage', 4),
  ('heart-rate', 'MV Atlantic Voyager', 75.6, 'percentage', 5),
  
  -- Sizzling Seas - % Cooldown Actions
  ('heat-stress', 'MV Ocean Pioneer', 92.3, 'percentage', 1),
  ('heat-stress', 'SS Maritime Star', 89.7, 'percentage', 2),
  ('heat-stress', 'MV Sea Guardian', 86.4, 'percentage', 3),
  ('heat-stress', 'SS Blue Horizon', 83.8, 'percentage', 4),
  ('heat-stress', 'MV Atlantic Voyager', 80.5, 'percentage', 5);