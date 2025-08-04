/*
  # Update SOL-X Story Features

  1. Replace existing story features with new SOL-X specific options
    - Heat Exposure
    - Cold Exposure
    - Heart Rate Monitoring
    - Work - Rest Hours
    - Geofence Alerts
    - Steps tracking
    - Broadcast message
    - Noise Exposure
    - Fall detection
    - Crew Assist

  2. Clear existing feature tags to avoid orphaned references
*/

-- Clear existing feature tags first
DELETE FROM story_feature_tags;

-- Clear existing story features
DELETE FROM story_features;

-- Insert new SOL-X story features
INSERT INTO story_features (id, name, color, display_order) VALUES
  (gen_random_uuid(), 'Heat Exposure', 'red', 1),
  (gen_random_uuid(), 'Cold Exposure', 'blue', 2),
  (gen_random_uuid(), 'Heart Rate Monitoring', 'pink', 3),
  (gen_random_uuid(), 'Work - Rest Hours', 'green', 4),
  (gen_random_uuid(), 'Geofence Alerts', 'purple', 5),
  (gen_random_uuid(), 'Steps tracking', 'teal', 6),
  (gen_random_uuid(), 'Broadcast message', 'indigo', 7),
  (gen_random_uuid(), 'Noise Exposure', 'orange', 8),
  (gen_random_uuid(), 'Fall detection', 'yellow', 9),
  (gen_random_uuid(), 'Crew Assist', 'blue', 10);