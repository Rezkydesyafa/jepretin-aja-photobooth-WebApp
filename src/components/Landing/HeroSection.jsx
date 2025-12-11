import React from 'react';
import { Camera, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ onStart }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Decorative Background Elements - Soft & Elegant */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Soft Pink Blob */}
        <motion.div 
            animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-pink-100/60 rounded-full blur-[80px]" 
        />
        
        {/* Soft Lavender Blob */}
        <motion.div 
            animate={{ 
                y: [0, 30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" 
        />

        {/* Floating Sparkles (Cute Accents) */}
        <motion.div
           animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute top-[20%] right-[15%]"
        >
            <Sparkles className="w-8 h-8 text-yellow-400/30" />
        </motion.div>
        
        <motion.div
           animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 0.9, 1] }}
           transition={{ duration: 5, repeat: Infinity, delay: 2 }}
           className="absolute bottom-[30%] left-[10%]"
        >
            <Sparkles className="w-6 h-6 text-pink-300/30" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-black/5 bg-white/50 backdrop-blur-sm mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 fill-black text-black" />
          <span className="text-xs font-medium tracking-widest uppercase text-gray-500">Next Gen Photobooth</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-dark-text-primary leading-none">
          Jepretin <span className="font-bold">Aja !</span>
        </h1>
        
        <p className="text-lg md:text-xl text-dark-text-secondary font-light max-w-xl mx-auto leading-relaxed">
          The premium online photobooth experience. Create timeless memories with our curated minimal frames and seamless clean aesthetic.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-sm uppercase tracking-[0.15em] shadow-lg transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            <div className="relative flex items-center justify-center space-x-3">
                <Camera className="w-5 h-5" />
                <span>Start Session</span>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
