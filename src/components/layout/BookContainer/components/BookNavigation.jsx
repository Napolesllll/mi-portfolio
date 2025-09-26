import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const BookNavigation = memo(({ 
  pages, 
  currentPage, 
  goToPage, 
  isFlipping, 
  prefersReducedMotion 
}) => {
  // Memoizar textura para evitar recreación
  const darkPaperTexture = useMemo(() => 
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
  []);

  // Configuraciones de animación optimizadas
  const animationConfig = useMemo(() => ({
    hover: prefersReducedMotion ? {} : { 
      scale: 1.03, 
      y: -1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.97 },
    bookmarkRotation: prefersReducedMotion ? {} : { rotate: [0, 360] },
    bookmarkTransition: prefersReducedMotion ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "linear" }
  }), [prefersReducedMotion]);

  // Estilos de botón optimizados
  const getButtonStyles = useMemo(() => (index, isActive) => ({
    className: `flex items-center space-x-1 md:space-x-2 px-2 py-1 md:px-3 md:py-2 
                rounded-full transition-all duration-200 border ${
      isActive
        ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
        : 'text-slate-300 border-slate-500/50 hover:bg-slate-600/30 hover:border-yellow-400/50'
    }`,
    style: isActive ? {
      boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)'
    } : {}
  }), []);

  return (
    <div className="relative z-20 p-2 md:p-4">
      <nav className="max-w-4xl mx-auto">
        <div 
          className="glass-effect rounded-full px-3 py-2 md:px-6 md:py-3 shadow-lg"
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
            {/* Logo/Título optimizado */}
            <div className="flex items-center space-x-2">
              <motion.div
                animate={animationConfig.bookmarkRotation}
                transition={animationConfig.bookmarkTransition}
                style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
              >
                <Bookmark className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
              </motion.div>
              <span className="text-sm md:text-lg font-bold text-slate-200 font-serif">
                Mi Portfolio 
              </span>
            </div>

            {/* Navegación por páginas optimizada */}
            <div className="flex space-x-1 md:space-x-2">
              {pages.map((page, index) => {
                const IconComponent = page.icon;
                const isActive = index === currentPage;
                const buttonConfig = getButtonStyles(index, isActive);
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={buttonConfig.className}
                    style={buttonConfig.style}
                    whileHover={!isFlipping ? animationConfig.hover : {}}
                    whileTap={animationConfig.tap}
                    disabled={isFlipping}
                    aria-label={`Ir a ${page.title}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:block text-xs md:text-sm font-medium">
                      {page.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Contador de páginas optimizado */}
            <div className="text-slate-300 font-semibold text-xs md:text-sm min-w-[3rem] text-right">
              <span className="tabular-nums">
                {currentPage + 1} / {pages.length}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
});

BookNavigation.displayName = 'BookNavigation';

export default BookNavigation;