import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FRAMES } from '../../utils/frames';
import { getFramePreviewStyle } from './framePreviewStyles.jsx';

const FrameSelector = ({ selectedFrame, onFrameChange }) => {
  return (
    <motion.div
      key='frames'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='space-y-10'
    >
      <section>
        <div className='mb-4'>
          <h3 className='text-sm font-bold text-black mb-4'>Frame Color</h3>
          <div className='flex flex-wrap gap-3'>
            {FRAMES.map((frame) => {
              const { previewStyle, innerElement } =
                getFramePreviewStyle(frame);

              return (
                <button
                  key={frame.id}
                  onClick={() => onFrameChange(frame)}
                  title={frame.name}
                  className={`
                    w-10 h-10 rounded-full transition-all duration-300 relative shadow-sm hover:shadow-md hover:scale-110 flex items-center justify-center overflow-hidden
                    ${
                      selectedFrame.id === frame.id
                        ? 'ring-2 ring-offset-2 ring-black scale-110 z-10'
                        : 'hover:ring-2 hover:ring-black/10'
                    }
                  `}
                  style={previewStyle}
                >
                  {innerElement}

                  {selectedFrame.id === frame.id && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]'>
                      <div className='w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shadow-lg'>
                        <Check size={10} strokeWidth={4} />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FrameSelector;
