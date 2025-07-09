import React from 'react';
import { motion } from 'framer-motion';

function Title({ title, sub }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <p className="text-xs sm:text-sm md:text-base">{sub}</p>
      </motion.div>
      
      <motion.h2 
        className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

export default Title;