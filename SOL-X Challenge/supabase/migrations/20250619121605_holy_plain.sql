/*
  # Remove Smart-up Challenge from Database

  1. Database Cleanup
    - Remove Smart-up challenge data from all related tables
    - Clean up crew_leaderboards entries
    - Clean up vessel_leaderboards entries
    - Clean up participants entries
    - Clean up prizes entries
    - Remove the challenge itself

  2. Data Integrity
    - Use CASCADE deletes where foreign keys exist
    - Ensure all related data is properly cleaned up
*/

-- Remove all data related to the 'overall-utilisation' challenge
DELETE FROM story_feature_tags WHERE story_id IN (
  SELECT id FROM stories WHERE story LIKE '%Smart-up%' OR story LIKE '%overall-utilisation%'
);

DELETE FROM stories WHERE story LIKE '%Smart-up%' OR story LIKE '%overall-utilisation%';

DELETE FROM crew_leaderboards WHERE challenge_id = 'overall-utilisation';

DELETE FROM vessel_leaderboards WHERE challenge_id = 'overall-utilisation';

DELETE FROM participants WHERE challenge_id = 'overall-utilisation';

DELETE FROM prizes WHERE challenge_id = 'overall-utilisation';

DELETE FROM challenges WHERE id = 'overall-utilisation';