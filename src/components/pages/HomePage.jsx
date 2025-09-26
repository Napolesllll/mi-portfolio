import React, { memo, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  Code, 
  Globe, 
  Server, 
  Database, 
  Star,
  ArrowDown,
  Coffee,
  X
} from 'lucide-react';

const HomePage = memo(({ data, goToProjects }) => {
  const { personal, stats } = data || {};

  const [showModal, setShowModal] = useState(false);

  // Animaciones
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }), []);

  // Tecnologías
  const techIcons = useMemo(() => [
    { icon: Code, name: "React.js", color: "text-cyan-400" },
    { icon: Globe, name: "Next.js", color: "text-slate-300" },
    { icon: Server, name: "Node.js", color: "text-emerald-400" },
    { icon: Database, name: "PostgreSQL", color: "text-blue-400" }
  ], []);

  // Cards
  const StatCard = memo(({ value, label, delay = 0, icon: IconComponent }) => (
    <div className="backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg border border-purple-500/25 bg-[rgba(30,30,30,0.75)]">
      <motion.div
        className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 mb-1 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /> : value}
      </motion.div>
      <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm font-semibold text-center">{label}</p>
    </div>
  ));

  const TechCard = memo(({ tech, index }) => (
    <motion.div
      className="flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-full shadow-lg border border-slate-700 hover:shadow-xl transition-all duration-200"
      style={{ background: 'rgba(40, 40, 40, 0.75)' }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      animate={{ y: [0, -3, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 3, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <tech.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${tech.color}`} />
      <span className="text-slate-300 font-semibold text-xs sm:text-sm md:text-base">{tech.name}</span>
    </motion.div>
  ));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-3 sm:px-4 py-6">
      {/* Decoraciones */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Foto arriba derecha */}
        <div
          className="absolute top-6 right-6 w-28 h-28 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full border-2 border-purple-500/25 overflow-hidden bg-slate-800 cursor-pointer pointer-events-auto"
          onClick={() => setShowModal(true)}
        >
          <img
            src="/mifoto.jpg"
            alt="Foto personal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Círculos decorativos */}
        <motion.div
          className="absolute bottom-10 left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-2 border-cyan-500/15 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Modal de foto */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            {/* Botón X */}
            <motion.button
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.img
              src="/mifoto.jpg"
              alt="Foto personal grande"
              className="w-full max-w-[600px] max-h-[80%] rounded-xl shadow-lg object-cover transform transition-transform duration-500 hover:scale-110"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido */}
      <motion.div
        className="text-center max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icono principal */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6 relative">
          <motion.div
            animate={{ rotate: [0, 10, -10, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Wand2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-purple-400 mx-auto drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Saludo con nombre */}
        <motion.p variants={itemVariants} className="text-purple-400 text-sm sm:text-lg md:text-xl font-semibold mb-2 animate-pulse">
          ✨ ¡Bienvenido! soy ✨
        </motion.p>

        {/* Nombre grande */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 font-serif relative px-2"
        >
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {personal?.name || "Tu Nombre"}
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.h2 variants={itemVariants} className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-300 mb-3 sm:mb-4 font-serif italic">
          {personal?.title || "Mago del Desarrollo Full Stack"}
        </motion.h2>

        <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
          {personal?.description || "Conjuro aplicaciones web modernas con la magia de React.js y Next.js..."}
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-6 md:mb-8 px-2 sm:px-0">
          <StatCard value={stats?.experience || "4+"} label="Años" delay={0} />
          <StatCard value={stats?.projects || "25+"} label="Proyectos" delay={0.5} />
          <StatCard value={stats?.clients || "15+"} label="Clientes" delay={1} />
          <StatCard label="Café" delay={1.5} icon={Coffee} />
        </motion.div>

        {/* Tecnologías */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 px-2">
          {techIcons.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>

        {/* Botón Ver Proyectos */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center">
          <motion.button
            onClick={goToProjects}
            className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-transparent border-2 border-purple-500 text-slate-300 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-200 flex items-center space-x-2 group w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Ver Proyectos</span>
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-6 md:mt-10 text-slate-400 font-medium text-xs sm:text-sm md:text-base animate-pulse">
          ← Desliza las páginas para descubrir →
        </motion.p>
      </motion.div>
    </div>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;
