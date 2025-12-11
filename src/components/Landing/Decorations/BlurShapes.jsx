import React from 'react';
import { motion } from 'framer-motion';

const BlurShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-20 pointer-events-none">
       {/* Large White/Gray Blur - Center/Left */}
       <motion.div
         animate={{ 
            translateY: [0, -40, 0],
            translateX: [0, 20, 0],
            scale: [1, 1.1, 1]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-gray-100/60 rounded-full blur-[120px]"
       />
       
       {/* Subtle Warm Hint - Bottom Right */}
       <motion.div
         animate={{ 
            translateY: [0, 50, 0],
            scale: [1, 1.2, 1]
         }}
         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gray-50/80 rounded-full blur-[100px]"
       />
    </div>
  );
};

export default BlurShapes;
