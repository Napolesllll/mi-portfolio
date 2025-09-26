import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionOverlay = ({ isFlipping, getAnimationConfig }) => {
  // Memoizamos configuración para no recalcular en cada render
  const animationConfig = useMemo(() => getAnimationConfig(), [getAnimationConfig]);

  // Variants para el overlay (entra / sale)
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Animación de fondo radial
  const backgroundAnimation = useMemo(
    () => ({
      background: [
        'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
        'radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 60%)',
        'radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
      ],
    }),
    []
  );

  return (
    <AnimatePresence>
      {isFlipping && (
        <motion.div
          className="absolute inset-0 bg-amber-50/20 backdrop-blur-sm z-40 pointer-events-none"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Efecto de ondas durante el cambio */}
          <motion.div
            className="absolute inset-0"
            animate={backgroundAnimation}
            transition={{
              duration: animationConfig.duration,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// React.memo evita renders innecesarios cuando props no cambian
export default memo(TransitionOverlay);
