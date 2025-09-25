import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Clock, 
  Users, 
  Award,
  Zap,
  Eye,
  Calendar,
  Tag,
  TrendingUp,
  Code2,
  Sparkles
} from 'lucide-react';

const ProjectsPage = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const { projects } = data || {};

  // Filtros de categorías
  const categories = {
    all: { label: 'Todos Proyectos', icon: Sparkles },
    'Full Stack': { label: 'Full Stack', icon: Code2 },
    'Frontend': { label: 'Frontend', icon: Eye },
    'Backend': { label: 'Backend', icon: Zap }
  };

  // Filtrar proyectos
  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project.category === filter
  ) || [];

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  // Componente de tarjeta de proyecto
  const ProjectCard = ({ project, index }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="group relative bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden 
                   border border-amber-300 hover:border-amber-500 shadow-lg hover:shadow-2xl 
                   transition-all duration-300 cursor-pointer"
        whileHover={{ 
          y: -10, 
          scale: 1.02,
          rotateX: 5,
          rotateY: 2
        }}
        onClick={() => setSelectedProject(project)}
        style={{ perspective: '1000px' }}
      >
        {/* Imagen del proyecto */}
        <div className="relative h-48 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 
                        overflow-hidden">
          {/* Placeholder para imagen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl opacity-20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {project.category === 'Full Stack' ? '🚀' : 
               project.category === 'Frontend' ? '🎨' : '⚡'}
            </motion.div>
          </div>
          
          {/* Overlay con efectos */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge de estado */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              project.status === 'Completado' 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-black'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Badge de categoría */}
          <div className="absolute top-4 right-4">
            <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {project.category}
            </span>
          </div>

          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
            animate={{ x: [-100, 300] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "linear"
            }}
          />
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 
                           transition-colors duration-300">
              {project.title}
            </h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              className="text-amber-600"
            >
              <Star className="w-5 h-5" />
            </motion.div>
          </div>

          <p className="text-amber-800 font-medium text-sm mb-3">
            {project.subtitle}
          </p>

          <p className="text-amber-700 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tecnologías */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="bg-amber-200 text-amber-800 px-2 py-1 
                                     rounded text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-amber-600 text-xs font-medium">
                +{project.technologies.length - 4} más
              </span>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-amber-600 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{project.team}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-3">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoUrl, '_blank');
              }}
              className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 
                       text-white px-3 py-2 rounded text-sm font-semibold 
                       transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
              className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-800 
                       text-white px-3 py-2 rounded text-sm font-semibold 
                       transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              <span>Código</span>
            </motion.button>
          </div>
        </div>

        {/* Efectos decorativos */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 
                        rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Modal de proyecto detallado
  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/95 backdrop-blur rounded-lg max-w-4xl w-full max-h-[90vh] 
                     overflow-y-auto border-2 border-amber-300 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="p-6 border-b border-amber-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-2">{project.title}</h2>
                <p className="text-amber-700 font-semibold">{project.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-amber-600 hover:text-amber-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1 text-amber-600">
                <Calendar className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-600">
                <Users className="w-4 h-4" />
                <span>{project.team}</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-600">
                <Tag className="w-4 h-4" />
                <span>{project.category}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === 'Completado' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-black'
              }`}>
                {project.status}
              </span>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            {/* Descripción detallada */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-3">📜 Historia del Proyecto</h3>
              <p className="text-amber-800 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Características principales */}
            {project.features && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 mb-3">✨ Características Mágicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 text-amber-700 p-2 
                               bg-amber-50 rounded-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-lg">{feature.split(' ')[0]}</span>
                      <span className="text-sm">{feature.substring(feature.indexOf(' ') + 1)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tecnologías utilizadas */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-3">🔧 Hechizos Utilizados</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white 
                             px-3 py-2 rounded-lg font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Logros destacados */}
            {project.highlights && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-900 mb-3">🏆 Logros Épicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-3 p-3 bg-gradient-to-r 
                               from-green-100 to-emerald-100 rounded-lg border border-green-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Award className="w-6 h-6 text-green-600" />
                      <span className="text-green-800 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-amber-200">
              <motion.button
                onClick={() => window.open(project.demoUrl, '_blank')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r 
                         from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700
                         text-white px-6 py-3 rounded-lg font-semibold shadow-lg 
                         transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver Demo en Vivo</span>
              </motion.button>

              <motion.button
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="flex items-center justify-center space-x-2 bg-gray-700 
                         hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold 
                         shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5" />
                <span>Ver Código Fuente</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-full p-4 overflow-y-auto">
      {/* Título principal */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-block mb-4"
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Code2 className="w-16 h-16 text-amber-600 mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
          Mis Proyectos
        </h2>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          Cada proyecto es un hechizo único, creado con pasión y tecnología de vanguardia. 
          Explora las maravillas digitales que he construido.
        </p>
      </motion.div>

      {/* Filtros de categoría */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {Object.entries(categories).map(([key, category]) => {
          const IconComponent = category.icon;
          const isActive = filter === key;
          
          return (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold 
                         transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                  : 'bg-white/30 text-amber-700 hover:bg-amber-500/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Contador de proyectos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-6"
      >
        <p className="text-amber-600 font-medium">
          <TrendingUp className="w-4 h-4 inline mr-2" />
          {filteredProjects.length} proyectos encontrados
        </p>
      </motion.div>

      {/* Grid de proyectos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mensaje cuando no hay proyectos */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-amber-600 font-semibold">
            No se encontraron hechizos en esta categoría
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 text-amber-500 hover:text-amber-700 font-medium underline"
          >
            Ver todos los proyectos
          </button>
        </motion.div>
      )}

      {/* Estadísticas de proyectos */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg p-6 
                   backdrop-blur-sm border border-amber-300"
      >
        <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">
          🎯 Estadísticas de Proyectos
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {projects?.length || 4}
            </motion.div>
            <p className="text-amber-700 font-semibold">Proyectos Total</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            >
              {projects?.filter(p => p.status === 'Completado').length || 3}
            </motion.div>
            <p className="text-amber-700 font-semibold">Completados</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            >
              15+
            </motion.div>
            <p className="text-amber-700 font-semibold">Tecnologías</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-amber-800 mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💫
            </motion.div>
            <p className="text-amber-700 font-semibold">Innovación</p>
          </div>
        </div>
      </motion.div>

      {/* Modal de proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;