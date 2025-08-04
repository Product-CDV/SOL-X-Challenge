import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Challenge } from '../types';
import { Calendar } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  participantCount: number;
  onViewPrizes: (challenge: Challenge) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, participantCount, onViewPrizes }) => {
  const IconComponent = (LucideIcons as any)[challenge.icon] || LucideIcons.Star;

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }
  };

  const dateRange = formatDateRange(challenge.start_date, challenge.end_date);

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${challenge.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`bg-gradient-to-br ${challenge.gradient} p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg shadow-black/25 flex-shrink-0`}>
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 leading-tight">
            {challenge.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-2 font-medium">{challenge.category}</p>
          
          {/* Challenge Date Range */}
          {dateRange && (
            <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-blue-300 font-medium">{dateRange}</p>
            </div>
          )}
          
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">{challenge.description}</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {['🏆', '🥈', '🥉'].map((emoji, index) => (
                <div key={index} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800/80 border-2 border-gray-700/50 flex items-center justify-center text-xs shadow-md">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">3 Prize Tiers</p>
          </div>
          
          <button
            onClick={() => onViewPrizes(challenge)}
            className={`px-3 sm:px-4 py-2 bg-gradient-to-r ${challenge.gradient} text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-current/25 transition-all duration-200 hover:transform hover:scale-105 flex-shrink-0 shadow-md`}
          >
            View Prizes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;