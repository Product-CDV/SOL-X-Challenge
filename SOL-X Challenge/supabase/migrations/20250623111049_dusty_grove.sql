/*
  # Update Heartbeat of the Ocean Challenge Colors

  1. Changes
    - Update gradient to use pink/rose color scheme
    - This will affect both the icon background and button colors
    - Creates cohesive pink/rose theme for cardiovascular health

  2. Design Impact
    - Icon background: Pink/rose gradient
    - View Details button: Pink/rose gradient
    - Consistent color theme throughout the challenge
*/

UPDATE challenges 
SET gradient = 'from-pink-500 to-rose-500'
WHERE id = 'heartbeat-of-the-ocean';