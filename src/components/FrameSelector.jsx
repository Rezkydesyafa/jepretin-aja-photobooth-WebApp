import React from 'react';
import { frames } from '../utils/frames';
import { motion } from 'framer-motion';

const FrameSelector = ({ selectedFrameId, onSelect }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-2 pb-4 scrollbar-hide max-w-full justify-center">
      {frames.map((frame) => (
        <motion.button
          key={frame.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(frame.id)}
          className={`
            flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold tracking-wider uppercase
            transition-all duration-300
            ${selectedFrameId === frame.id 
              ? 'bg-black border-2 border-black text-white shadow-lg' 
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black'}
          `}
        >
          <div className={`w-8 h-8 rounded-full mb-2 bg-gradient-to-tr ${selectedFrameId === frame.id ? 'from-white to-gray-300' : 'from-gray-200 to-gray-300'} opacity-80`} />
          {frame.name}
        </motion.button>
      ))}
    </div>
  );
};

export default FrameSelector;
