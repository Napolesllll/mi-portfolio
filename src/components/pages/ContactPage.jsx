import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Globe,
  Calendar,
  Clock,
  Star,
  Heart,
  Zap,
  Coffee
} from 'lucide-react';

const ContactPage = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { personal, social } = data || {};

  // Información de contacto
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: personal?.email || 'tu@email.com',
      description: 'Respondo en menos de 24 horas',
      color: 'text-blue-600',
      action: () => window.open(`mailto:${personal?.email}`, '_blank')
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: personal?.location || 'Tu Ciudad, País',
      description: 'Disponible para trabajo remoto',
      color: 'text-green-600',
      action: null
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: personal?.phone || '+1 234 567 8900',
      description: 'Llamadas de Lunes a Viernes',
      color: 'text-purple-600',
      action: () => window.open(`tel:${personal?.phone}`, '_blank')
    },
    {
      icon: Clock,
      title: 'Horario',
      value: '9:00 AM - 6:00 PM',
      description: 'Zona horaria: GMT-6',
      color: 'text-orange-600',
      action: null
    }
  ];

  // Redes sociales
  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      username: '@tu-usuario',
      url: social?.github || 'https://github.com/tu-usuario',
      color: 'bg-gray-700 hover:bg-gray-800',
      description: 'Explora mis repositorios'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      username: 'Tu Perfil',
      url: social?.linkedin || 'https://linkedin.com/in/tu-perfil',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Conectemos profesionalmente'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      username: '@tu_usuario',
      url: social?.twitter || 'https://twitter.com/tu-usuario',
      color: 'bg-sky-500 hover:bg-sky-600',
      description: 'Sígueme para updates'
    },
    {
      icon: Globe,
      name: 'Portfolio',
      username: 'mi-portfolio.com',
      url: personal?.website || 'https://tu-portfolio.com',
      color: 'bg-emerald-600 hover:bg-emerald-700',
      description: 'Mi sitio web personal'
    }
  ];

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

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
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <MessageCircle className="w-16 h-16 text-amber-600 mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
          Contactame
        </h2>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? ¡Hablemos! Estoy aquí para convertir tus ideas 
          en realidades digitales extraordinarias.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Formulario de contacto */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
              <Send className="w-6 h-6 mr-3 text-amber-600" />
              Envía tu Mensaje 
            </h3>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className="block text-amber-800 font-semibold mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-amber-300 
                           rounded-lg focus:border-amber-500 focus:outline-none 
                           transition-colors duration-300 text-amber-900"
                  placeholder="Tu nombre..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-amber-800 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-amber-300 
                           rounded-lg focus:border-amber-500 focus:outline-none 
                           transition-colors duration-300 text-amber-900"
                  placeholder="tu@email.com"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label className="block text-amber-800 font-semibold mb-2">
                Asunto
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 border-2 border-amber-300 
                         rounded-lg focus:border-amber-500 focus:outline-none 
                         transition-colors duration-300 text-amber-900"
                placeholder="¿De qué quieres hablar?"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-amber-800 font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/50 border-2 border-amber-300 
                         rounded-lg focus:border-amber-500 focus:outline-none 
                         transition-colors duration-300 text-amber-900 resize-none"
                placeholder="Cuéntame sobre tu proyecto, ideas o cualquier cosa que tengas en mente..."
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 
                         hover:from-amber-600 hover:to-amber-700 text-white 
                         px-8 py-4 rounded-lg font-semibold text-lg shadow-lg 
                         transition-all duration-300 flex items-center justify-center 
                         space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Enviar Mensaje</span>
                    <Zap className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Mensaje de estado */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg font-semibold text-center ${
                  submitStatus === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {submitStatus === 'success' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>¡Mensaje enviado con éxito! Te responderé pronto.</span>
                    <Heart className="w-5 h-5" />
                  </div>
                ) : (
                  'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Información de contacto y redes sociales */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Información de contacto */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
              <Coffee className="w-6 h-6 mr-3 text-amber-600" />
              Otras Formas de Contacto
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-sm p-4 rounded-lg border border-amber-300 
                         hover:border-amber-500 hover:shadow-lg transition-all duration-300 
                         cursor-pointer group"
                onClick={info.action}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-900 mb-1">{info.title}</h4>
                    <p className="text-amber-800 font-medium text-sm mb-1">{info.value}</p>
                    <p className="text-amber-600 text-xs">{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Redes sociales */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-amber-600" />
              Sígueme en las Redes
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`${social.color} text-white p-4 rounded-lg shadow-lg 
                          transition-all duration-300 block group`}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold">{social.name}</h4>
                    <p className="text-sm opacity-90">{social.username}</p>
                    <p className="text-xs opacity-75">{social.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Disponibilidad */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-6 
                       backdrop-blur-sm border border-green-300 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto animate-pulse"></div>
            </motion.div>
            
            <h4 className="text-xl font-bold text-green-800 mb-2">
              🟢 Disponible para Proyectos
            </h4>
            <p className="text-green-700 mb-4">
              Actualmente acepto nuevos proyectos y colaboraciones. 
              ¡Hablemos sobre tu próxima gran idea!
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-green-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Disponible ahora</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Respuesta en 24hrs</span>
              </div>
            </div>
          </motion.div>

          {/* Llamada a la acción adicional */}
          <motion.div
            variants={itemVariants}
            className="text-center p-6 bg-white/20 backdrop-blur-sm rounded-lg border border-amber-300"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Coffee className="w-12 h-12 text-amber-600" />
            </motion.div>
            
            <h4 className="text-xl font-bold text-amber-900 mb-2">
              ¡Tomemos un Café Virtual!
            </h4>
            <p className="text-amber-700 mb-4">
              ¿Prefieres una conversación más directa? Agenda una videollamada 
              de 30 minutos para discutir tu proyecto.
            </p>
            
            <motion.button
              onClick={() => window.open('https://calendly.com/tu-usuario', '_blank')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg 
                       font-semibold transition-colors duration-300 flex items-center 
                       space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Reunión</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Sección de FAQ rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto mt-12 p-6 bg-amber-50/50 backdrop-blur-sm 
                   rounded-lg border border-amber-200"
      >
        <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          💫 Preguntas Frecuentes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                ⏰ ¿Cuánto tiempo toma un proyecto?
              </h4>
              <p className="text-amber-700 text-sm">
                Depende de la complejidad, pero generalmente entre 2-8 semanas 
                para proyectos completos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                💰 ¿Cómo manejas los presupuestos?
              </h4>
              <p className="text-amber-700 text-sm">
                Ofrezco cotizaciones detalladas después de entender los 
                requerimientos específicos del proyecto.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                🌍 ¿Trabajas con clientes remotos?
              </h4>
              <p className="text-amber-700 text-sm">
                ¡Absolutamente! Tengo experiencia trabajando con equipos 
                distribuidos globalmente.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                🛠️ ¿Qué incluye el soporte post-lanzamiento?
              </h4>
              <p className="text-amber-700 text-sm">
                Incluyo 30 días de soporte gratuito para bugs y ajustes menores 
                después del lanzamiento.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mensaje final inspirador */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <motion.p
          className="text-amber-600 font-medium italic text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          "Cada gran proyecto comienza con una simple conversación. 
          ¡Hagamos que la tuya sea el inicio de algo extraordinario!"
        </motion.p>
        
        <motion.div
          className="flex justify-center space-x-4 mt-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2, 
                repeat: Infinity 
              }}
            >
              <Star className="w-4 h-4 text-amber-400" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;