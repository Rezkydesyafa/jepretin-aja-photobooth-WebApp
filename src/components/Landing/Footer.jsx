import React from 'react';
import {
  Aperture,
  Instagram,
  Twitter,
  Github,
  Heart,
  Linkedin,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-white pt-24 pb-8 px-4 border-t border-black/5 relative overflow-hidden'>
      {/* Big Logo Watermark */}
      <div className='absolute top-0 right-[-10%] opacity-[0.03] pointer-events-none select-none'>
        <span className='text-[20rem] font-bold tracking-tighter'>Je.</span>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col gap-16 relative z-10'>
        {/* Top Section: CTA & Links */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-12'>
          {/* Brand Column */}
          <div className='space-y-6 max-w-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center'>
                <Aperture className='w-6 h-6' />
              </div>
              <span className='text-2xl font-bold tracking-tight'>
                Jepretin.
              </span>
            </div>
            <p className='text-gray-500 leading-relaxed font-light'>
              The premium photobooth experience right in your browser. Capture,
              edit, and share your moments with elegance.
            </p>
          </div>

          {/* Links Columns */}
          <div className='flex gap-16 md:gap-24 flex-wrap'>
            <div className='space-y-4'>
              <h4 className='font-bold uppercase tracking-widest text-xs text-black/40'>
                Platform
              </h4>
              <ul className='space-y-3 text-sm text-gray-600 font-medium'>
                <li>
                  <a href='#' className='hover:text-black transition-colors'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-black transition-colors'>
                    Features
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-black transition-colors'>
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h4 className='font-bold uppercase tracking-widest text-xs text-black/40'>
                Social
              </h4>
              <div className='flex gap-4'>
                <motion.a
                  whileHover={{ y: -3 }}
                  href='#'
                  className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300'
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href='#'
                  className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300'
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href='#'
                  className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300'
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className='pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400'>
          <span>© {currentYear} Jepretin Inc. All rights reserved.</span>
          <div className='flex items-center gap-1'>
            <span>Made with Rezky Desyafa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
