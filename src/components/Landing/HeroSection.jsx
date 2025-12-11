import React from 'react';
import { Camera, ArrowRight, Aperture } from 'lucide-react';
import { motion } from 'framer-motion';
import DecorativeShapes from './Decorations/DecorativeShapes';
import BlurShapes from './Decorations/BlurShapes';
import FloatingDots from './Decorations/FloatingDots';
import {
  CameraOne,
  Shutter,
  FrameCorner,
  LoveIcons,
} from './Decorations/Icons';

const HeroSection = ({ onStart }) => {
  return (
    <section className='relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white'>
      {/* --- BACKGROUND LAYERS --- */}
      <BlurShapes />
      <DecorativeShapes />
      <FloatingDots />

      {/* --- FLOATING ICONS (DECORATION) --- */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {/* Top Left Camera - Pastel Blue */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-[15%] left-[5%] md:left-[15%] text-blue-300'
        >
          <CameraOne className='w-12 h-12 md:w-16 md:h-16' />
        </motion.div>

        {/* Bottom Right Shutter - Pastel Pink */}
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute bottom-[20%] right-[5%] md:right-[15%] text-pink-300'
        >
          <Shutter className='w-16 h-16 md:w-24 md:h-24' />
        </motion.div>

        {/* Floating Lens Flare - Center Right - Pastel Purple */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-[30%] right-[10%] text-pink-300'
        >
          <LoveIcons className='w-12 h-12' />
        </motion.div>

        {/* Frame Corners - Pastel Gray */}
        <div className='absolute top-[10%] left-[8%] text-gray-800'>
          <FrameCorner className='w-20 h-20 rotate-0' />
        </div>
        <div className='absolute bottom-[15%] right-[8%] text-gray-800'>
          <FrameCorner className='w-20 h-20 rotate-180' />
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='max-w-4xl space-y-8 z-10 relative'
      >
        <div className='inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-black/5 bg-white/60 backdrop-blur-md mb-6 shadow-sm hover:border-black/10 transition-colors cursor-default'>
          <Aperture className='w-4 h-4 text-black' />
          <span className='text-xs font-bold tracking-[0.2em] uppercase text-black/60'>
            Next Gen Photobooth
          </span>
        </div>

        <h1 className='text-6xl md:text-8xl font-thin tracking-tighter text-black leading-[0.9]'>
          Jepretin{' '}
          <span className='font-bold relative inline-block'>
            Aja !
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
              className='absolute -bottom-2 left-0 h-1 bg-black/10'
            />
          </span>
        </h1>

        <p className='text-lg md:text-xl text-gray-500 font-light max-w-xl mx-auto leading-relaxed tracking-wide'>
          The premium online photobooth experience. Create timeless memories
          with our curated minimal frames and seamless clean aesthetic.
        </p>

        <div className='flex flex-col sm:flex-row gap-6 justify-center pt-8'>
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='group relative px-10 py-5 bg-black text-white rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-xl transition-all overflow-hidden'
          >
            <div className='absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none' />
            <div className='relative flex items-center justify-center space-x-4'>
              <Camera className='w-5 h-5' />
              <span>Start Session</span>
              <ArrowRight className='w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
