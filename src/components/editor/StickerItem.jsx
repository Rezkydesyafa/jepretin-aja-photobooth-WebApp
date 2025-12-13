import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const StickerItem = ({ sticker, onRemove }) => {
  return (
    <motion.div
      key={sticker.id}
      drag
      dragMomentum={false}
      className='absolute cursor-move pointer-events-auto text-black/90 hover:text-black hover:drop-shadow-lg transition-all select-none'
      style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
      whileHover={{ scale: 1.1 }}
    >
      {sticker.type === 'image' ? (
        <img
          src={sticker.content}
          alt='sticker'
          className='w-24 h-24 object-contain drop-shadow-md pointer-events-none'
        />
      ) : (
        <sticker.content size={48} strokeWidth={1.5} />
      )}
      <button
        onClick={() => onRemove(sticker.id)}
        className='absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 opacity-0 hover:opacity-100 transition-opacity shadow-sm'
      >
        <Trash2 size={10} />
      </button>
    </motion.div>
  );
};

export default StickerItem;
