import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, BookOpen, Star } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 
                    flex items-center justify-center relative overflow-hidden">
      
      {/* Fondo con partículas */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Contenedor principal del loader */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        
        {/* Animación principal - Libro mágico abriéndose */}
        <div className="relative">
          {/* Círculo de carga exterior */}
          <motion.div
            className="w-32 h-32 border-4 border-amber-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 bg-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Círculo de carga interior */}
          <motion.div
            className="absolute inset-4 border-4 border-yellow-400/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>

          {/* Libro central */}
          <motion.div
            className="absolute inset-8 flex items-center justify-center"
            animate={{
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-12 h-12 text-amber-300" />
          </motion.div>
        </div>

        {/* Elementos flotantes alrededor */}
        <div className="relative w-64 h-64">
          {/* Varita mágica */}
          <motion.div
            className="absolute top-4 left-8"
            animate={{
              rotate: [0, 45, -45, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <Wand2 className="w-8 h-8 text-amber-400" />
          </motion.div>

          {/* Chispas */}
          <motion.div
            className="absolute top-8 right-12"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>

          {/* Estrella */}
          <motion.div
            className="absolute bottom-4 left-12"
            animate={{
              rotate: [0, 180, 360],
              y: [0, -15, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
          >
            <Star className="w-7 h-7 text-amber-500" />
          </motion.div>

          {/* Más chispas */}
          <motion.div
            className="absolute bottom-8 right-8"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </div>

        {/* Texto de carga */}
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold text-amber-200 mb-4 font-serif"
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparando la Magia...
          </motion.h2>

          {/* Puntos de carga animados */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-amber-400 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Frases de carga rotativas */}
          <motion.div
            className="mt-6 h-6"
            key="loading-text"
          >
            <motion.p
              className="text-amber-300 font-medium"
              animate={{
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 4,
                times: [0, 0.1, 0.9, 1],
                repeat: Infinity
              }}
            >
              Invocando componentes React...
            </motion.p>
          </motion.div>
        </div>

        {/* Barra de progreso mágica */}
        <div className="w-80 h-2 bg-amber-900/50 rounded-full overflow-hidden backdrop-blur-sm 
                        border border-amber-500/30">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full 
                       shadow-lg relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Efecto de brillo en la barra de progreso */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: [-100, 320] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
          </motion.div>
        </div>

        {/* Mensaje adicional */}
        <motion.p
          className="text-amber-400/80 text-sm font-medium"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ Cargando hechizos de desarrollo full-stack ✨
        </motion.p>
      </div>

      {/* Rayos de luz de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-amber-400/0 via-amber-400/30 to-amber-400/0"
            style={{ left: `${20 + i * 15}%` }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </div>

      {/* Ondas expansivas de fondo */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0, 3],
          opacity: [0.3, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut"
        }}
      >
        <div className="w-32 h-32 border border-amber-400/30 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0, 4],
          opacity: [0.2, 0]
        }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          ease: "easeOut"
        }}
      >
        <div className="w-24 h-24 border border-yellow-400/20 rounded-full" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;