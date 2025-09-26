import { useState, useEffect, useCallback } from 'react';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // Inicial seguro para SSR
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const handleChange = useCallback((e) => {
    // Solo actualiza si cambia el valor (evita renders innecesarios)
    setIsMobile((prev) => {
      const next = e.matches;
      return prev !== next ? next : prev;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // matchMedia es más eficiente que escuchar 'resize'
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Set inicial
    setIsMobile(mediaQuery.matches);

    // Listener
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [handleChange]);

  return isMobile;
};

export default useMobileDetection;
