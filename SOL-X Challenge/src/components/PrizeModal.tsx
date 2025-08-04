import React from 'react';
import { X, Trophy, Medal, Award, Gift } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Challenge } from '../types';

interface PrizeModalProps {
  challenge: Challenge;
  onClose: () => void;
  onSubmitStory?: () => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({ challenge, onClose, onSubmitStory }) => {
  const IconComponent = (LucideIcons as any)[challenge.icon] || LucideIcons.Star;

  const getPrizeIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />;
      default:
        return <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />;
    }
  };

  const getPrizeGradient = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-500 to-amber-700';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getPositionText = (position: number) => {
    switch (position) {
      case 1:
        return '1st Place';
      case 2:
        return '2nd Place';
      case 3:
        return '3rd Place';
      default:
        return `${position}th Place`;
    }
  };

  const isVesselChallenge = challenge.id === 'steps-count';
  const isExperienceChallenge = challenge.id === 'user-experience';
  const isSmartwatchChallenge = challenge.id === 'smartwatch-utilisation';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
        <div className={`absolute inset-0 bg-gradient-to-br ${challenge.gradient} opacity-5 rounded-2xl sm:rounded-3xl`} />
        
        <div className="relative p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 mr-2">
              <div className={`bg-gradient-to-br ${challenge.gradient} p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shadow-black/25 flex-shrink-0`}>
                <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight">{challenge.name}</h2>
                <p className="text-gray-400 font-medium text-sm sm:text-base">{challenge.category} Challenge</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors duration-200 text-gray-400 hover:text-white flex-shrink-0"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Challenge Description */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 shadow-lg shadow-black/10">
            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">{challenge.description}</p>
            {isVesselChallenge && (
              <div className="mt-4 p-3 sm:p-4 bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-800/30 shadow-md">
                <h4 className="text-blue-300 font-semibold mb-2 text-sm sm:text-base">🚢 Vessel Competition Format</h4>
                <ul className="text-blue-200 text-xs sm:text-sm space-y-1">
                  <li>• 2-month competition periods with monthly prizes</li>
                  <li>• Cumulative step count of all crew members aboard each vessel</li>
                  <li>• Includes both work and rest period activities</li>
                  <li>• Captains recognized for championing crew wellness initiatives</li>
                  <li>• Vessel-level data promotes team wellness without individual tracking</li>
                </ul>
              </div>
            )}
            {isExperienceChallenge && (
              <div className="mt-4 p-3 sm:p-4 bg-cyan-900/20 rounded-lg sm:rounded-xl border border-cyan-800/30 shadow-md">
                <h4 className="text-cyan-300 font-semibold mb-2 text-sm sm:text-base">📝 Experience Sharing Format</h4>
                <ul className="text-cyan-200 text-xs sm:text-sm space-y-1">
                  <li>• 1-month submission period for entries from any time period</li>
                  <li>• Describe how SOL-X improved daily work experience</li>
                  <li>• Stories about incident prevention, damage reduction, or efficiency gains</li>
                  <li>• Winners judged by HR Sea for highest impact stories</li>
                  <li>• Winning stories broadcast to crew as lessons learned</li>
                  <li>• Encourages sharing of effective SOL-X system usage</li>
                </ul>
              </div>
            )}
            {isSmartwatchChallenge && (
              <div className="mt-4 p-3 sm:p-4 bg-indigo-900/20 rounded-lg sm:rounded-xl border border-indigo-800/30 shadow-md">
                <h4 className="text-indigo-300 font-semibold mb-2 text-sm sm:text-base">⌚ Smartwatch Utilisation Format</h4>
                <ul className="text-indigo-200 text-xs sm:text-sm space-y-1">
                  <li>• 6-month challenge period with 3 bi-monthly rounds</li>
                  <li>• All 65 vessels tracked for average smartwatch utilisation</li>
                  <li>• Vessels achieving &gt;90% utilisation receive cash vouchers</li>
                  <li>• Utilisation data obtained from SOL-X dashboard</li>
                  <li>• Separate leaderboard for each bi-monthly period</li>
                  <li>• Promotes consistent smartwatch adoption across fleet</li>
                </ul>
              </div>
            )}
          </div>

          {/* Prizes */}
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isVesselChallenge ? 'Monthly Prize Pool' : 'Prize Pool'}
              </h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {challenge.prizes.map((prize) => (
                <div
                  key={prize.position}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getPrizeGradient(prize.position)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`bg-gradient-to-br ${getPrizeGradient(prize.position)} p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shadow-black/25 flex-shrink-0`}>
                        {getPrizeIcon(prize.position)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${getPrizeGradient(prize.position)} text-white text-xs sm:text-sm font-bold mb-2 shadow-md`}>
                          {getPositionText(prize.position)}
                        </div>
                        {prize.value && (
                          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">{prize.value}</p>
                        )}
                        <h4 className="font-bold text-white mb-2 text-lg sm:text-xl lg:text-2xl leading-tight">
                          {prize.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                          {prize.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action - Only for SOL-X Hero Challenge */}
          {isExperienceChallenge && onSubmitStory && (
            <div className="mt-6 sm:mt-8 text-center p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 shadow-lg shadow-black/10">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Ready to share your SOL-X success story and inspire fellow crew members?
              </p>
              <button 
                onClick={() => {
                  onClose();
                  onSubmitStory();
                }}
                className={`px-6 sm:px-8 py-3 bg-gradient-to-r ${challenge.gradient} text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-current/25 transition-all duration-200 hover:transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto shadow-md`}
              >
                Submit Your Story
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrizeModal;