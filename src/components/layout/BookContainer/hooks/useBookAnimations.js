import { useCallback, useMemo } from 'react';

const useBookAnimations = (isMobile, prefersReducedMotion) => {
  // Configuración de animación
  const getAnimationConfig = useCallback(() => {
    if (prefersReducedMotion) {
      return {
        duration: 0.1,
        ease: 'linear',
      };
    }

    return isMobile
      ? {
          duration: 0.6,
          ease: 'easeInOut',
        }
      : {
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        };
  }, [isMobile, prefersReducedMotion]);

  // Variantes de animación para efecto libro real (memoizado)
  const pageVariants = useMemo(
    () => ({
      enterNext: {
        rotateY: -180,
        x: '100%',
        opacity: 0,
        scale: 0.95,
        zIndex: 1,
        transformOrigin: 'left center',
      },
      enterPrev: {
        rotateY: 180,
        x: '-100%',
        opacity: 0,
        scale: 0.95,
        zIndex: 1,
        transformOrigin: 'right center',
      },
      center: {
        rotateY: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 2,
        transformOrigin: 'center center',
      },
      exitNext: {
        rotateY: 180,
        x: '-100%',
        opacity: 0,
        scale: 0.95,
        zIndex: 1,
        transformOrigin: 'right center',
      },
      exitPrev: {
        rotateY: -180,
        x: '100%',
        opacity: 0,
        scale: 0.95,
        zIndex: 1,
        transformOrigin: 'left center',
      },
    }),
    []
  );

  // Variantes optimizadas para móvil (memoizado)
  const mobilePageVariants = useMemo(
    () => ({
      enterNext: {
        x: '100%',
        opacity: 0,
        scale: 0.95,
      },
      enterPrev: {
        x: '-100%',
        opacity: 0,
        scale: 0.95,
      },
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
      },
      exitNext: {
        x: '-100%',
        opacity: 0,
        scale: 0.95,
      },
      exitPrev: {
        x: '100%',
        opacity: 0,
        scale: 0.95,
      },
    }),
    []
  );

  return {
    getAnimationConfig,
    pageVariants,
    mobilePageVariants,
  };
};

export default useBookAnimations;
