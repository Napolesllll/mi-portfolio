import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Home, User, FolderOpen, Mail } from 'lucide-react';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ContactPage from '../../pages/ContactPage';

// Hooks personalizados
import useMobileDetection from './hooks/useMobileDetection';
import useBookNavigation from './hooks/useBookNavigation';
import useBookAnimations from './hooks/useBookAnimations';

// Componentes
import BookBackground from './components/BookBackground';
import BookNavigation from './components/BookNavigation';
import BookContent from './components/BookContent';
import BookControls from './components/BookControls';
import PageIndicators from './components/PageIndicators';
import TransitionOverlay from './components/TransitionOverlay';

// Datos del portfolio
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
  const bookRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileDetection();

  // Páginas del libro
  const pages = [
    { component: HomePage, title: "Inicio", icon: Home },
    { component: AboutPage, title: "Acerca", icon: User },
    { component: ProjectsPage, title: "Proyectos", icon: FolderOpen },
    { component: ContactPage, title: "Contacto", icon: Mail }
  ];

  // Hooks personalizados
  const { getAnimationConfig, pageVariants, mobilePageVariants } = useBookAnimations(isMobile, prefersReducedMotion);
  const { currentPage, isFlipping, flipDirection, nextPage, prevPage, goToPage } = useBookNavigation(pages, getAnimationConfig);

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden"
      style={{ 
        cursor: 'url("data:image/svg+xml;charset=UTF-8,%3csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M4 28L28 4M28 4L24 8M28 4L24 4M28 4L28 8\' stroke=\'%23D97706\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3e%3cpath d=\'M22 6L26 2M26 10L30 6\' stroke=\'%23F59E0B\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3e%3cpath d=\'M20 8L24 4M24 12L28 8\' stroke=\'%23FBBF24\' stroke-width=\'1\' stroke-linecap=\'round\'/%3e%3c/svg%3e") 16 16, auto'
      }}
    >
      <BookBackground />
      
      <BookNavigation 
        pages={pages}
        currentPage={currentPage}
        goToPage={goToPage}
        isFlipping={isFlipping}
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] p-4">
        <div className="relative max-w-7xl w-full">
          <BookContent
            currentPage={currentPage}
            flipDirection={flipDirection}
            isFlipping={isFlipping}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
            getAnimationConfig={getAnimationConfig}
            pages={pages}
            portfolioData={portfolioData}
            CurrentPageComponent={CurrentPageComponent}
            pageVariants={pageVariants}
            mobilePageVariants={mobilePageVariants}
          />
          
          <BookControls
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            pages={pages}
            isFlipping={isFlipping}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />
        </div>
      </div>

      <PageIndicators
        pages={pages}
        currentPage={currentPage}
        goToPage={goToPage}
        isFlipping={isFlipping}
        prefersReducedMotion={prefersReducedMotion}
      />

      <TransitionOverlay
        isFlipping={isFlipping}
        getAnimationConfig={getAnimationConfig}
      />
    </div>
  );
};
 
export default BookContainer;