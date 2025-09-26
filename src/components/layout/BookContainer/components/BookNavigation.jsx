import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const BookNavigation = ({ 
  pages, 
  currentPage, 
  goToPage, 
  isFlipping, 
  prefersReducedMotion 
}) => {
  const agedPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  return (
    <div className="relative z-20 p-2 md:p-4">
      <nav className="max-w-4xl mx-auto">
        <div 
          className="bg-amber-50/60 backdrop-blur-md border border-amber-300/30 rounded-full px-3 py-2 md:px-6 md:py-3 shadow-lg"
          style={{
            backgroundImage: agedPaperTexture,
            boxShadow: '0 4px 15px rgba(139, 69, 19, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo/Título */}
            <div className="flex items-center space-x-2">
              <motion.div
                animate={!prefersReducedMotion ? { rotate: [0, 360] } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-amber-700" />
              </motion.div>
              <span className="text-sm md:text-lg font-bold text-amber-800 font-serif">
                Mi Portfolio 
              </span>
            </div>

            {/* Navegación por páginas */}
            <div className="flex space-x-1 md:space-x-2">
              {pages.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`flex items-center space-x-1 md:space-x-2 px-2 py-1 md:px-3 md:py-2 
                              rounded-full transition-all duration-300 border ${
                      index === currentPage
                        ? 'bg-amber-600 text-white border-amber-700 shadow-lg'
                        : 'text-amber-800 border-amber-300/50 hover:bg-amber-200/50'
                    }`}
                    whileHover={!prefersReducedMotion ? { scale: 1.05, y: -1 } : {}}
                    whileTap={{ scale: 0.95 }}
                    disabled={isFlipping}
                  >
                    <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:block text-xs md:text-sm font-medium">
                      {page.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Contador de páginas */}
            <div className="text-amber-700 font-semibold text-xs md:text-sm">
              {currentPage + 1} / {pages.length}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BookNavigation;