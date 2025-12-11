import React, { useState } from 'react';
import Camera from './components/Camera';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import Settings from './components/Settings';
import HeroSection from './components/Landing/HeroSection';
import FeaturesSection from './components/Landing/FeaturesSection';
import HowItWorksSection from './components/Landing/HowItWorksSection';
import Footer from './components/Landing/Footer';
import { savePhoto } from './utils/db';
import { Aperture, X, Settings as SettingsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState('home'); // home, camera, editor, gallery, settings
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
    setView('editor');
  };

  const handleSave = async (finalImage) => {
    try {
      await savePhoto(finalImage);
      setView('gallery');
    } catch (error) {
      alert(error.message); 
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setView('camera');
  };

  // Immersive mode check: Camera and Editor hide the standard header/layout
  const isImmersive = view === 'camera' || view === 'editor';

  return (
    <div className="w-full min-h-screen bg-dark-bg text-dark-text-primary font-sans selection:bg-white selection:text-black overflow-x-hidden antialiased">
      
      {/* Glass Navigation Header */}
      {!isImmersive && view !== 'settings' && (
        <motion.header 
           initial={{ y: -100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="bg-glass-medium backdrop-blur-2xl border border-black/5 rounded-full px-8 py-4 shadow-glass-sm flex items-center gap-12 max-w-2xl w-full justify-between hover:border-black/10 transition-colors duration-500">
              
              <div 
                  className="flex items-center space-x-3 cursor-pointer group" 
                  onClick={() => setView('home')}
              >
                  <Aperture className="w-6 h-6" />
                <h1 className="text-sm font-bold tracking-[0.2em] text-black hidden sm:block  opacity-90 group-hover:opacity-100 transition-opacity">Jeprtin Aja</h1>
              </div>
              
              <nav className="flex items-center space-x-8 text-[11px] font-bold tracking-[0.15em] uppercase text-dark-text-secondary">
                 <button 
                    onClick={() => setView('home')} 
                    className={`hover:text-black transition-all duration-300 py-1 relative ${view === 'home' ? 'text-black' : ''}`}
                 >
                    Home
                    {view === 'home' && <motion.div layoutId="nav-glow" className="absolute -bottom-1 left-0 right-0 h-px bg-black/20 shadow-glow" />}
                 </button>
                 <button 
                   onClick={() => setView('gallery')} 
                   className={`hover:text-black transition-all duration-300 py-1 relative ${view === 'gallery' ? 'text-black' : ''}`}
                 >
                   Gallery
                   {view === 'gallery' && <motion.div layoutId="nav-glow" className="absolute -bottom-1 left-0 right-0 h-px bg-black/20 shadow-glow" />}
                 </button>
                 <button 
                   onClick={() => setView('settings')}
                   className="hover:text-black transition-all duration-300 p-2 rounded-full hover:bg-black/5 active:scale-95"
                 >
                    <SettingsIcon size={16} />
                 </button>
              </nav>

          </div>
        </motion.header>
      )}

      <AnimatePresence mode='wait'>
        
        {/* HOMEPAGE */}
        {view === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full pt-20"
          >
            <HeroSection onStart={() => setView('camera')} />
            <FeaturesSection />
            <HowItWorksSection />
            <Footer />
          </motion.div>
        )}

        {/* GALLERY VIEW */}
        {view === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full min-h-screen pt-32 pb-12 flex flex-col items-center bg-dark-bg"
          >
            <div className="w-full max-w-6xl px-4 mb-16 text-center space-y-4">
               <h2 className="text-5xl font-thin tracking-tighter text-white">Collection</h2>
               <p className="text-dark-text-secondary text-sm uppercase tracking-widest">Local Storage Gallery</p>
            </div>
            <Gallery />
            <div className="mt-auto pt-24 w-full">
               <Footer />
            </div>
          </motion.div>
        )}

        {/* SETTINGS VIEW */}
        {view === 'settings' && (
             <motion.div
                key="settings"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
             >
                <Settings onBack={() => setView('home')} />
             </motion.div>
        )}

        {/* IMMERSIVE CAMERA VIEW */}
        {view === 'camera' && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-50 bg-dark-bg flex flex-col items-center justify-center p-4"
          >
             {/* Header for Camera View */}
             <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="flex items-center space-x-2 opacity-50">
                    <Sparkles className="w-4 h-4 text-black" />
                    <span className="text-xs font-bold tracking-[0.2em] text-black uppercase">Capture Mode</span>
                </div>
                <button 
                   onClick={() => setView('home')} 
                   className="p-3 bg-black/5 hover:bg-black/10 rounded-full text-black transition-all border border-black/5 group"
                >
                   <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
             </div>

            <Camera onCapture={handleCapture} />
          </motion.div>
        )}

        {/* IMMERSIVE EDITOR VIEW */}
        {view === 'editor' && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-dark-bg flex flex-col"
          >
             <button 
               onClick={() => setView('home')} 
               className="absolute top-8 right-8 z-[60] p-3 bg-glass-medium backdrop-blur-md rounded-full text-black hover:bg-black hover:text-white transition-all border border-black/5 group"
            >
               <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <Editor 
              capturedImage={capturedImage} 
              onRetake={handleRetake} 
              onSave={handleSave} 
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;
