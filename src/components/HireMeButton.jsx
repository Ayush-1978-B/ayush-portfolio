import React from 'react';

const HireMeButton = () => {
  return (
    <a href="/hire-me" target="_blank" rel="noopener noreferrer" className="relative group">
      <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
        <span className="relative flex items-center space-x-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase group-hover:text-yellow-400 text-white w-6 h-6 flex-shrink-0 transition-colors duration-300">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span className="pr-6 text-gray-100 group-hover:text-white transition-colors duration-300">Hire Me</span>
        </span>
      </button>
    </a>
  );
};

export default HireMeButton;