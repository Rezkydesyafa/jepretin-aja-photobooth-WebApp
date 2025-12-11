import React, { useState, useRef } from 'react';
import { FRAMES } from '../utils/frames';
import { STICKERS } from '../utils/stickers';
import {
  RefreshCw,
  Save,
  Download,
  Share2,
  Printer,
  Smile,
  Layout,
  Settings2,
  Trash2,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Editor = ({ capturedImage, onRetake, onSave }) => {
  const sourcePhotos = Array.isArray(capturedImage)
    ? capturedImage
    : [capturedImage, capturedImage, capturedImage, capturedImage];
  const photos =
    sourcePhotos.length === 4
      ? sourcePhotos
      : [...sourcePhotos, ...Array(4 - sourcePhotos.length).fill(null)].slice(
          0,
          4
        );

  const [activeTab, setActiveTab] = useState('frames');
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [photoShape, setPhotoShape] = useState('square');
  const [stickers, setStickers] = useState([]);
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [language, setLanguage] = useState('ENG');

  const stripRef = useRef(null);

  // Sticker Logic
  const addSticker = (StickerIcon) => {
    const newSticker = {
      id: Date.now(),
      icon: StickerIcon,
      x: 50,
      y: 50,
      scale: 1,
    };
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const toggleLanguage = () => {
    const langs = ['ENG', 'KOR', 'CN'];
    const nextIndex = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const getShapeClass = () => {
    switch (photoShape) {
      case 'rounded':
        return 'rounded-2xl';
      case 'circle':
        return 'rounded-full aspect-square';
      case 'heart':
        return 'mask-heart';
      default:
        return 'rounded-none';
    }
  };

  // Canvas Generation
  const generateFinalStrip = async () => {
    setIsSaving(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const WIDTH = 600;
    const HEIGHT = 1800;
    const PADDING = 40;
    const PHOTO_WIDTH = WIDTH - PADDING * 2;
    const PHOTO_HEIGHT = PHOTO_WIDTH * 0.75;
    const GAP = 30;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Background Handling with Patterns
    const bg = selectedFrame.containerStyle.backgroundColor || '#FFFFFF';
    const bgGradient =
      selectedFrame.containerStyle.background ||
      selectedFrame.containerStyle.backgroundImage;

    // Default Fill
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (
      selectedFrame.id === 'cloud-dream' ||
      selectedFrame.id === 'silver-gradient'
    ) {
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT); // Vertical gradient
      if (selectedFrame.id === 'cloud-dream') {
        grad.addColorStop(0, '#E3F2FD');
        grad.addColorStop(1, '#BBDEFB');
      } else {
        grad.addColorStop(0, '#f5f7fa');
        grad.addColorStop(1, '#c3cfe2');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else if (selectedFrame.id === 'cute-grid') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = '#E1F5FE';
      ctx.lineWidth = 2; // Scaled up
      const gridSize = 40; // 20px * 2
      ctx.beginPath();
      for (let x = 0; x <= WIDTH; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
      }
      for (let y = 0; y <= HEIGHT; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
      }
      ctx.stroke();
    } else if (selectedFrame.id === 'polka-dots') {
      ctx.fillStyle = '#FFF8E1';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#FFD54F';
      const size = 32; // 16px * 2
      const radius = size * 0.2; // 20%
      for (let y = 0; y < HEIGHT; y += size) {
        for (let x = 0; x < WIDTH; x += size) {
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (selectedFrame.id === 'checkerboard') {
      ctx.fillStyle = '#FFE0E0';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#FFCDD2';
      const size = 64; // 32px * 2
      for (let y = 0; y < HEIGHT; y += size) {
        for (let x = 0; x < WIDTH; x += size) {
          if ((x / size + y / size) % 2 !== 0) {
            ctx.fillRect(x, y, size, size);
          }
        }
      }
    } else if (selectedFrame.id === 'love-hearts') {
      // Draw base pink
      ctx.fillStyle = '#FFEBEE';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      // Draw random hearts pattern
      ctx.fillStyle = '#FFCDD2';
      for (let i = 0; i < 50; i++) {
        const hx = Math.random() * WIDTH;
        const hy = Math.random() * HEIGHT;
        const hs = 10 + Math.random() * 20;
        ctx.font = `${hs}px serif`;
        ctx.fillText('❤', hx, hy);
      }
    } else if (selectedFrame.id === 'starry-night') {
      ctx.fillStyle = '#0D1B2A';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#FFF';
      for (let i = 0; i < 100; i++) {
        const sx = Math.random() * WIDTH;
        const sy = Math.random() * HEIGHT;
        const ss = Math.random() * 3;
        ctx.globalAlpha = Math.random();
        ctx.beginPath();
        ctx.arc(sx, sy, ss, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    } else if (selectedFrame.id === 'bear-hug') {
      ctx.fillStyle = '#F7E7CE';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      // Draw little bear ears at corners of photos would be cool, but for now just simple background
      ctx.fillStyle = '#D7CCC8';
      // Polka dots for texture
      for (let y = 0; y < HEIGHT; y += 80) {
        for (let x = 0; x < WIDTH; x += 80) {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (selectedFrame.id === 'comic-pop') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      // Halftone pattern
      ctx.fillStyle = '#FFEB3B';
      for (let y = 0; y < HEIGHT; y += 20) {
        for (let x = 0; x < WIDTH; x += 20) {
          if ((x + y) % 40 === 0) {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    } else if (selectedFrame.id === 'matte-black') {
      ctx.fillStyle = '#111111';
    } else {
      ctx.fillStyle = bg;
    }
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (selectedFrame.id === 'thin-black') {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        PADDING / 2,
        PADDING / 2,
        WIDTH - PADDING,
        HEIGHT - PADDING
      );
    }

    ctx.fillStyle = selectedFrame.textColor || '#000000';
    ctx.font = '500 20px Inter, sans-serif';
    ctx.textAlign = 'center';

    let headerY = PADDING + 30;
    if (showDate || showTime) {
      let text = '';
      if (showDate) text += new Date().toLocaleDateString();
      if (showDate && showTime) text += ' • ';
      if (showTime)
        text += new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      ctx.fillText(text.toUpperCase(), WIDTH / 2, headerY);
      headerY += 40;
    }

    let currentY = headerY + 10;

    const loadImg = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

    for (let photoSrc of photos) {
      if (photoSrc) {
        const img = await loadImg(photoSrc);
        if (img) {
          ctx.save();
          ctx.beginPath();
          const x = PADDING;
          const y = currentY;
          const w = PHOTO_WIDTH;
          const h = PHOTO_HEIGHT;

          if (photoShape === 'rounded') {
            const r = 20;
            ctx.roundRect(x, y, w, h, r);
            ctx.clip();
          } else if (photoShape === 'circle') {
            const size = Math.min(w, h);
            ctx.arc(x + w / 2, y + h / 2, size / 2, 0, Math.PI * 2);
            ctx.clip();
          } else if (photoShape === 'heart') {
            const topCurveHeight = h * 0.3;
            ctx.moveTo(x + w / 2, y + h / 5);
            ctx.bezierCurveTo(
              x + w / 2,
              y + h / 6,
              x,
              y,
              x,
              y + topCurveHeight
            );
            ctx.bezierCurveTo(
              x,
              y + (h + topCurveHeight) / 2,
              x + w / 2,
              y + h,
              x + w / 2,
              y + h
            );
            ctx.bezierCurveTo(
              x + w / 2,
              y + h,
              x + w,
              y + (h + topCurveHeight) / 2,
              x + w,
              y + topCurveHeight
            );
            ctx.bezierCurveTo(
              x + w,
              y,
              x + w / 2,
              y + h / 6,
              x + w / 2,
              y + h / 5
            );
            ctx.closePath();
            ctx.clip();
          } else {
            ctx.rect(x, y, w, h);
            ctx.clip();
          }

          const scale = Math.max(w / img.width, h / img.height);
          const xx = x + w / 2 - (img.width / 2) * scale;
          const yy = y + h / 2 - (img.height / 2) * scale;
          ctx.drawImage(img, xx, yy, img.width * scale, img.height * scale);

          ctx.restore();
        }
      }
      currentY += PHOTO_HEIGHT + GAP;
    }

    ctx.font = '40px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = selectedFrame.textColor || '#000000';
    ctx.fillText('sparkle.memories', WIDTH / 2, currentY + 60);
    ctx.globalAlpha = 1.0;

    return canvas.toDataURL('image/png');
  };

  const handleSaveClick = async () => {
    const dataUrl = await generateFinalStrip();
    onSave(dataUrl);
    setIsSaving(false);
  };

  const handleDownloadClick = async () => {
    const dataUrl = await generateFinalStrip();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'sparkle-photostrip.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = async () => {
    const dataUrl = await generateFinalStrip();
    const win = window.open('');
    win.document.write(`
        <html>
            <head><title>Print Photostrip</title></head>
            <body style="margin:0; display:flex; align-items:center; justify-content:center; height:100vh;">
                <img src="${dataUrl}" style="max-height:100vh; width:auto;"/>
                <script>window.onload = function() { window.print(); window.close(); }</script>
            </body>
        </html>
    `);
    win.document.close();
  };

  const handleShareClick = async () => {
    try {
      const dataUrl = await generateFinalStrip();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'sparkle-photostrip.png', {
        type: 'image/png',
      });

      if (navigator.share) {
        await navigator.share({
          title: 'SparkleBooth Photostrip',
          text: 'Check out my photostrip created with SparkleBooth!',
          files: [file],
        });
      } else {
        alert('Sharing is not supported on this device/browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden'>
      {/* LEFT COLUMN: PREVIEW AREA */}
      <div className='flex-grow relative flex items-center justify-center p-8 lg:p-12 overflow-hidden bg-[#fafafa]'>
        {/* Subtle Mesh Gradient Background */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px]' />
          <div className='absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]' />
          <div className='absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[100px]' />
        </div>

        {/* Photostrip Container */}
        <div className='relative z-10 h-full flex items-center justify-center w-full'>
          <div className='relative shadow-2xl transition-all duration-500 transform max-h-full overflow-y-auto scrollbar-hide rounded-sm hover:-translate-y-1 hover:shadow-3xl lg:scale-90 xl:scale-100 bg-white'>
            {/* STRIP DOM RENDER */}
            <div
              ref={stripRef}
              className='w-[300px] flex flex-col gap-6 relative transition-all duration-500'
              style={{
                ...selectedFrame.containerStyle,
                padding: selectedFrame.containerStyle.padding || '32px',
                minHeight: 'auto',
              }}
            >
              {selectedFrame.renderOverlay && selectedFrame.renderOverlay()}

              {/* Header Info */}
              {(showDate || showTime) && (
                <div
                  className='flex flex-col items-center justify-center pb-2 opacity-60 z-10'
                  style={{ color: selectedFrame.textColor || 'inherit' }}
                >
                  <div className='text-[10px] tracking-[0.3em] font-medium uppercase flex gap-3'>
                    {showDate && <span>{new Date().toLocaleDateString()}</span>}
                    {showTime && (
                      <span>
                        {new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Photos Grid */}
              <div className='flex flex-col gap-5 z-10'>
                {photos.map((src, idx) => (
                  <div
                    key={idx}
                    className={`relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shadow-sm ${getShapeClass()} transition-all duration-300`}
                  >
                    {src ? (
                      <img
                        src={src}
                        className='w-full h-full object-cover'
                        alt={`Frame ${idx}`}
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-xs text-gray-300'>
                        Empty
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Signature */}
              <div
                className='pt-8 pb-2 text-center z-10'
                style={{ color: selectedFrame.textColor || 'inherit' }}
              >
                <h3 className='font-handwriting text-3xl font-normal opacity-90'>
                  sparkle.memories
                </h3>
              </div>

              {/* Sticker Layer */}
              <div className='absolute inset-0 z-20 overflow-hidden pointer-events-none'>
                {stickers.map((sticker) => (
                  <motion.div
                    key={sticker.id}
                    drag
                    dragMomentum={false}
                    className='absolute cursor-move pointer-events-auto text-black/90 hover:text-black hover:drop-shadow-lg transition-all'
                    style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <sticker.icon size={48} strokeWidth={1.5} />
                    <button
                      onClick={() => removeSticker(sticker.id)}
                      className='absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 opacity-0 hover:opacity-100 transition-opacity shadow-sm'
                    >
                      <Trash2 size={10} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: CUSTOMIZATION PANEL */}
      <div className='w-full lg:w-[480px] bg-white border-l border-gray-100 shadow-xl lg:shadow-none flex flex-col z-30 h-[50vh] lg:h-full lg:min-h-screen relative'>
        {/* Header */}
        <div className='px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-black'>
              Customize
            </h2>
            <p className='text-xs text-gray-400 tracking-widest uppercase mt-1'>
              Design your legacy
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className='px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white rounded-lg text-[10px] font-bold tracking-widest transition-colors uppercase border border-gray-200 hover:border-black'
            title='Switch Language'
          >
            {language}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className='flex px-8 pt-6 pb-2 gap-6 overflow-x-auto no-scrollbar border-b border-transparent'>
          {[
            { id: 'frames', icon: Layout, label: 'Layout' },
            { id: 'shapes', icon: Settings2, label: 'Shapes' },
            { id: 'stickers', icon: Smile, label: 'Stickers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                        relative pb-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2
                        ${
                          activeTab === tab.id
                            ? 'text-black'
                            : 'text-gray-400 hover:text-gray-600'
                        }
                    `}
            >
              <tab.icon
                size={14}
                className={activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-2'}
              />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute bottom-0 left-0 w-full h-0.5 bg-black'
                />
              )}
            </button>
          ))}
        </div>

        {/* Controls Area */}
        <div className='flex-grow overflow-y-auto p-8 scrollbar-hide bg-white space-y-8'>
          <AnimatePresence mode='wait'>
            {activeTab === 'frames' && (
              <motion.div
                key='frames'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className='space-y-10'
              >
                <section>
                  <div className='mb-4'>
                    <h3 className='text-sm font-bold text-black mb-4'>
                      Frame Color
                    </h3>
                    <div className='flex flex-wrap gap-3'>
                      {FRAMES.map((frame) => {
                        // 1. Base Preview Style (from container)
                        let previewStyle = {
                          background:
                            frame.containerStyle.background ||
                            frame.containerStyle.backgroundColor,
                          backgroundImage: frame.containerStyle.backgroundImage,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        };

                        // 2. Specific Visual Overrides for "Empty" or "Complex" frames
                        let innerElement = null;

                        switch (frame.id) {
                          case 'thin-black':
                            previewStyle.border = '1px solid black';
                            break;
                          case 'matte-black':
                            previewStyle.backgroundColor = '#111';
                            break;
                          case 'clean-white':
                            previewStyle.backgroundColor = '#ffffff';
                            previewStyle.border = '1px solid #e5e5e5';
                            previewStyle.boxShadow = 'inset 0 0 0 2px #f9f9f9';
                            break;
                          case 'polaroid':
                            previewStyle.backgroundColor = '#fff';
                            previewStyle.border = '1px solid #e0e0e0';
                            previewStyle.boxShadow =
                              '0 2px 4px rgba(0,0,0,0.1)';
                            previewStyle.display = 'flex';
                            previewStyle.alignItems = 'flex-end';
                            previewStyle.justifyContent = 'center';
                            previewStyle.paddingBottom = '6px';
                            innerElement = (
                              <div className='w-6 h-6 bg-gray-100 border border-gray-200' />
                            );
                            break;
                          case 'double-line':
                            previewStyle.backgroundColor = '#fff';
                            previewStyle.border = '3px double black';
                            break;
                          case 'dotted':
                            previewStyle.backgroundColor = '#fff';
                            previewStyle.border = '2px dotted #999';
                            break;
                          case 'film-strip':
                            previewStyle.backgroundColor = '#111';
                            previewStyle.borderLeft =
                              '3px dashed rgba(255,255,255,0.6)';
                            previewStyle.borderRight =
                              '3px dashed rgba(255,255,255,0.6)';
                            previewStyle.boxSizing = 'border-box';
                            break;
                          case 'brackets':
                            previewStyle.backgroundColor = '#fff';
                            previewStyle.border = '1px solid #eee';
                            innerElement = (
                              <div className='text-[10px] font-bold text-black opacity-50'>
                                |
                              </div>
                            );
                            break;
                          case 'comic-pop':
                            previewStyle.backgroundColor = '#fff';
                            previewStyle.border = '2px solid black';
                            previewStyle.boxShadow = '3px 3px 0px #FFEB3B';
                            innerElement = (
                              <div className='w-full h-full opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:4px_4px]' />
                            );
                            break;
                          case 'geometric':
                            previewStyle.backgroundColor = '#fff';
                            innerElement = (
                              <svg
                                viewBox='0 0 40 40'
                                className='w-full h-full opacity-80'
                              >
                                <polygon points='0,0 20,0 0,20' fill='black' />
                                <polygon
                                  points='40,40 20,40 40,20'
                                  fill='black'
                                />
                              </svg>
                            );
                            break;
                          case 'marble':
                            previewStyle.background = '#FAFAFA';
                            previewStyle.backgroundImage =
                              'url("https://www.transparenttextures.com/patterns/white-diamond.png")';
                            // Fallback visual if image fails or for clear distinction
                            innerElement = (
                              <div className='w-full h-full opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:2px_2px]' />
                            );
                            previewStyle.border = '1px solid #eee';
                            break;
                          case 'silver-gradient':
                            previewStyle.background =
                              'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                            previewStyle.border = '1px solid #ccc';
                            break;
                          case 'metallic':
                            previewStyle.background =
                              'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 2px, #f5f5f5 2px, #f5f5f5 4px)';
                            previewStyle.border = '1px solid #999';
                            break;
                          case 'pastel-pink':
                            previewStyle.border = '3px solid white';
                            previewStyle.outline = '1px solid #FFB7C5';
                            break;
                          case 'pastel-mint':
                            previewStyle.border = '3px solid white';
                            previewStyle.outline = '1px solid #A3E4D7';
                            break;
                          case 'pastel-lavender':
                            previewStyle.border = '2px solid white';
                            previewStyle.outline = '2px dashed #CE93D8';
                            previewStyle.outlineOffset = '-2px';
                            break;
                          case 'cute-grid':
                            previewStyle.background =
                              'linear-gradient(#E1F5FE 2px, transparent 2px), linear-gradient(90deg, #E1F5FE 2px, transparent 2px)';
                            previewStyle.backgroundSize = '8px 8px';
                            previewStyle.border = '1px solid #E1F5FE';
                            break;
                          case 'polka-dots':
                            previewStyle.backgroundColor = '#FFF8E1';
                            previewStyle.backgroundImage =
                              'radial-gradient(#FFD54F 30%, transparent 30%)';
                            previewStyle.backgroundSize = '8px 8px';
                            break;
                          case 'checkerboard':
                            previewStyle.backgroundColor = '#FFE0E0';
                            previewStyle.backgroundImage =
                              'conic-gradient(#FFCDD2 90deg, transparent 90deg 180deg, #FFCDD2 180deg 270deg, transparent 270deg)';
                            previewStyle.backgroundSize = '12px 12px';
                            break;
                          case 'love-hearts':
                            previewStyle.backgroundColor = '#FFEBEE';
                            previewStyle.border = '2px solid #FFCDD2';
                            break;
                          case 'starry-night':
                            previewStyle.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
                            break;
                          case 'bear-hug':
                            previewStyle.backgroundColor = '#F7E7CE';
                            previewStyle.border = '2px solid #5D4037';
                            innerElement = (
                              <>
                                <div className='absolute -top-1 -left-1 w-3 h-3 bg-[#5D4037] rounded-full' />
                                <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#5D4037] rounded-full' />
                              </>
                            );
                            break;
                          default:
                            // Fallback for any generic white frames to ensure visibility
                            if (
                              previewStyle.background === '#FFFFFF' ||
                              previewStyle.background === '#FFF' ||
                              previewStyle.backgroundColor === '#FFFFFF'
                            ) {
                              previewStyle.border = '1px solid #eaeaea';
                            }
                            break;
                        }

                        return (
                          <button
                            key={frame.id}
                            onClick={() => setSelectedFrame(frame)}
                            title={frame.name}
                            className={`
                                      w-10 h-10 rounded-full transition-all duration-300 relative shadow-sm hover:shadow-md hover:scale-110 flex items-center justify-center overflow-hidden
                                      ${
                                        selectedFrame.id === frame.id
                                          ? 'ring-2 ring-offset-2 ring-black scale-110 z-10'
                                          : 'hover:ring-2 hover:ring-black/10'
                                      }
                                  `}
                            style={previewStyle}
                          >
                            {innerElement}

                            {selectedFrame.id === frame.id && (
                              <div className='absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]'>
                                <div className='w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shadow-lg'>
                                  <Check size={10} strokeWidth={4} />
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-4'>
                    Display Options
                  </h3>
                  <div className='flex flex-col gap-3'>
                    {[
                      {
                        label: 'Show Date',
                        checked: showDate,
                        onChange: () => setShowDate(!showDate),
                      },
                      {
                        label: 'Show Time',
                        checked: showTime,
                        onChange: () => setShowTime(!showTime),
                      },
                    ].map((opt, i) => (
                      <label
                        key={i}
                        className='flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors bg-gray-50/50'
                      >
                        <span className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
                          {opt.label}
                        </span>
                        <div
                          className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${
                            opt.checked ? 'bg-black' : 'bg-gray-200'
                          }`}
                        >
                          <input
                            type='checkbox'
                            checked={opt.checked}
                            onChange={opt.onChange}
                            className='hidden'
                          />
                          <motion.div
                            animate={{ x: opt.checked ? 16 : 0 }}
                            className='w-4 h-4 bg-white rounded-full shadow-sm'
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'shapes' && (
              <motion.div
                key='shapes'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className='space-y-8'
              >
                <div className='grid grid-cols-2 gap-4'>
                  {['square', 'rounded', 'circle', 'heart'].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setPhotoShape(shape)}
                      className={`
                                        aspect-square flex flex-col items-center justify-center gap-4 rounded-2xl border-2 transition-all
                                        ${
                                          photoShape === shape
                                            ? 'border-black bg-gray-50 shadow-sm'
                                            : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }
                                      `}
                    >
                      <div
                        className={`w-16 h-16 bg-gray-900 ${
                          shape === 'rounded'
                            ? 'rounded-2xl'
                            : shape === 'circle'
                            ? 'rounded-full'
                            : shape === 'heart'
                            ? 'mask-heart'
                            : ''
                        }`}
                      />
                      <span className='text-[10px] uppercase font-bold tracking-widest text-gray-500'>
                        {shape}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'stickers' && (
              <motion.div
                key='stickers'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className='space-y-6'
              >
                <div className='grid grid-cols-4 gap-3'>
                  {STICKERS.map((sticker) => (
                    <button
                      key={sticker.id}
                      onClick={() => addSticker(sticker.icon)}
                      className='aspect-square bg-gray-50 hover:bg-black hover:text-white rounded-xl flex items-center justify-center text-gray-800 transition-all active:scale-95'
                    >
                      <sticker.icon size={24} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
                <div className='p-4 bg-blue-50 rounded-xl flex items-start gap-3'>
                  <Smile className='w-5 h-5 text-blue-500 shrink-0 mt-0.5' />
                  <p className='text-xs text-blue-800 leading-relaxed font-medium'>
                    Tip: Drag stickers directly on the preview to position them
                    perfectly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className='p-8 border-t border-gray-100 bg-white space-y-4'>
          <button
            onClick={handleDownloadClick}
            disabled={isSaving}
            className='w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gray-800 hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50'
          >
            {isSaving ? (
              <RefreshCw className='animate-spin' size={18} />
            ) : (
              <Download size={18} />
            )}
            <span>Download Strip</span>
          </button>

          <div className='grid grid-cols-3 gap-3'>
            {[
              { icon: RefreshCw, label: 'Retake', action: onRetake },
              { icon: Printer, label: 'Print', action: handlePrintClick },
              { icon: Share2, label: 'Share', action: handleShareClick },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className='py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black transition-all flex flex-col items-center justify-center gap-1.5 text-[10px]'
              >
                <btn.icon size={16} /> {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mask-heart {
            -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Editor;
