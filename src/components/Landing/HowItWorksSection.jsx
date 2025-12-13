import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Layers, Download } from 'lucide-react';

const steps = [
  {
    icon: <Camera strokeWidth={1.5} />,
    title: 'Snap',
    text: 'Allow camera access and strike your best pose. Our mirror mode ensures you look your best.',
  },
  {
    icon: <Layers strokeWidth={1.5} />,
    title: 'Style',
    text: 'Browse our collection of frames. From retro vibes to minimal borders, find your perfect match.',
  },
  {
    icon: <Download strokeWidth={1.5} />,
    title: 'Save',
    text: 'Download instantly to your device or save to your local gallery for safekeeping.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HowItWorksSection = () => {
  return (
    <section className='py-24 px-4 bg-white relative overflow-hidden'>
      {/* Decorative Blur Background */}
      <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none' />
      <div className='absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none' />

      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10'>
        {/* Left: Sticky Text Content */}
        <div className='md:w-1/3 space-y-8 md:sticky md:top-32 self-start'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-6'>
              Simple.
              <br />
              Fast.
              <br />
              <span className='font-serif italic text-gray-400'>
                Beautiful.
              </span>
            </h2>
            <p className='text-gray-500 text-lg leading-relaxed max-w-sm'>
              We've optimized every step of the process to ensure you go from
              pose to download in seconds.
            </p>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className='h-1 bg-black/10 mt-8'
            />
          </motion.div>
        </div>

        {/* Right: Vertical Steps with Modern UI */}
        <div className='md:w-2/3 w-full'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='grid gap-6'
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className='group'
              >
                <div className='flex items-start gap-8 p-6 md:p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-black/5 transition-all duration-300 relative overflow-hidden'>
                  {/* Interactive Number Background */}
                  <span className='hidden sm:block absolute -right-4 -bottom-8 text-[8rem] font-bold text-gray-50 group-hover:text-gray-100 transition-colors duration-500 select-none z-0'>
                    0{idx + 1}
                  </span>

                  {/* Icon */}
                  <div className='relative z-10 w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0'>
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className='relative z-10 pt-1'>
                    <h3 className='text-2xl font-medium mb-2 text-black'>
                      {step.title}
                    </h3>
                    <p className='text-gray-500 leading-relaxed'>{step.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
