import React from 'react';
import { motion } from 'framer-motion';

const SHAPES = ['square', 'rounded', 'circle', 'heart'];

const ShapeSelector = ({ selectedShape, onShapeChange }) => {
  const getShapeClass = (shape) => {
    switch (shape) {
      case 'rounded':
        return 'rounded-2xl';
      case 'circle':
        return 'rounded-full';
      case 'heart':
        return 'mask-heart';
      default:
        return '';
    }
  };

  return (
    <motion.div
      key='shapes'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='space-y-8'
    >
      <div className='grid grid-cols-2 gap-4'>
        {SHAPES.map((shape) => (
          <button
            key={shape}
            onClick={() => onShapeChange(shape)}
            className={`
              aspect-square flex flex-col items-center justify-center gap-4 rounded-2xl border-2 transition-all
              ${
                selectedShape === shape
                  ? 'border-black bg-gray-50 shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }
            `}
          >
            <div className={`w-16 h-16 bg-gray-900 ${getShapeClass(shape)}`} />
            <span className='text-[10px] uppercase font-bold tracking-widest text-gray-500'>
              {shape}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ShapeSelector;
