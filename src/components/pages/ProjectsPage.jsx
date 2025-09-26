import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Clock, 
  Users, 
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

const ProjectsPage = memo(({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const { projects = [] } = data || {};

  const categories = useMemo(() => ({
    all: { label: 'Todos', icon: Sparkles },
    'Full Stack': { label: 'Full Stack', icon: Code2 },
    'Frontend': { label: 'Frontend', icon: Eye },
    'Backend': { label: 'Backend', icon: Zap }
  }), []);

  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      filter === 'all' || project.category === filter
    ), [projects, filter]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }), []);

  const getProjectIcon = useCallback((project) => {
    if (project.title?.toLowerCase().includes('mascot') || project.demoUrl?.includes('mascoticas')) 
      return <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />;
    if (project.title?.toLowerCase().includes('explore') || project.demoUrl?.includes('explore-heaven')) 
      return <Plane className="w-6 h-6 sm:w-7 sm:h-7" />;
    return <Globe className="w-6 h-6 sm:w-7 sm:h-7" />;
  }, []);

  const getProjectCategory = useCallback((project) => {
    if (project.category) return project.category;
    const techStack = project.technologies?.join(' ').toLowerCase() || '';
    if (techStack.includes('node') && techStack.includes('react')) return 'Full Stack';
    if (techStack.includes('react') || techStack.includes('frontend')) return 'Frontend';
    if (techStack.includes('node') || techStack.includes('backend')) return 'Backend';
    return 'Full Stack';
  }, []);

  const openDemo = useCallback((url, e) => {
    e?.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const openGitHub = useCallback((url, e) => {
    e?.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const ProjectCard = memo(({ project, index }) => {
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
                   border border-purple-500/25 hover:border-purple-400/50 shadow-lg
                   transition-all duration-300 cursor-pointer"
        style={{
          background: 'rgba(30, 30, 30, 0.75)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          willChange: 'transform, box-shadow'
        }}
        whileHover={{ 
          y: -6, 
          scale: 1.01,
          boxShadow: '0 12px 30px rgba(147, 51, 234, 0.25)',
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedProject(project)}
      >
        <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-purple-600/15 to-purple-800/15 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl opacity-25 flex flex-col items-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {getProjectIcon(project)}
              <span className="text-xs sm:text-sm md:text-lg mt-2 opacity-70">{projectCategory}</span>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
              projectStatus === 'Completado' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-yellow-500 text-black'
            }`}>
              {projectStatus}
            </span>
          </div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
              {projectCategory}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100 group-hover:text-purple-300 
                           transition-colors duration-300 line-clamp-1">
              {project.title || 'Proyecto Sin Título'}
            </h3>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              className="text-purple-400 flex-shrink-0"
            >
              <Star className="w-4 h-4 md:w-5 md:h-5" />
            </motion.div>
          </div>

          <p className="text-slate-300 font-medium text-xs sm:text-sm mb-2 md:mb-3 line-clamp-1">
            {project.subtitle || project.description?.substring(0, 50) + '...'}
          </p>

          <p className="text-slate-400 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
            {project.description || 'Descripción del proyecto no disponible.'}
          </p>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 md:mb-4">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span key={i} className="bg-slate-700/50 text-slate-300 border border-slate-600/50 
                                     px-2 py-1 rounded text-[10px] sm:text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-purple-400 text-[10px] sm:text-xs font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mb-3 md:mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span className="truncate">{projectDuration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span className="truncate">{projectTeam}</span>
            </div>
          </div>

          <div className="flex space-x-2 md:space-x-3">
            <motion.button
              onClick={(e) => openDemo(project.demoUrl, e)}
              className={`flex items-center space-x-1 px-2 py-1 md:px-3 md:py-2 rounded text-[10px] sm:text-xs md:text-sm font-semibold 
                       transition-all duration-200 flex-1 justify-center ${
                         hasDemo
                           ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg cursor-pointer'
                           : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                       }`}
              whileHover={{ scale: hasDemo ? 1.02 : 1 }}
              whileTap={{ scale: hasDemo ? 0.98 : 1 }}
              title={hasDemo ? 'Ver demo en vivo' : 'Demo no disponible'}
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              <span>Demo</span>
            </motion.button>

            <motion.button
              onClick={(e) => openGitHub(project.githubUrl, e)}
              className={`flex items-center space-x-1 px-2 py-1 md:px-3 md:py-2 rounded text-[10px] sm:text-xs md:text-sm font-semibold 
                       transition-all duration-200 flex-1 justify-center ${
                         hasGitHub
                           ? 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg cursor-pointer'
                           : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                       }`}
              whileHover={{ scale: hasGitHub ? 1.02 : 1 }}
              whileTap={{ scale: hasGitHub ? 0.98 : 1 }}
              title={hasGitHub ? 'Ver código fuente' : 'Código no disponible'}
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" />
              <span>Código</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  });

  ProjectCard.displayName = 'ProjectCard';

  // Modal optimizado
  const ProjectModal = memo(({ project, onClose }) => {
    if (!project) return null;

    const projectCategory = getProjectCategory(project);
    const projectStatus = project.status || 'Completado';
    const hasDemo = project.demoUrl && project.demoUrl !== '#';
    const hasGitHub = project.githubUrl && project.githubUrl !== '#';

    return (
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[85vh] 
                     overflow-y-auto border border-purple-500/30 shadow-2xl scroll-container"
          style={{
            background: 'rgba(20, 20, 20, 0.9)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="p-4 md:p-6 border-b border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 mr-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                  {project.title || 'Proyecto Sin Título'}
                </h2>
                <p className="text-slate-300 font-semibold">{project.subtitle || ''}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 text-2xl font-bold transition-colors duration-200 flex-shrink-0"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4 text-sm">
              <div className="flex items-center space-x-1 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{project.duration || 'Variable'}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <Users className="w-4 h-4" />
                <span>{project.team || 'Individual'}</span>
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
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Descripción */}
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">📜 Descripción del Proyecto</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.longDescription || project.description || 'Descripción detallada no disponible.'}
              </p>
            </div>

            {/* Tecnologías */}
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">🔧 Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white 
                             px-3 py-2 rounded-lg font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.02, y: -1 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {(!project.technologies || project.technologies.length === 0) && (
                  <p className="text-slate-400">Tecnologías no especificadas</p>
                )}
              </div>
            </div>

            {/* Características */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">✨ Características Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 text-slate-300 p-2 
                               bg-slate-800/50 rounded-lg border border-slate-700"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="text-lg">{feature.split(' ')[0]}</span>
                      <span className="text-sm">{feature.substring(feature.indexOf(' ') + 1)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
              <motion.button
                onClick={() => hasDemo && openDemo(project.demoUrl)}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold 
                         shadow-lg transition-all duration-200 ${
                           hasDemo
                             ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white cursor-pointer'
                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                         }`}
                whileHover={{ scale: hasDemo ? 1.02 : 1 }}
                whileTap={{ scale: hasDemo ? 0.98 : 1 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver Demo en Vivo</span>
              </motion.button>

              <motion.button
                onClick={() => hasGitHub && openGitHub(project.githubUrl)}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold 
                         shadow-lg transition-all duration-200 ${
                           hasGitHub
                             ? 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'
                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                         }`}
                whileHover={{ scale: hasGitHub ? 1.02 : 1 }}
                whileTap={{ scale: hasGitHub ? 0.98 : 1 }}
              >
                <Github className="w-5 h-5" />
                <span>Ver Código Fuente</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  ProjectModal.displayName = 'ProjectModal';

  return (
    <div className="min-h-full p-4 overflow-y-auto scroll-container">
      {/* Título principal */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 md:mb-8"
      >
        <motion.div
          className="inline-block mb-4"
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code2 className="w-12 h-12 md:w-16 md:h-16 text-purple-400 mx-auto" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 md:mb-4 font-serif">
          Mis Proyectos
        </h2>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
          {projects.length > 0 
            ? 'Cada proyecto es una solución única creada con pasión y tecnología de vanguardia.'
            : 'Actualmente no hay proyectos para mostrar.'
          }
        </p>
      </motion.div>

      {/* Filtros y contenido */}
      {projects.length > 0 && (
        <>
          {/* Filtros */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8"
          >
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              const isActive = filter === key;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold 
                           transition-all duration-200 text-sm md:text-base ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-purple-600/20 border border-slate-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Contador */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-4 md:mb-6"
          >
            <p className="text-slate-400 font-medium text-sm md:text-base">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Grid de proyectos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
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

          {/* Estadísticas */}
          {projects.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-sm rounded-lg p-4 md:p-6 border border-purple-500/25"
              style={{
                background: 'rgba(30, 30, 30, 0.75)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 text-center">
                🎯 Estadísticas de Proyectos
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-slate-200 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {projects.length}
                  </motion.div>
                  <p className="text-slate-400 font-semibold text-sm md:text-base">Proyectos Total</p>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-slate-200 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  >
                    {projects.filter(p => p.status === 'Completado' || !p.status).length}
                  </motion.div>
                  <p className="text-slate-400 font-semibold text-sm md:text-base">Completados</p>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-slate-200 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  >
                    {Array.from(new Set(projects.flatMap(p => p.technologies || []))).length}
                  </motion.div>
                  <p className="text-slate-400 font-semibold text-sm md:text-base">Tecnologías</p>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-slate-200 mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    💫
                  </motion.div>
                  <p className="text-slate-400 font-semibold text-sm md:text-base">Innovación</p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Estados vacíos */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
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

      {projects.length > 0 && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-300 font-semibold">
            No se encontraron proyectos en esta categoría
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 text-purple-400 hover:text-purple-300 font-medium underline transition-colors duration-200"
          >
            Ver todos los proyectos
          </button>
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
});

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;