const portfolioData = {
  personal: {
    name: "Jhon Cano",
    title: "Desarrollador Full Stack",
    description: "Especializado en crear experiencias web extraordinarias con React, Next.js y Node.js",
    location: "Medellín, Colombia",
    email: "canojhon148@gmail.com",
    phone: "+57 324 534 0651",
    website: "https://jhon-portfolio.com",
    resume: "https://example.com/cv.pdf"
  },
  social: {
    github: "https://github.com/Napolesllll",
    linkedin: "https://linkedin.com/in/jhoncano",
    twitter: "https://twitter.com/jhoncano"
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
      description: "Desarrollo de aplicaciones web modernas con React, Next y Node.js",
      achievements: [
        "Mejora del 40% en el rendimiento de aplicaciones",
        "Implementación de arquitectura escalable",
        "Liderazgo de equipo de 5 desarrolladores"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Ingeniería en Sistemas",
      institution: "Universidad Tecnológica",
      location: "Medellín, Colombia",
      period: "2016 - 2020",
      description: "Especialización en desarrollo de software y bases de datos"
    }
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Mascoticas",
      subtitle: "E-commerce para Mascotas en Bucaramanga y Medellín",
      category: "Full Stack",
      description: "Tienda online especializada en productos para mascotas con presencia en Bucaramanga y Medellín.",
      longDescription: "Plataforma completa de e-commerce con gestión de inventario, carrito de compras y pasarelas de pago.",
      technologies: ["Next.js", "Node.js"],
      features: [
        "🛒 Carrito de compras avanzado",
        "💰 Pasarelas de pago integradas",
        "📱 Diseño responsive completo",
        "🔍 Sistema de búsqueda y filtros"
      ],
      highlights: [
        "Aumentó ventas online en 40%",
        "Optimizado para conversión móvil",
        "Tiempo de carga menor a 2 segundos"
      ],
      demoUrl: "https://mascoticasbucaramangamedellin.com/",
      githubUrl: "#",
      duration: "1 mes",
      team: "Full Stack Developer",
      status: "Completado"
    },
    {
      id: 2,
      title: "Explore Heaven",
      subtitle: "Plataforma de Descubrimiento de Viajes",
      category: "Frontend",
      description: "Aplicación web moderna para explorar destinos turísticos alrededor del mundo.",
      longDescription: "Plataforma innovadora con búsquedas inteligentes, recomendaciones personalizadas y herramientas para planificar viajes.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "API REST"],
      features: [
        "🌍 Exploración de destinos globales",
        "📸 Galerías de imágenes interactivas",
        "🔍 Búsqueda inteligente y filtros",
        "💾 Sistema de favoritos"
      ],
      highlights: [
        "Deploy en Vercel con excelente performance",
        "Interfaz galardonada por usabilidad",
        "Tasa de engagement del 75%"
      ],
      demoUrl: "https://explore-heaven.vercel.app/",
      githubUrl: "#",
      duration: "2 meses",
      team: "Frontend Developer",
      status: "Completado"
    }
  ]
};

export default portfolioData;