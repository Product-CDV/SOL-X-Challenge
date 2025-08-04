/*
  # Add challenge dates to challenges table

  1. Schema Changes
    - Add `start_date` column to challenges table
    - Add `end_date` column to challenges table
    - Update existing challenges with their respective dates

  2. Challenge Dates
    - Walk the Deck: Sept 1 to Sept 30
    - SOL-X Hero: Aug 1 to Aug 30
    - Put a Ring on Me: Aug 1 to Aug 30
    - Sizzling Seas: Oct 1 to Oct 30
    - Heartbeat of the Ocean: Oct 1 to Nov 30
*/

-- Add date columns to challenges table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'challenges' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE challenges ADD COLUMN start_date date;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'challenges' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE challenges ADD COLUMN end_date date;
  END IF;
END $$;

-- Update challenges with their respective dates
UPDATE challenges SET 
  start_date = '2024-09-01',
  end_date = '2024-09-30'
WHERE id = 'walk-the-deck-vessel';

UPDATE challenges SET 
  start_date = '2024-08-01',
  end_date = '2024-08-30'
WHERE id = 'sol-x-hero';

UPDATE challenges SET 
  start_date = '2024-08-01',
  end_date = '2024-08-30'
WHERE id = 'put-a-ring-on-me';

UPDATE challenges SET 
  start_date = '2024-10-01',
  end_date = '2024-10-30'
WHERE id = 'sizzling-seas';

UPDATE challenges SET 
  start_date = '2024-10-01',
  end_date = '2024-11-30'
WHERE id = 'heartbeat-of-the-ocean';

-- Also update the crew version of walk the deck
UPDATE challenges SET 
  start_date = '2024-09-01',
  end_date = '2024-09-30'
WHERE id = 'walk-the-deck-crew';