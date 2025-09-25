import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  Code, 
  Globe, 
  Server, 
  Database, 
  Sparkles,
  Star,
  Download,
  ArrowDown,
  Coffee
} from 'lucide-react';

const HomePage = ({ data }) => {
  const { personal, skills, stats } = data || {};

  // Animaciones de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Iconos de tecnologías
  const techIcons = [
    { icon: Code, name: "React.js", color: "text-blue-600" },
    { icon: Globe, name: "Next.js", color: "text-black" },
    { icon: Server, name: "Node.js", color: "text-green-600" },
    { icon: Database, name: "PostgreSQL", color: "text-blue-700" }
  ];

  return (
    <div className="min-h-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Círculos decorativos */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 border-2 border-amber-400/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 border-2 border-yellow-400/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div
        className="text-center max-w-4xl mx-auto px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Varita mágica animada */}
        <motion.div
          variants={itemVariants}
          className="mb-8 relative"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <Wand2 className="w-20 h-20 text-amber-500 mx-auto drop-shadow-lg" />
          </motion.div>
          
          {/* Chispas alrededor de la varita */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Saludo mágico */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.p
            className="text-amber-600 text-xl font-semibold mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Bienvenido! ✨
          </motion.p>
        </motion.div>

        {/* Nombre principal */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-amber-900 mb-4 font-serif relative"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
        >
          <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            {personal?.name || "Tu Nombre "}
          </span>
          
          {/* Efecto de brillo en el texto */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "linear"
            }}
          />
        </motion.h1>

        {/* Título/Posición */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-amber-700 mb-6 font-serif italic"
        >
          {personal?.title || "Mago del Desarrollo Full Stack"}
        </motion.h2>

        {/* Descripción */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {personal?.description || 
           "Conjuro aplicaciones web modernas con la magia de React.js, Next.js y Node.js. " +
           "Cada línea de código es un hechizo que transforma ideas en realidades digitales extraordinarias."
          }
        </motion.p>

        {/* Estadísticas mágicas */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-amber-300">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stats?.experience || "4+"}
            </motion.div>
            <p className="text-amber-700 text-sm font-semibold">Años de Experiencia</p>
          </div>

          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-amber-300">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            >
              {stats?.projects || "25+"}
            </motion.div>
            <p className="text-amber-700 text-sm font-semibold">Proyectos Creados</p>
          </div>

          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-amber-300">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            >
              {stats?.clients || "15+"}
            </motion.div>
            <p className="text-amber-700 text-sm font-semibold">Clientes Satisfechos</p>
          </div>

          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-amber-300">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-1 flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Coffee className="w-8 h-8" />
            </motion.div>
            <p className="text-amber-700 text-sm font-semibold">Tazas de Café</p>
          </div>
        </motion.div>

        {/* Tecnologías principales */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-3 
                         rounded-full shadow-lg border border-amber-300 hover:shadow-xl 
                         transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <tech.icon className={`w-6 h-6 ${tech.color}`} />
              <span className="text-amber-800 font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="magic-button flex items-center space-x-2 group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Descargar CV </span>
            <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-amber-500 text-amber-700 
                     font-semibold rounded-lg hover:bg-amber-500 hover:text-white 
                     transition-all duration-300 flex items-center space-x-2 group"
            whileHover={{ 
              scale: 1.05,
              borderColor: "#FFBF00"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-5 h-5 group-hover:animate-spin" />
            <span>Ver Hechizos</span>
            <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
          </motion.button>
        </motion.div>

        {/* Mensaje de invitación */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.p
            className="text-amber-600 font-medium"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⬇️ Desliza las páginas para descubrir ⬇️
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Estrellas flotantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ))}

        {/* Destellos mágicos */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-4 h-4"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-full h-full text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Ondas mágicas de fondo */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 2, 1],
          opacity: [0, 0.1, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-96 h-96 border border-amber-400/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0, 0.15, 0],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-64 h-64 border border-yellow-400/20 rounded-full" />
      </motion.div>
    </div>
  );
};

export default HomePage;