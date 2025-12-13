import React from 'react';

export const getFramePreviewStyle = (frame) => {
  // 1. Base Preview Style (from container)
  let previewStyle = {
    background:
      frame.containerStyle.background || frame.containerStyle.backgroundColor,
    backgroundImage: frame.containerStyle.backgroundImage,
    backgroundSize: frame.containerStyle.backgroundSize || 'cover',
    backgroundPosition: 'center',
    border: frame.containerStyle.border,
    boxShadow: frame.containerStyle.boxShadow,
    borderRadius: frame.containerStyle.borderRadius,
  };

  // 2. Specific Visual Overrides for Previews
  // Scale down patterns for the small preview box
  let innerElement = null;

  switch (frame.id) {
    case 'retro-groovy':
      previewStyle.backgroundSize = '100% 100%';
      break;

    case 'pop-art':
      previewStyle.backgroundSize = '4px 4px';
      previewStyle.boxShadow = '3px 3px 0px #FF4081';
      break;

    case 'coquette':
      previewStyle.boxShadow = 'inset 0 0 0 2px #FFF, inset 0 0 0 3px #FFC1CC';
      innerElement = (
        <>
          <div className='absolute top-1 left-1 text-[8px]'>🎀</div>
          <div className='absolute top-1 right-1 text-[8px]'>🎀</div>
          <div className='absolute bottom-1 left-1 text-[8px]'>🎀</div>
          <div className='absolute bottom-1 right-1 text-[8px]'>🎀</div>
        </>
      );
      break;

    case 'y2k':
      previewStyle.backgroundSize = '10px 10px';
      previewStyle.boxShadow = '0 0 4px #00FF00';
      break;

    case 'polco':
      previewStyle.padding = '4px';
      previewStyle.border = '1px solid #ddd';
      innerElement = (
        <div className='w-full h-full bg-white border border-gray-100 flex items-center justify-center'>
          <div className='w-2/3 h-2/3 bg-gray-50'></div>
        </div>
      );
      break;

    case 'analog-film':
      previewStyle.borderLeft = '4px dashed rgba(255,255,255,0.3)';
      previewStyle.borderRight = '4px dashed rgba(255,255,255,0.3)';
      break;

    // --- NANO BANANA TECH FRAMES ---

    case 'banana-circuit':
      previewStyle.backgroundSize = '6px 6px';
      previewStyle.border = '2px solid #FFD700';
      break;

    case '8bit-banana':
      previewStyle.border = '2px dashed #FF00FF';
      break;

    case 'cyber-monkey':
      previewStyle.border = '4px solid #607D8B';
      previewStyle.boxShadow = '0 0 0 2px #FFD700';
      break;

    case 'neon-tropical':
      previewStyle.border = '1px solid #00FFFF';
      previewStyle.boxShadow = '0 0 5px #FF00FF';
      break;

    case 'banana-space':
      previewStyle.backgroundSize = '15px 15px';
      break;

    case 'gameboy-peel':
      previewStyle.borderRadius = '4px 4px 12px 4px';
      previewStyle.border = '4px solid rgba(255,255,255,0.4)';
      break;

    default:
      break;
  }

  return { previewStyle, innerElement };
};
