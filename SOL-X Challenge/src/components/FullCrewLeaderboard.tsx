import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Challenge, LeaderboardEntry } from '../types';
import { Trophy, Medal, Award, ArrowLeft, Users, Clock } from 'lucide-react';

interface FullCrewLeaderboardProps {
  challenge: Challenge;
  leaderboardEntry: LeaderboardEntry;
  onBack: () => void;
}

const FullCrewLeaderboard: React.FC<FullCrewLeaderboardProps> = ({ 
  challenge, 
  leaderboardEntry, 
  onBack 
}) => {
  const IconComponent = (LucideIcons as any)[challenge.icon] || LucideIcons.Star;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
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
      return `${value.toLocaleString()} avg steps`;
    }
    if (unit === 'hours') {
      return `${value}hrs avg usage`;
    }
    return `${value} ${unit}`;
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

  // Use only real data from Supabase - no mock data generation
  const crewData = leaderboardEntry.crewLeaderboard;

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Data Available</h3>
        <p className="text-gray-300 leading-relaxed">
          The leaderboard will be visible once the data is processed
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors duration-200 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className={`bg-gradient-to-br ${challenge.gradient} p-3 rounded-xl shadow-lg shadow-black/25 flex-shrink-0`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">{challenge.name}</h1>
              <p className="text-gray-400">Top {crewData.length} Crew Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
          <div className={`bg-gradient-to-r ${challenge.gradient} p-6`}>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold text-white">Crew Leaderboard</h2>
            </div>
            <p className="text-white/80 mt-2">{getCrewMetricLabel(challenge.id)}</p>
          </div>

          <div className="p-6">
            {crewData.length > 0 ? (
              <div className="space-y-3">
                {crewData.map((crew, index) => (
                  <div 
                    key={crew.id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 shadow-md shadow-black/10 ${
                      crew.rank <= 3 
                        ? 'bg-white/10 border border-white/20 hover:bg-white/15 shadow-lg shadow-black/20' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getRankBadgeColor(crew.rank)}`}>
                        {getRankIcon(crew.rank)}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-base truncate">{crew.crew_name}</p>
                        <p className="text-sm text-gray-400 truncate">{crew.vessel_name}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-bold text-white text-lg">
                        {formatMetricValue(crew.metric_value, crew.metric_unit, challenge.id)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullCrewLeaderboard;