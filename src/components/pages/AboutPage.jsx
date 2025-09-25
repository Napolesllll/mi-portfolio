import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award,
  BookOpen,
  Code,
  Heart,
  Coffee,
  Star,
  Target,
  Zap,
  Trophy,
  Briefcase,
  GraduationCap,
  Download
} from 'lucide-react';

const AboutPage = ({ data }) => {
  const { personal, experience, education, certifications, stats } = data || {};

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
    hidden: { y: 30, opacity: 0 },
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

  // Timeline de experiencia
  const ExperienceTimeline = ({ experiences }) => {
    return (
      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-400"></div>
        
        <div className="space-y-8">
          {experiences?.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start space-x-6"
            >
              {/* Punto en la línea */}
              <div className="relative z-10">
                <motion.div
                  className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(245, 158, 11, 0.4)",
                      "0 0 0 10px rgba(245, 158, 11, 0)",
                      "0 0 0 0 rgba(245, 158, 11, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Briefcase className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Contenido */}
              <div className="flex-1 bg-white/40 backdrop-blur-sm p-6 rounded-lg 
                             border border-amber-300 hover:border-amber-500 
                             hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-amber-900">{exp.title}</h3>
                    <p className="text-amber-700 font-semibold">{exp.company}</p>
                    <p className="text-amber-600 text-sm flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {exp.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-800 font-semibold text-sm">{exp.period}</p>
                    <p className="text-amber-600 text-xs">{exp.duration}</p>
                  </div>
                </div>

                <p className="text-amber-700 mb-4">{exp.description}</p>

                {/* Logros */}
                <div className="space-y-2 mb-4">
                  {exp.achievements?.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start space-x-2 text-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-amber-700">{achievement}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Educación y certificaciones
  const EducationCard = ({ edu }) => (
    <motion.div
      className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-amber-300 
                 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="text-amber-600"
        >
          <GraduationCap className="w-8 h-8" />
        </motion.div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-900 mb-1">{edu.degree}</h3>
          <p className="text-amber-700 font-semibold mb-1">{edu.institution}</p>
          <div className="flex items-center space-x-4 text-sm text-amber-600 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{edu.period}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{edu.location}</span>
            </div>
          </div>
          
          <p className="text-amber-700 text-sm mb-3">{edu.description}</p>
          
          {edu.relevantCourses && (
            <div>
              <p className="text-xs font-semibold text-amber-800 mb-2">Materias Relevantes:</p>
              <div className="flex flex-wrap gap-1">
                {edu.relevantCourses.map((course, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

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
          transition={{ duration: 4, repeat: Infinity }}
        >
          <User className="w-16 h-16 text-amber-600 mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
          Acerca de mi 
        </h2>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          Descubre el viaje detrás del código, las experiencias que han moldeado 
          mi pasión por el desarrollo y la visión que guía cada proyecto.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Sección personal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Información personal */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-amber-300">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-amber-600" />
                Acerca de Mí
              </h3>
              
              <div className="space-y-4 text-amber-700">
                <p>
                  ¡Hola! Soy un desarrollador apasionado por crear experiencias web extraordinarias. 
                  Mi viaje en el mundo del desarrollo comenzó hace más de 4 años, y desde entonces 
                  he estado constantemente aprendiendo, innovando y perfeccionando mis habilidades.
                </p>
                
                <p>
                  Me especializo en tecnologías modernas como <strong>React.js</strong>, <strong>Next.js</strong>, 
                  y <strong>Node.js</strong>, siempre con un enfoque en escribir código limpio, 
                  mantenible y escalable. Creo firmemente que la tecnología debe servir a las personas, 
                  no al revés.
                </p>
                
                <p>
                  Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a 
                  proyectos de código abierto, y compartir conocimientos con la comunidad de desarrolladores. 
                  También disfruto del café, la música y los videojuegos. ☕🎮
                </p>
              </div>
            </div>

            {/* Valores y filosofía */}
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-amber-300">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3 text-amber-600" />
                Mi Filosofía de Desarrollo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="p-4 bg-amber-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-2">
                    <Code className="w-5 h-5 text-amber-600 mr-2" />
                    <h4 className="font-semibold text-amber-800">Código Limpio</h4>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Escribo código que otros desarrolladores puedan entender y mantener fácilmente.
                  </p>
                </motion.div>

                <motion.div
                  className="p-4 bg-amber-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 text-amber-600 mr-2" />
                    <h4 className="font-semibold text-amber-800">Performance</h4>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Optimizo cada línea de código para ofrecer experiencias rápidas y fluidas.
                  </p>
                </motion.div>

                <motion.div
                  className="p-4 bg-amber-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-2">
                    <Heart className="w-5 h-5 text-amber-600 mr-2" />
                    <h4 className="font-semibold text-amber-800">User-Centric</h4>
                  </div>
                  <p className="text-amber-700 text-sm">
                    El usuario siempre está en el centro de cada decisión de desarrollo.
                  </p>
                </motion.div>

                <motion.div
                  className="p-4 bg-amber-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-amber-600 mr-2" />
                    <h4 className="font-semibold text-amber-800">Aprendizaje</h4>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Me mantengo actualizado con las últimas tendencias y mejores prácticas.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Estadísticas y datos rápidos */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Estadísticas */}
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 
                           backdrop-blur-sm p-6 rounded-lg border border-amber-300">
              <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                📊 En Números
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">Experiencia</span>
                  <span className="text-2xl font-bold text-amber-800">
                    {stats?.experience || '4+'} años
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">Proyectos</span>
                  <span className="text-2xl font-bold text-amber-800">
                    {stats?.projects || '25+'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">Clientes Felices</span>
                  <span className="text-2xl font-bold text-amber-800">
                    {stats?.clients || '15+'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-amber-700">Tazas de Café</span>
                  <motion.span
                    className="text-2xl font-bold text-amber-800 flex items-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ∞ <Coffee className="w-6 h-6 ml-1" />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Datos rápidos */}
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-amber-300">
              <h3 className="text-xl font-bold text-amber-900 mb-4">⚡ Datos Rápidos</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">
                    {personal?.location || ' Medellin, Colombia'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Lenguaje favorito: JavaScript</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Combustible: Café ☕</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Hobby: Contribuir a OSS</span>
                </div>
              </div>
            </div>

            {/* Botón de CV */}
            <motion.button
              onClick={() => window.open(personal?.resume, '_blank')}
              className="w-full magic-button flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Descargar CV</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Experiencia profesional */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center">
            <Briefcase className="w-8 h-8 mr-3 text-amber-600" />
            Experiencia Profesional
          </h3>
          
          <ExperienceTimeline experiences={experience} />
        </motion.section>

        {/* Educación */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center">
            <GraduationCap className="w-8 h-8 mr-3 text-amber-600" />
            Formación Académica
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education?.map((edu) => (
              <EducationCard key={edu.id} edu={edu} />
            ))}
          </div>
        </motion.section>

        {/* Certificaciones */}
        {certifications && certifications.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center">
              <Award className="w-8 h-8 mr-3 text-amber-600" />
              Certificaciones
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-amber-300 
                           hover:border-amber-500 hover:shadow-lg transition-all duration-300 
                           text-center"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Trophy className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h4 className="font-bold text-amber-900 mb-2">{cert.name}</h4>
                  <p className="text-amber-700 font-semibold text-sm mb-2">{cert.issuer}</p>
                  <p className="text-amber-600 text-xs">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-8"
        >
          <motion.p
            className="text-xl text-amber-600 font-medium italic mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "El código es poesía, y cada proyecto es una nueva historia por contar"
          </motion.p>
          
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 360] 
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2, 
                  repeat: Infinity 
                }}
              >
                <Star className="w-5 h-5 text-amber-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;