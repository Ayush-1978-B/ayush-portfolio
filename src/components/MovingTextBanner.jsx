import React from 'react';
import { motion } from 'framer-motion';
import './MovingTextBanner.css';

const MovingTextBanner = () => {
  const text = "Backend Journey Begins Soon";
  
  return (
    <div className="moving-banner-container">
      <div className="moving-banner">
        <motion.div
          className="moving-text"
          animate={{
            x: [0, -50],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...Array(6)].map((_, index) => (
            <span key={index} className="text-item">
              {text}
              <span className="separator">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MovingTextBanner;