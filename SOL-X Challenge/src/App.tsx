import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChallengeCard from './components/ChallengeCard';
import LeaderboardCard from './components/LeaderboardCard';
import PrizeModal from './components/PrizeModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import StoriesWall from './components/StoriesWall';
import FeaturedStories from './components/FeaturedStories';
import FullCrewLeaderboard from './components/FullCrewLeaderboard';
import FullVesselLeaderboard from './components/FullVesselLeaderboard';
import CountdownTimer from './components/CountdownTimer';
import { useSupabaseData } from './hooks/useSupabaseData';
import { Challenge } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [fullLeaderboardView, setFullLeaderboardView] = useState<{
    type: 'crew' | 'vessel' | null;
    challengeId: string | null;
  }>({ type: null, challengeId: null });
  const [showCountdown, setShowCountdown] = useState(true);
  
  const { challenges, leaderboardData, loading, error } = useSupabaseData();

  const totalParticipants = leaderboardData.reduce((total, entry) => {
    return total + entry.participants.length + entry.crewLeaderboard.length;
  }, 0);

  const handleViewPrizes = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowPrizeModal(true);
  };

  const handleSubmitStory = () => {
    setActiveTab('stories');
    // The StoriesWall component will handle opening the submission form
    setTimeout(() => {
      const shareButton = document.querySelector('[data-share-story]') as HTMLButtonElement;
      if (shareButton) {
        shareButton.click();
      }
    }, 100);
  };

  const handleViewStoriesPrizes = () => {
    const solxHeroChallenge = challenges.find(c => c.id === 'sol-x-hero');
    if (solxHeroChallenge) {
      handleViewPrizes(solxHeroChallenge);
    }
  };

  const getParticipantCount = (challengeId: string) => {
    const entry = leaderboardData.find(entry => entry.challengeId === challengeId);
    return entry ? entry.participants.length + entry.crewLeaderboard.length : 0;
  };

  const handleViewFullLeaderboard = (type: 'crew' | 'vessel', challengeId: string) => {
    setFullLeaderboardView({ type, challengeId });
  };

  const handleBackToMain = () => {
    setFullLeaderboardView({ type: null, challengeId: null });
  };

  const handleTimerComplete = () => {
    setShowCountdown(false);
  };

  const handlePinAccess = () => {
    setShowCountdown(false);
  };

  // Show countdown timer if campaign hasn't started
  if (showCountdown) {
    return (
      <div className="min-h-screen flex flex-col">
        <CountdownTimer 
          onTimerComplete={handleTimerComplete}
          onPinAccess={handlePinAccess}
        />
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <ErrorMessage message={error} />
        <Footer />
      </div>
    );
  }

  // Show full leaderboard view
  if (fullLeaderboardView.type && fullLeaderboardView.challengeId) {
    const challenge = challenges.find(c => c.id === fullLeaderboardView.challengeId);
    const leaderboardEntry = leaderboardData.find(entry => entry.challengeId === fullLeaderboardView.challengeId);
    
    if (!challenge || !leaderboardEntry) {
      return (
        <div className="min-h-screen flex flex-col">
          <ErrorMessage message="Challenge or leaderboard data not found" />
          <Footer />
        </div>
      );
    }

    if (fullLeaderboardView.type === 'crew') {
      return (
        <div className="min-h-screen flex flex-col">
          <FullCrewLeaderboard
            challenge={challenge}
            leaderboardEntry={leaderboardEntry}
            onBack={handleBackToMain}
          />
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex flex-col">
          <FullVesselLeaderboard
            challenge={challenge}
            leaderboardEntry={leaderboardEntry}
            onBack={handleBackToMain}
          />
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalParticipants={totalParticipants}
      />
      
      {/* Stories tab - render stories wall with common header */}
      {activeTab === 'stories' ? (
        <div className="flex-1 flex flex-col">
          <StoriesWall onViewPrizes={handleViewStoriesPrizes} />
          <Footer />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 flex-1">
            {activeTab === 'leaderboard' ? (
              <>
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    SOL-X Challenge Leaderboards
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    Track your progress and compete with fellow maritime professionals across five exciting wellness challenges
                  </p>
                </div>
                
                {/* Featured Stories Section */}
                <FeaturedStories onViewAllStories={() => setActiveTab('stories')} />
                
                <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                  {leaderboardData.map((entry) => {
                    const challenge = challenges.find(c => c.id === entry.challengeId);
                    return challenge ? (
                      <LeaderboardCard
                        key={entry.challengeId}
                        challenge={challenge}
                        leaderboardEntry={entry}
                        onViewPrizes={handleViewPrizes}
                        onViewFullLeaderboard={handleViewFullLeaderboard}
                      />
                    ) : null;
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    SOL-X Wellness Challenges
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    Join exciting challenges designed for maritime professionals. Compete, improve your wellbeing, and win amazing prizes!
                  </p>
                </div>
                
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {challenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      participantCount={getParticipantCount(challenge.id)}
                      onViewPrizes={handleViewPrizes}
                    />
                  ))}
                </div>
              </>
            )}
          </main>
          <Footer />
        </div>
      )}

      {showPrizeModal && selectedChallenge && (
        <PrizeModal
          challenge={selectedChallenge}
          onClose={() => setShowPrizeModal(false)}
          onSubmitStory={selectedChallenge.id === 'sol-x-hero' ? handleSubmitStory : undefined}
        />
      )}
    </div>
  );
}

export default App;