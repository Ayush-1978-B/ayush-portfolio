import React from 'react';
import './MovingTextBanner.css';

const MovingTextBanner = ({ text }) => {
  return (
    <div className="moving-text-banner-container">
      <div className="moving-text-wrapper">
        <span className="moving-text">{text}</span>
        <span className="moving-text">{text}</span>
        <span className="moving-text">{text}</span>
        <span className="moving-text">{text}</span>
      </div>
    </div>
  );
};

export default MovingTextBanner;