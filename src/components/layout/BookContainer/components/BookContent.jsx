import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookContent = memo(({
  currentPage,
  flipDirection,
  isFlipping,
  isMobile,
  prefersReducedMotion,
  getAnimationConfig,
  pages,
  portfolioData,
  CurrentPageComponent,
  pageVariants,
  mobilePageVariants
}) => {
  // Memoizar texturas para evitar recrearlas
  const darkPaperTexture = useMemo(() => 
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
  []);

  // Configuraciones de animación optimizadas
  const animationConfig = useMemo(() => ({
    duration: prefersReducedMotion ? 0.1 : (isMobile ? 0.4 : 0.6),
    ease: "easeInOut"
  }), [prefersReducedMotion, isMobile]);

  // Variantes de página optimizadas
  const optimizedPageVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        enterNext: { opacity: 0 },
        enterPrev: { opacity: 0 },
        center: { opacity: 1 },
        exitNext: { opacity: 0 },
        exitPrev: { opacity: 0 }
      };
    }

    if (isMobile) {
      return {
        enterNext: { x: 30, opacity: 0 },
        enterPrev: { x: -30, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exitNext: { x: -30, opacity: 0 },
        exitPrev: { x: 30, opacity: 0 }
      };
    }

    return {
      enterNext: { rotateY: 90, x: 50, opacity: 0 },
      enterPrev: { rotateY: -90, x: -50, opacity: 0 },
      center: { rotateY: 0, x: 0, opacity: 1 },
      exitNext: { rotateY: -90, x: -50, opacity: 0 },
      exitPrev: { rotateY: 90, x: 50, opacity: 0 }
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="relative" style={{ perspective: isMobile ? '1000px' : '2000px' }}>
      {/* Sombra del libro optimizada */}
      <motion.div
        className="absolute -bottom-6 left-0 right-0 h-6 bg-black/30 rounded-full blur-lg"
        animate={isFlipping && !prefersReducedMotion ? {
          scaleX: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={animationConfig}
        style={{ willChange: isFlipping ? 'transform, opacity' : 'auto' }}
      />

      {/* Cubierta del libro optimizada */}
      <div className="absolute -inset-2 md:-inset-4 rounded-2xl md:rounded-3xl">
        {/* Lomo del libro */}
        <div 
          className="absolute -left-2 md:-left-6 top-0 bottom-0 w-6 md:w-12 
                     rounded-l-lg md:rounded-l-xl shadow-xl z-10"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #374151 30%, #4b5563 100%)',
            boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.4), 2px 0 4px rgba(0,0,0,0.2)',
            willChange: 'auto'
          }}
        >
          {/* Textura de cuero en el lomo */}
          <div 
            className="h-full w-full rounded-l-lg md:rounded-l-xl opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(255,215,0,0.2) 2px, transparent 2px),
                radial-gradient(circle at 70% 80%, rgba(147,51,234,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '15px 15px'
            }}
          />
          
          {/* Título en el lomo - solo en desktop */}
          {!isMobile && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap">
              <span className="text-yellow-400 text-xs font-serif opacity-70">PORTFOLIO</span>
            </div>
          )}
        </div>

        {/* Bordes desgastados */}
        <div className="absolute -inset-1 border border-slate-600/20 rounded-2xl md:rounded-3xl pointer-events-none"></div>
      </div>

      {/* Libro principal optimizado */}
      <motion.div
        className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl"
        initial={{ scale: 0.95, opacity: 0, rotateY: isMobile ? 0 : 5 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          ...(isFlipping && !prefersReducedMotion ? {
            x: flipDirection === 'next' ? [-5, 0, 5, 0] : [5, 0, -5, 0],
            y: [0, -2, 0, 2, 0]
          } : {})
        }}
        transition={{ 
          duration: 0.6,
          ...(isFlipping && { duration: animationConfig.duration })
        }}
        style={{
          minHeight: isMobile ? '60vh' : '65vh',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          boxShadow: `
            0 15px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 215, 0, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            0 0 15px rgba(147, 51, 234, 0.15)
          `,
          willChange: isFlipping ? 'transform' : 'auto'
        }}
      >
        {/* Textura de papel envejecido */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: darkPaperTexture,
            backgroundSize: '150px 150px'
          }}
        />

        {/* Efectos de iluminación en las esquinas optimizados */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-purple-500/8 rounded-full blur-lg"></div>
        <div className="absolute bottom-16 left-6 w-10 h-10 bg-yellow-400/10 rounded-full blur-md"></div>
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-cyan-400/8 rounded-full blur-sm"></div>

        {/* Bordes brillantes del papel */}
        <div className="absolute inset-2 border border-slate-500/20 rounded-lg pointer-events-none"></div>
        
        {/* Líneas de cuaderno optimizadas */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {Array.from({ length: isMobile ? 12 : 20 }, (_, i) => (
            <div 
              key={i} 
              className="absolute left-12 right-6 h-px bg-slate-400/20"
              style={{ top: `${(i + 1) * (100 / (isMobile ? 12 : 20))}%` }}
            />
          ))}
        </div>

        {/* Margen izquierdo */}
        <div className="absolute inset-y-0 left-8 md:left-12 w-px bg-slate-500/20 opacity-50"></div>
        <div className="absolute inset-y-0 left-7 md:left-11 w-2 bg-gradient-to-r from-slate-500/10 to-transparent"></div>

        {/* Agujeros de encuadernación - solo desktop */}
        {!isMobile && (
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-evenly items-center py-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-slate-500/30"
                style={{
                  background: 'radial-gradient(circle, #374151 30%, transparent 70%)',
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.4)'
                }}
              />
            ))}
          </div>
        )}

        {/* Contenido de la página optimizado */}
        <div className="relative h-full" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="wait" custom={flipDirection}>
            <motion.div
              key={currentPage}
              className="h-full relative"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              variants={optimizedPageVariants}
              initial={flipDirection === 'next' ? 'enterNext' : 'enterPrev'}
              animate="center"
              exit={flipDirection === 'next' ? 'exitNext' : 'exitPrev'}
              transition={animationConfig}
            >
              {/* Página actual */}
              <div 
                className="h-full backdrop-blur-sm rounded-xl md:rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1e293b/85 0%, #334155/75 50%, #475569/85 100%)'
                }}
              >
                {/* Efecto de relieve en el papel */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 via-transparent to-purple-500/3 pointer-events-none"></div>
                
                {/* Contenido */}
                <div className="relative z-10 h-full">
                  <CurrentPageComponent data={portfolioData} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Efecto de página volteándose - Solo para desktop y sin movimiento reducido */}
          {isFlipping && !isMobile && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 3
              }}
              animate={{
                rotateY: flipDirection === 'next' ? [0, -180] : [0, 180],
                scale: [1, 1.01, 1]
              }}
              transition={{
                duration: animationConfig.duration,
                ease: "easeInOut"
              }}
            >
              {/* Página que se voltea */}
              <div 
                className="h-full w-full absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                  backfaceVisibility: 'hidden',
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Textura de la página que voltea */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: darkPaperTexture }}
                />
                
                {/* Contenido del reverso */}
                <div className="h-full flex items-center justify-center opacity-40">
                  <div 
                    className="text-slate-400 font-serif text-lg md:text-xl text-center"
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                  >
                    <div className="mb-2 transform rotate-180">
                      {flipDirection === 'next' ? pages[currentPage + 1]?.title : pages[currentPage - 1]?.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reverso de la página */}
              <div 
                className="h-full w-full absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Textura del reverso */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{ backgroundImage: darkPaperTexture }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Efecto de brillo durante el volteo - optimizado */}
        {isFlipping && !isMobile && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/15 to-transparent pointer-events-none rounded-xl md:rounded-2xl"
            initial={{ x: flipDirection === 'next' ? '-100%' : '100%' }}
            animate={{ x: flipDirection === 'next' ? '100%' : '-100%' }}
            transition={{ duration: animationConfig.duration * 0.8 }}
            style={{ willChange: 'transform' }}
          />
        )}
      </motion.div>
    </div>
  );
});

BookContent.displayName = 'BookContent';

export default BookContent;