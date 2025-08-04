/*
  # Seed Initial Challenge Data

  1. Insert Challenges
    - All 6 SOL-X challenges with their details
  
  2. Insert Prizes
    - Prize tiers for each challenge
  
  3. Insert Participants
    - Sample leaderboard data for each challenge
*/

-- Insert challenges
INSERT INTO challenges (id, name, description, category, icon, gradient) VALUES
('geofence', 'Put a Ring on Me', 'Geofence Challenge - Stay within designated areas and earn points for location-based activities', 'Geofence', 'MapPin', 'from-purple-600 to-pink-600'),
('user-experience', 'SOL-X Hero', 'Experience Sharing Challenge - Share your best SOL-X system usage story! Submit entries describing how SOL-X has improved your daily work experience, helped avert incidents, reduced damage impact, or improved work efficiency. Winners judged by HR Sea for highest impact stories.', 'Experience Sharing Competition', 'Award', 'from-blue-600 to-cyan-600'),
('steps-count', 'Walk the Deck', 'Vessel Activity Challenge - The most active vessel wins! Cumulative step count of all crew members over 2 months, including work and rest periods. Captains champion crew wellness and active lifestyle management.', 'Vessel Activity Competition', 'Ship', 'from-green-600 to-emerald-600'),
('overall-utilisation', 'Smart-up', 'Overall Utilisation Challenge - Maximize your platform engagement and smart features usage', 'Overall Utilisation', 'Brain', 'from-orange-600 to-red-600'),
('heart-rate', 'Heartbeat of the Sea', 'Resting Heart Rate Challenge - Maintain optimal heart health through monitoring and exercise', 'Resting Heart Rate', 'Heart', 'from-red-600 to-rose-600'),
('heat-stress', 'Sizzling Seas', 'Heat Stress Challenge - Monitor and manage heat exposure for optimal health and safety', 'Heat Stress', 'Thermometer', 'from-yellow-600 to-orange-600');

-- Insert prizes for geofence challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('geofence', 1, '65 inch TV Screen', 'Premium large screen TV for the ultimate viewing experience', '$1,500+'),
('geofence', 2, 'Telehealth Kit & 6 Month Subscription', 'Complete telehealth solution with professional consultation services', '$800+'),
('geofence', 3, '6 Months Swastha Mental Wellness Counselling', 'Professional mental health support and counselling services', '$600+');

-- Insert prizes for user-experience challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('user-experience', 1, 'Samsung Smartwatch + Story Recognition', 'Latest Samsung Galaxy Watch with advanced health monitoring. Winner announced with story broadcast as crew lesson learned.', '$400+'),
('user-experience', 2, 'Xiaomi Smartwatch + Story Sharing', 'Feature-rich Xiaomi smartwatch with fitness tracking. High-impact story shared with crew for learning.', '$200+'),
('user-experience', 3, 'OnePlus Smartwatch + Recognition', 'Stylish OnePlus smartwatch with comprehensive health features. Story recognized for SOL-X system effectiveness.', '$150+');

-- Insert prizes for steps-count challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('steps-count', 1, 'Monthly Karaoke Machine Prize', 'Professional karaoke system awarded to the winning vessel each month. Captain and crew recognized for promoting active lifestyle.', '$500+ per month'),
('steps-count', 2, 'Monthly Premium Music Speakers', 'High-quality speakers for the second most active vessel each month. Crew wellness achievement recognition.', '$300+ per month'),
('steps-count', 3, 'Monthly Acoustic Guitar', 'Beautiful acoustic guitar for the third most active vessel each month. Promoting crew recreation and wellness.', '$200+ per month');

-- Insert prizes for overall-utilisation challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('overall-utilisation', 1, 'Nintendo Switch 2', 'Latest Nintendo gaming console with exclusive games', '$400+'),
('overall-utilisation', 2, 'Telehealth Kit & 6 Month Subscription', 'Complete telehealth solution with professional consultation services', '$800+'),
('overall-utilisation', 3, '6 Months Swastha Mental Wellness Counselling', 'Professional mental health support and counselling services', '$600+');

-- Insert prizes for heart-rate challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('heart-rate', 1, 'Xbox Gaming Console', 'Latest Xbox console with premium gaming experience', '$500+'),
('heart-rate', 2, 'Telehealth Kit & 6 Month Subscription', 'Complete telehealth solution with professional consultation services', '$800+'),
('heart-rate', 3, '6 Months Swastha Mental Wellness Counselling', 'Professional mental health support and counselling services', '$600+');

-- Insert prizes for heat-stress challenge
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('heat-stress', 1, 'Xbox Gaming Console', 'Latest Xbox console with premium gaming experience', '$500+'),
('heat-stress', 2, 'Telehealth Kit & 6 Month Subscription', 'Complete telehealth solution with professional consultation services', '$800+'),
('heat-stress', 3, '6 Months Swastha Mental Wellness Counselling', 'Professional mental health support and counselling services', '$600+');

-- Insert participants for geofence challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('geofence', 'Alex Chen', '🏆', 2840, 1, 'gold'),
('geofence', 'Sarah Johnson', '🥈', 2720, 2, 'silver'),
('geofence', 'Mike Rodriguez', '🥉', 2650, 3, 'bronze'),
('geofence', 'Emma Davis', '👤', 2580, 4, null),
('geofence', 'James Wilson', '👤', 2510, 5, null);

-- Insert participants for user-experience challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('user-experience', 'Chief Engineer Lisa Park', '🏆', 98, 1, 'gold'),
('user-experience', 'Navigation Officer David Kim', '🥈', 95, 2, 'silver'),
('user-experience', 'Safety Officer Maria Garcia', '🥉', 92, 3, 'bronze'),
('user-experience', 'Deck Officer Chris Lee', '👤', 89, 4, null),
('user-experience', 'Engineer Anna Brown', '👤', 87, 5, null);

-- Insert participants for steps-count challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('steps-count', 'MV Ocean Pioneer - Capt. Anderson', '🚢', 2847650, 1, 'gold'),
('steps-count', 'SS Maritime Star - Capt. Martinez', '⚓', 2654320, 2, 'silver'),
('steps-count', 'MV Sea Guardian - Capt. Taylor', '🛳️', 2489750, 3, 'bronze'),
('steps-count', 'SS Blue Horizon - Capt. White', '🚢', 2298640, 4, null),
('steps-count', 'MV Atlantic Voyager - Capt. Zhang', '⚓', 2156890, 5, null);

-- Insert participants for overall-utilisation challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('overall-utilisation', 'Rachel Green', '🏆', 4250, 1, 'gold'),
('overall-utilisation', 'Mark Thompson', '🥈', 4120, 2, 'silver'),
('overall-utilisation', 'Olivia Johnson', '🥉', 3980, 3, 'bronze'),
('overall-utilisation', 'Daniel Lee', '👤', 3820, 4, null),
('overall-utilisation', 'Grace Liu', '👤', 3740, 5, null);

-- Insert participants for heart-rate challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('heart-rate', 'Michael Foster', '🏆', 920, 1, 'gold'),
('heart-rate', 'Jennifer Davis', '🥈', 895, 2, 'silver'),
('heart-rate', 'Steven Wang', '🥉', 870, 3, 'bronze'),
('heart-rate', 'Nicole Adams', '👤', 845, 4, null),
('heart-rate', 'Jason Miller', '👤', 820, 5, null);

-- Insert participants for heat-stress challenge
INSERT INTO participants (challenge_id, name, avatar, score, rank, badge) VALUES
('heat-stress', 'Amanda Wilson', '🏆', 1580, 1, 'gold'),
('heat-stress', 'Brian Chen', '🥈', 1520, 2, 'silver'),
('heat-stress', 'Carmen Rodriguez', '🥉', 1480, 3, 'bronze'),
('heat-stress', 'Derek Johnson', '👤', 1440, 4, null),
('heat-stress', 'Elena Garcia', '👤', 1390, 5, null);