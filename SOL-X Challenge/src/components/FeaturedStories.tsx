import React from 'react';
import { MessageSquare, ArrowRight, User, Ship } from 'lucide-react';
import { useStoriesData } from '../hooks/useStoriesData';

interface FeaturedStoriesProps {
  onViewAllStories: () => void;
}

const FeaturedStories: React.FC<FeaturedStoriesProps> = ({ onViewAllStories }) => {
  const { getFeaturedStories } = useStoriesData();
  const featuredStories = getFeaturedStories();

  if (featuredStories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-col sm:flex-row gap-3 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg shadow-blue-500/25 flex-shrink-0">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1 sm:flex-initial">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">Featured Stories</h2>
            <p className="text-sm sm:text-base text-gray-400">Real experiences from SOL-X users</p>
          </div>
        </div>
        
        <button
          onClick={onViewAllStories}
          className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
        >
          <span>View All Stories</span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuredStories.map((story) => (
          <div
            key={story.id}
            className="group relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:transform hover:scale-[1.02] flex flex-col"
            onClick={onViewAllStories}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-300" />
            
            <div className="relative p-4 sm:p-6 flex flex-col flex-1">
              {/* Story Header */}
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-base sm:text-lg flex-shrink-0 shadow-lg shadow-blue-500/25">
                  {story.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-xs sm:text-sm truncate">{story.user_name}</h3>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-400">
                    <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                    <span className="truncate">{story.user_rank?.name}</span>
                    <Ship className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5 sm:ml-1 flex-shrink-0" />
                    <span className="truncate">{story.vessel?.name}</span>
                  </div>
                </div>
              </div>

              {/* Story Preview - with consistent height */}
              <div className="flex-1 mb-3 sm:mb-4">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {story.story}
                </p>
              </div>

              {/* Feature Tags - at bottom */}
              <div className="mt-auto">
                {story.features && story.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {story.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature.id}
                        className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-sm"
                      >
                        {feature.name}
                      </span>
                    ))}
                    {story.features.length > 2 && (
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30 shadow-sm">
                        +{story.features.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedStories;