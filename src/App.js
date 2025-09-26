import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import BookContainer from "./components/layout/BookContainer/BookContainer";
import WelcomeScreen from "./components/WelcomeScreen";

const bookVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: { opacity: 0 },
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2500); // splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <WelcomeScreen show={showWelcome} />
      <AnimatePresence>
        {!showWelcome && (
          <motion.div
            key="book-container"
            variants={bookVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full"
          >
            <BookContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
