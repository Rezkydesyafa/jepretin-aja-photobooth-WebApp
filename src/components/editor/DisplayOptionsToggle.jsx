import React from 'react';
import { motion } from 'framer-motion';

const DisplayOptionsToggle = ({ label, checked, onChange }) => {
  return (
    <label className='flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors bg-gray-50/50'>
      <span className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
        {label}
      </span>
      <div
        className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${
          checked ? 'bg-black' : 'bg-gray-200'
        }`}
      >
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='hidden'
        />
        <motion.div
          animate={{ x: checked ? 16 : 0 }}
          className='w-4 h-4 bg-white rounded-full shadow-sm'
        />
      </div>
    </label>
  );
};

export default DisplayOptionsToggle;
