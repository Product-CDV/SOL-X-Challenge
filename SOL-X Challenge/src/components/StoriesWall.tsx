import React, { useState } from 'react';
import { MessageSquare, Plus, X, Send, Calendar, User, Ship, Gift, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { useStoriesData } from '../hooks/useStoriesData';
import { StorySubmission } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface StoriesWallProps {
  onViewPrizes?: () => void;
}

const StoriesWall: React.FC<StoriesWallProps> = ({ onViewPrizes }) => {
  const { stories, userRanks, vessels, storyFeatures, loading, error, submitStory } = useStoriesData();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedStoryData, setSubmittedStoryData] = useState<any>(null);

  const [formData, setFormData] = useState<StorySubmission>({
    user_name: '',
    user_rank_id: '',
    vessel_id: '',
    story: '',
    feature_ids: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      console.log('Form data being submitted:', formData)
      
      const result = await submitStory(formData)
      
      if (result.success) {
        // Store the submitted data with additional details for display
        const selectedRank = userRanks.find(rank => rank.id === formData.user_rank_id);
        const selectedVessel = vessels.find(vessel => vessel.id === formData.vessel_id);
        const selectedFeatures = storyFeatures.filter(feature => 
          formData.feature_ids.includes(feature.id)
        );

        setSubmittedStoryData({
          user_name: formData.user_name,
          user_rank: selectedRank,
          vessel: selectedVessel,
          story: formData.story,
          features: selectedFeatures,
          submitted_at: new Date().toISOString()
        });

        setSubmitSuccess(true)
        setFormData({
          user_name: '',
          user_rank_id: '',
          vessel_id: '',
          story: '',
          feature_ids: []
        })
        // Keep success message visible longer and auto-close
        setTimeout(() => {
          setShowSubmissionForm(false)
          setSubmitSuccess(false)
          setSubmittedStoryData(null)
        }, 8000)
      } else {
        setSubmitError(result.error || 'Failed to submit story')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit story')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      feature_ids: prev.feature_ids.includes(featureId)
        ? prev.feature_ids.filter(id => id !== featureId)
        : [...prev.feature_ids, featureId]
    }));
  };

  const getFeatureColor = (color: string) => {
    const colorMap: Record<string, string> = {
      red: 'bg-red-500/20 text-red-300 border-red-500/30',
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      green: 'bg-green-500/20 text-green-300 border-green-500/30',
      pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return colorMap[color] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const closeModal = () => {
    setShowSubmissionForm(false)
    setSubmitError(null)
    setSubmitSuccess(false)
    setSubmittedStoryData(null)
    setFormData({
      user_name: '',
      user_rank_id: '',
      vessel_id: '',
      story: '',
      feature_ids: []
    })
  }

  // Sort stories: featured first, then regular stories by date
  const sortedStories = [...stories].sort((a, b) => {
    // Featured stories come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Within the same category (featured or regular), sort by date (newest first)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const StoryCard = ({ story }: { story: any }) => (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:transform hover:scale-[1.02] flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-300 rounded-3xl" />
      
      <div className="relative p-8 flex flex-col h-full">
        {/* Story Header */}
        <div className="flex items-start space-x-5 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-blue-500/25">
            {story.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-white mb-3 leading-tight">{story.user_name}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-400">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{story.user_rank?.name}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Ship className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{story.vessel?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="flex-1 mb-8">
          <p className="text-gray-300 leading-relaxed text-base">
            {story.story}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-6">
          {/* Feature Tags */}
          {story.features && story.features.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {story.features.map((feature) => (
                <span
                  key={feature.id}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${getFeatureColor(feature.color)}`}
                >
                  {feature.name}
                </span>
              ))}
            </div>
          )}

          {/* Date and Featured Indicator */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{formatDate(story.created_at)}</span>
            </div>
            {story.featured && (
              <div className="text-sm text-yellow-400 font-medium flex items-center space-x-2">
                <Star className="h-4 w-4 fill-current" />
                <span>Featured Story</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Page Header */}
      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/25 flex-shrink-0">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1 sm:flex-initial">
                <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">SOL-X Hero Stories</h1>
                <p className="text-gray-400">Share your experience with SOL-X technology</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {onViewPrizes && (
                <button
                  onClick={onViewPrizes}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:transform hover:scale-105 shadow-md flex-1 sm:flex-initial"
                >
                  <Gift className="h-5 w-5" />
                  <span className="hidden sm:inline">View Prizes</span>
                  <span className="sm:hidden">Prizes</span>
                </button>
              )}
              
              <button
                data-share-story
                onClick={() => setShowSubmissionForm(true)}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:transform hover:scale-105 shadow-md flex-1 sm:flex-initial"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">Share Your Story</span>
                <span className="sm:hidden">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 flex-1">
        {stories.length > 0 ? (
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {sortedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/5 rounded-3xl p-16 border border-white/10 max-w-lg mx-auto">
              <MessageSquare className="h-20 w-20 text-gray-600 mx-auto mb-8" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-4">No stories yet</h3>
              <p className="text-gray-500 mb-8 text-lg">Be the first to share your SOL-X experience!</p>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:transform hover:scale-105 shadow-md"
              >
                <Plus className="h-6 w-6" />
                <span>Share Your Story</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Submission Form Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl" />
            
            <div className="relative p-6">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg shadow-blue-500/25">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Share Your SOL-X Story</h2>
                </div>
                
                <button
                  onClick={closeModal}
                  disabled={submitting}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors duration-200 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Success Message with Submitted Story Details */}
              {submitSuccess && submittedStoryData && (
                <div className="mb-6 p-6 bg-green-900/20 border border-green-800/30 rounded-xl shadow-md">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-300 font-bold text-lg mb-1">Story submitted successfully!</p>
                      <p className="text-green-200 text-sm mb-4">Your story has been received and will be reviewed by our moderators before being published. Thank you for sharing your SOL-X experience!</p>
                    </div>
                  </div>
                  
                  {/* Display Submitted Story */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-white font-semibold mb-3">Your Submitted Story:</h3>
                    
                    {/* Story Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-lg shadow-blue-500/25">
                        👤
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-white mb-1">{submittedStoryData.user_name}</h4>
                        <div className="flex flex-col space-y-0.5 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <User className="h-2.5 w-2.5 flex-shrink-0" />
                            <span>{submittedStoryData.user_rank?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Ship className="h-2.5 w-2.5 flex-shrink-0" />
                            <span>{submittedStoryData.vessel?.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed text-sm">{submittedStoryData.story}</p>
                    </div>

                    {/* Feature Tags */}
                    {submittedStoryData.features && submittedStoryData.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {submittedStoryData.features.map((feature: any) => (
                          <span
                            key={feature.id}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shadow-sm ${getFeatureColor(feature.color)}`}
                          >
                            {feature.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Submission Date */}
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Submitted {formatDate(submittedStoryData.submitted_at)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-xl shadow-md">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-300 font-medium">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Form - Hide when successfully submitted */}
              {!submitSuccess && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.user_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, user_name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-sm"
                      placeholder="Enter your full name"
                      disabled={submitting}
                    />
                  </div>

                  {/* User Rank */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Rank *
                    </label>
                    <select
                      required
                      value={formData.user_rank_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, user_rank_id: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-sm"
                      disabled={submitting}
                    >
                      <option value="">Select your rank</option>
                      {userRanks.map((rank) => (
                        <option key={rank.id} value={rank.id}>{rank.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Vessel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vessel Name *
                    </label>
                    <select
                      required
                      value={formData.vessel_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, vessel_id: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-sm"
                      disabled={submitting}
                    >
                      <option value="">Select your vessel</option>
                      {vessels.map((vessel) => (
                        <option key={vessel.id} value={vessel.id}>{vessel.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Story */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your SOL-X Story *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.story}
                      onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none shadow-sm"
                      placeholder="Share how SOL-X has improved your work experience, helped prevent incidents, or enhanced safety..."
                      disabled={submitting}
                    />
                  </div>

                  {/* Feature Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Related SOL-X Features (Optional)
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {storyFeatures.map((feature) => (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => handleFeatureToggle(feature.id)}
                          disabled={submitting}
                          className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium shadow-sm disabled:opacity-50 ${
                            formData.feature_ids.includes(feature.id)
                              ? `${getFeatureColor(feature.color)} border-current shadow-md`
                              : 'bg-gray-800/30 text-gray-400 border-gray-700/50 hover:bg-gray-800/50'
                          }`}
                        >
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={submitting}
                      className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Story</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesWall;