import React, { memo, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookControlsComponent = ({
  prevPage,
  nextPage,
  currentPage,
  pages,
  isFlipping,
  prefersReducedMotion,
  isMobile
}) => {
  // Config animación
  const animationConfig = useMemo(() => ({
    scale: prefersReducedMotion ? 1 : 0.95,
    hover: prefersReducedMotion ? {} : {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    }
  }), [prefersReducedMotion]);

  // Estilos de botones
  const getButtonStyles = useMemo(() => (isDisabled) => ({
    base: `rounded-full border-2 shadow-lg transition-all duration-200 flex items-center justify-center
      ${
        isDisabled || isFlipping
          ? 'bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed'
          : 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700 shadow-purple-500/30'
      }
      p-2 sm:p-3 md:p-4`, // responsive paddings
    style: (!isDisabled && !isFlipping) ? {
      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)'
    } : {}
  }), [isFlipping]);

  return (
    <>
      {/* Botón izquierdo */}
      <div className="
        fixed 
        top-1/2 
        left-1 sm:left-2 md:left-3 lg:left-6
        transform -translate-y-1/2 z-[9999]
      ">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          className={getButtonStyles(currentPage === 0).base}
          style={getButtonStyles(currentPage === 0).style}
          whileHover={currentPage > 0 && !isFlipping ? animationConfig.hover : {}}
          whileTap={{ scale: animationConfig.scale }}
          title="Página anterior (← o A)"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Botón derecho */}
      <div className="
        fixed 
        top-1/2 
        right-1 sm:right-2 md:right-3 lg:right-6
        transform -translate-y-1/2 z-[9999]
      ">
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className={getButtonStyles(currentPage === pages.length - 1).base}
          style={getButtonStyles(currentPage === pages.length - 1).style}
          whileHover={currentPage < pages.length - 1 && !isFlipping ? animationConfig.hover : {}}
          whileTap={{ scale: animationConfig.scale }}
          title="Página siguiente (→ o D)"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Indicador centrado inferior */}
      <div className="fixed bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 z-[9998]">
        <div className="
          flex items-center space-x-2 
          bg-slate-800/60 backdrop-blur-sm 
          px-2 sm:px-3 md:px-4 
          py-1.5 sm:py-2 
          rounded-full border border-slate-700/50
        ">
          <span className="text-slate-300 text-xs sm:text-sm md:text-base font-medium">
            {currentPage + 1} / {pages.length}
          </span>
        </div>
      </div>
    </>
  );
};

const BookControls = memo((props) => {
  // Montar en el body para que siempre sea fijo globalmente
  return ReactDOM.createPortal(<BookControlsComponent {...props} />, document.body);
});

BookControls.displayName = 'BookControls';

export default BookControls;
