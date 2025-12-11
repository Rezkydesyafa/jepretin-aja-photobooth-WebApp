import React from 'react';

// Frame Definitions
// renderFrame prop: (width, height) => JSX (Overlay)
// containerStyle prop: CSS Properties object for the strip container

export const FRAMES = [
  {
    id: 'thin-black',
    name: 'Thin Black',
    tags: ['minimal', 'classic'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #000000',
      padding: '20px',
    },
    overlay: null, // No overlay needed, just container style
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    tags: ['bold', 'dark'],
    containerStyle: {
      backgroundColor: '#111111',
      padding: '24px',
    },
    textColor: '#FFFFFF', // Invert text for dark frame
    overlay: null,
  },
  {
    id: 'clean-white',
    name: 'Clean White',
    tags: ['minimal', 'modern'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      padding: '20px',
    },
    overlay: null,
  },
  {
    id: 'marble',
    name: 'White Marble',
    tags: ['texture', 'elegant'],
    containerStyle: {
      backgroundColor: '#FAFAFA',
      backgroundImage:
        'url("https://www.transparenttextures.com/patterns/white-diamond.png")', // Subtle texture fallback
      // In a real app we'd use a local seamless SVG pattern
      padding: '24px',
    },
    overlay: null,
  },
  {
    id: 'silver-gradient',
    name: 'Silver Mist',
    tags: ['gradient', 'soft'],
    containerStyle: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
    },
    overlay: null,
  },
  {
    id: 'geometric',
    name: 'Geometric',
    tags: ['modern', 'shapes'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      padding: '20px',
    },
    // SVG Overlay for corners
    renderOverlay: () => (
      <div className='absolute inset-0 pointer-events-none'>
        <svg width='100%' height='100%' className='absolute inset-0'>
          <path d='M0 0 L50 0 L0 50 Z' fill='black' />
          <path d='M100% 100% L100% 100% L100% 100%' fill='black' />{' '}
          {/* Placeholder logic */}
          <polygon points='0,0 60,0 0,60' fill='#111' />
          <polygon
            points='100%,100% 100%,calc(100%-60px) calc(100%-60px),100%'
            fill='#111'
            transform='rotate(180, 100%, 100%)'
          />
        </svg>
      </div>
    ),
  },
  {
    id: 'polaroid',
    name: 'Polaroid Style',
    tags: ['retro', 'white'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      padding: '16px 16px 60px 16px', // Extra bottom padding
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    overlay: null,
  },
  {
    id: 'double-line',
    name: 'Double Line',
    tags: ['classic', 'formal'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      padding: '16px',
      border: '4px double #111111',
    },
    overlay: null,
  },
  {
    id: 'dotted',
    name: 'Minimal Dot',
    tags: ['cute', 'minimal'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      padding: '20px',
      outline: '2px dotted #999',
      outlineOffset: '-10px',
    },
    overlay: null,
  },
  {
    id: 'film-strip',
    name: 'Film Strip',
    tags: ['retro', 'cinema'],
    containerStyle: {
      backgroundColor: '#111111',
      padding: '10px 30px',
      borderLeft: '4px dashed white',
      borderRight: '4px dashed white',
    },
    textColor: '#FFFFFF',
    overlay: null,
  },
  {
    id: 'metallic',
    name: 'Brushed Steel',
    tags: ['industrial', 'cool'],
    containerStyle: {
      background:
        'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 1px, #f5f5f5 1px, #f5f5f5 4px)',
      padding: '24px',
      border: '1px solid #ccc',
    },
    overlay: null,
  },
  {
    id: 'brackets',
    name: 'Corner Brackets',
    tags: ['minimal', 'tech'],
    containerStyle: {
      backgroundColor: '#FFFFFF',
      padding: '24px',
    },
    renderOverlay: () => (
      <div className='absolute inset-4 pointer-events-none border-t-2 border-b-2 border-black/80 h-[95%]'>
        {/* Just styled borders via div for simplicity */}
        <div className='absolute top-0 left-0 w-4 h-full border-l-2 border-black/80'></div>
        <div className='absolute top-0 right-0 w-4 h-full border-r-2 border-black/80'></div>
      </div>
    ),
  },
  // --- NEW PASTEL & CUTE FRAMES ---
  {
    id: 'pastel-pink',
    name: 'Soft Pink',
    tags: ['pastel', 'cute'],
    containerStyle: {
      backgroundColor: '#FFECF1',
      padding: '24px',
      border: '4px solid white',
      boxShadow: '0 0 0 1px #FFB7C5',
    },
    textColor: '#D46A85',
    overlay: null,
  },
  {
    id: 'pastel-mint',
    name: 'Mint Fresh',
    tags: ['pastel', 'fresh'],
    containerStyle: {
      backgroundColor: '#E6FFF9',
      padding: '24px',
      border: '4px solid white',
      boxShadow: '0 0 0 1px #A3E4D7',
    },
    textColor: '#48C9B0',
    overlay: null,
  },
  {
    id: 'pastel-lavender',
    name: 'Lavender',
    tags: ['pastel', 'dreamy'],
    containerStyle: {
      backgroundColor: '#F3E5F5',
      padding: '24px',
      border: '2px solid white',
      outline: '2px dashed #CE93D8',
      outlineOffset: '-6px',
    },
    textColor: '#8E24AA',
    overlay: null,
  },
  {
    id: 'cute-grid',
    name: 'School Grid',
    tags: ['cute', 'pattern'],
    containerStyle: {
      backgroundColor: '#FFF',
      backgroundImage:
        'linear-gradient(#E1F5FE 1px, transparent 1px), linear-gradient(90deg, #E1F5FE 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      padding: '24px',
    },
    textColor: '#0288D1',
    overlay: null,
  },
  {
    id: 'polka-dots',
    name: 'Polka Party',
    tags: ['cute', 'pattern'],
    containerStyle: {
      backgroundColor: '#FFF8E1',
      backgroundImage: 'radial-gradient(#FFD54F 20%, transparent 20%)',
      backgroundSize: '16px 16px',
      padding: '24px',
    },
    textColor: '#FF6F00',
    overlay: null,
  },
  {
    id: 'checkerboard',
    name: 'Checkmate',
    tags: ['retro', 'pattern'],
    containerStyle: {
      backgroundColor: '#FFE0E0',
      backgroundImage:
        'conic-gradient(#FFCDD2 90deg, transparent 90deg 180deg, #FFCDD2 180deg 270deg, transparent 270deg)',
      backgroundSize: '32px 32px',
      padding: '24px',
    },
    textColor: '#D32F2F',
    overlay: null,
  },
  {
    id: 'cloud-dream',
    name: 'Cloud 9',
    tags: ['cute', 'gradient'],
    containerStyle: {
      background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)',
      padding: '24px',
      borderRadius: '16px',
    },
    textColor: '#1565C0',
    overlay: null,
  },
  // --- COUPLE & CHARACTER FRAMES ---
  {
    id: 'love-hearts',
    name: 'Love Hearts',
    tags: ['couple', 'love'],
    containerStyle: {
      backgroundColor: '#FFEBEE',
      backgroundImage: 'radial-gradient(#FFCDD2 2px, transparent 2px)',
      backgroundSize: '20px 20px',
      padding: '24px',
      border: '4px solid #FFCDD2',
    },
    textColor: '#C62828',
    overlay: null, // Will handle specific heart scattering in logic
  },
  {
    id: 'starry-night',
    name: 'Starry Date',
    tags: ['couple', 'dark'],
    containerStyle: {
      backgroundColor: '#0D1B2A',
      padding: '24px',
      border: '2px solid #415A77',
      boxShadow: '0 0 15px rgba(255,255,255,0.1)',
    },
    textColor: '#E0E1DD',
    overlay: null,
  },
  {
    id: 'bear-hug',
    name: 'Cute Bear',
    tags: ['cute', 'character'],
    containerStyle: {
      backgroundColor: '#F7E7CE', // Bear color
      padding: '24px',
      borderRadius: '20px',
      border: '6px solid #5D4037',
    },
    textColor: '#5D4037',
    overlay: null,
  },
  {
    id: 'comic-pop',
    name: 'Comic Pop',
    tags: ['fun', 'colorful'],
    containerStyle: {
      backgroundColor: '#FFF',
      padding: '20px',
      border: '4px solid black',
      boxShadow: '8px 8px 0px #FFEB3B',
    },
    textColor: '#000',
    overlay: null,
  },
];
