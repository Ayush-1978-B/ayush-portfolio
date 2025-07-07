import React from 'react';
import Index from './parts/social';

const Footer = () => {
  return (
    <div className="relative">
        <Index/>
        <footer className="py-8 text-center text-white-50 relative z-10">
          {/* Blurry background */}
          <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-md -z-10"></div>
          <p>&copy; {new Date().getFullYear()} Ayush ! Yadav. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Footer;