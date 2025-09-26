import React from 'react';

const BookBackground = () => {
  const agedPaperTexture = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  return (
    <>
      {/* Fondo con textura de papel antiguo */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, rgba(245, 222, 179, 0.3) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(245, 222, 179, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: `
            auto,
            auto,
            auto,
            20px 20px,
            20px 20px
          `,
          backgroundPosition: `
            0 0,
            0 0,
            0 0,
            0 0,
            10px 10px
          `
        }}
      />

      {/* Manchas de edad en el fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-brown-900/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-900/5 rounded-full blur-3xl"></div>
      </div>
    </>
  );
};

export default BookBackground;