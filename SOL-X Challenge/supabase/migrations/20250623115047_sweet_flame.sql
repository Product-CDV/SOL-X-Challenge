/*
  # Allow anonymous story submissions

  1. Security Changes
    - Add policy to allow anonymous users to insert stories
    - Maintain existing policies for authenticated users and public read access
    - Stories submitted by anonymous users will still be unpublished by default for moderation

  This allows the story submission form to work for unauthenticated users while maintaining
  security by keeping submitted stories unpublished until manually approved.
*/

-- Add policy to allow anonymous users to insert stories
CREATE POLICY "Allow anonymous users to submit stories"
  ON stories
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Allow insert but ensure stories are unpublished by default
    published = false
  );