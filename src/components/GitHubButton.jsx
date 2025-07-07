import React from 'react';

const GitHubButton = () => {
  return (
    <a href="https://github.com/Ayush-1978-B" target="_blank" rel="noopener noreferrer" className="relative group">
      <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
        <span className="relative flex items-center space-x-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star group-hover:fill-yellow-400 fill-white w-6 h-6 flex-shrink-0 transition-colors duration-300">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="pr-6 text-gray-100 group-hover:text-white transition-colors duration-300">GitHub</span>
        </span>
      </button>
    </a>
  );
};

export default GitHubButton;