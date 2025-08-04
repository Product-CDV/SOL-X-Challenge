import { Challenge, LeaderboardEntry } from '../types';

export const challenges: Challenge[] = [
  {
    id: 'geofence',
    name: 'Put a Ring on Me',
    description: 'Safe Zones, Smart Moves - Geofence Challenge. Stay within designated areas and earn points for location-based activities. Crew leaderboard tracks net breaches, vessel leaderboard shows compliance rates.',
    category: 'Geofence',
    icon: 'MapPin',
    gradient: 'from-purple-600 to-pink-600',
    prizes: [
      {
        position: 1,
        title: '65 inch TV Screen',
        description: 'Premium large screen TV for the ultimate viewing experience',
        value: '$1,500+'
      },
      {
        position: 2,
        title: 'Telehealth Kit & 6 Month Subscription',
        description: 'Complete telehealth solution with professional consultation services',
        value: '$800+'
      },
      {
        position: 3,
        title: '6 Months Swastha Mental Wellness Counselling',
        description: 'Professional mental health support and counselling services',
        value: '$600+'
      }
    ]
  },
  {
    id: 'user-experience',
    name: 'SOL-X Hero',
    description: 'Storytelling Recognition - Share your best SOL-X system usage story! Submit entries describing how SOL-X has improved your daily work experience, helped avert incidents, reduced damage impact, or improved work efficiency. Winners judged by HR Sea for highest impact stories.',
    category: 'Experience Sharing Competition',
    icon: 'Award',
    gradient: 'from-blue-600 to-cyan-600',
    prizes: [
      {
        position: 1,
        title: 'Samsung Smartwatch + Story Recognition',
        description: 'Latest Samsung Galaxy Watch with advanced health monitoring. Winner announced with story broadcast as crew lesson learned.',
        value: '$400+'
      },
      {
        position: 2,
        title: 'Xiaomi Smartwatch + Story Sharing',
        description: 'Feature-rich Xiaomi smartwatch with fitness tracking. High-impact story shared with crew for learning.',
        value: '$200+'
      },
      {
        position: 3,
        title: 'OnePlus Smartwatch + Recognition',
        description: 'Stylish OnePlus smartwatch with comprehensive health features. Story recognized for SOL-X system effectiveness.',
        value: '$150+'
      }
    ]
  },
  {
    id: 'steps-count',
    name: 'Walk the Deck',
    description: 'My Every Step Counts - Vessel Activity Challenge. Crew leaderboard tracks longest streak of days with ≥6,000 steps. Vessel leaderboard shows average steps per crew member.',
    category: 'Vessel Activity Competition',
    icon: 'Ship',
    gradient: 'from-green-600 to-emerald-600',
    prizes: [
      {
        position: 1,
        title: 'Monthly Karaoke Machine Prize',
        description: 'Professional karaoke system awarded to the winning vessel each month. Captain and crew recognized for promoting active lifestyle.',
        value: '$500+ per month'
      },
      {
        position: 2,
        title: 'Monthly Premium Music Speakers',
        description: 'High-quality speakers for the second most active vessel each month. Crew wellness achievement recognition.',
        value: '$300+ per month'
      },
      {
        position: 3,
        title: 'Monthly Acoustic Guitar',
        description: 'Beautiful acoustic guitar for the third most active vessel each month. Promoting crew recreation and wellness.',
        value: '$200+ per month'
      }
    ]
  },
  {
    id: 'heart-rate',
    name: 'Heartbeat of the Sea',
    description: 'Reduce Your Resting Heart Rate - Heart Rate Challenge. Crew leaderboard tracks longest healthy streak (RHR ≤ +10 bpm). Vessel leaderboard shows percentage of crew within threshold.',
    category: 'Resting Heart Rate',
    icon: 'Heart',
    gradient: 'from-red-600 to-rose-600',
    prizes: [
      {
        position: 1,
        title: 'Xbox Gaming Console',
        description: 'Latest Xbox console with premium gaming experience',
        value: '$500+'
      },
      {
        position: 2,
        title: 'Telehealth Kit & 6 Month Subscription',
        description: 'Complete telehealth solution with professional consultation services',
        value: '$800+'
      },
      {
        position: 3,
        title: '6 Months Swastha Mental Wellness Counselling',
        description: 'Professional mental health support and counselling services',
        value: '$600+'
      }
    ]
  },
  {
    id: 'heat-stress',
    name: 'Sizzling Seas',
    description: 'Stop, Cool, Continue - Heat Stress Challenge. Crew leaderboard tracks cooldown rate percentage. Vessel leaderboard shows percentage of cooldown actions taken.',
    category: 'Heat Stress',
    icon: 'Thermometer',
    gradient: 'from-yellow-600 to-orange-600',
    prizes: [
      {
        position: 1,
        title: 'Xbox Gaming Console',
        description: 'Latest Xbox console with premium gaming experience',
        value: '$500+'
      },
      {
        position: 2,
        title: 'Telehealth Kit & 6 Month Subscription',
        description: 'Complete telehealth solution with professional consultation services',
        value: '$800+'
      },
      {
        position: 3,
        title: '6 Months Swastha Mental Wellness Counselling',
        description: 'Professional mental health support and counselling services',
        value: '$600+'
      }
    ]
  },
  {
    id: 'smartwatch-utilisation',
    name: 'Smartwatch Utilisation',
    description: 'Bi-monthly vessel smartwatch utilisation tracking. Vessels achieving above 90% average utilisation will receive cash vouchers from SOL-X. Challenge runs for 6 months with 3 separate bi-monthly rounds. Leaderboard shows all 65 vessels with their respective average utilisation percentage for each period.',
    category: 'Vessel Utilisation Competition',
    icon: 'Watch',
    gradient: 'from-indigo-600 to-purple-600',
    start_date: '2025-08-01',
    end_date: '2026-01-31',
    prizes: [
      {
        position: 1,
        title: 'SOL-X Cash Vouchers',
        description: 'Cash vouchers awarded to all vessels achieving above 90% average smartwatch utilisation during the bi-monthly period. Vouchers can be used for SOL-X services and products.',
        value: 'Variable based on utilisation'
      },
      {
        position: 2,
        title: 'Recognition Certificate',
        description: 'Digital recognition certificate for vessels demonstrating excellent smartwatch adoption and consistent usage patterns.',
        value: 'Digital Certificate'
      },
      {
        position: 3,
        title: 'Performance Analytics Report',
        description: 'Detailed analytics report showing vessel utilisation trends, crew engagement metrics, and recommendations for improvement.',
        value: 'Comprehensive Report'
      }
    ]
  }
];

// Mock leaderboard data - this is now handled by the database
export const leaderboardData: LeaderboardEntry[] = [];