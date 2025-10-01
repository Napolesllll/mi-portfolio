import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Home, User, FolderOpen, Mail } from 'lucide-react';

// Pages
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ContactPage from '../../pages/ContactPage';

// Hooks personalizados
import useMobileDetection from './hooks/useMobileDetection';
import useBookNavigation from './hooks/useBookNavigation';
import useBookAnimations from './hooks/useBookAnimations';

// Componentes
import BookBackground from './components/BookBackground';
import BookNavigation from './components/BookNavigation';
import BookContent from './components/BookContent';
import BookControls from './components/BookControls';
import PageIndicators from './components/PageIndicators';
import TransitionOverlay from './components/TransitionOverlay';

// Datos del portfolio
import portfolioData from '../../../assets/data/portfolioData';

const BookContainer = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileDetection();

  // Memoizamos las páginas para evitar recrearlas en cada render
  const pages = useMemo(
    () => [
      { component: HomePage, title: 'Inicio', icon: Home },
      { component: AboutPage, title: 'Acerca', icon: User },
      { component: ProjectsPage, title: 'Proyectos', icon: FolderOpen },
      { component: ContactPage, title: 'Contacto', icon: Mail },
    ],
    []
  );

  // Hooks personalizados
  const { getAnimationConfig, pageVariants, mobilePageVariants } = useBookAnimations(
    isMobile,
    prefersReducedMotion
  );

  const {
    currentPage,
    isFlipping,
    flipDirection,
    nextPage,
    prevPage,
    goToPage,
  } = useBookNavigation(pages, getAnimationConfig);

  const CurrentPageComponent = pages[currentPage].component;

  // Cursor personalizado (memoizado)
 const customCursor = 'url("data:image/svg+xml;charset=UTF-8,%3csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cg transform=\'scale(-1, 1) translate(-32, 0)\'%3e%3cpath d=\'M4 28L28 4M28 4L24 8M28 4L24 4M28 4L28 8\' stroke=\'%23FFD700\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3e%3cpath d=\'M22 6L26 2M26 10L30 6\' stroke=\'%239333EA\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3e%3cpath d=\'M20 8L24 4M24 12L28 8\' stroke=\'%2306B6D4\' stroke-width=\'1\' stroke-linecap=\'round\'/%3e%3c/g%3e%3c/svg%3e") 16 16, auto';

  // Background gradient (memoizado)
  const backgroundGradient = useMemo(
    () =>
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
    []
  );

  // Detectamos si estamos en HomePage para pasar goToProjects
  const isHomePage = CurrentPageComponent === HomePage;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: backgroundGradient,
        cursor: customCursor,
      }}
    >
      <BookBackground />

      <BookNavigation
        pages={pages}
        currentPage={currentPage}
        goToPage={goToPage}
        isFlipping={isFlipping}
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] p-4">
        <div className="relative max-w-7xl w-full">
          <BookContent
            currentPage={currentPage}
            flipDirection={flipDirection}
            isFlipping={isFlipping}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
            getAnimationConfig={getAnimationConfig}
            pages={pages}
            portfolioData={portfolioData}
            // Pasamos goToProjects SOLO si es HomePage
            CurrentPageComponent={(props) => (
              <CurrentPageComponent
                {...props}
                data={portfolioData}
                goToProjects={isHomePage ? () => goToPage(2) : undefined}
              />
            )}
            pageVariants={pageVariants}
            mobilePageVariants={mobilePageVariants}
          />

          <BookControls
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            pages={pages}
            isFlipping={isFlipping}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />
        </div>
      </div>

      <PageIndicators
        pages={pages}
        currentPage={currentPage}
        goToPage={goToPage}
        isFlipping={isFlipping}
        prefersReducedMotion={prefersReducedMotion}
      />

      <TransitionOverlay
        isFlipping={isFlipping}
        getAnimationConfig={getAnimationConfig}
      />
    </div>
  );
};

export default BookContainer;
