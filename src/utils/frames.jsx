import React from 'react';

// Frame Definitions
// renderFrame prop: (width, height) => JSX (Overlay)
// containerStyle prop: CSS Properties object for the strip container

export const FRAMES = [
  {
    id: 'retro-groovy',
    name: 'Retro Groovy',
    tags: ['retro', 'warm', '70s'],
    containerStyle: {
      backgroundColor: '#FEF9E7',
      backgroundImage: `
        repeating-radial-gradient(
          circle at 0 0, 
          transparent 0, 
          #FEF9E7 10px
        ),
        repeating-linear-gradient(
          45deg,
          #FFB7B2,
          #FFB7B2 10px,
          #FFDAC1 10px,
          #FFDAC1 20px
        )
      `,
      padding: '24px',
      border: '8px solid #E2F0CB',
      borderRadius: '16px',
    },
    textColor: '#FF9AA2',
    overlay: null,
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    tags: ['bold', 'colorful', 'comic'],
    containerStyle: {
      backgroundColor: '#FFE135',
      backgroundImage: 'radial-gradient(#000 20%, transparent 20%)',
      backgroundSize: '10px 10px',
      padding: '24px',
      border: '6px solid #000',
      boxShadow: '10px 10px 0px #FF4081',
    },
    textColor: '#000000',
    overlay: null,
  },
  {
    id: 'coquette',
    name: 'Coquette',
    tags: ['cute', 'romantic', 'bows'],
    containerStyle: {
      backgroundColor: '#FFF0F5',
      border: '1px solid #FFC1CC',
      padding: '24px',
      boxShadow: 'inset 0 0 0 4px #FFF, inset 0 0 0 6px #FFC1CC',
    },
    textColor: '#DB7093',
    renderOverlay: () => (
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        {/* Decorative corner bows could be SVG here, keeping it simple for now */}
        <div className='absolute top-2 left-2 text-[#FFC1CC] text-2xl'>🎀</div>
        <div className='absolute top-2 right-2 text-[#FFC1CC] text-2xl'>🎀</div>
        <div className='absolute bottom-2 left-2 text-[#FFC1CC] text-2xl'>
          🎀
        </div>
        <div className='absolute bottom-2 right-2 text-[#FFC1CC] text-2xl'>
          🎀
        </div>
      </div>
    ),
  },
  {
    id: 'y2k',
    name: 'Y2K Cyber',
    tags: ['futuristic', '2000s', 'chrome'],
    containerStyle: {
      backgroundColor: '#000',
      backgroundImage: `
        linear-gradient(90deg, #00FF00 1px, transparent 1px),
        linear-gradient(180deg, #00FF00 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      padding: '24px',
      border: '2px solid #00FF00',
      boxShadow: '0 0 10px #00FF00',
    },
    textColor: '#00FF00',
    overlay: null,
  },
  {
    id: 'polco',
    name: 'Polco Deco',
    tags: ['cute', 'kpop', 'sticker'],
    containerStyle: {
      backgroundColor: '#F8F9FA',
      padding: '30px 20px 60px 20px', // More bottom padding like polaroid
      border: '1px solid #DDD',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      gap: '12px', // Tighter framing
    },
    textColor: '#555',
    overlay: null,
  },
  {
    id: 'analog-film',
    name: 'Analog Film',
    tags: ['vintage', 'cinema', 'grain'],
    containerStyle: {
      backgroundColor: '#1A1A1A',
      padding: '16px 32px',
      borderLeft: '12px dashed rgba(255,255,255,0.2)',
      borderRight: '12px dashed rgba(255,255,255,0.2)',
    },
    textColor: '#FFA500', // Amber date stamp color
    overlay: null,
  },
  // --- NANO BANANA TECH COLLECTION ---
  {
    id: 'banana-circuit',
    name: 'Banana Circuit',
    tags: ['tech', 'retro', 'green'],
    containerStyle: {
      backgroundColor: '#004d40', // PCB Green
      backgroundImage: `
        linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      border: '4px solid #FFD700', // Gold border
      padding: '24px',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
    },
    textColor: '#FFD700', // Gold text
    footerText: 'NANO-PEEL TECH V.1',
    overlay: null,
  },
  {
    id: '8bit-banana',
    name: '8-Bit Glitch',
    tags: ['retro', 'pixel', 'game'],
    containerStyle: {
      backgroundColor: '#222',
      border: '4px dashed #FF00FF', // Neon pink dashed
      padding: '24px',
      fontFamily: '"Press Start 2P", cursive', // Pixel font fallback
    },
    textColor: '#00FF00', // Neon Green
    footerText: 'INSERT COIN: BANANA_GLITCH',
    overlay: null,
  },
  {
    id: 'cyber-monkey',
    name: 'Cyber Mech',
    tags: ['futuristic', 'cute', 'robot'],
    containerStyle: {
      backgroundColor: '#ECEFF1',
      border: '8px solid #607D8B', // Mechanical grey
      padding: '24px',
      borderRadius: '4px',
      boxShadow: '0 0 0 4px #FFD700', // Yellow pipes
    },
    textColor: '#455A64',
    footerText: 'MECHA-NANA SQUAD',
    overlay: null,
  },
  {
    id: 'neon-tropical',
    name: 'Neon Tropical',
    tags: ['vaporwave', 'neon', 'vibrant'],
    containerStyle: {
      background: 'linear-gradient(135deg, #0D001A, #300030)', // Deep purple bg
      border: '2px solid #00FFFF', // Cyan border
      padding: '24px',
      boxShadow: '0 0 15px #FF00FF, inset 0 0 20px #FF00FF',
    },
    textColor: '#00FFFF', // Cyan text
    footerText: 'TROPICAL CYBER-FRUIT',
    overlay: null,
  },
  {
    id: 'banana-space',
    name: 'Space Odyssey',
    tags: ['space', 'cute', 'scifi'],
    containerStyle: {
      backgroundColor: '#0B0B2A', // Deep space blue
      backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      border: '2px solid rgba(255,255,255,0.2)',
      padding: '24px',
    },
    textColor: '#E0CDFF', // Soft lavender
    footerText: 'GALACTIC POTASSIUM',
    overlay: null,
  },
  {
    id: 'gameboy-peel',
    name: 'Transparent Peel',
    tags: ['retro', 'gadget', '90s'],
    containerStyle: {
      backgroundColor: 'rgba(255, 235, 59, 1)', // Clear Yellow Gameboy
      border: '8px solid rgba(255, 255, 255, 0.4)', // Frosted edge
      borderRadius: '16px 16px 40px 16px', // Asymmetric gameboy corner
      padding: '24px',
    },
    textColor: '#3E2723', // Dark brown LCD text
    footerText: 'PLAY IT LOUD! NANO-BOY',
    overlay: null,
  },
];
