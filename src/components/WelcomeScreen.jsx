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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white px-4"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
            backgroundImage: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%), ${darkPaperTexture}`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Loader de varita mágica con código flotante */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6 md:mb-8">
            {/* Círculo exterior pulsante */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Círculo medio */}
            <motion.div
              className="absolute inset-2 rounded-full border border-cyan-400/40"
              animate={{
                scale: [1.1, 0.9, 1.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Varita mágica central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Vara */}
                <div className="w-1 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full mx-auto" />
                
                {/* Estrella en la punta */}
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gradient-to-r from-purple-400 to-cyan-400 transform rotate-45 rounded-sm" />
                </motion.div>
                
                {/* Destello */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full blur-sm" />
                </motion.div>
              </motion.div>
            </div>

            {/* Partículas flotantes de código */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xs sm:text-sm text-purple-400/60 font-mono select-none"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  top: `${15 + (i % 4) * 25}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                {['</>', '{}', '()', '[]', '=>', '&&'][i]}
              </motion.div>
            ))}

            {/* Ondas de energía */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute inset-0 rounded-full border border-purple-500/20"
                animate={{
                  scale: [0.8, 2.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-4 md:mt-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent text-center leading-tight"
          >
            Bienvenido a mi Portfolio ✨
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 text-center max-w-md"
          >
            Ingresando experiencia mágica...
          </motion.p>

          {/* Barra de progreso mágica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 md:mt-8 w-48 sm:w-64 md:w-80 h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full"
              animate={{
                x: ['-100%', '100%'],
                background: [
                  'linear-gradient(90deg, #a855f7, #06b6d4, #a855f7)',
                  'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
                  'linear-gradient(90deg, #a855f7, #06b6d4, #a855f7)',
                ],
              }}
              transition={{
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                background: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            />
            
            {/* Brillo en la barra */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Texto de carga animado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-4 text-xs sm:text-sm text-slate-400 font-mono"
          >
            <motion.span
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Inicializando magia del código
            </motion.span>
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;