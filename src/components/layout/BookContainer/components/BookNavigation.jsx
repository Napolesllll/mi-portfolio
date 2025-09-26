import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const BookNavigation = memo(({ 
  pages, 
  currentPage, 
  goToPage, 
  isFlipping, 
  prefersReducedMotion 
}) => {
  // Textura background
  const darkPaperTexture = useMemo(() => 
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
  []);

  // Animaciones
  const animationConfig = useMemo(() => ({
    hover: prefersReducedMotion ? {} : { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
    bookmarkRotation: prefersReducedMotion ? {} : { rotate: [0, 360] },
    bookmarkTransition: prefersReducedMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "linear" }
  }), [prefersReducedMotion]);

  // Botón estilo
  const getButtonStyles = useMemo(() => (isActive) => ({
    className: `flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-purple-600 text-white shadow-lg border border-purple-500'
        : 'text-slate-300 hover:bg-slate-700/40 hover:text-yellow-300 border border-transparent'
    }`,
    style: isActive ? {
      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)'
    } : {}
  }), []);

  return (
    <>
      {/* Desktop / Tablets */}
      <div className="hidden md:block relative z-20 p-2 md:p-4">
        <nav className="max-w-4xl mx-auto">
          <div 
            className="glass-effect rounded-full px-6 py-3 shadow-lg"
            style={{
              background: 'rgba(30, 41, 59, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(71, 85, 105, 0.25)',
              backgroundImage: darkPaperTexture,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 215, 0, 0.08)'
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-1">
                <img 
                  src="/log2.png" 
                  alt="Logo" 
                  className="w-20 h-18"
                />
                <span className="text-lg font-bold text-slate-200 font-serif">
                  Mi Portfolio 
                </span>
              </div>

              {/* Navegación desktop */}
              <div className="flex space-x-2">
                {pages.map((page, index) => {
                  const IconComponent = page.icon;
                  const isActive = index === currentPage;
                  const buttonConfig = getButtonStyles(isActive);
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={buttonConfig.className + ' flex-row space-x-2 px-4 py-2'}
                      style={buttonConfig.style}
                      whileHover={!isFlipping ? animationConfig.hover : {}}
                      whileTap={animationConfig.tap}
                      disabled={isFlipping}
                      aria-label={`Ir a ${page.title}`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{page.title}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contador */}
              <div className="text-slate-300 font-semibold text-sm min-w-[3rem] text-right">
                <span className="tabular-nums">
                  {currentPage + 1} / {pages.length}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999]">
        <div 
          className="flex justify-around items-center py-2 px-2"
          style={{
            background: 'rgba(30, 41, 59, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(71, 85, 105, 0.35)',
            backgroundImage: darkPaperTexture,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {pages.map((page, index) => {
            const IconComponent = page.icon;
            const isActive = index === currentPage;
            const buttonConfig = getButtonStyles(isActive);
            
            return (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                className={buttonConfig.className + ' w-full mx-1 py-2'}
                style={buttonConfig.style}
                whileHover={!isFlipping ? animationConfig.hover : {}}
                whileTap={animationConfig.tap}
                disabled={isFlipping}
                aria-label={`Ir a ${page.title}`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-[0.65rem] font-medium leading-none">
                  {page.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Indicador de página móvil */}
        <div className="bg-slate-900/80 text-center text-xs text-slate-300 py-1 border-t border-slate-700/40">
          {currentPage + 1} / {pages.length}
        </div>
      </div>
    </>
  );
});

BookNavigation.displayName = 'BookNavigation';
export default BookNavigation;