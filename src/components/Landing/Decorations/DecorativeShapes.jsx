import React from 'react';
import { motion } from 'framer-motion';

const DecorativeShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
      {/* 1. Thin Circle Outline - Top Right */}
      <motion.div 
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.4, rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] border border-black/10 rounded-full"
      />

      {/* 2. Rounded Rectangle - Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, rotate: -15, y: 50 }}
        animate={{ opacity: 0.3, rotate: -15, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-[15%] left-[5%] w-[150px] h-[150px] border-[1.5px] border-black/5 rounded-[2rem]"
      />

      {/* 3. Diagonal Lines - Top Left */}
      <motion.svg 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        width="100" height="100" 
        viewBox="0 0 100 100" 
        className="absolute top-[15%] left-[10%]"
      >
        <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="1" strokeOpacity="0.1" />
        <line x1="20" y1="100" x2="100" y2="20" stroke="black" strokeWidth="1" strokeOpacity="0.1" />
        <line x1="0" y1="80" x2="80" y2="0" stroke="black" strokeWidth="1" strokeOpacity="0.1" />
      </motion.svg>

      {/* 4. 3x3 Grid - Bottom Right (Subtle Technical Feel) */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.4 }}
         transition={{ duration: 1, delay: 0.8 }}
         className="absolute bottom-[20%] right-[15%] grid grid-cols-3 gap-2"
      >
          {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-black/20 rounded-full" />
          ))}
      </motion.div>
    </div>
  );
};

export default DecorativeShapes;
