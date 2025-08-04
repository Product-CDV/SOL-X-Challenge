import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-gray-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <span className="text-white text-sm font-medium">Powered by</span>
            <a href="https://circledv.com/">
            <img 
              src="/CDV-single-negative.svg" 
              alt="Circle Digital Ventures" 
              className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
            /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;