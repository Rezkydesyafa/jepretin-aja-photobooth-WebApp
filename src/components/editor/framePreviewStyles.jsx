import React from 'react';

export const getFramePreviewStyle = (frame) => {
  // 1. Base Preview Style (from container)
  let previewStyle = {
    background:
      frame.containerStyle.background || frame.containerStyle.backgroundColor,
    backgroundImage: frame.containerStyle.backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // 2. Specific Visual Overrides for "Empty" or "Complex" frames
  let innerElement = null;

  switch (frame.id) {
    case 'thin-black':
      previewStyle.border = '1px solid black';
      break;
    case 'matte-black':
      previewStyle.backgroundColor = '#111';
      break;
    case 'clean-white':
      previewStyle.backgroundColor = '#ffffff';
      previewStyle.border = '1px solid #e5e5e5';
      previewStyle.boxShadow = 'inset 0 0 0 2px #f9f9f9';
      break;
    case 'polaroid':
      previewStyle.backgroundColor = '#fff';
      previewStyle.border = '1px solid #e0e0e0';
      previewStyle.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      previewStyle.display = 'flex';
      previewStyle.alignItems = 'flex-end';
      previewStyle.justifyContent = 'center';
      previewStyle.paddingBottom = '6px';
      innerElement = (
        <div className='w-6 h-6 bg-gray-100 border border-gray-200' />
      );
      break;
    case 'double-line':
      previewStyle.backgroundColor = '#fff';
      previewStyle.border = '3px double black';
      break;
    case 'dotted':
      previewStyle.backgroundColor = '#fff';
      previewStyle.border = '2px dotted #999';
      break;
    case 'film-strip':
      previewStyle.backgroundColor = '#111';
      previewStyle.borderLeft = '3px dashed rgba(255,255,255,0.6)';
      previewStyle.borderRight = '3px dashed rgba(255,255,255,0.6)';
      previewStyle.boxSizing = 'border-box';
      break;
    case 'brackets':
      previewStyle.backgroundColor = '#fff';
      previewStyle.border = '1px solid #eee';
      innerElement = (
        <div className='text-[10px] font-bold text-black opacity-50'>|</div>
      );
      break;
    case 'comic-pop':
      previewStyle.backgroundColor = '#fff';
      previewStyle.border = '2px solid black';
      previewStyle.boxShadow = '3px 3px 0px #FFEB3B';
      innerElement = (
        <div className='w-full h-full opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:4px_4px]' />
      );
      break;
    case 'geometric':
      previewStyle.backgroundColor = '#fff';
      innerElement = (
        <svg viewBox='0 0 40 40' className='w-full h-full opacity-80'>
          <polygon points='0,0 20,0 0,20' fill='black' />
          <polygon points='40,40 20,40 40,20' fill='black' />
        </svg>
      );
      break;
    case 'marble':
      previewStyle.background = '#FAFAFA';
      previewStyle.backgroundImage =
        'url("https://www.transparenttextures.com/patterns/white-diamond.png")';
      innerElement = (
        <div className='w-full h-full opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:2px_2px]' />
      );
      previewStyle.border = '1px solid #eee';
      break;
    case 'silver-gradient':
      previewStyle.background =
        'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
      previewStyle.border = '1px solid #ccc';
      break;
    case 'metallic':
      previewStyle.background =
        'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 2px, #f5f5f5 2px, #f5f5f5 4px)';
      previewStyle.border = '1px solid #999';
      break;
    case 'pastel-pink':
      previewStyle.border = '3px solid white';
      previewStyle.outline = '1px solid #FFB7C5';
      break;
    case 'pastel-mint':
      previewStyle.border = '3px solid white';
      previewStyle.outline = '1px solid #A3E4D7';
      break;
    case 'pastel-lavender':
      previewStyle.border = '2px solid white';
      previewStyle.outline = '2px dashed #CE93D8';
      previewStyle.outlineOffset = '-2px';
      break;
    case 'cute-grid':
      previewStyle.background =
        'linear-gradient(#E1F5FE 2px, transparent 2px), linear-gradient(90deg, #E1F5FE 2px, transparent 2px)';
      previewStyle.backgroundSize = '8px 8px';
      previewStyle.border = '1px solid #E1F5FE';
      break;
    case 'polka-dots':
      previewStyle.backgroundColor = '#FFF8E1';
      previewStyle.backgroundImage =
        'radial-gradient(#FFD54F 30%, transparent 30%)';
      previewStyle.backgroundSize = '8px 8px';
      break;
    case 'checkerboard':
      previewStyle.backgroundColor = '#FFE0E0';
      previewStyle.backgroundImage =
        'conic-gradient(#FFCDD2 90deg, transparent 90deg 180deg, #FFCDD2 180deg 270deg, transparent 270deg)';
      previewStyle.backgroundSize = '12px 12px';
      break;
    case 'love-hearts':
      previewStyle.backgroundColor = '#FFEBEE';
      previewStyle.border = '2px solid #FFCDD2';
      break;
    case 'starry-night':
      previewStyle.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
      break;
    case 'bear-hug':
      previewStyle.backgroundColor = '#F7E7CE';
      previewStyle.border = '2px solid #5D4037';
      innerElement = (
        <>
          <div className='absolute -top-1 -left-1 w-3 h-3 bg-[#5D4037] rounded-full' />
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#5D4037] rounded-full' />
        </>
      );
      break;
    default:
      // Fallback for any generic white frames to ensure visibility
      if (
        previewStyle.background === '#FFFFFF' ||
        previewStyle.background === '#FFF' ||
        previewStyle.backgroundColor === '#FFFFFF'
      ) {
        previewStyle.border = '1px solid #eaeaea';
      }
      break;
  }

  return { previewStyle, innerElement };
};
