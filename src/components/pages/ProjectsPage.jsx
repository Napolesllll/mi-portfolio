'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Star,
  Clock,
  Users,
  Calendar,
  Sparkles,
  Eye,
  Zap,
  Code2,
  ShoppingCart,
  Plane,
  Globe,
  X
} from 'lucide-react';

const ProjectsPage = memo(({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const { projects = [] } = data || {};

  // Categorías
  const categories = useMemo(
    () => ({
      all: { label: 'Todos', icon: Sparkles },
      'Full Stack': { label: 'Full Stack', icon: Code2 },
      Frontend: { label: 'Frontend', icon: Eye },
      Backend: { label: 'Backend', icon: Zap }
    }),
    []
  );

  // Filtro
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => filter === 'all' || project.category === filter
      ),
    [projects, filter]
  );

  // Animaciones
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.1,
          staggerChildren: 0.08
        }
      }
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0, scale: 0.95 },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 100
        }
      }
    }),
    []
  );

  // Utilidades
  const getProjectIcon = useCallback((project) => {
    if (
      project.title?.toLowerCase().includes('mascot') ||
      project.demoUrl?.includes('mascoticas')
    )
      return <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />;
    if (
      project.title?.toLowerCase().includes('explore') ||
      project.demoUrl?.includes('explore-heaven')
    )
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

  const getProjectThumbnail = (project) => {
    if (
      project.title?.toLowerCase().includes('mascot') ||
      project.demoUrl?.includes('mascoticas')
    ) {
      return '/mascoticas.png';
    }
    if (
      project.title?.toLowerCase().includes('explore') ||
      project.demoUrl?.includes('explore-heaven')
    ) {
      return '/explore.png';
    }
      if (
      project.title?.toLowerCase().includes('sst') ||
      project.demoUrl?.includes('sstasualcance')
    ) {
      return '/sst.png';
    }
    return null;
  };

  // Card
  const ProjectCard = memo(({ project }) => {
    const projectCategory = getProjectCategory(project);
    const projectStatus = project.status || 'Completado';
    const projectDuration = project.duration || 'Variable';
    const projectTeam = project.team || 'Individual';
    const hasDemo = project.demoUrl && project.demoUrl !== '#';
    const hasGitHub = project.githubUrl && project.githubUrl !== '#';
    const thumbnail = getProjectThumbnail(project);

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
        {/* Imagen */}
        <div className="relative h-44 sm:h-52 md:h-56 bg-gradient-to-br from-purple-600/15 to-purple-800/15 overflow-hidden">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={project.title || 'Proyecto'}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl opacity-25 flex flex-col items-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {getProjectIcon(project)}
              <span className="text-xs sm:text-sm md:text-lg mt-2 opacity-70">
                {projectCategory}
              </span>
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span
              className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                projectStatus === 'Completado'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-yellow-500 text-black'
              }`}
            >
              {projectStatus}
            </span>
          </div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
              {projectCategory}
            </span>
          </div>
        </div>

        {/* Contenido */}
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

          <p className="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-3 mb-2 md:mb-3">
            {project.description || 'Sin descripción'}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs md:text-sm mb-2 md:mb-3">
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {projectDuration}
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              {projectTeam}
            </div>
          </div>

          <div className="flex gap-2">
            {hasDemo && (
              <button
                onClick={(e) => openDemo(project.demoUrl, e)}
                className="flex-1 text-center py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm 
                           bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
              >
                Demo
              </button>
            )}
            {hasGitHub && (
              <button
                onClick={(e) => openGitHub(project.githubUrl, e)}
                className="flex-1 text-center py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm 
                           bg-slate-800 hover:bg-slate-700 text-white rounded-md transition"
              >
                GitHub
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  });

  ProjectCard.displayName = 'ProjectCard';

  // Modal completo
  const ProjectModal = memo(({ project, onClose }) => {
    if (!project) return null;
    const projectCategory = getProjectCategory(project);
    const projectStatus = project.status || 'Completado';
    const hasDemo = project.demoUrl && project.demoUrl !== '#';
    const hasGitHub = project.githubUrl && project.githubUrl !== '#';
    const thumbnail = getProjectThumbnail(project);

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
          {thumbnail && (
            <div className="relative w-full h-64 md:h-96">
              <img
                src={thumbnail}
                alt={project.title || 'Proyecto'}
                className="w-full h-full object-cover object-center rounded-t-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <div className="p-6 text-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">{project.title}</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-slate-300 mb-4">{project.longDescription || project.description}</p>

            <div className="flex gap-4 mb-4 flex-wrap">
              <span className="px-2 py-1 bg-purple-600 rounded-full text-xs">{projectCategory}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  projectStatus === 'Completado' ? 'bg-emerald-500 text-white' : 'bg-yellow-500 text-black'
                }`}
              >
                {projectStatus}
              </span>
              <div className="text-slate-400 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{project.duration || 'Variable'}</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                <span>{project.team || 'Individual'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {hasDemo && (
                <button
                  onClick={() => window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
                  className="flex-1 text-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
                >
                  <ExternalLink className="inline w-4 h-4 mr-2" /> Ver Demo en Vivo
                </button>
              )}
              {hasGitHub && (
                <button
                  onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                  className="flex-1 text-center py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition"
                >
                  <Github className="inline w-4 h-4 mr-2" /> Ver Código Fuente
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  ProjectModal.displayName = 'ProjectModal';

  // Modal de imagen (opcional)
  const ImageModal = ({ src, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-lg shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        <img src={src} alt="Project" className="w-full h-full object-contain" loading="lazy" decoding="async" />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-full p-4 overflow-y-auto scroll-container">
      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition 
                        ${filter === key ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Grid de 2 columnas para ocupar todo el ancho */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2"
      >
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id ?? idx} project={project} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </div>
  );
});

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;
