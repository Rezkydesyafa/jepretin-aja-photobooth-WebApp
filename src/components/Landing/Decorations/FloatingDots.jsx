import React from 'react';
import { motion } from 'framer-motion';

const FloatingDots = () => {
  // Generate random positions
  const dots = [...Array(12)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 8,
  }));

  return (
    <div className='absolute inset-0 pointer-events-none -z-5 overflow-hidden'>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.1, 0],
            x: [0, Math.random() * 40 - 20, 0], // Drift
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'linear',
          }}
          className='absolute w-2 h-2 bg-black rounded-full'
          style={{ left: dot.left }}
        />
      ))}
    </div>
  );
};

export default FloatingDots;
