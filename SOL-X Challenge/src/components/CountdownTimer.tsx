import React, { useState, useEffect } from 'react';
import { Clock, Lock } from 'lucide-react';

interface CountdownTimerProps {
  onTimerComplete: () => void;
  onPinAccess: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onTimerComplete, onPinAccess }) => {
  // Set target date to August 1, 2025 at 00:00:00 UTC
  const targetDate = new Date('2025-08-01T00:00:00Z').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        onTimerComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onTimerComplete]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '3987') {
      setShowPinModal(false);
      setPin('');
      setPinError('');
      onPinAccess();
    } else {
      setPinError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (isExpired) {
    return null; // Timer has expired, let parent component handle the redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-3xl border border-gray-700/50 mb-6 inline-block">
              <a href="https://sol-x.co/">
              <img 
                src="https://sol-x.co/wp-content/uploads/2022/08/sol-x-logo.png" 
                alt="SOL-X Logo" 
                className="h-12 w-auto"
              /></a>
            </div>
          </div>

          {/* Main Title with Trophy Icons */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">🏆</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                SOL-X Challenge
              </h1>
              <span className="text-4xl">🏆</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Maritime Wellness Competition
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get ready for the ultimate maritime wellness competition. Five exciting challenges await you!
            </p>
          </div>

          {/* Countdown Timer - Primary Focus */}
          <div className="mb-16">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Clock className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Challenge Starts In</h3>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
            
            {/* Large, Prominent Timer Display */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl shadow-black/30 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {formatNumber(timeLeft.days)}
                </div>
                <div className="text-base sm:text-lg text-gray-300 font-semibold">Days</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl shadow-black/30 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {formatNumber(timeLeft.hours)}
                </div>
                <div className="text-base sm:text-lg text-gray-300 font-semibold">Hours</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl shadow-black/30 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <div className="text-base sm:text-lg text-gray-300 font-semibold">Minutes</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl shadow-black/30 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <div className="text-base sm:text-lg text-gray-300 font-semibold">Seconds</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-xl text-gray-300 font-medium mb-6">
                The most exciting maritime wellness challenge is launching soon!
              </p>
              <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 text-lg">
                <Clock className="h-6 w-6" />
                <span>Challenge Launching August 1, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdoor Access Button */}
      <button
        onClick={() => setShowPinModal(true)}
        className="fixed bottom-6 right-6 p-3 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-full border border-gray-600/50 text-gray-400 hover:text-white transition-all duration-200 shadow-lg shadow-black/25 z-40"
        title="Marketing Access"
      >
        <Lock className="h-5 w-5" />
      </button>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-md shadow-2xl shadow-black/40">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔐</span>
                  <h3 className="text-xl font-bold text-white">Marketing Access</h3>
                </div>
                <button
                  onClick={() => {
                    setShowPinModal(false);
                    setPin('');
                    setPinError('');
                  }}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors duration-200 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter PIN to access leaderboard
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-center text-lg tracking-widest"
                    placeholder="••••"
                    maxLength={4}
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-red-400 text-sm mt-2">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:transform hover:scale-105"
                >
                  Access Leaderboard
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;