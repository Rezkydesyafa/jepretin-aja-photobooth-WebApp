import React from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import { STICKERS } from '../../utils/stickers';

const StickerPanel = ({ onAddSticker }) => {
  return (
    <motion.div
      key='stickers'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='space-y-6'
    >
      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-3'>
        {STICKERS.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onAddSticker(sticker)}
            className='aspect-square bg-gray-50 hover:bg-black hover:text-white rounded-xl flex items-center justify-center text-gray-800 transition-all active:scale-95 overflow-hidden'
          >
            {sticker.type === 'image' ? (
              <img
                src={sticker.src}
                alt={sticker.label}
                className='w-full h-full object-cover'
              />
            ) : (
              <sticker.icon size={24} strokeWidth={1.5} />
            )}
          </button>
        ))}
      </div>
      <div className='p-4 bg-blue-50 rounded-xl flex items-start gap-3'>
        <Smile className='w-5 h-5 text-blue-500 shrink-0 mt-0.5' />
        <p className='text-xs text-blue-800 leading-relaxed font-medium'>
          Tip: Drag stickers directly on the preview to position them perfectly.
        </p>
      </div>
    </motion.div>
  );
};

export default StickerPanel;
