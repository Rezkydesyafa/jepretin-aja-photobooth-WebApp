import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Shield, AlertTriangle, Check, ArrowLeft } from 'lucide-react';

const Settings = ({ onBack }) => {
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    if (
      confirm(
        'Are you sure you want to delete all photos? This cannot be undone.'
      )
    ) {
      localStorage.removeItem('photobooth_photos');
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  return (
    <div className='w-full min-h-screen bg-dark-bg text-dark-text-primary p-4 md:p-6 flex flex-col items-center pt-20 md:pt-24'>
      <div className='max-w-2xl w-full space-y-6 md:space-y-8'>
        <div className='flex items-center space-x-4 mb-4 md:mb-8'>
          <button
            onClick={onBack}
            className='p-2 rounded-full hover:bg-white/10 transition'
          >
            <ArrowLeft className='w-5 h-5 md:w-6 md:h-6' />
          </button>
          <h2 className='text-2xl md:text-3xl font-light tracking-wide'>
            Settings
          </h2>
        </div>

        {/* Storage Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-glass-sm overflow-hidden relative'
        >
          {/* Decorative faint glow */}
          <div className='absolute -top-20 -right-20 w-40 h-40 bg-gray-100 rounded-full blur-3xl pointer-events-none' />

          <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6 relative z-10'>
            <div className='p-3 md:p-4 rounded-2xl bg-black/5 border border-black/5 shadow-inner shrink-0'>
              <Shield className='w-5 h-5 md:w-6 md:h-6 text-black' />
            </div>
            <div className='flex-grow w-full'>
              <h3 className='text-xl font-medium mb-2 text-black tracking-wide'>
                Privacy & Data
              </h3>
              <p className='text-dark-text-secondary text-sm mb-6 leading-relaxed font-light'>
                Your photos are stored locally in your browser. We respect your
                privacy—no servers, no tracking. Clearing data will permanently
                delete your gallery.
              </p>

              <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 bg-black/5 rounded-xl border border-black/5 group hover:border-black/10 transition-colors gap-4'>
                <div>
                  <p className='font-bold text-sm text-black'>
                    Local Gallery Storage
                  </p>
                  <p className='text-[11px] text-gray-500 uppercase tracking-widest mt-1'>
                    Manage local data
                  </p>
                </div>
                <button
                  onClick={handleClearData}
                  disabled={cleared}
                  className={`
                            w-full md:w-auto px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center
                            ${
                              cleared
                                ? 'bg-green-100/50 border-green-500/30 text-green-700'
                                : 'bg-white border-black/10 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-500'
                            }
                        `}
                >
                  {cleared ? (
                    <span className='flex items-center'>
                      <Check size={14} className='mr-2' /> Cleared
                    </span>
                  ) : (
                    <span className='flex items-center'>
                      <Trash2 size={14} className='mr-2' /> Clear Data
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preferences Section (Dummy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='p-8 rounded-3xl bg-glass-light backdrop-blur-xl border border-dark-border shadow-glass opacity-50 pointer-events-none'
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-medium'>App Preferences</h3>
            <span className='text-xs uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-white/5'>
              Coming Soon
            </span>
          </div>
        </motion.div>

        <div className='text-center pt-12 text-dark-text-secondary text-xs tracking-widest uppercase opacity-40'>
          Version 1.2.0 • Premium Glass Edition
        </div>
      </div>
    </div>
  );
};

export default Settings;
