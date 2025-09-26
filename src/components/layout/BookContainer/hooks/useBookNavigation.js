import { useState, useCallback, useEffect, useMemo } from 'react';

const useBookNavigation = (pages, getAnimationConfig) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');

  // Memoizamos configuración para no recalcular en cada acción
  const animationConfig = useMemo(() => getAnimationConfig(), [getAnimationConfig]);

  // Función interna genérica para manejar cambio de página
  const handleFlip = useCallback(
    (targetPage, direction) => {
      if (isFlipping || targetPage < 0 || targetPage >= pages.length) return;

      setFlipDirection(direction);
      setIsFlipping(true);

      // Duración en ms para mayor claridad
      const delay = animationConfig.duration * 500;

      // requestAnimationFrame + setTimeout para timing fluido
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentPage(targetPage);
          setTimeout(() => setIsFlipping(false), delay);
        }, delay);
      });
    },
    [animationConfig.duration, isFlipping, pages.length]
  );

  const nextPage = useCallback(() => {
    handleFlip(currentPage + 1, 'next');
  }, [currentPage, handleFlip]);

  const prevPage = useCallback(() => {
    handleFlip(currentPage - 1, 'prev');
  }, [currentPage, handleFlip]);

  const goToPage = useCallback(
    (pageIndex) => {
      handleFlip(
        pageIndex,
        pageIndex > currentPage ? 'next' : 'prev'
      );
    },
    [currentPage, handleFlip]
  );

  // Manejo de teclado optimizado
  const handleKeyPress = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (['ArrowLeft', 'ArrowRight', 'Space', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          prevPage();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
        case ' ':
          nextPage();
          break;
        case 'Home':
          goToPage(0);
          break;
        case 'End':
          goToPage(pages.length - 1);
          break;
        case 'Enter':
          goToPage(currentPage === 0 ? pages.length - 1 : 0);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          {
            const pageNum = parseInt(e.key) - 1;
            if (pageNum >= 0 && pageNum < pages.length) {
              goToPage(pageNum);
            }
          }
          break;
        default:
          break;
      }
    },
    [currentPage, nextPage, prevPage, goToPage, pages.length]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !pages?.length) return;

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, pages?.length]);

  return {
    currentPage,
    isFlipping,
    flipDirection,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
    setIsFlipping,
  };
};

export default useBookNavigation;
