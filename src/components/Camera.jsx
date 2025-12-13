import { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, RotateCw, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = [
  { id: 'normal', name: 'Normal', class: '' },
  { id: 'bw', name: 'B&W', class: 'grayscale' },
  { id: 'sepia', name: 'Sepia', class: 'sepia' },
  { id: 'warm', name: 'Warm', class: 'sepia contrast-125 brightness-110' },
  { id: 'cool', name: 'Cool', class: 'hue-rotate-15 contrast-110' },
  {
    id: 'vintage',
    name: 'Vintage',
    class: 'sepia-[.5] hue-rotate-[-30deg] contrast-75',
  },
];

const Camera = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  useEffect(() => {
    let mediaStream = null;
    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
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
    if (photoIndex >= 3) {
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

    if (selectedFilter.id !== 'normal') {
      context.filter = getComputedStyle(video).filter;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.filter = 'none';

    const imageData = canvas.toDataURL('image/png');

    setPhotos((prev) => {
      const newPhotos = [...prev, imageData];
      const nextIndex = newPhotos.length;
      if (isSessionActive && nextIndex < 3) {
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
    <div className='w-full h-full min-h-screen bg-white text-black overflow-hidden flex flex-col items-center justify-center p-4 relative'>
      {/* Background Gradients */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px]' />
      </div>

      <div className='w-full max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-10 h-full justify-center'>
        {/* Top Bar: Title & Status */}
        <div className='w-full flex justify-between items-center px-4 md:px-0'>
          <div className='flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-black/5 shadow-sm'>
            <div
              className={`w-2 h-2 rounded-full ${
                isSessionActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
            <span className='text-xs font-bold uppercase tracking-widest text-gray-500'>
              {isSessionActive ? 'Recording...' : 'Camera Ready'}
            </span>
          </div>

          <div className='text-sm font-medium text-gray-400 tracking-wider'>
            {photos.length} <span className='text-gray-300'>/</span> 3
          </div>
        </div>

        <div className='flex flex-col lg:flex-row w-full gap-4 md:gap-8 h-[55vh] md:h-[65vh] lg:h-[70vh]'>
          {/* LEFT: Camera Viewport */}
          <div className='flex-1 relative bg-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border-4 border-white ring-1 ring-black/5 group'>
            {/* Video Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 transition-all duration-300 ${selectedFilter.class}`}
            />
            <canvas ref={canvasRef} className='hidden' />

            {/* Overlays */}
            <AnimatePresence>
              {countdown !== null && countdown > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  key={countdown}
                  className='absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm'
                >
                  <span className='text-[8rem] md:text-[12rem] font-black text-white drop-shadow-lg tracking-tighter mix-blend-overlay'>
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flash */}
            {countdown === 0 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='absolute inset-0 bg-white z-50'
              />
            )}

            {/* Filter selector (Overlay on Desktop, Below on Mobile) */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/10 hidden lg:flex gap-2'>
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    selectedFilter.id === filter.id
                      ? 'border-white scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  title={filter.name}
                >
                  <div
                    className={`w-full h-full bg-gray-200 ${filter.class}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Sidebar (Thumbnails & Actions) */}
          <div className='w-full lg:w-24 flex lg:flex-col justify-between gap-4'>
            {/* Thumbnails - Horizontal scroll on mobile, Vertical stack on desktop */}
            <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar w-full h-full justify-center'>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`
                                    flex-shrink-0 w-[28%] md:w-24 lg:w-32 aspect-[4/3] rounded-xl md:rounded-2xl border flex items-center justify-center overflow-hidden relative transition-all duration-300
                                    ${
                                      photos[idx]
                                        ? 'border-transparent shadow-lg'
                                        : 'bg-gray-50 border-gray-200 border-dashed'
                                    }
                                `}
                >
                  {photos[idx] ? (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={photos[idx]}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <span className='text-gray-300 text-xs font-bold'>
                      {idx + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter & Controls Bar */}
        <div className='w-full flex flex-col gap-6 items-center'>
          {/* Mobile Filters */}
          <div className='flex lg:hidden gap-3 overflow-x-auto w-full justify-center pb-2'>
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all shadow-sm ${
                  selectedFilter.id === filter.id
                    ? 'border-black scale-110'
                    : 'border-white opacity-70'
                }`}
              >
                <div className={`w-full h-full bg-gray-200 ${filter.class}`} />
              </button>
            ))}
          </div>

          {/* Main Controls */}
          <div className='flex items-center gap-6'>
            {!isSessionActive && photos.length < 3 && (
              <button
                onClick={startSession}
                className='group relative px-12 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-2xl overflow-hidden'
              >
                <span className='relative z-10 flex items-center gap-3'>
                  <Zap className='w-5 h-5 fill-white' />
                  Start Session
                </span>
                <div className='absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left' />
              </button>
            )}

            {isSessionActive && (
              <div className='w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center'>
                <div className='w-16 h-16 bg-red-500 rounded-full animate-pulse' />
              </div>
            )}

            {(photos.length === 3 ||
              (photos.length > 0 && !isSessionActive)) && (
              <div className='flex gap-4'>
                <button
                  onClick={handleRetake}
                  className='w-14 h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-black transition-all'
                  title='Retake'
                >
                  <RotateCw size={20} />
                </button>
                <button
                  onClick={handleDone}
                  className='px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-3'
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
