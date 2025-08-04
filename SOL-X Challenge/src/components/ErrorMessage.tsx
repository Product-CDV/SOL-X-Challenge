import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="bg-gray-800/30 backdrop-blur-sm p-2 rounded-xl border border-gray-700/50 mb-6 inline-block">
          <img 
            src="https://sol-x.co/wp-content/uploads/2022/08/sol-x-logo.png" 
            alt="SOL-X Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-6 mb-6">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-300 mb-4">
            Unable to load challenge data. Please check your connection and try again.
          </p>
          <p className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3 font-mono">
            {message}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-current/25 transition-all duration-200 hover:transform hover:scale-105"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;