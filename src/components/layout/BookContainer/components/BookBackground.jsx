import React, { memo, useMemo } from 'react';

const BookBackground = memo(() => {
  // Memoizar textura para evitar recrearla en cada render
  const darkPaperTexture = useMemo(() => 
    `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`,
  []);

  // Memoizar posiciones de partículas para evitar recálculo
  const particlePositions = useMemo(() => {
    const particles = {
      gold: Array.from({ length: 6 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
      purple: Array.from({ length: 4 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 2,
      })),
      cyan: Array.from({ length: 3 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      }))
    };
    return particles;
  }, []);

  return (
    <>
      {/* Fondo principal con gradiente oscuro optimizado */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
          `,
          willChange: 'auto'
        }}
      />

      {/* Textura de papel antiguo oscuro optimizada */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            ${darkPaperTexture},
            linear-gradient(45deg, rgba(71, 85, 105, 0.08) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(71, 85, 105, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: `
            150px 150px,
            20px 20px,
            20px 20px
          `,
          backgroundPosition: `
            0 0,
            0 0,
            10px 10px
          `,
          willChange: 'auto'
        }}
      />

      {/* Efectos de iluminación ambiental optimizados */}
      <div className="absolute inset-0 opacity-25">
        {/* Luz dorada principal */}
        <div 
          className="absolute top-10 left-20 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
            animation: 'float-gentle 8s infinite ease-in-out',
            willChange: 'transform'
          }}
        />
        
        {/* Luz púrpura secundaria */}
        <div 
          className="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
            animation: 'float-gentle 10s infinite ease-in-out 2s',
            willChange: 'transform'
          }}
        />
        
        {/* Luz cyan de acento */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            animation: 'float-gentle 12s infinite ease-in-out 4s',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Partículas flotantes optimizadas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas doradas */}
        {particlePositions.gold.map((particle, i) => (
          <div
            key={`gold-${i}`}
            className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-30"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float-particle ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
              willChange: 'transform'
            }}
          />
        ))}
        
        {/* Partículas púrpura */}
        {particlePositions.purple.map((particle, i) => (
          <div
            key={`purple-${i}`}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-25"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float-particle ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
              willChange: 'transform'
            }}
          />
        ))}
        
        {/* Partículas cyan */}
        {particlePositions.cyan.map((particle, i) => (
          <div
            key={`cyan-${i}`}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-35"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float-particle ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      {/* Líneas de energía sutiles optimizadas */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {/* Línea diagonal dorada */}
        <div 
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent"
          style={{ 
            left: '25%', 
            transform: 'rotate(15deg)',
            transformOrigin: 'top',
            animation: 'fadeInOut-slow 12s infinite ease-in-out',
            willChange: 'opacity'
          }}
        />
        
        {/* Línea diagonal púrpura */}
        <div 
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
          style={{ 
            right: '30%', 
            transform: 'rotate(-12deg)',
            transformOrigin: 'top',
            animation: 'fadeInOut-slow 16s infinite ease-in-out 4s',
            willChange: 'opacity'
          }}
        />
      </div>

      {/* Efectos de constelación optimizados */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {/* Líneas conectoras entre puntos de luz */}
          <line 
            x1="20%" y1="30%" x2="80%" y2="70%" 
            stroke="url(#gradient1)" 
            strokeWidth="0.5" 
            strokeDasharray="2,4"
            style={{ willChange: 'stroke-opacity' }}
          >
            <animate 
              attributeName="stroke-opacity" 
              values="0;0.4;0" 
              dur="8s" 
              repeatCount="indefinite" 
            />
          </line>
          <line 
            x1="60%" y1="20%" x2="40%" y2="80%" 
            stroke="url(#gradient2)" 
            strokeWidth="0.5" 
            strokeDasharray="3,3"
            style={{ willChange: 'stroke-opacity' }}
          >
            <animate 
              attributeName="stroke-opacity" 
              values="0;0.3;0" 
              dur="10s" 
              repeatCount="indefinite" 
              begin="3s" 
            />
          </line>
          
          {/* Gradientes para las líneas */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#9333EA', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Estilo para animaciones personalizadas optimizadas */}
      <style jsx>{`
        @keyframes fadeInOut-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.4; }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-10px) translateX(-3px); }
          75% { transform: translateY(-20px) translateX(7px); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        /* Optimizaciones para dispositivos móviles */
        @media (max-width: 768px) {
          @keyframes float-particle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes float-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
        }
        
        /* Desactivar animaciones en modo reducido */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
});

BookBackground.displayName = 'BookBackground';

export default BookBackground;