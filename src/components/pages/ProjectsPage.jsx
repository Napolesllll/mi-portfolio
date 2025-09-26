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
  Sparkles,
  ShoppingCart,
  Plane,
  Globe
} from 'lucide-react';

const ProjectsPage = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const { projects = [] } = data || {};

  // Filtros de categorías
  const categories = {
    all: { label: 'Todos Proyectos', icon: Sparkles },
    'Full Stack': { label: 'Full Stack', icon: Code2 },
    'Frontend': { label: 'Frontend', icon: Eye },
    'Backend': { label: 'Backend', icon: Zap }
  };

  // Filtrar proyectos
  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

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

  // Iconos personalizados por proyecto
  const getProjectIcon = (project) => {
    if (project.title?.toLowerCase().includes('mascot') || project.demoUrl?.includes('mascoticas')) 
      return <ShoppingCart className="w-6 h-6" />;
    if (project.title?.toLowerCase().includes('explore') || project.demoUrl?.includes('explore-heaven')) 
      return <Plane className="w-6 h-6" />;
    return <Globe className="w-6 h-6" />;
  };

  // Determinar categoría basada en tecnologías
  const getProjectCategory = (project) => {
    if (project.category) return project.category;
    
    const techStack = project.technologies?.join(' ').toLowerCase() || '';
    
    if (techStack.includes('node') && techStack.includes('react')) return 'Full Stack';
    if (techStack.includes('react') || techStack.includes('frontend')) return 'Frontend';
    if (techStack.includes('node') || techStack.includes('backend')) return 'Backend';
    return 'Full Stack';
  };

  // Función para abrir demo
  const openDemo = (url, e) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Función para abrir GitHub
  const openGitHub = (url, e) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Componente de tarjeta de proyecto
  const ProjectCard = ({ project, index }) => {
    const projectCategory = getProjectCategory(project);
    const projectStatus = project.status || 'Completado';
    const projectDuration = project.duration || 'Variable';
    const projectTeam = project.team || 'Individual';
    const hasDemo = project.demoUrl && project.demoUrl !== '#';
    const hasGitHub = project.githubUrl && project.githubUrl !== '#';

    return (
      <motion.div
        variants={itemVariants}
        className="group relative backdrop-blur-sm rounded-lg overflow-hidden 
                   border border-purple-500/30 hover:border-purple-400 shadow-lg hover:shadow-2xl 
                   transition-all duration-300 cursor-pointer"
        style={{
          background: 'rgba(30, 30, 30, 0.8)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
        whileHover={{ 
          y: -10, 
          scale: 1.02,
          rotateX: 5,
          rotateY: 2,
          boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)'
        }}
        onClick={() => setSelectedProject(project)}
      >
        {/* Imagen del proyecto */}
        <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-purple-800/20 
                        overflow-hidden">
          {/* Placeholder para imagen con icono personalizado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl opacity-30 flex flex-col items-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {getProjectIcon(project)}
              <span className="text-lg mt-2 opacity-70">{projectCategory}</span>
            </motion.div>
          </div>
          
          {/* Overlay con efectos */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge de estado */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              projectStatus === 'Completado' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-yellow-500 text-black'
            }`}>
              {projectStatus}
            </span>
          </div>

          {/* Badge de categoría */}
          <div className="absolute top-4 right-4">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {projectCategory}
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
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-300 
                           transition-colors duration-300">
              {project.title || 'Proyecto Sin Título'}
            </h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              className="text-purple-400"
            >
              <Star className="w-5 h-5" />
            </motion.div>
          </div>

          <p className="text-slate-300 font-medium text-sm mb-3">
            {project.subtitle || project.description?.substring(0, 60) + '...'}
          </p>

          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
            {project.description || 'Descripción del proyecto no disponible.'}
          </p>

          {/* Tecnologías */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 4).map((tech, i) => (
              <span key={i} className="bg-slate-700 text-slate-300 border border-slate-600 px-2 py-1 
                                     rounded text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.technologies?.length > 4 && (
              <span className="text-purple-400 text-xs font-medium">
                +{project.technologies.length - 4} más
              </span>
            )}
            {(!project.technologies || project.technologies.length === 0) && (
              <span className="text-slate-500 text-xs">Tecnologías no especificadas</span>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{projectDuration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{projectTeam}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-3">
            <motion.button
              onClick={(e) => openDemo(project.demoUrl, e)}
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm font-semibold 
                       transition-all duration-300 ${
                         hasDemo
                           ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg cursor-pointer'
                           : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                       }`}
              whileHover={{ scale: hasDemo ? 1.05 : 1 }}
              whileTap={{ scale: hasDemo ? 0.95 : 1 }}
              title={hasDemo ? 'Ver demo en vivo' : 'Demo no disponible'}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.button>

            <motion.button
              onClick={(e) => openGitHub(project.githubUrl, e)}
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm font-semibold 
                       transition-all duration-300 ${
                         hasGitHub
                           ? 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg cursor-pointer'
                           : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                       }`}
              whileHover={{ scale: hasGitHub ? 1.05 : 1 }}
              whileTap={{ scale: hasGitHub ? 0.95 : 1 }}
              title={hasGitHub ? 'Ver código fuente' : 'Código no disponible'}
            >
              <Github className="w-4 h-4" />
              <span>Código</span>
            </motion.button>
          </div>
        </div>

        {/* Efectos decorativos */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 
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

    const projectCategory = getProjectCategory(project);
    const projectStatus = project.status || 'Completado';
    const projectDuration = project.duration || 'Variable';
    const projectTeam = project.team || 'Individual';
    const hasDemo = project.demoUrl && project.demoUrl !== '#';
    const hasGitHub = project.githubUrl && project.githubUrl !== '#';

    return (
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="backdrop-blur rounded-lg max-w-4xl w-full max-h-[90vh] 
                     overflow-y-auto border-2 border-purple-500/30 shadow-2xl"
          style={{
            background: 'rgba(20, 20, 20, 0.95)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-2">{project.title || 'Proyecto Sin Título'}</h2>
                <p className="text-slate-300 font-semibold">{project.subtitle || ''}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 text-2xl font-bold transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{projectDuration}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <Users className="w-4 h-4" />
                <span>{projectTeam}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <Tag className="w-4 h-4" />
                <span>{projectCategory}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                projectStatus === 'Completado' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-yellow-500 text-black'
              }`}>
                {projectStatus}
              </span>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            {/* Descripción detallada */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-100 mb-3">📜 Descripción del Proyecto</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.longDescription || project.description || 'Descripción detallada no disponible.'}
              </p>
            </div>

            {/* Tecnologías utilizadas */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-100 mb-3">🔧 Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white 
                             px-3 py-2 rounded-lg font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {(!project.technologies || project.technologies.length === 0) && (
                  <p className="text-slate-400">Tecnologías no especificadas</p>
                )}
              </div>
            </div>

            {/* Características principales */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-100 mb-3">✨ Características Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 text-slate-300 p-2 
                               bg-slate-800/50 rounded-lg border border-slate-700"
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

            {/* Logros destacados */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-100 mb-3">🏆 Logros Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-3 p-3 bg-gradient-to-r 
                               from-emerald-900/50 to-emerald-800/50 rounded-lg border border-emerald-600/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Award className="w-6 h-6 text-emerald-400" />
                      <span className="text-emerald-300 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
              <motion.button
                onClick={() => hasDemo && window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold 
                         shadow-lg transition-all duration-300 ${
                           hasDemo
                             ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white cursor-pointer'
                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                         }`}
                whileHover={{ scale: hasDemo ? 1.02 : 1, y: hasDemo ? -2 : 0 }}
                whileTap={{ scale: hasDemo ? 0.98 : 1 }}
                title={hasDemo ? 'Abrir demo en nueva pestaña' : 'Demo no disponible'}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver Demo en Vivo</span>
              </motion.button>

              <motion.button
                onClick={() => hasGitHub && window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold 
                         shadow-lg transition-all duration-300 ${
                           hasGitHub
                             ? 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'
                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                         }`}
                whileHover={{ scale: hasGitHub ? 1.02 : 1, y: hasGitHub ? -2 : 0 }}
                whileTap={{ scale: hasGitHub ? 0.98 : 1 }}
                title={hasGitHub ? 'Abrir código en GitHub' : 'Código no disponible'}
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
          <Code2 className="w-16 h-16 text-purple-400 mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-slate-100 mb-4 font-serif">
          Mis Proyectos
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          {projects.length > 0 
            ? 'Cada proyecto es una solución única creada con pasión y tecnología de vanguardia.'
            : 'Actualmente no hay proyectos para mostrar.'
          }
        </p>
      </motion.div>

      {/* Filtros de categoría - Solo mostrar si hay proyectos */}
      {projects.length > 0 && (
        <>
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
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-purple-600/20 border border-slate-700'
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
            <p className="text-slate-400 font-medium">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </>
      )}

      {/* Grid de proyectos */}
      {projects.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id || index} 
                project={project} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">💼</div>
          <p className="text-xl text-slate-300 font-semibold mb-4">
            No hay proyectos para mostrar
          </p>
          <p className="text-slate-400">
            Los proyectos se cargarán dinámicamente cuando estén disponibles.
          </p>
        </motion.div>
      )}

      {/* Mensaje cuando no hay proyectos en la categoría filtrada */}
      {projects.length > 0 && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-300 font-semibold">
            No se encontraron proyectos en esta categoría
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 text-purple-400 hover:text-purple-300 font-medium underline transition-colors duration-300"
          >
            Ver todos los proyectos
          </button>
        </motion.div>
      )}

      {/* Estadísticas de proyectos - Solo mostrar si hay proyectos */}
      {projects.length > 0 && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-sm rounded-lg p-6 border border-purple-500/30"
          style={{
            background: 'rgba(30, 30, 30, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-4 text-center">
            🎯 Estadísticas de Proyectos
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-slate-200 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {projects.length}
              </motion.div>
              <p className="text-slate-400 font-semibold">Proyectos Total</p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-slate-200 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              >
                {projects.filter(p => p.status === 'Completado' || !p.status).length}
              </motion.div>
              <p className="text-slate-400 font-semibold">Completados</p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-slate-200 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
              >
                {Array.from(new Set(projects.flatMap(p => p.technologies || []))).length}
              </motion.div>
              <p className="text-slate-400 font-semibold">Tecnologías</p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-slate-200 mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💫
              </motion.div>
              <p className="text-slate-400 font-semibold">Innovación</p>
            </div>
          </div>
        </motion.div>
      )}

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