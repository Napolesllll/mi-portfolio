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
  Coffee,
  ExternalLink,
  Sparkles,
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
      color: 'text-blue-400',
      action: () => window.open(`mailto:${personal?.email}`, '_blank')
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: personal?.location || 'Tu Ciudad, País',
      description: 'Disponible para trabajo remoto',
      color: 'text-green-400',
      action: null
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: personal?.phone || '+1 234 567 8900',
      description: 'Llamadas de Lunes a Viernes',
      color: 'text-purple-400',
      action: () => window.open(`tel:${personal?.phone}`, '_blank')
    },
    {
      icon: Clock,
      title: 'Horario',
      value: '9:00 AM - 6:00 PM',
      description: 'Zona horaria: GMT-6',
      color: 'text-orange-400',
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
      color: 'from-gray-700 to-gray-800',
      description: 'Explora mis repositorios'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      username: 'Tu Perfil',
      url: social?.linkedin || 'https://linkedin.com/in/tu-perfil',
      color: 'from-blue-600 to-blue-700',
      description: 'Conectemos profesionalmente'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      username: '@tu_usuario',
      url: social?.twitter || 'https://twitter.com/tu-usuario',
      color: 'from-sky-500 to-sky-600',
      description: 'Sígueme para updates'
    },
    {
      icon: Globe,
      name: 'Portfolio',
      username: 'mi-portfolio.com',
      url: personal?.website || 'https://tu-portfolio.com',
      color: 'from-emerald-600 to-emerald-700',
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

  // Componente de tarjeta de contacto
  const ContactCard = ({ contact, index }) => {
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
        onClick={contact.action}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-gradient-to-br ${contact.color} bg-opacity-20`}>
                <contact.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-300 
                               transition-colors duration-300">
                  {contact.title}
                </h3>
                <p className="text-slate-300 font-medium text-sm">{contact.value}</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              className="text-purple-400"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </div>

          <p className="text-slate-400 text-sm mb-4">
            {contact.description}
          </p>

          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{ x: [-100, 300] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "linear"
            }}
          />
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
          <MessageCircle className="w-16 h-16 text-purple-400 mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl font-bold text-slate-100 mb-4 font-serif">
          Contáctame
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Cada gran proyecto comienza con una conversación. ¡Hablemos sobre tu próxima idea extraordinaria!
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
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <Send className="w-6 h-6 mr-3 text-purple-400" />
              Envía tu Mensaje 
            </h3>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm rounded-lg overflow-hidden 
                       border border-purple-500/30 shadow-lg p-6"
            style={{
              background: 'rgba(30, 30, 30, 0.8)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-600 
                             rounded-lg focus:border-purple-500 focus:outline-none 
                             transition-colors duration-300 text-slate-200 placeholder-slate-400"
                    placeholder="Tu nombre..."
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-600 
                             rounded-lg focus:border-purple-500 focus:outline-none 
                             transition-colors duration-300 text-slate-200 placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-600 
                           rounded-lg focus:border-purple-500 focus:outline-none 
                           transition-colors duration-300 text-slate-200 placeholder-slate-400"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-600 
                           rounded-lg focus:border-purple-500 focus:outline-none 
                           transition-colors duration-300 text-slate-200 placeholder-slate-400 resize-none"
                  placeholder="Cuéntame sobre tu proyecto, ideas o cualquier cosa que tengas en mente..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 
                         hover:from-purple-700 hover:to-purple-800 text-white 
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
            </form>

            {/* Mensaje de estado */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 rounded-lg font-semibold text-center mt-4 ${
                    submitStatus === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
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
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <Coffee className="w-6 h-6 mr-3 text-purple-400" />
              Información de Contacto
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {contactInfo.map((contact, index) => (
              <ContactCard key={contact.title} contact={contact} index={index} />
            ))}
          </div>

          {/* Redes sociales */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-purple-400" />
              Sígueme en las Redes
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`group relative backdrop-blur-sm rounded-lg overflow-hidden 
                          border border-purple-500/30 hover:border-purple-400 shadow-lg 
                          transition-all duration-300 p-6 block`}
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${social.color}`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100">{social.name}</h4>
                      <p className="text-slate-300 text-sm">{social.username}</p>
                      <p className="text-slate-400 text-xs">{social.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Disponibilidad */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm rounded-lg p-6 border border-emerald-500/30"
            style={{
              background: 'rgba(30, 30, 30, 0.8)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-4 h-4 bg-emerald-400 rounded-full mx-auto animate-pulse shadow-lg shadow-emerald-400/50"></div>
            </motion.div>
            
            <h4 className="text-xl font-bold text-emerald-300 mb-2">
              🟢 Disponible para Proyectos
            </h4>
            <p className="text-slate-300 mb-4">
              Actualmente acepto nuevos proyectos y colaboraciones. 
              ¡Hablemos sobre tu próxima gran idea!
            </p>
            
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Disponible ahora</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Respuesta en 24hrs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Estadísticas de contacto */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 max-w-4xl mx-auto mt-12"
        style={{
          background: 'rgba(30, 30, 30, 0.8)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        <h3 className="text-2xl font-bold text-slate-100 mb-4 text-center">
          📊 Estadísticas de Contacto
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-slate-200 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              24h
            </motion.div>
            <p className="text-slate-400 font-semibold">Respuesta</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-slate-200 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            >
              99%
            </motion.div>
            <p className="text-slate-400 font-semibold">Satisfacción</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-slate-200 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            >
              50+
            </motion.div>
            <p className="text-slate-400 font-semibold">Proyectos</p>
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

      {/* Mensaje final inspirador */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <motion.p
          className="text-purple-400 font-medium italic text-lg"
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
              <Star className="w-4 h-4 text-purple-400" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;