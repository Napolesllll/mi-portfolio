import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionOverlay = ({ isFlipping, getAnimationConfig }) => {
  return (
    <AnimatePresence>
      {isFlipping && (
        <motion.div
          className="absolute inset-0 bg-amber-50/20 backdrop-blur-sm z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Efecto de ondas durante el cambio */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 60%)',
                'radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: getAnimationConfig().duration, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;