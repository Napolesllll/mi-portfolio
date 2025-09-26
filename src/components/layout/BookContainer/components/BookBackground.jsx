import React from 'react';

const BookBackground = () => {
  const darkPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`;

  return (
    <>
      {/* Fondo principal con gradiente oscuro */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Textura de papel antiguo oscuro */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            ${darkPaperTexture},
            linear-gradient(45deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `
            200px 200px,
            20px 20px,
            20px 20px
          `,
          backgroundPosition: `
            0 0,
            0 0,
            10px 10px
          `
        }}
      />

      {/* Efectos de iluminación ambiental */}
      <div className="absolute inset-0 opacity-30">
        {/* Luz dorada principal */}
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-radial from-yellow-400/20 via-yellow-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        
        {/* Luz púrpura secundaria */}
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-purple-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        
        {/* Luz cian de acento */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-cyan-400/15 via-cyan-400/8 to-transparent rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Partículas flotantes de colores */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Partículas doradas */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`gold-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Partículas púrpura */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`purple-${i}`}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Partículas cian */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`cyan-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Líneas de energía sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* Línea diagonal dorada */}
        <div 
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent"
          style={{ 
            left: '25%', 
            transform: 'rotate(15deg)',
            transformOrigin: 'top',
            animation: 'fadeInOut 8s infinite ease-in-out'
          }}
        />
        
        {/* Línea diagonal púrpura */}
        <div 
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"
          style={{ 
            right: '30%', 
            transform: 'rotate(-12deg)',
            transformOrigin: 'top',
            animation: 'fadeInOut 10s infinite ease-in-out',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Efectos de constelación */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-30">
          {/* Líneas conectoras entre puntos de luz */}
          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#gradient1)" strokeWidth="0.5" strokeDasharray="2,3">
            <animate attributeName="stroke-opacity" values="0;0.6;0" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="60%" y1="20%" x2="40%" y2="80%" stroke="url(#gradient2)" strokeWidth="0.5" strokeDasharray="3,2">
            <animate attributeName="stroke-opacity" values="0;0.4;0" dur="8s" repeatCount="indefinite" begin="2s" />
          </line>
          
          {/* Gradientes para las líneas */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#9333EA', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Estilo para animaciones personalizadas */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
};

export default BookBackground;