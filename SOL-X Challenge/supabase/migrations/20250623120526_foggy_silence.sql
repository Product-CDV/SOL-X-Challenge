/*
  # Fix RLS policy for story_feature_tags table

  1. Security Updates
    - Add policy to allow anonymous users to insert story feature tags
    - This aligns with the existing policy that allows anonymous users to submit stories
    - Maintains security by only allowing inserts, not updates or deletes

  2. Changes
    - Add INSERT policy for anonymous (anon) role on story_feature_tags table
    - This allows users to tag their story submissions with features
*/

-- Allow anonymous users to insert story feature tags when submitting stories
CREATE POLICY "Anonymous users can add feature tags to stories"
  ON story_feature_tags
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow public role (covers both anon and authenticated users)
CREATE POLICY "Public users can add feature tags to stories"
  ON story_feature_tags
  FOR INSERT
  TO public
  WITH CHECK (true);