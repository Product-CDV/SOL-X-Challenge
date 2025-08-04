/*
  # Update SOL-X Challenge Data with MISC Campaign Information

  1. Updates
    - Clear existing challenge and prize data
    - Add vessel challenges: Put a Ring on Me, Walk the Deck, Sizzling Seas, Heartbeat of the Ocean
    - Add crew challenges: SOL-X Hero, Walk The Deck
    - Add corresponding prizes for each challenge based on campaign document

  2. Security
    - Maintains existing RLS policies
*/

-- Clear existing data
DELETE FROM story_feature_tags;
DELETE FROM prizes;
DELETE FROM participants;
DELETE FROM crew_leaderboards;
DELETE FROM vessel_leaderboards;
DELETE FROM challenges;

-- Insert Vessel Challenges
INSERT INTO challenges (id, name, description, category, icon, gradient) VALUES
('put-a-ring-on-me', 'Put a Ring on Me', 'Stay within designated safe zones and maintain compliance with geofencing boundaries. This challenge promotes maritime safety by encouraging crews to respect operational boundaries and safe navigation zones.', 'Vessel Challenge', 'MapPin', 'from-blue-600 to-purple-600'),
('walk-the-deck-vessel', 'Walk the Deck', 'Vessel-wide step counting challenge where all crew members contribute to the total step count. Promotes physical activity and wellness across the entire vessel crew during both work and rest periods.', 'Vessel Challenge', 'Footprints', 'from-green-600 to-teal-600'),
('sizzling-seas', 'Sizzling Seas', 'Monitor and manage heat stress exposure across the vessel. This challenge focuses on crew safety in high-temperature environments and promotes proper heat stress management protocols.', 'Vessel Challenge', 'Thermometer', 'from-red-600 to-orange-600'),
('heartbeat-of-the-ocean', 'Heartbeat of the Ocean', 'Vessel-wide heart rate monitoring challenge focusing on maintaining healthy resting heart rates across the crew. Promotes cardiovascular wellness and stress management.', 'Vessel Challenge', 'Heart', 'from-pink-600 to-rose-600');

-- Insert Crew Challenges
INSERT INTO challenges (id, name, description, category, icon, gradient) VALUES
('sol-x-hero', 'SOL-X Hero', 'Share your experience with SOL-X technology and how it has improved your daily work experience, prevented incidents, or enhanced safety. Winners are judged by HR Sea for highest impact stories.', 'Crew Challenge', 'Award', 'from-purple-600 to-indigo-600'),
('walk-the-deck-crew', 'Walk The Deck', 'Individual crew member step counting challenge. Track your daily steps and maintain an active lifestyle while working at sea. Promotes personal fitness and wellness.', 'Crew Challenge', 'Activity', 'from-cyan-600 to-blue-600');

-- Insert Vessel Challenge Prizes
-- Put a Ring on Me
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('put-a-ring-on-me', 1, 'Amazon Gift Voucher', 'Top performing vessel in geofencing compliance receives a substantial Amazon gift voucher for the crew to share.', '$2,000'),
('put-a-ring-on-me', 2, 'Amazon Gift Voucher', 'Second place vessel receives an Amazon gift voucher for crew purchases and entertainment.', '$1,000'),
('put-a-ring-on-me', 3, 'Netflix Subscription', 'Third place vessel receives a Netflix subscription for crew entertainment during downtime.', '$500');

-- Walk the Deck (Vessel)
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('walk-the-deck-vessel', 1, 'Visa/Mastercard Gift Cards', 'Winning vessel crew receives Visa/Mastercard gift cards for flexible spending options.', '$2,000'),
('walk-the-deck-vessel', 2, 'Amazon Gift Voucher', 'Runner-up vessel receives Amazon gift vouchers for crew purchases.', '$1,000'),
('walk-the-deck-vessel', 3, 'Disney+ Subscription', 'Third place vessel gets Disney+ subscription for family-friendly entertainment.', '$500');

-- Sizzling Seas
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('sizzling-seas', 1, 'Amazon Gift Voucher', 'Best heat stress management vessel receives Amazon gift vouchers for crew wellness purchases.', '$2,000'),
('sizzling-seas', 2, 'Amazon Gift Voucher', 'Second place in heat stress management gets Amazon gift vouchers.', '$1,000'),
('sizzling-seas', 3, 'Netflix Subscription', 'Third place vessel receives Netflix subscription for crew relaxation.', '$500');

-- Heartbeat of the Ocean
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('heartbeat-of-the-ocean', 1, 'Visa/Mastercard Gift Cards', 'Top vessel in heart rate wellness receives Visa/Mastercard gift cards for crew health and wellness.', '$2,000'),
('heartbeat-of-the-ocean', 2, 'Amazon Gift Voucher', 'Second place vessel gets Amazon gift vouchers for health-related purchases.', '$1,000'),
('heartbeat-of-the-ocean', 3, 'Amazon Prime Subscription', 'Third place vessel receives Amazon Prime subscription for convenient shopping and entertainment.', '$500');

-- Insert Crew Challenge Prizes
-- SOL-X Hero
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('sol-x-hero', 1, 'Booking.com Vouchers', 'Winner of the storytelling challenge receives Booking.com vouchers for travel and accommodation.', '$1,000'),
('sol-x-hero', 2, 'Airbnb Vouchers', 'Second place storyteller gets Airbnb vouchers for unique travel experiences.', '$750'),
('sol-x-hero', 3, 'SIM Card International Roaming + Data', 'Third place receives international SIM card with roaming and data for global connectivity.', '$500'),
('sol-x-hero', 4, 'Airport Lounge Access', 'Consolation prize: Airport lounge access for comfortable travel experiences.', '$100'),
('sol-x-hero', 5, 'SIM Card International Roaming + Data', 'Additional consolation prize: International SIM card with roaming and data.', '$100');

-- Walk The Deck (Crew)
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('walk-the-deck-crew', 1, 'Apple Gift Card', 'Top individual step counter receives Apple gift card for tech purchases and apps.', '$1,000'),
('walk-the-deck-crew', 2, 'Samsung Gift Card', 'Second place individual gets Samsung gift card for electronics and accessories.', '$750'),
('walk-the-deck-crew', 3, 'Huawei Gift Cards', 'Third place individual receives Huawei gift cards for mobile devices and accessories.', '$500'),
('walk-the-deck-crew', 4, 'Airport Lounge Access', 'Consolation prize: Airport lounge access for travel comfort.', '$100'),
('walk-the-deck-crew', 5, 'SIM Card International Roaming + Data', 'Additional consolation prize: International SIM card with roaming and data.', '$100');