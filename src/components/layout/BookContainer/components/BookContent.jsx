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
  CurrentPageComponent
}) => {
  const darkPaperTexture = useMemo(() =>
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
    []);

  const animationConfig = useMemo(() => ({
    duration: prefersReducedMotion ? 0.1 : (isMobile ? 0.4 : 0.6),
    ease: "easeInOut"
  }), [prefersReducedMotion, isMobile]);

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

  // altura más grande del libro
  const fixedHeight = isMobile ? '80vh' : '90vh';

  return (
    <div className="relative flex justify-center items-center" style={{ perspective: isMobile ? '1000px' : '2000px' }}>
      {/* Lomo */}
      <div className="absolute -inset-2 md:-inset-4 rounded-2xl md:rounded-3xl">
        <div
          className="absolute -left-2 md:-left-6 top-0 bottom-0 w-6 md:w-12 
                     rounded-l-lg md:rounded-l-xl shadow-xl z-10"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #374151 30%, #4b5563 100%)',
            boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.4), 2px 0 4px rgba(0,0,0,0.2)'
          }}
        >
          {/* textura */}
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
          {/* título */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap">
            <span className={`text-yellow-400 font-serif opacity-80 ${isMobile ? 'text-[0.6rem]' : 'text-xs'}`}>
              PORTFOLIO
            </span>
          </div>
        </div>
      </div>

      {/* Libro */}
      <motion.div
        className="relative rounded-xl md:rounded-2xl shadow-xl w-full max-w-[95%] md:max-w-4xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0, rotateY: isMobile ? 0 : 5 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotateY: 0
        }}
        transition={{
          duration: 0.6,
          ...(isFlipping && { duration: animationConfig.duration })
        }}
        style={{
          height: fixedHeight,        // altura fija más grande
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          boxShadow: `0 15px 30px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,215,0,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.2),
            0 0 15px rgba(147,51,234,0.15)`
        }}
      >
        {/* textura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: darkPaperTexture,
            backgroundSize: '150px 150px'
          }}
        />

        {/* Contenido */}
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
              {/* Página con scroll interno */}
              <div
                className="h-full backdrop-blur-sm rounded-xl md:rounded-2xl relative overflow-y-auto"
                style={{
                  background: 'linear-gradient(135deg, #1e293b/85 0%, #334155/75 50%, #475569/85 100%)'
                }}
              >
                <div className="relative z-10 h-full px-4 md:px-6 py-4">
                  <CurrentPageComponent data={portfolioData} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
});

BookContent.displayName = 'BookContent';
export default BookContent;
