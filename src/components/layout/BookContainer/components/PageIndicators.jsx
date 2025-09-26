import React from 'react';
import { motion } from 'framer-motion';

const PageIndicators = ({ pages, currentPage, goToPage, isFlipping, prefersReducedMotion }) => {
  const darkTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E")`;

  return (
    <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div 
        className="flex space-x-3 backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3 shadow-lg"
        style={{
          background: 'rgba(40, 40, 40, 0.8)',
          backgroundImage: darkTexture,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(147, 51, 234, 0.3)'
        }}
      >
        {pages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${
              index === currentPage
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 scale-125 shadow-lg'
                : 'bg-slate-600 border-slate-500/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-400'
            }`}
            style={{
              boxShadow: index === currentPage 
                ? '0 0 15px rgba(147, 51, 234, 0.6)' 
                : '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={!prefersReducedMotion ? { scale: index === currentPage ? 1.3 : 1.1 } : {}}
            disabled={isFlipping}
          />
        ))}
      </div>
    </div>
  );
};

export default PageIndicators;