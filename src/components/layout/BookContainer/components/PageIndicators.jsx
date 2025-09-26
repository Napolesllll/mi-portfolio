import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const PageIndicators = memo(({ pages, currentPage, goToPage, isFlipping, prefersReducedMotion }) => {
  // Memoizar textura
  const darkTexture = useMemo(() => 
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
  []);

  // Configuraciones de animación optimizadas
  const animationConfig = useMemo(() => ({
    hover: prefersReducedMotion ? {} : { 
      scale: 1.15,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  }), [prefersReducedMotion]);

  // Estilos de indicador optimizados
  const getIndicatorStyles = useMemo(() => (index, isActive) => ({
    className: `w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 scale-110 shadow-lg'
        : 'bg-slate-600 border-slate-500/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-400'
    }`,
    style: {
      boxShadow: isActive 
        ? '0 0 12px rgba(147, 51, 234, 0.5)' 
        : '0 2px 6px rgba(0, 0, 0, 0.2)',
      willChange: isActive ? 'box-shadow, transform' : 'transform'
    }
  }), []);

  return (
    <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
      <div 
        className="flex space-x-3 backdrop-blur-md border border-purple-500/25 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg"
        style={{
          background: 'rgba(40, 40, 40, 0.75)',
          backgroundImage: darkTexture,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(147, 51, 234, 0.2)'
        }}
      >
        {pages.map((_, index) => {
          const isActive = index === currentPage;
          const indicatorConfig = getIndicatorStyles(index, isActive);
          
          return (
            <motion.button
              key={index}
              onClick={() => goToPage(index)}
              className={indicatorConfig.className}
              style={indicatorConfig.style}
              whileHover={!isFlipping ? animationConfig.hover : {}}
              whileTap={animationConfig.tap}
              disabled={isFlipping}
              aria-label={`Ir a página ${index + 1}`}
              aria-current={isActive ? 'page' : undefined}
            />
          );
        })}
      </div>
    </div>
  );
});

PageIndicators.displayName = 'PageIndicators';

export default PageIndicators;