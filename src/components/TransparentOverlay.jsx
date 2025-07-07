import React from 'react';

const TransparentOverlay = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-1"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)'
      }}
    />
  );
};

export default TransparentOverlay; 