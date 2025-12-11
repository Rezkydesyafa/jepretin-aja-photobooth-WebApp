import React, { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, RotateCw, Check, ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = [
  { id: 'normal', name: 'Normal', class: '' },
  { id: 'bw', name: 'B&W', class: 'grayscale' },
  { id: 'sepia', name: 'Sepia', class: 'sepia' },
  { id: 'warm', name: 'Warm', class: 'sepia contrast-125 brightness-110' },
  { id: 'cool', name: 'Cool', class: 'hue-rotate-15 contrast-110' },
  { id: 'vintage', name: 'Vintage', class: 'sepia-[.5] hue-rotate-[-30deg] contrast-75' },
];

const Camera = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]); // Array of captured images
  const [countdown, setCountdown] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  useEffect(() => {
    let mediaStream = null;
    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Countdown and Capture Logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      capturePhoto();
    }
  }, [countdown]);

  const startSession = () => {
    setPhotos([]);
    setIsSessionActive(true);
    triggerNextCapture(0);
  };

  const triggerNextCapture = (photoIndex) => {
    if (photoIndex >= 4) {
      setIsSessionActive(false);
      setCountdown(null);
      return;
    }
    // Small delay between shots if not the first one
    const delay = photoIndex === 0 ? 0 : 1000;
    setTimeout(() => {
        setCountdown(3);
    }, delay);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.translate(canvas.width, 0);
    context.scale(-1, 1); // Mirror
    
    // Apply filter context if possible or just save raw and apply CSS in preview
    if (selectedFilter.id !== 'normal') {
       context.filter = getComputedStyle(video).filter;
    }
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Reset filter
    context.filter = 'none';

    const imageData = canvas.toDataURL('image/png');
    
    setPhotos(prev => {
        const newPhotos = [...prev, imageData];
        const nextIndex = newPhotos.length;
        if (isSessionActive && nextIndex < 4) {
             triggerNextCapture(nextIndex);
        } else {
             setIsSessionActive(false);
             setCountdown(null);
        }
        return newPhotos;
    });
  };

  const handleRetake = () => {
    setPhotos([]);
    setIsSessionActive(false);
    setCountdown(null);
  };

  const handleDone = () => {
    if (photos.length > 0) {
        onCapture(photos); 
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide bg-transparent">
        {/* Container with min-height to ensure centering but allow expansion */}
        {/* pb-24 ensures extra space at bottom so nothing is clipped on small screens */}
        <div className="min-h-full w-full max-w-7xl mx-auto flex flex-col items-center justify-start xl:justify-center gap-6 pt-24 pb-24 px-4 animate-fade-in relative z-10 transition-all">
        
          {/* Header / Counter */}
          <div className="text-center space-y-2 flex-shrink-0">
              <h2 className="text-xl font-bold tracking-[0.2em] text-black uppercase flex items-center justify-center gap-2">
                  <CameraIcon size={20} className="mb-0.5" />
                  Photo Session
              </h2>
              <p className="text-sm font-medium text-gray-400 tracking-wider">
                  {photos.length === 0 ? 'Ready to Start' : `${photos.length} / 4 Captures`}
              </p>
          </div>

          {/* Main Layout: Video + Thumbnails */}
          <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10 items-start justify-center flex-shrink-0">
              
              {/* LEFT: Main Camera Feed */}
              {/* max-h-[60vh] ensures it doesn't take up too much vertical space on laptops */}
              <div className="relative w-full lg:flex-1 bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 group aspect-video lg:max-h-[60vh]">
                  <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover transform -scale-x-100 transition-all duration-300 ${selectedFilter.class}`} 
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Countdown Overlay */}
                  <AnimatePresence>
                      {countdown !== null && countdown > 0 && (
                      <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          key={countdown}
                          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/10 backdrop-blur-sm"
                      >
                          <div className="relative">
                              <span className="text-[12rem] font-bold text-white drop-shadow-2xl">{countdown}</span>
                              <Sparkles className="absolute -top-4 -right-12 text-yellow-300 w-24 h-24 animate-pulse" />
                          </div>
                      </motion.div>
                      )}
                  </AnimatePresence>

                  {/* Flash Effect */}
                  {countdown === 0 && (
                      <motion.div 
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-white z-30"
                      />
                  )}
              </div>

              {/* RIGHT: Thumbnail Strip */}
              <div className="w-full lg:w-48 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible py-2 lg:py-0 px-1 lg:px-0 scrollbar-hide shrink-0 lg:max-h-[60vh] lg:overflow-y-auto">
                  {[0, 1, 2, 3].map((idx) => (
                      <div 
                          key={idx} 
                          className={`
                              flex-shrink-0 w-24 lg:w-full aspect-[4/3] rounded-2xl border-2 flex items-center justify-center overflow-hidden relative shadow-sm transition-all
                              ${photos[idx] ? 'border-white bg-black' : 'bg-white border-dashed border-gray-300'}
                          `}
                      >
                          {photos[idx] ? (
                              <motion.img 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              src={photos[idx]} 
                              className="w-full h-full object-cover" 
                              />
                          ) : (
                              <span className="text-gray-300 text-lg font-bold">{idx + 1}</span>
                          )}
                      </div>
                  ))}
              </div>
          </div>

          {/* FILTER BAR */}
          <div className="w-full max-w-3xl flex-shrink-0 mt-4">
              <div className="bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-black/5 p-4 flex items-center justify-start lg:justify-center gap-6 overflow-x-auto scrollbar-hide">
                {FILTERS.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter)}
                        className={`flex flex-col items-center gap-2 group min-w-[70px] cursor-pointer outline-none`}
                    >
                        <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-sm ${selectedFilter.id === filter.id ? 'border-black scale-110 ring-2 ring-black/10' : 'border-white group-hover:border-gray-300'}`}>
                            <div className={`w-full h-full bg-gray-200 ${filter.class}`} >
                                <img 
                                    src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=150" 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => {e.target.style.display='none'}}
                                    alt={filter.name}
                                />
                                <div className="w-full h-full bg-gray-300 absolute inset-0 -z-10" />
                            </div>
                        </div>
                        <span className={`text-[9px] uppercase font-bold tracking-widest transition-colors ${selectedFilter.id === filter.id ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            {filter.name}
                        </span>
                    </button>
                ))}
              </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 z-10 pb-4 flex-shrink-0">
              {!isSessionActive && photos.length < 4 && (
                  <button 
                      onClick={startSession}
                      className="flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl"
                  >
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Start Session
                  </button>
              )}
              
              {isSessionActive && (
                  <div className="flex items-center gap-3 px-10 py-5 bg-gray-100 text-gray-400 border border-gray-200 rounded-full font-bold uppercase tracking-widest cursor-wait">
                      <span className="animate-pulse">Taking Photos...</span>
                  </div>
              )}

              {(photos.length === 4 || (photos.length > 0 && !isSessionActive)) && (
                  <>
                      <button 
                          onClick={handleRetake}
                          className="flex items-center gap-3 px-8 py-4 bg-white text-black border border-black/10 rounded-full font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
                      >
                          <RotateCw size={18} />
                          Retake
                      </button>
                      <button 
                          onClick={handleDone}
                          className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg group"
                      >
                          Done
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                  </>
              )}
          </div>
        
        </div>
    </div>
  );
};

export default Camera;
