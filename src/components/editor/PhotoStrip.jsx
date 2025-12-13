import React from 'react';
import StickerItem from './StickerItem';

const PhotoStrip = React.forwardRef(
  (
    {
      photos,
      selectedFrame,
      photoShape,
      showDate,
      showTime,
      stickers,
      onRemoveSticker,
    },
    ref
  ) => {
    const getShapeClass = () => {
      switch (photoShape) {
        case 'rounded':
          return 'rounded-2xl';
        case 'circle':
          return 'rounded-full aspect-square';
        case 'heart':
          return 'mask-heart';
        default:
          return 'rounded-none';
      }
    };

    return (
      <div className='relative z-10 h-full flex items-center justify-center w-full'>
        <div className='relative shadow-2xl transition-all duration-500 transform max-h-full overflow-y-auto scrollbar-hide rounded-sm hover:-translate-y-1 hover:shadow-3xl scale-[0.7] sm:scale-90 lg:scale-90 xl:scale-100 bg-white'>
          <div
            ref={ref}
            className='w-[300px] flex flex-col gap-6 relative transition-all duration-500'
            style={{
              ...selectedFrame.containerStyle,
              padding: selectedFrame.containerStyle.padding || '32px',
              minHeight: 'auto',
            }}
          >
            {selectedFrame.renderOverlay && selectedFrame.renderOverlay()}

            {/* Header Info */}
            {(showDate || showTime) && (
              <div
                className='flex flex-col items-center justify-center pb-2 opacity-60 z-10'
                style={{ color: selectedFrame.textColor || 'inherit' }}
              >
                <div className='text-[10px] tracking-[0.3em] font-medium uppercase flex gap-3'>
                  {showDate && <span>{new Date().toLocaleDateString()}</span>}
                  {showTime && (
                    <span>
                      {new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Photos Grid */}
            <div className='flex flex-col gap-5 z-10'>
              {photos.map((src, idx) => (
                <div
                  key={idx}
                  className={`relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shadow-sm ${getShapeClass()} transition-all duration-300`}
                >
                  {src ? (
                    <img
                      src={src}
                      className='w-full h-full object-cover'
                      alt={`Frame ${idx}`}
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-xs text-gray-300'>
                      Empty
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Signature */}
            <div
              className='pt-8 pb-2 text-center z-10'
              style={{ color: selectedFrame.textColor || 'inherit' }}
            >
              <h3 className='font-handwriting text-3xl font-normal opacity-90'>
                Jepretin.
              </h3>
            </div>

            {/* Sticker Layer */}
            <div className='absolute inset-0 z-20 overflow-hidden pointer-events-none'>
              {stickers.map((sticker) => (
                <StickerItem
                  key={sticker.id}
                  sticker={sticker}
                  onRemove={onRemoveSticker}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PhotoStrip.displayName = 'PhotoStrip';

export default PhotoStrip;
