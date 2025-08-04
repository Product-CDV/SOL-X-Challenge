/*
  # Add Sample Leaderboard Data

  1. Sample Data
    - Add crew leaderboard entries for all challenges
    - Add vessel leaderboard entries for all challenges
    - Ensure top 5 entries are visible for each challenge type

  2. Data Structure
    - Crew leaderboards with realistic names and vessels
    - Vessel leaderboards with maritime vessel names
    - Proper ranking and metric values for each challenge
*/

-- Clear existing leaderboard data
DELETE FROM crew_leaderboards;
DELETE FROM vessel_leaderboards;

-- Insert Crew Leaderboard Data

-- Put a Ring on Me (Geofencing) - Crew Data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
('put-a-ring-on-me', 'Captain Sarah Johnson', 'MV Ocean Pioneer', 0, 'breaches', 1),
('put-a-ring-on-me', 'Chief Engineer Mike Chen', 'SS Maritime Star', 1, 'breaches', 2),
('put-a-ring-on-me', 'First Officer Emma Davis', 'MV Sea Guardian', 2, 'breaches', 3),
('put-a-ring-on-me', 'Bosun James Wilson', 'SS Blue Horizon', 3, 'breaches', 4),
('put-a-ring-on-me', 'AB Seaman Lisa Park', 'MV Atlantic Voyager', 4, 'breaches', 5);

-- Walk the Deck (Vessel) - Crew Data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
('walk-the-deck-vessel', 'Deck Officer David Kim', 'Eagle Bintulu', 45, 'days', 1),
('walk-the-deck-vessel', 'Engineer Maria Garcia', 'Eagle Kinabalu', 42, 'days', 2),
('walk-the-deck-vessel', 'Cook Chris Lee', 'MV Pacific Explorer', 38, 'days', 3),
('walk-the-deck-vessel', 'Oiler Anna Brown', 'SS Northern Star', 35, 'days', 4),
('walk-the-deck-vessel', 'Wiper Michael Foster', 'MV Southern Cross', 32, 'days', 5);

-- Walk the Deck (Crew) - Crew Data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
('walk-the-deck-crew', 'Fitness Enthusiast Jennifer Davis', 'MV Ocean Pioneer', 48, 'days', 1),
('walk-the-deck-crew', 'Marathon Runner Steven Wang', 'SS Maritime Star', 46, 'days', 2),
('walk-the-deck-crew', 'Health Advocate Nicole Adams', 'MV Sea Guardian', 44, 'days', 3),
('walk-the-deck-crew', 'Wellness Champion Jason Miller', 'SS Blue Horizon', 41, 'days', 4),
('walk-the-deck-crew', 'Step Counter Amanda Wilson', 'MV Atlantic Voyager', 39, 'days', 5);

-- Sizzling Seas (Heat Stress) - Crew Data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
('sizzling-seas', 'Safety Officer Brian Chen', 'Eagle Bintalu', 98, 'percentage', 1),
('sizzling-seas', 'Heat Safety Expert Carmen Rodriguez', 'Eagle Kinabalu', 96, 'percentage', 2),
('sizzling-seas', 'Wellness Coordinator Derek Johnson', 'MV Pacific Explorer', 94, 'percentage', 3),
('sizzling-seas', 'Health Monitor Elena Garcia', 'SS Northern Star', 92, 'percentage', 4),
('sizzling-seas', 'Safety Champion Robert Taylor', 'MV Southern Cross', 90, 'percentage', 5);

-- Heartbeat of the Ocean - Crew Data
INSERT INTO crew_leaderboards (challenge_id, crew_name, vessel_name, metric_value, metric_unit, rank) VALUES
('heartbeat-of-the-ocean', 'Cardio King Michelle White', 'MV Ocean Pioneer', 42, 'days', 1),
('heartbeat-of-the-ocean', 'Heart Health Hero Kevin Zhang', 'SS Maritime Star', 40, 'days', 2),
('heartbeat-of-the-ocean', 'Wellness Warrior Laura Martinez', 'MV Sea Guardian', 38, 'days', 3),
('heartbeat-of-the-ocean', 'Fitness Guru Daniel Lee', 'SS Blue Horizon', 36, 'days', 4),
('heartbeat-of-the-ocean', 'Health Champion Grace Liu', 'MV Atlantic Voyager', 34, 'days', 5);

-- Insert Vessel Leaderboard Data

-- Put a Ring on Me (Geofencing) - Vessel Data
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
('put-a-ring-on-me', 'MV Ocean Pioneer', 98, 'percentage', 1),
('put-a-ring-on-me', 'SS Maritime Star', 96, 'percentage', 2),
('put-a-ring-on-me', 'MV Sea Guardian', 94, 'percentage', 3),
('put-a-ring-on-me', 'SS Blue Horizon', 92, 'percentage', 4),
('put-a-ring-on-me', 'MV Atlantic Voyager', 90, 'percentage', 5);

-- Walk the Deck (Vessel) - Vessel Data
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
('walk-the-deck-vessel', 'Eagle Bintulu', 8750, 'steps', 1),
('walk-the-deck-vessel', 'Eagle Kinabalu', 8500, 'steps', 2),
('walk-the-deck-vessel', 'MV Pacific Explorer', 8250, 'steps', 3),
('walk-the-deck-vessel', 'SS Northern Star', 8000, 'steps', 4),
('walk-the-deck-vessel', 'MV Southern Cross', 7750, 'steps', 5);

-- Walk the Deck (Crew) - Vessel Data (showing vessel averages)
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
('walk-the-deck-crew', 'MV Ocean Pioneer', 9200, 'steps', 1),
('walk-the-deck-crew', 'SS Maritime Star', 8950, 'steps', 2),
('walk-the-deck-crew', 'MV Sea Guardian', 8700, 'steps', 3),
('walk-the-deck-crew', 'SS Blue Horizon', 8450, 'steps', 4),
('walk-the-deck-crew', 'MV Atlantic Voyager', 8200, 'steps', 5);

-- Sizzling Seas (Heat Stress) - Vessel Data
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
('sizzling-seas', 'Eagle Bintalu', 97, 'percentage', 1),
('sizzling-seas', 'Eagle Kinabalu', 95, 'percentage', 2),
('sizzling-seas', 'MV Pacific Explorer', 93, 'percentage', 3),
('sizzling-seas', 'SS Northern Star', 91, 'percentage', 4),
('sizzling-seas', 'MV Southern Cross', 89, 'percentage', 5);

-- Heartbeat of the Ocean - Vessel Data
INSERT INTO vessel_leaderboards (challenge_id, vessel_name, metric_value, metric_unit, rank) VALUES
('heartbeat-of-the-ocean', 'MV Ocean Pioneer', 94, 'percentage', 1),
('heartbeat-of-the-ocean', 'SS Maritime Star', 92, 'percentage', 2),
('heartbeat-of-the-ocean', 'MV Sea Guardian', 90, 'percentage', 3),
('heartbeat-of-the-ocean', 'SS Blue Horizon', 88, 'percentage', 4),
('heartbeat-of-the-ocean', 'MV Atlantic Voyager', 86, 'percentage', 5);