import React from 'react';
import { ShieldCheck, Palette, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  return (
    <section className='relative py-32 px-4 bg-white overflow-hidden'>
      {/* Decorative Background Gradients - Mesh Style */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        {/* Soft Modern Mesh Gradient */}
        <div className='absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-transparent rounded-full blur-[100px] animate-pulse-slow' />
        <div
          className='absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-pink-100/40 via-indigo-100/30 to-transparent rounded-full blur-[100px] animate-pulse-slow'
          style={{ animationDelay: '2s' }}
        />

        {/* Subtle grid overlay for texture */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 mb-6'>
            <Sparkles className='w-3 h-3 text-black' />
            <span className='text-[10px] font-bold uppercase tracking-widest text-black/70'>
              Premium Features
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl font-medium tracking-tight text-black mb-6'>
            Designed for{' '}
            <span className='font-serif italic text-gray-500'>
              Memorability
            </span>
          </h2>
          <p className='text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed'>
            We stripped away the clutter to focus on what matters most:{' '}
            <br className='hidden md:block' /> high-quality captures, privacy,
            and speed.
          </p>
        </motion.div>

        {/* Modern Asymmetric Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {/* Feature 1: Instant Processing (Glassy Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='md:col-span-2 p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group'
          >
            <div className='relative z-10 flex flex-col h-full justify-between gap-8'>
              <div className='w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black'>
                <Zap strokeWidth={1.5} />
              </div>
              <div>
                <h3 className='text-2xl font-medium mb-3'>
                  Instant Processing
                </h3>
                <p className='text-gray-500 leading-relaxed max-w-sm'>
                  Experience zero latency. Our advanced Canvas API processes
                  your photos directly in the browser, ensuring milliseconds
                  between capture and creation.
                </p>
              </div>
            </div>
            {/* Decorative Element */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full blur-3xl transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-700' />
          </motion.div>

          {/* Feature 2: Privacy (Dark Elegant Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='p-10 rounded-[2.5rem] bg-[#111] text-white hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group'
          >
            <div className='relative z-10 flex flex-col h-full justify-between gap-8'>
              <div className='w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center'>
                <ShieldCheck strokeWidth={1.5} className='text-white' />
              </div>
              <div>
                <h3 className='text-2xl font-medium mb-3'>Privacy First</h3>
                <p className='text-gray-400 leading-relaxed text-sm'>
                  Your photos never leave your device until you choose to
                  download them. 100% Client-side.
                </p>
              </div>
            </div>
            <div className='absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl transform translate-x-12 translate-y-12 group-hover:bg-white/10 transition-colors duration-500' />
          </motion.div>

          {/* Feature 3: Aesthetics (Gradient Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='md:col-span-3 p-10 rounded-[2.5rem] bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group'
          >
            <div className='relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
              <div className='space-y-4 max-w-xl'>
                <div className='w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black'>
                  <Palette strokeWidth={1.5} />
                </div>
                <h3 className='text-2xl font-medium'>Premium Aesthetics</h3>
                <p className='text-gray-500 leading-relaxed'>
                  Step away from flat designs. We provide a curated selection of
                  minimalist frames, dynamic gradients, and glass-morphism
                  effects designed to make your photos look professionally
                  edited.
                </p>
              </div>

              {/* Visual Representation (Abstract Frames) */}
              <div className='flex gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='w-24 h-32 rounded-xl border border-black/10 bg-white shadow-sm rotate-[-6deg] transform group-hover:rotate-[-8deg] transition-transform duration-500' />
                <div className='w-24 h-32 rounded-xl border border-black/10 bg-gray-50 shadow-sm rotate-[3deg] transform group-hover:rotate-[6deg] transition-transform duration-500 relative z-10' />
                <div className='w-24 h-32 rounded-xl bg-black shadow-lg rotate-[-3deg] transform group-hover:rotate-[-1deg] transition-transform duration-500' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
