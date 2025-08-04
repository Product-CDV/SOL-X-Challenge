/*
  # Update Walk the Deck Challenge Prizes

  1. Updates
    - Clear existing Walk the Deck prizes
    - Add separate Vessel and Crew prize categories
    - Update prize values and descriptions according to specifications

  2. Prize Structure
    - Vessel prizes: Visa/Mastercard gift cards, Amazon vouchers, Disney+ subscription
    - Crew prizes: Apple, Samsung, Huawei gift cards, plus consolation prizes
*/

-- Clear existing Walk the Deck prizes
DELETE FROM prizes WHERE challenge_id IN ('walk-the-deck-vessel', 'walk-the-deck-crew');

-- Insert Vessel Challenge Prizes for Walk the Deck
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('walk-the-deck-vessel', 1, 'Visa/Mastercard Gift Cards', 'Winning vessel crew receives Visa/Mastercard gift cards for flexible spending options and crew wellness activities.', '$2,000'),
('walk-the-deck-vessel', 2, 'Amazon Gift Voucher', 'Runner-up vessel receives Amazon gift vouchers for crew purchases and recreational items.', '$1,000'),
('walk-the-deck-vessel', 3, 'Disney+ Subscription', 'Third place vessel gets Disney+ subscription for family-friendly entertainment during downtime.', '$500');

-- Insert Crew Challenge Prizes for Walk the Deck
INSERT INTO prizes (challenge_id, position, title, description, value) VALUES
('walk-the-deck-crew', 1, 'Apple Gift Card', 'Top individual step counter receives Apple gift card for tech purchases, apps, and accessories.', '$1,000'),
('walk-the-deck-crew', 2, 'Samsung Gift Card', 'Second place individual gets Samsung gift card for electronics, smartphones, and accessories.', '$1,000'),
('walk-the-deck-crew', 3, 'Huawei Gift Cards', 'Third place individual receives Huawei gift cards for mobile devices and tech accessories.', '$500'),
('walk-the-deck-crew', 4, 'SIM Card International Roaming + Data', 'Consolation prize for 4th place: International SIM card with roaming and data for global connectivity.', '$100'),
('walk-the-deck-crew', 5, 'SIM Card International Roaming + Data', 'Consolation prize for 5th place: International SIM card with roaming and data for global connectivity.', '$100'),
('walk-the-deck-crew', 6, 'SIM Card International Roaming + Data', 'Consolation prize for 6th place: International SIM card with roaming and data for global connectivity.', '$100'),
('walk-the-deck-crew', 7, 'SIM Card International Roaming + Data', 'Consolation prize for 7th place: International SIM card with roaming and data for global connectivity.', '$100'),
('walk-the-deck-crew', 8, 'SIM Card International Roaming + Data', 'Consolation prize for 8th place: International SIM card with roaming and data for global connectivity.', '$100');