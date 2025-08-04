/*
  # Update Heartbeat of the Ocean Challenge Design

  1. Changes
    - Update icon from 'Heart' to 'HeartPulse' for better visual representation
    - Change gradient from pink/rose to a vibrant red/pink combination
    - Maintains all existing functionality and data
*/

UPDATE challenges 
SET 
  icon = 'HeartPulse',
  gradient = 'from-red-600 to-pink-600'
WHERE id = 'heartbeat-of-the-ocean';