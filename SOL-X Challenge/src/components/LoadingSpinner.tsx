import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-800/30 backdrop-blur-sm p-2 rounded-xl border border-gray-700/50 mb-4 inline-block">
          <img 
            src="https://sol-x.co/wp-content/uploads/2022/08/sol-x-logo.png" 
            alt="SOL-X Logo" 
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
          <p className="text-xl font-medium text-white">Loading SOL-X Challenges...</p>
        </div>
        <p className="text-gray-400 mt-2">Connecting to database</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;