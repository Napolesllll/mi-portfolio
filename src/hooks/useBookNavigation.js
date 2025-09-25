import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar la navegación del libro mágico
 * Proporciona funciones para navegar entre páginas con validaciones
 */
const useBookNavigation = (initialPage = 0, maxPages = 5) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAnimating, setIsAnimating] = useState(false);

  // Función para ir a la siguiente página
  const nextPage = useCallback(() => {
    if (currentPage < maxPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(prev => prev + 1);
      
      // Reset animación después de un delay
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [currentPage, maxPages, isAnimating]);

  // Función para ir a la página anterior
  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(prev => prev - 1);
      
      // Reset animación después de un delay
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [currentPage, isAnimating]);

  // Función para ir a una página específica
  const goToPage = useCallback((pageNumber) => {
    if (pageNumber >= 0 && pageNumber < maxPages && pageNumber !== currentPage && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(pageNumber);
      
      // Reset animación después de un delay
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [currentPage, maxPages, isAnimating]);

  // Verificar si se puede avanzar
  const canGoNext = currentPage < maxPages - 1;

  // Verificar si se puede retroceder
  const canGoPrev = currentPage > 0;

  // Función para ir a la primera página
  const goToFirstPage = useCallback(() => {
    goToPage(0);
  }, [goToPage]);

  // Función para ir a la última página
  const goToLastPage = useCallback(() => {
    goToPage(maxPages - 1);
  }, [goToPage, maxPages]);

  // Información de progreso
  const progress = {
    current: currentPage + 1,
    total: maxPages,
    percentage: Math.round(((currentPage + 1) / maxPages) * 100)
  };

  return {
    currentPage,
    setCurrentPage: goToPage,
    nextPage,
    prevPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrev,
    isAnimating,
    progress
  };
};

export default useBookNavigation;