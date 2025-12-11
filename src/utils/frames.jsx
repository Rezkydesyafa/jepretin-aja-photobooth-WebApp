
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
       padding: '20px' 
    },
    overlay: null // No overlay needed, just container style
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    tags: ['bold', 'dark'],
    containerStyle: {
        backgroundColor: '#111111',
        padding: '24px'
    },
    textColor: '#FFFFFF', // Invert text for dark frame
    overlay: null
  },
  {
    id: 'clean-white',
    name: 'Clean White',
    tags: ['minimal', 'modern'],
    containerStyle: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        padding: '20px'
    },
    overlay: null
  },
  {
    id: 'marble',
    name: 'White Marble',
    tags: ['texture', 'elegant'],
    containerStyle: {
        backgroundColor: '#FAFAFA',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-diamond.png")', // Subtle texture fallback
        // In a real app we'd use a local seamless SVG pattern
        padding: '24px'
    },
    overlay: null
  },
  {
    id: 'silver-gradient',
    name: 'Silver Mist',
    tags: ['gradient', 'soft'],
    containerStyle: {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px'
    },
    overlay: null
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
        <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
                <path d="M0 0 L50 0 L0 50 Z" fill="black" />
                <path d="M100% 100% L100% 100% L100% 100%" fill="black" /> {/* Placeholder logic */}
                 <polygon points="0,0 60,0 0,60" fill="#111" />
                 <polygon points="100%,100% 100%,calc(100%-60px) calc(100%-60px),100%" fill="#111" transform="rotate(180, 100%, 100%)" />
            </svg>
        </div>
    )
  },
  {
    id: 'polaroid',
    name: 'Polaroid Style',
    tags: ['retro', 'white'],
    containerStyle: {
        backgroundColor: '#FFFFFF',
        padding: '16px 16px 60px 16px', // Extra bottom padding
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    overlay: null
  },
  {
    id: 'double-line',
    name: 'Double Line',
    tags: ['classic', 'formal'],
    containerStyle: {
        backgroundColor: '#FFFFFF',
        padding: '16px',
        border: '4px double #111111'
    },
    overlay: null
  },
  {
    id: 'dotted',
    name: 'Minimal Dot',
    tags: ['cute', 'minimal'],
    containerStyle: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        outline: '2px dotted #999',
        outlineOffset: '-10px'
    },
    overlay: null
  },
  {
    id: 'film-strip',
    name: 'Film Strip',
    tags: ['retro', 'cinema'],
    containerStyle: {
        backgroundColor: '#111111',
        padding: '10px 30px',
        borderLeft: '4px dashed white',
        borderRight: '4px dashed white'
    },
    textColor: '#FFFFFF',
    overlay: null
  },
  {
    id: 'metallic',
    name: 'Brushed Steel',
    tags: ['industrial', 'cool'],
    containerStyle: {
        background: 'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 1px, #f5f5f5 1px, #f5f5f5 4px)',
        padding: '24px',
        border: '1px solid #ccc'
    },
    overlay: null
  },
  {
    id: 'brackets',
    name: 'Corner Brackets',
    tags: ['minimal', 'tech'],
    containerStyle: {
        backgroundColor: '#FFFFFF',
        padding: '24px'
    },
    renderOverlay: () => (
        <div className="absolute inset-4 pointer-events-none border-t-2 border-b-2 border-black/80 h-[95%]">
             {/* Just styled borders via div for simplicity */}
             <div className="absolute top-0 left-0 w-4 h-full border-l-2 border-black/80"></div>
             <div className="absolute top-0 right-0 w-4 h-full border-r-2 border-black/80"></div>
        </div>
    )
  }
];
