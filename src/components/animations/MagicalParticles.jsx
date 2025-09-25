import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MagicalParticles = ({ count = 60, className = "" }) => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generar partículas iniciales
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.7 ? 'star' : 'circle', // 30% estrellas, 70% círculos
        color: getRandomColor(),
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 2 + 1
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, [count]);

  // Función para obtener colores dorados aleatorios
  const getRandomColor = () => {
    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FFBF00', // Amber
      '#DAA520', // GoldenRod
      '#B8860B', // Dark GoldenRod
      '#F4A460', // Sandy Brown
      '#CD853F'  // Peru
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Seguir el cursor del mouse
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Componente de partícula individual
  const Particle = ({ particle }) => {
    const isNearMouse = () => {
      const distance = Math.sqrt(
        Math.pow(particle.x - mousePosition.x, 2) + 
        Math.pow(particle.y - mousePosition.y, 2)
      );
      return distance < 15; // Radio de influencia del mouse
    };

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
        }}
        initial={{ 
          opacity: 0, 
          scale: 0,
          rotate: 0
        }}
        animate={{
          opacity: [0, particle.opacity, particle.opacity, 0],
          scale: [0, 1, 1.2, 0.8, 1],
          rotate: particle.direction * 360,
          y: [0, -30 * particle.speed, -60 * particle.speed, -30 * particle.speed, 0],
          x: [0, 10 * particle.direction, -5 * particle.direction, 15 * particle.direction, 0]
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
          scale: {
            duration: particle.duration * 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        whileHover={isNearMouse() ? {
          scale: 2,
          opacity: 1,
          transition: { duration: 0.3 }
        } : {}}
      >
        {particle.type === 'star' ? (
          // Estrella
          <div
            className="relative"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <div
              className="absolute inset-0 transform rotate-0"
              style={{
                background: `linear-gradient(45deg, ${particle.color}, transparent)`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background: `radial-gradient(circle, ${particle.color}40, transparent)`,
                borderRadius: '50%',
                filter: 'blur(1px)'
              }}
            />
          </div>
        ) : (
          // Círculo con efectos
          <div
            className="relative rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`
            }}
          >
            {/* Brillo interno */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, white, transparent 70%)`,
                opacity: 0.6
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Ondas expansivas ocasionales */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: particle.color }}
              animate={{
                scale: [1, 3],
                opacity: [0.8, 0],
                borderWidth: [2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          </div>
        )}
        
        {/* Rastro de partícula */}
        <motion.div
          className="absolute -top-1 -left-1 rounded-full"
          style={{
            width: `${particle.size + 2}px`,
            height: `${particle.size + 2}px`,
            background: `radial-gradient(circle, ${particle.color}20, transparent)`,
            filter: 'blur(2px)'
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
      {/* Partículas principales */}
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} />
      ))}
      
      {/* Efecto de resplandor general */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 191, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Partículas que siguen el mouse */}
      <motion.div
        className="absolute w-4 h-4 pointer-events-none"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: 360
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
      >
        <div className="w-full h-full bg-amber-400 rounded-full opacity-30 blur-sm" />
      </motion.div>
      
      {/* Efecto de constelación (líneas conectoras ocasionales) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {particles.slice(0, 10).map((particle, index) => {
          const nextParticle = particles[(index + 1) % 10];
          if (!nextParticle) return null;
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="#FFD700"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 0.3, 0] 
              }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MagicalParticles;