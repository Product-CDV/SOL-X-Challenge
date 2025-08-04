/*
  # Add UNIQUE constraints for leaderboard tables

  1. Constraints Added
    - `vessel_leaderboards`: UNIQUE constraint on (challenge_id, vessel_name)
    - `crew_leaderboards`: UNIQUE constraint on (challenge_id, crew_name)
    - `participants`: UNIQUE constraint on (challenge_id, name)

  2. Purpose
    - Enables proper ON CONFLICT handling in INSERT statements
    - Prevents duplicate entries for same vessel/crew in same challenge
    - Supports upsert operations for leaderboard updates

  3. Impact
    - Fixes ON CONFLICT errors in data insertion
    - Ensures data integrity across leaderboard tables
    - Enables safe data updates without duplicates
*/

-- Add unique constraint for vessel leaderboards
-- Ensures one entry per vessel per challenge
ALTER TABLE vessel_leaderboards
ADD CONSTRAINT unique_vessel_per_challenge UNIQUE (challenge_id, vessel_name);

-- Add unique constraint for crew leaderboards  
-- Ensures one entry per crew member per challenge
ALTER TABLE crew_leaderboards
ADD CONSTRAINT unique_crew_per_challenge UNIQUE (challenge_id, crew_name);

-- Add unique constraint for participants (legacy support)
-- Ensures one entry per participant per challenge
ALTER TABLE participants
ADD CONSTRAINT unique_participant_per_challenge UNIQUE (challenge_id, name);