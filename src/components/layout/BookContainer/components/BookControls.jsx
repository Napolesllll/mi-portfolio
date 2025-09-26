import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookControls = ({
  prevPage,
  nextPage,
  currentPage,
  pages,
  isFlipping,
  prefersReducedMotion,
  isMobile
}) => {
  if (isMobile) {
    return (
      <div className="flex justify-between px-6 mt-6 absolute bottom-4 left-0 right-0">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className={`p-3 rounded-full border-2 shadow-lg ${
            currentPage === 0 || isFlipping
              ? 'bg-gray-200 text-gray-400 border-gray-300'
              : 'bg-amber-600 text-white border-amber-700'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className={`p-3 rounded-full border-2 shadow-lg ${
            currentPage === pages.length - 1 || isFlipping
              ? 'bg-gray-200 text-gray-400 border-gray-300'
              : 'bg-amber-600 text-white border-amber-700'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-30">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className={`p-4 rounded-full border-2 shadow-lg transition-all duration-300 ${
            currentPage === 0 || isFlipping
              ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              : 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
          }`}
          whileHover={!prefersReducedMotion && currentPage > 0 ? { 
            scale: 1.1,
            y: -2,
            boxShadow: "0 10px 25px rgba(139, 69, 19, 0.4)"
          } : {}}
          whileTap={{ scale: 0.95 }}
          title="Página anterior (← o A)"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30">
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className={`p-4 rounded-full border-2 shadow-lg transition-all duration-300 ${
            currentPage === pages.length - 1 || isFlipping
              ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              : 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
          }`}
          whileHover={!prefersReducedMotion && currentPage < pages.length - 1 ? { 
            scale: 1.1,
            y: -2,
            boxShadow: "0 10px 25px rgba(139, 69, 19, 0.4)"
          } : {}}
          whileTap={{ scale: 0.95 }}
          title="Página siguiente (→ o D)"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </>
  );
};
 
export default BookControls;