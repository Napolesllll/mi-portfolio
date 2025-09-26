import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookContent = ({
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
  const agedPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  return (
    <div className="relative" style={{ perspective: '2000px' }}>
      {/* Sombra del libro */}
      <motion.div
        className="absolute -bottom-8 left-0 right-0 h-8 bg-amber-900/20 rounded-full blur-xl"
        animate={isFlipping && !prefersReducedMotion ? {
          scaleX: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        } : {}}
        transition={getAnimationConfig()}
      />

      {/* Cubierta del libro con efecto envejecido */}
      <div className="absolute -inset-4 rounded-3xl">
        {/* Lomo del libro */}
        <div 
          className="absolute -left-4 md:-left-6 top-0 bottom-0 w-8 md:w-12 
                     rounded-l-xl shadow-2xl z-10"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 30%, #D2B48C 100%)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3), 4px 0 8px rgba(0,0,0,0.2)'
          }}
        >
          {/* Textura de cuero en el lomo */}
          <div 
            className="h-full w-full rounded-l-xl opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
                radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Título en el lomo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap">
            <span className="text-amber-200 text-xs font-serif opacity-80">PORTFOLIO</span>
          </div>
        </div>

        {/* Bordes desgastados */}
        <div className="absolute -inset-2 border-2 border-amber-700/20 rounded-3xl pointer-events-none"></div>
      </div>

      {/* Libro principal con efecto de papel antiguo */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, rotateY: 10 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          ...(isFlipping && !prefersReducedMotion ? {
            x: flipDirection === 'next' ? [-10, 0, 10, 0] : [10, 0, -10, 0],
            y: [0, -5, 0, 5, 0]
          } : {})
        }}
        transition={{ 
          duration: 0.8,
          ...(isFlipping && { duration: getAnimationConfig().duration })
        }}
        style={{
          minHeight: isMobile ? '65vh' : '70vh',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          boxShadow: `
            0 25px 50px rgba(139, 69, 19, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(139, 69, 19, 0.1),
            0 0 20px rgba(139, 69, 19, 0.1)
          `
        }}
      >
        {/* Textura de papel envejecido */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: agedPaperTexture,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Manchas de café/tinta */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-brown-500/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-8 w-12 h-12 bg-amber-900/10 rounded-full blur-md"></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-brown-800/8 rounded-full blur-sm"></div>

        {/* Bordes desgastados del papel */}
        <div className="absolute inset-2 border border-amber-300/30 rounded-xl pointer-events-none"></div>
        
        {/* Líneas de cuaderno con efecto desvanecido */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {Array.from({ length: isMobile ? 15 : 25 }, (_, i) => (
            <div 
              key={i} 
              className="absolute left-16 right-8 h-px bg-amber-700/20"
              style={{ top: `${(i + 1) * (100 / (isMobile ? 15 : 25))}%` }}
            />
          ))}
        </div>

        {/* Margen izquierdo desgastado */}
        <div className="absolute inset-y-0 left-12 w-px bg-amber-600/20 opacity-60"></div>
        <div className="absolute inset-y-0 left-11 w-2 bg-gradient-to-r from-amber-600/10 to-transparent"></div>

        {/* Agujeros de encuadernación */}
        {!isMobile && (
          <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-evenly items-center py-8">
            {Array.from({ length: 3 }, (_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full border-2 border-amber-600/30"
                style={{
                  background: 'radial-gradient(circle, #8B4513 30%, transparent 70%)',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)'
                }}
              />
            ))}
          </div>
        )}

        {/* Contenido de la página con animación 3D mejorada */}
        <div className="relative h-full" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="wait" custom={flipDirection}>
            <motion.div
              key={currentPage}
              className="h-full relative"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              variants={isMobile || prefersReducedMotion ? mobilePageVariants : pageVariants}
              initial={flipDirection === 'next' ? 'enterNext' : 'enterPrev'}
              animate="center"
              exit={flipDirection === 'next' ? 'exitNext' : 'exitPrev'}
              transition={{
                ...getAnimationConfig(),
                ease: "easeInOut"
              }}
            >
              {/* Página actual */}
              <div 
                className="h-full bg-amber-50/80 backdrop-blur-sm rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)'
                }}
              >
                {/* Efecto de relieve en el papel */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-amber-200/10 pointer-events-none"></div>
                
                {/* Contenido */}
                <div className="relative z-10 h-full">
                  <CurrentPageComponent data={portfolioData} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Efecto de página volteándose - Solo para desktop */}
          {isFlipping && !isMobile && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 3
              }}
              animate={{
                rotateY: flipDirection === 'next' ? [0, -180] : [0, 180],
                scale: [1, 1.02, 1]
              }}
              transition={{
                ...getAnimationConfig(),
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
            >
              {/* Página que se voltea */}
              <div 
                className="h-full w-full absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  backfaceVisibility: 'hidden',
                  boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.1)'
                }}
              >
                {/* Textura de la página que voltea */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: agedPaperTexture }}
                />
                
                {/* Contenido del reverso (sombra del texto) */}
                <div className="h-full flex items-center justify-center opacity-40">
                  <div 
                    className="text-amber-600 font-serif text-lg md:text-2xl text-center"
                    style={{ textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)' }}
                  >
                    <div className="mb-4 transform rotate-180">
                      {flipDirection === 'next' ? pages[currentPage + 1]?.title : pages[currentPage - 1]?.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reverso de la página (cuando está volteada) */}
              <div 
                className="h-full w-full absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Textura del reverso */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: agedPaperTexture }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Efecto de brillo durante el volteo */}
        {isFlipping && !isMobile && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-2xl"
            initial={{ x: flipDirection === 'next' ? '-100%' : '100%' }}
            animate={{ x: flipDirection === 'next' ? '100%' : '-100%' }}
            transition={{ duration: getAnimationConfig().duration * 0.7 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default BookContent;