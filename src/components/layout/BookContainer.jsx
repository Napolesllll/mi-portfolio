import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, User, FolderOpen, Mail, Bookmark } from 'lucide-react';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';

// Datos de ejemplo - Reemplaza con tus datos reales
const portfolioData = {
  personal: {
    name: "Jhon Cano",
    title: "Desarrollador Full Stack",
    description: "Especializado en crear experiencias web extraordinarias con React, Next.js y Node.js",
    location: "Ciudad, País",
    email: "juan@example.com",
    phone: "+1 234 567 8900",
    website: "https://juan-portfolio.com",
    resume: "https://example.com/cv.pdf"
  },
  social: {
    github: "https://github.com/juanperez",
    linkedin: "https://linkedin.com/in/juanperez",
    twitter: "https://twitter.com/juanperez"
  },
  stats: {
    experience: "4+",
    projects: "25+",
    clients: "15+"
  },
  skills: [
    "React.js",
    "Next.js", 
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker"
  ],
  experience: [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      location: "Remote",
      period: "2022 - Presente",
      duration: "2 años",
      description: "Desarrollo de aplicaciones web modernas con React y Node.js",
      achievements: [
        "Mejora del 40% en el rendimiento de aplicaciones",
        "Implementación de arquitectura escalable",
        "Liderazgo de equipo de 5 desarrolladores"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Startup Inc",
      location: "Ciudad, País",
      period: "2020 - 2022",
      duration: "2 años",
      description: "Desarrollo de interfaces de usuario modernas y responsivas",
      achievements: [
        "Creación de design system completo",
        "Optimización SEO que mejoró ranking en 60%",
        "Implementación de PWA"
      ],
      technologies: ["React", "Vue.js", "SCSS", "Webpack", "Jest"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Ingeniería en Sistemas",
      institution: "Universidad Tecnológica",
      location: "Ciudad, País",
      period: "2016 - 2020",
      description: "Especialización en desarrollo de software y bases de datos",
      relevantCourses: [
        "Algoritmos y Estructuras de Datos",
        "Desarrollo Web",
        "Bases de Datos",
        "Ingeniería de Software"
      ]
    }
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022"
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      subtitle: "Plataforma de comercio electrónico moderna",
      category: "Full Stack",
      description: "Sistema completo de e-commerce con panel de administración, procesamiento de pagos y gestión de inventario.",
      longDescription: "Desarrollé una plataforma completa de e-commerce desde cero, incluyendo frontend para usuarios, panel de administración, API REST, sistema de pagos con Stripe y gestión avanzada de inventario. La aplicación maneja miles de productos y procesa cientos de transacciones diarias.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "AWS", "Docker"],
      features: [
        "🛒 Carrito de compras avanzado",
        "💳 Procesamiento de pagos",
        "📊 Panel de administración",
        "📱 Diseño responsivo",
        "🔐 Autenticación segura",
        "📈 Analytics en tiempo real"
      ],
      highlights: [
        "Procesó +$100K en transacciones",
        "99.9% uptime conseguido",
        "Carga en menos de 2 segundos"
      ],
      demoUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/usuario/ecommerce",
      duration: "3 meses",
      team: "Solo",
      status: "Completado"
    },
    {
      id: 2,
      title: "Task Management App",
      subtitle: "Aplicación de gestión de tareas colaborativa",
      category: "Frontend",
      description: "Herramienta de gestión de proyectos con funcionalidades de colaboración en tiempo real.",
      technologies: ["React", "TypeScript", "Socket.io", "Material-UI", "Firebase"],
      features: [
        "✅ Gestión de tareas",
        "👥 Colaboración en tiempo real",
        "📊 Dashboard de proyectos",
        "🔔 Notificaciones push"
      ],
      highlights: [
        "1000+ usuarios activos",
        "Implementación de WebSockets",
        "Diseño UX premiado"
      ],
      demoUrl: "https://task-app-demo.com",
      githubUrl: "https://github.com/usuario/task-app",
      duration: "2 meses",
      team: "2 personas",
      status: "Completado"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      subtitle: "Dashboard meteorológico interactivo",
      category: "Frontend",
      description: "Aplicación que muestra información meteorológica detallada con visualizaciones interactivas.",
      technologies: ["React", "D3.js", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      features: [
        "🌤️ Pronóstico detallado",
        "📊 Gráficos interactivos",
        "🗺️ Mapas meteorológicos",
        "📍 Geolocalización"
      ],
      highlights: [
        "Datos de 200+ ciudades",
        "Visualizaciones en tiempo real",
        "Interfaz muy intuitiva"
      ],
      demoUrl: "https://weather-dashboard-demo.com",
      githubUrl: "https://github.com/usuario/weather-dashboard",
      duration: "1 mes",
      team: "Solo",
      status: "Completado"
    },
    {
      id: 4,
      title: "API REST Backend",
      subtitle: "Sistema backend escalable",
      category: "Backend",
      description: "API REST robusta con autenticación, autorización y documentación completa.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger", "Docker"],
      features: [
        "🔐 Autenticación JWT",
        "📚 Documentación Swagger",
        "🐳 Containerización Docker",
        "✅ Testing completo"
      ],
      highlights: [
        "Documentación completa",
        "100% cobertura de tests",
        "Arquitectura escalable"
      ],
      demoUrl: "https://api-demo-docs.com",
      githubUrl: "https://github.com/usuario/api-backend",
      duration: "2 meses",
      team: "Solo",
      status: "En desarrollo"
    }
  ]
};

const BookContainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const bookRef = useRef(null);

  // Páginas del libro
  const pages = [
    { component: HomePage, title: "Inicio", icon: Home },
    { component: AboutPage, title: "Acerca", icon: User },
    { component: ProjectsPage, title: "Proyectos", icon: FolderOpen },
    { component: ContactPage, title: "Contacto", icon: Mail }
  ];

  // Navegación entre páginas
  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const goToPage = (pageIndex) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };

  // Manejo de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 
                    relative overflow-hidden floating-particles">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-300/20 rounded-full 
                        blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300/20 rounded-full 
                        blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse" 
                        style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navegación superior */}
      <div className="relative z-20 p-4">
        <nav className="max-w-4xl mx-auto">
          <div className="bg-white/40 backdrop-blur-md border border-amber-300/50 rounded-full 
                          px-6 py-3 shadow-lg">
            <div className="flex items-center justify-between">
              {/* Logo/Título */}
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Bookmark className="w-6 h-6 text-amber-600" />
                </motion.div>
                <span className="text-lg font-bold text-amber-900 font-serif">
                  Mi Portfolio 
                </span>
              </div>

              {/* Navegación por páginas */}
              <div className="flex space-x-2">
                {pages.map((page, index) => {
                  const IconComponent = page.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full 
                                transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-amber-500 text-white shadow-lg'
                          : 'text-amber-700 hover:bg-amber-200/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isFlipping}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:block text-sm font-medium">
                        {page.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contador de páginas */}
              <div className="text-amber-600 font-semibold text-sm">
                {currentPage + 1} / {pages.length}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Contenedor del libro */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="relative max-w-7xl w-full mx-4">
          
          {/* Libro */}
          <motion.div
            ref={bookRef}
            className="relative bg-white/60 backdrop-blur-lg border border-amber-300 
                       rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              minHeight: '70vh',
              boxShadow: `
                0 20px 60px rgba(212, 175, 55, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.5)
              `
            }}
          >
            {/* Contenido de la página */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CurrentPageComponent data={portfolioData} />
              </motion.div>
            </AnimatePresence>

            {/* Efecto de página */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 
                          to-yellow-600 opacity-60"></div>
          </motion.div>

          {/* Controles de navegación */}
          <div className="absolute top-1/2 -left-16 transform -translate-y-1/2">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === 0 || isFlipping
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-500 text-white hover:bg-amber-600 hover:scale-110'
              }`}
              whileHover={{ scale: currentPage === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -right-16 transform -translate-y-1/2">
            <motion.button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1 || isFlipping}
              className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === pages.length - 1 || isFlipping
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-500 text-white hover:bg-amber-600 hover:scale-110'
              }`}
              whileHover={{ scale: currentPage === pages.length - 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === pages.length - 1 ? 1 : 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Indicadores de página */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2 bg-white/40 backdrop-blur-md border border-amber-300/50 
                        rounded-full px-4 py-2 shadow-lg">
          {pages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-amber-500 scale-125'
                  : 'bg-amber-300 hover:bg-amber-400'
              }`}
              whileHover={{ scale: index === currentPage ? 1.25 : 1.1 }}
              disabled={isFlipping}
            />
          ))}
        </div>
      </div>

      {/* Información de navegación */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="bg-white/40 backdrop-blur-md border border-amber-300/50 rounded-lg 
                        px-3 py-2 shadow-lg">
          <p className="text-xs text-amber-700">
            Usa las flechas del teclado ← → para navegar
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookContainer;