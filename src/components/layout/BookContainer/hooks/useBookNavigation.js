import { useState, useCallback, useEffect } from 'react';

const useBookNavigation = (pages, getAnimationConfig) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');

  const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      
      const config = getAnimationConfig();
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setTimeout(() => setIsFlipping(false), config.duration * 500);
      }, config.duration * 500);
    }
  }, [currentPage, pages.length, isFlipping, getAnimationConfig]);

  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      
      const config = getAnimationConfig();
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setTimeout(() => setIsFlipping(false), config.duration * 500);
      }, config.duration * 500);
    }
  }, [currentPage, isFlipping, getAnimationConfig]);

  const goToPage = useCallback((pageIndex) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setFlipDirection(pageIndex > currentPage ? 'next' : 'prev');
      setIsFlipping(true);
      
      const config = getAnimationConfig();
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setTimeout(() => setIsFlipping(false), config.duration * 500);
      }, config.duration * 500);
    }
  }, [currentPage, isFlipping, getAnimationConfig]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
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
        case ' ': // Espacio
          nextPage();
          break;
        case 'Home':
          goToPage(0);
          break;
        case 'End':
          goToPage(pages.length - 1);
          break;
        case 'Enter':
          if (currentPage === 0) {
            goToPage(pages.length - 1);
          } else {
            goToPage(0);
          }
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          const pageNum = parseInt(e.key) - 1;
          if (pageNum >= 0 && pageNum < pages.length) {
            goToPage(pageNum);
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, nextPage, prevPage, goToPage, pages.length]);

  return {
    currentPage,
    isFlipping,
    flipDirection,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
    setIsFlipping
  };
};

export default useBookNavigation;