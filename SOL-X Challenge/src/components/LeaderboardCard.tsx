import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Challenge, LeaderboardEntry } from '../types';
import { Trophy, Medal, Award, Users, Ship, Gift, ArrowRight, Clock } from 'lucide-react';

interface LeaderboardCardProps {
  challenge: Challenge;
  leaderboardEntry: LeaderboardEntry;
  onViewPrizes: (challenge: Challenge) => void;
  onViewFullLeaderboard: (type: 'crew' | 'vessel', challengeId: string) => void;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ 
  challenge, 
  leaderboardEntry, 
  onViewPrizes,
  onViewFullLeaderboard 
}) => {
  const [activeTab, setActiveTab] = useState<'crew' | 'vessel'>('crew');
  const IconComponent = (LucideIcons as any)[challenge.icon] || LucideIcons.Star;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />;
      case 3:
        return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />;
      default:
        return <span className="h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/25';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 shadow-lg shadow-gray-400/25';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 shadow-lg shadow-amber-500/25';
      default:
        return 'bg-gray-700 shadow-md shadow-black/25';
    }
  };

  const formatMetricValue = (value: number, unit: string, challengeId: string) => {
    if (unit === 'percentage') {
      return `${value}%`;
    }
    if (unit === 'breaches') {
      return `${value} ${value === 1 ? 'breach' : 'breaches'}`;
    }
    if (unit === 'days') {
      if (challengeId === 'steps-count') {
        return `${value} days ≥6K steps`;
      }
      if (challengeId === 'heart-rate') {
        return `${value} days healthy RHR`;
      }
      return `${value} days`;
    }
    if (unit === 'steps') {
      return `${value.toLocaleString()}`;
    }
    if (unit === 'hours') {
      return `${value}hrs avg usage`;
    }
    return `${value} ${unit}`;
  };

  const getChallengeSubtitle = (challengeId: string) => {
    switch (challengeId) {
      case 'geofence':
        return 'Safe Zones, Smart Moves';
      case 'steps-count':
        return 'My Every Step Counts';
      case 'heart-rate':
        return 'Reduce Your Resting Heart Rate';
      case 'heat-stress':
        return 'Stop, Cool, Continue';
      case 'smartwatch-utilisation':
        return 'Bi-monthly Vessel Utilisation Tracking';
      case 'user-experience':
        return 'Storytelling Recognition';
      default:
        return challenge.category;
    }
  };

  const getCrewMetricLabel = (challengeId: string) => {
    switch (challengeId) {
      case 'geofence':
        return 'Net Breaches';
      case 'steps-count':
        return 'Longest Streak (Days ≥ 6,000 steps)';
      case 'heart-rate':
        return 'Longest Healthy Streak (RHR ≤ +10 bpm)';
      case 'heat-stress':
        return 'Reaction to heat stress (%)';
      case 'smartwatch-utilisation':
        return 'Average Utilisation (%)';
      default:
        return 'Score';
    }
  };

  const getVesselMetricLabel = (challengeId: string) => {
    switch (challengeId) {
      case 'geofence':
        return 'Compliance Rate (%)';
      case 'steps-count':
        return 'Avg Steps per Crew';
      case 'heart-rate':
        return '% Crew Within Threshold';
      case 'heat-stress':
        return 'Reaction to heat stress (%)';
      case 'smartwatch-utilisation':
        return 'Average Utilisation (%)';
      default:
        return 'Score';
    }
  };

  // Skip rendering for SOL-X Hero challenge (stories-only challenge)
  if (challenge.id === 'user-experience') {
    return null;
  }

  // Get the first prize for display
  const firstPrize = challenge.prizes.find(prize => prize.position === 1);

  // Determine which leaderboards to show based on challenge
  const vesselOnlyChallenges = ['geofence', 'heat-stress', 'heart-rate', 'smartwatch-utilisation'];
  const isVesselOnly = vesselOnlyChallenges.includes(challenge.id);
  
  // Ensure we have data for both crew and vessel leaderboards
  const hasCrewData = leaderboardEntry.crewLeaderboard && leaderboardEntry.crewLeaderboard.length > 0;
  const hasVesselData = leaderboardEntry.vesselLeaderboard && leaderboardEntry.vesselLeaderboard.length > 0;

  // For vessel-only challenges, force vessel tab and hide crew data
  // For Walk the Deck vessel, show both tabs
  const showCrewTab = !isVesselOnly && hasCrewData;
  const showVesselTab = hasVesselData;
  const effectiveActiveTab = isVesselOnly ? 'vessel' : activeTab;

  // Check if we should show the "View Top X" button
  const shouldShowViewMoreButton = (type: 'crew' | 'vessel') => {
    if (type === 'crew') {
      return leaderboardEntry.crewLeaderboard.length > 5;
    } else {
      return leaderboardEntry.vesselLeaderboard.length > 5;
    }
  };

  // Empty state component
  const EmptyStateMessage = ({ type }: { type: 'crew' | 'vessel' }) => (
    <div className="text-center py-8 px-4">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-300 text-sm sm:text-base font-medium">
          The leaderboard will be visible once the data is processed
        </p>
      </div>
    </div>
  );

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${challenge.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative p-4 sm:p-6 lg:p-8">
        {/* Challenge Header */}
        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div className={`bg-gradient-to-br ${challenge.gradient} p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg shadow-black/25 flex-shrink-0`}>
              <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">{challenge.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1">{getChallengeSubtitle(challenge.id)}</p>
              {firstPrize && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-yellow-300 font-medium">
                    Stand a chance to win {firstPrize.title}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => onViewPrizes(challenge)}
            className={`px-3 sm:px-4 py-2 bg-gradient-to-r ${challenge.gradient} text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-current/25 transition-all duration-200 hover:transform hover:scale-105 flex-shrink-0 w-full sm:w-auto shadow-md`}
          >
            View Details
          </button>
        </div>

        {/* Tab Navigation - Show only if both crew and vessel data exist and not vessel-only */}
        {showCrewTab && showVesselTab && (
          <div className="flex items-center space-x-1 mb-4 sm:mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('crew')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'crew'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Crew Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('vessel')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'vessel'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Ship className="h-4 w-4" />
              <span>Vessel Leaderboard</span>
            </button>
          </div>
        )}

        {/* Leaderboard Content */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">
              {effectiveActiveTab === 'crew' && showCrewTab ? 'Top 5 Crew Members' : 'Top 5 Vessels'}
            </h4>
            <span className="text-xs sm:text-sm text-gray-400">
              {effectiveActiveTab === 'crew'
                ? getCrewMetricLabel(challenge.id)
                : getVesselMetricLabel(challenge.id)
              }
            </span>
          </div>
          
          {/* Show Crew Leaderboard */}
          {effectiveActiveTab === 'crew' && showCrewTab && (
            <>
              {leaderboardEntry.crewLeaderboard.length > 0 ? (
                <>
                  {leaderboardEntry.crewLeaderboard.slice(0, 5).map((crew, index) => (
                    <div 
                      key={crew.id}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md shadow-black/10 ${
                        crew.rank <= 3 
                          ? 'bg-white/10 border border-white/20 hover:bg-white/15 shadow-lg shadow-black/20' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getRankBadgeColor(crew.rank)}`}>
                          {getRankIcon(crew.rank)}
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white text-sm sm:text-base truncate">{crew.crew_name}</p>
                          <p className="text-xs text-gray-400 truncate">{crew.vessel_name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-bold text-white text-sm sm:text-lg">
                          {formatMetricValue(crew.metric_value, crew.metric_unit, challenge.id)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* View Top 50 CTA for Crew - Only show if more than 5 entries */}
                  {shouldShowViewMoreButton('crew') && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => onViewFullLeaderboard('crew', challenge.id)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 hover:transform hover:scale-105 shadow-md"
                      >
                        <span>View Top 50</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyStateMessage type="crew" />
              )}
            </>
          )}

          {/* Show Vessel Leaderboard */}
          {effectiveActiveTab === 'vessel' && showVesselTab && (
            <>
              {leaderboardEntry.vesselLeaderboard.length > 0 ? (
                <>
                  {leaderboardEntry.vesselLeaderboard.slice(0, 5).map((vessel, index) => (
                    <div 
                      key={vessel.id}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md shadow-black/10 ${
                        vessel.rank <= 3 
                          ? 'bg-white/10 border border-white/20 hover:bg-white/15 shadow-lg shadow-black/20' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getRankBadgeColor(vessel.rank)}`}>
                          {getRankIcon(vessel.rank)}
                        </div>
                        
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <span className="text-lg sm:text-2xl flex-shrink-0">🚢</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white text-sm sm:text-base truncate">{vessel.vessel_name}</p>
                            <p className="text-xs text-gray-400">Rank #{vessel.rank}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-bold text-white text-sm sm:text-lg">
                          {formatMetricValue(vessel.metric_value, vessel.metric_unit, challenge.id)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* View Top 20 CTA for Vessels - Only show if more than 5 entries */}
                  {shouldShowViewMoreButton('vessel') && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => onViewFullLeaderboard('vessel', challenge.id)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 hover:transform hover:scale-105 shadow-md"
                      >
                        <span>View Top 20</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyStateMessage type="vessel" />
              )}
            </>
          )}

          {/* Show empty state when no data is available for the current tab */}
          {effectiveActiveTab === 'crew' && !showCrewTab && (
            <EmptyStateMessage type="crew" />
          )}
          
          {effectiveActiveTab === 'vessel' && !showVesselTab && (
            <EmptyStateMessage type="vessel" />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;