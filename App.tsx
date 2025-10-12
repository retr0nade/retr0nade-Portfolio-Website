import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import Story from './components/Story';
import Process from './components/Process';
import Connect from './components/Connect';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#000000',
      mixBlendMode: 'difference' as const,
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference' as const,
    },
  };

  const textEnter = () => setCursorVariant('text');
  const textLeave = () => setCursorVariant('default');

  return (
    <div className="bg-white text-black antialiased relative">
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      
      <main onMouseOver={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
              textEnter();
          } else {
              textLeave();
          }
      }} onMouseLeave={textLeave}>
        <Header />
        <Hero />
        <Works />
        <Story />
        <Process />
        <Connect />
        <Footer />
      </main>
    </div>
  );
};

export default App;
