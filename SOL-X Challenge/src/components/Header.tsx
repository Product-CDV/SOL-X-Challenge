import React from 'react';
import { Trophy, Users, MessageSquare } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  totalParticipants: number;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <div className="flex items-center flex-shrink-0">
            <img 
              src="https://sol-x.co/wp-content/uploads/2022/08/sol-x-logo.png" 
              alt="SOL-X Logo" 
              className="h-5 sm:h-6 lg:h-8 w-auto"
            />
          </div>

          <nav className="flex items-center space-x-0.5 sm:space-x-1">
            <button
              onClick={() => onTabChange('leaderboard')}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Leaderboard</span>
              <span className="xs:hidden">Leaderboard</span>
            </button>
            <button
              onClick={() => onTabChange('challenges')}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                activeTab === 'challenges'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Challenges</span>
              <span className="xs:hidden">Challenges</span>
            </button>
            <button
              onClick={() => onTabChange('stories')}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                activeTab === 'stories'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
              Stories
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;