import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.8 } },
};

const titleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.8 } },
};

const WelcomeScreen = ({ show }) => {
  const darkPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome-screen"
          variants={containerVariants}
          initial="hidden"
          animate="hidden"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
            backgroundImage: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%), ${darkPaperTexture}`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Loader libro */}
          <div className="relative w-20 h-20 md:w-28 md:h-28 perspective-1000">
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 rounded-l-md origin-right"
              style={{
                background:
                  "linear-gradient(to bottom right, #6d28d9, #9333ea)",
                backfaceVisibility: "hidden",
              }}
              animate={{ rotateY: [0, -180, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/2 rounded-r-md"
              style={{
                background:
                  "linear-gradient(to bottom right, #1e293b, #334155)",
              }}
            />
          </div>

          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent"
          >
            Bienvenido a mi Portfolio 🚀
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 text-base md:text-lg text-slate-300"
          >
            Cargando tu experiencia...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
