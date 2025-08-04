export interface Challenge {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  gradient: string;
  start_date?: string;
  end_date?: string;
  prizes: Prize[];
}

export interface Prize {
  position: number;
  title: string;
  description: string;
  value?: string;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  challengeId: string;
  rank: number;
  badge?: string;
}

export interface CrewLeaderboard {
  id: string;
  challenge_id: string;
  crew_name: string;
  vessel_name: string;
  metric_value: number;
  metric_unit: string;
  rank: number;
}

export interface VesselLeaderboard {
  id: string;
  challenge_id: string;
  vessel_name: string;
  metric_value: number;
  metric_unit: string;
  rank: number;
}

export interface LeaderboardEntry {
  challengeId: string;
  challengeName: string;
  participants: Participant[];
  crewLeaderboard: CrewLeaderboard[];
  vesselLeaderboard: VesselLeaderboard[];
}

export interface UserRank {
  id: string;
  name: string;
  display_order: number;
}

export interface Vessel {
  id: string;
  name: string;
  display_order: number;
}

export interface StoryFeature {
  id: string;
  name: string;
  color: string;
  display_order: number;
}

export interface Story {
  id: string;
  user_name: string;
  user_rank_id: string;
  vessel_id: string;
  story: string;
  avatar: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  user_rank?: UserRank;
  vessel?: Vessel;
  features?: StoryFeature[];
}

export interface StorySubmission {
  user_name: string;
  user_rank_id: string;
  vessel_id: string;
  story: string;
  feature_ids: string[];
}