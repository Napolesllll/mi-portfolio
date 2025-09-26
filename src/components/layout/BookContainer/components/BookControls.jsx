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
          className={`p-3 rounded-full border-2 shadow-lg transition-all duration-300 ${
            currentPage === 0 || isFlipping
              ? 'bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed'
              : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700 shadow-purple-500/30'
          }`}
          whileTap={{ scale: 0.9 }}
          style={currentPage > 0 && !isFlipping ? {
            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
          } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className={`p-3 rounded-full border-2 shadow-lg transition-all duration-300 ${
            currentPage === pages.length - 1 || isFlipping
              ? 'bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed'
              : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700 shadow-purple-500/30'
          }`}
          whileTap={{ scale: 0.9 }}
          style={currentPage < pages.length - 1 && !isFlipping ? {
            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
          } : {}}
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
              ? 'bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed'
              : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700'
          }`}
          whileHover={!prefersReducedMotion && currentPage > 0 ? { 
            scale: 1.1,
            y: -2,
            boxShadow: "0 10px 25px rgba(147, 51, 234, 0.5)"
          } : {}}
          whileTap={{ scale: 0.95 }}
          title="Página anterior (← o A)"
          style={currentPage > 0 && !isFlipping ? {
            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
          } : {}}
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
              ? 'bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed'
              : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700'
          }`}
          whileHover={!prefersReducedMotion && currentPage < pages.length - 1 ? { 
            scale: 1.1,
            y: -2,
            boxShadow: "0 10px 25px rgba(147, 51, 234, 0.5)"
          } : {}}
          whileTap={{ scale: 0.95 }}
          title="Página siguiente (→ o D)"
          style={currentPage < pages.length - 1 && !isFlipping ? {
            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
          } : {}}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </>
  );
};
 
export default BookControls;