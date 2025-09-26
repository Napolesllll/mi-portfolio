import React from 'react';
import { motion } from 'framer-motion';

const PageIndicators = ({ pages, currentPage, goToPage, isFlipping, prefersReducedMotion }) => {
  const agedPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  return (
    <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div 
        className="flex space-x-3 backdrop-blur-md border border-amber-300/30 rounded-full px-6 py-3 shadow-lg"
        style={{
          background: 'rgba(254, 243, 199, 0.6)',
          backgroundImage: agedPaperTexture
        }}
      >
        {pages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${
              index === currentPage
                ? 'bg-amber-600 border-amber-700 scale-125'
                : 'bg-amber-300 border-amber-400/50 hover:bg-amber-400'
            }`}
            whileHover={!prefersReducedMotion ? { scale: index === currentPage ? 1.3 : 1.1 } : {}}
            disabled={isFlipping}
          />
        ))}
      </div>
    </div>
  );
};

export default PageIndicators;