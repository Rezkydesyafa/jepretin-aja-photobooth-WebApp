import React, { useState, useRef } from 'react';
import { FRAMES } from '../utils/frames';
import { STICKERS } from '../utils/stickers';
import { RefreshCw, Save, Download, Share2, Printer, Smile, Layout, Type, Settings2, Trash2 } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

const Editor = ({ capturedImage, onRetake, onSave }) => {
  // Logic to handle input photos: ensure we always have an array of 4
  const sourcePhotos = Array.isArray(capturedImage) ? capturedImage : [capturedImage, capturedImage, capturedImage, capturedImage];
  const photos = sourcePhotos.length === 4 ? sourcePhotos : [...sourcePhotos, ...Array(4-sourcePhotos.length).fill(null)].slice(0,4);

  const [activeTab, setActiveTab] = useState('frames'); // frames, shapes, stickers, settings
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [photoShape, setPhotoShape] = useState('square'); // square, rounded, circle, heart
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
      x: 50, y: 50, scale: 1
    };
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const toggleLanguage = () => {
      const langs = ['ENG', 'KOR', 'CN'];
      const nextIndex = (langs.indexOf(language) + 1) % langs.length;
      setLanguage(langs[nextIndex]);
  };

  // Helper for photo shape class
  const getShapeClass = () => {
      switch(photoShape) {
          case 'rounded': return 'rounded-2xl';
          case 'circle': return 'rounded-full aspect-square';
          case 'heart': return 'mask-heart'; // Would need custom CSS for clip-path, fallback to rounded for now
          default: return 'rounded-none';
      }
  };

  // --- CANVAS GENERATION LOGIC ---
  const generateFinalStrip = async () => {
      setIsSaving(true);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // High Res Dimensions
      const WIDTH = 600;
      const HEIGHT = 1800; // 3:1 aspect ratio roughly
      const PADDING = 40;
      const PHOTO_WIDTH = WIDTH - (PADDING * 2);
      const PHOTO_HEIGHT = PHOTO_WIDTH * 0.75; // 4:3 Aspect
      const GAP = 30;

      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      // 1. Draw Container / Background
      // Parse containerStyle from selectedFrame. 
      // For MVP we just use the bg color. complex gradients/images might need more parsing.
      const bg = selectedFrame.containerStyle.backgroundColor || '#FFFFFF';
      const bgGradient = selectedFrame.containerStyle.background;

      if (bgGradient && bgGradient.includes('gradient')) {
          // Simple Linear Gradient fallback
          const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
          grad.addColorStop(0, '#f5f7fa');
          grad.addColorStop(1, '#c3cfe2');
          ctx.fillStyle = grad;
      } else if (selectedFrame.id === 'matte-black') {
          ctx.fillStyle = '#111111';
      } else {
          ctx.fillStyle = bg;
      }
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Borders ?? 
      if (selectedFrame.id === 'thin-black') {
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(PADDING/2, PADDING/2, WIDTH - PADDING, HEIGHT - PADDING);
      }

      // 2. Draw Header Text
      ctx.fillStyle = selectedFrame.textColor || '#000000';
      ctx.font = '500 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      
      let headerY = PADDING + 30;
      if (showDate || showTime) {
          let text = "";
          if (showDate) text += new Date().toLocaleDateString();
          if (showDate && showTime) text += " • ";
          if (showTime) text += new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          ctx.fillText(text.toUpperCase(), WIDTH / 2, headerY);
          headerY += 40;
      }

      // 3. Draw Photos
      let currentY = headerY + 10;
      
      const loadImg = (src) => new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
      });

      for (let photoSrc of photos) {
          if (photoSrc) {
              const img = await loadImg(photoSrc);
              if (img) {
                  // Shape Masking
                  ctx.save();
                  ctx.beginPath();
                  const x = PADDING;
                  const y = currentY;
                  const w = PHOTO_WIDTH;
                  const h = PHOTO_HEIGHT;
                  
                  if (photoShape === 'rounded') {
                     // Draw Rounded Rect Path
                     const r = 20;
                     ctx.moveTo(x + r, y);
                     ctx.lineTo(x + w - r, y);
                     ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                     ctx.lineTo(x + w, y + h - r);
                     ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                     ctx.lineTo(x + r, y + h);
                     ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                     ctx.lineTo(x, y + r);
                     ctx.quadraticCurveTo(x, y, x + r, y);
                     ctx.closePath();
                     ctx.clip();
                  } else if (photoShape === 'circle') {
                      // Circle Mask (Centered in the aspect ratio box)
                      const size = Math.min(w, h);
                      ctx.arc(x + w/2, y + h/2, size/2, 0, Math.PI * 2);
                      ctx.clip();
                  } else if (photoShape === 'heart') {
                      // Heart Mask
                      const topCurveHeight = h * 0.3;
                      ctx.moveTo(x + w / 2, y + h / 5);
                      ctx.bezierCurveTo(x + w / 2, y + h / 6, x, y, x, y + topCurveHeight);
                      ctx.bezierCurveTo(x, y + (h + topCurveHeight) / 2, x + w / 2, y + h, x + w / 2, y + h);
                      ctx.bezierCurveTo(x + w / 2, y + h, x + w, y + (h + topCurveHeight) / 2, x + w, y + topCurveHeight);
                      ctx.bezierCurveTo(x + w, y, x + w / 2, y + h / 6, x + w / 2, y + h / 5);
                      ctx.closePath();
                      ctx.clip();
                  }
                  
                  // Draw Image
                  // We need to cover
                  const scale = Math.max(w / img.width, h / img.height);
                  const xx = (x + w/2) - (img.width/2) * scale;
                  const yy = (y + h/2) - (img.height/2) * scale;
                  ctx.drawImage(img, xx, yy, img.width * scale, img.height * scale);
                  
                  ctx.restore();
              }
          }
          currentY += PHOTO_HEIGHT + GAP;
      }

      // 4. Footer Signature
      ctx.font = '40px "Dancing Script", cursive';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = selectedFrame.textColor || '#000000';
      ctx.fillText("sparkle.memories", WIDTH / 2, currentY + 60);
      ctx.globalAlpha = 1.0;

      // 5. Stickers (Approximation) (Rendering DOM stickers to canvas is hard without html2canvas,
      //    so we will skip them for this procedural output OR try to render text emojis/icons if possible.
      //    For MVP, we save the text content if it was an emoji, but our icons are SVGs. 
      //    We'll skip stickers in the saved file for now to avoid complexity or broken images).
      
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
                <img src="${dataUrl}" style="max-height:100vh; width:auto; box-shadow:0 0 20px rgba(0,0,0,0.1);"/>
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
        </html>
    `);
    win.document.close();
  };

  const handleShareClick = async () => {
    try {
        const dataUrl = await generateFinalStrip();
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "sparkle-photostrip.png", { type: "image/png" });
        
        if (navigator.share) {
            await navigator.share({
                title: 'SparkleBooth Photostrip',
                text: 'Check out my photostrip created with SparkleBooth!',
                files: [file]
            });
        } else {
            alert("Sharing is not supported on this device/browser.");
        }
    } catch (error) {
        console.error("Error sharing:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-[#FAFAFA] text-[#111111] font-sans overflow-hidden">
      
      {/* LEFT COLUMN: PREVIEW AREA */}
      <div className="flex-grow relative flex items-center justify-center bg-[#F0F0F0] p-4 lg:p-12 overflow-hidden h-[60vh] lg:h-full">
         
         {/* Photostrip Container */}
         <div className="relative h-full flex items-center justify-center w-full">
             {/* Added tighter max-h constraint for desktop to ensure full visibility without scrolling securely */}
             <div className="relative shadow-2xl transition-all duration-300 transform max-h-full overflow-y-auto scrollbar-hide rounded-sm lg:scale-90 xl:scale-100">
                 
                 {/* THE ACTUAL STRIP RENDER (DOM) */}
                 <div 
                    ref={stripRef}
                    className="w-[280px] sm:w-[320px] flex flex-col gap-6 relative transition-colors duration-500"
                    style={{
                        ...selectedFrame.containerStyle,
                        // Ensure padding matches the aesthetic
                        padding: selectedFrame.containerStyle.padding || '24px',
                        minHeight: 'auto' 
                    }}
                 >
                     {/* Optional Overlay from Frame Definition */}
                     {selectedFrame.renderOverlay && selectedFrame.renderOverlay()}

                     {/* Header Info */}
                     {(showDate || showTime) && (
                         <div className="flex flex-col items-center justify-center pb-2 opacity-70 z-10" style={{ color: selectedFrame.textColor || 'inherit'}}>
                            <div className="text-[10px] tracking-[0.3em] font-medium uppercase flex gap-3">
                                 {showDate && <span>{new Date().toLocaleDateString()}</span>}
                                 {showTime && <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                            </div>
                         </div>
                     )}

                     {/* Photos Grid */}
                     <div className="flex flex-col gap-5 z-10">
                         {photos.map((src, idx) => (
                             <div key={idx} className={`relative w-full aspect-[4/3] bg-gray-200 overflow-hidden shadow-sm ${getShapeClass()} transition-all duration-300`}>
                                 {src ? (
                                     <img src={src} className="w-full h-full object-cover" alt={`Frame ${idx}`} />
                                 ) : (
                                     <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Empty</div>
                                 )}
                             </div>
                         ))}
                     </div>

                     {/* Footer Signature */}
                     <div className="pt-6 pb-2 text-center z-10" style={{ color: selectedFrame.textColor || 'inherit'}}>
                         <h3 className="font-handwriting text-3xl font-normal opacity-90">sparkle.memories</h3>
                     </div>

                     {/* Sticker Layer */}
                     <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                         {stickers.map((sticker) => (
                             <motion.div
                                key={sticker.id}
                                drag
                                dragMomentum={false}
                                className="absolute cursor-move pointer-events-auto text-black/80 drop-shadow-sm hover:text-black hover:drop-shadow-md"
                                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                                whileHover={{ scale: 1.1 }}
                             >
                                <sticker.icon size={48} strokeWidth={1.5} />
                                <button 
                                    onClick={() => removeSticker(sticker.id)}
                                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity"
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
      <div className="w-full lg:w-[420px] bg-white/95 backdrop-blur-3xl border-l border-black/5 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] flex flex-col z-30 h-[40vh] lg:h-full lg:min-h-screen">
          


          {/* Header */}
          <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-white">
              <div>
                  <h2 className="text-xl font-bold tracking-tight text-black">Customize</h2>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">Design your memory</p>
              </div>
              <button onClick={toggleLanguage} className="flex gap-1 text-[9px] font-bold hover:scale-105 transition-transform">
                  <span className="px-2 py-1 bg-black text-white rounded-md">{language}</span>
              </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-4 py-3 gap-2 justify-center bg-gray-50 border-b border-black/5">
              {[
                { id: 'frames', icon: Layout, label: 'Layout' },
                { id: 'shapes', icon: Settings2, label: 'Shapes' },
                { id: 'stickers', icon: Smile, label: 'Stickers' },
              ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        flex-1 py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-all
                        ${activeTab === tab.id ? 'bg-white shadow-sm text-black ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'}
                    `}
                  >
                      <tab.icon size={16} />
                      {tab.label}
                  </button>
              ))}
          </div>

          {/* Controls Area */}
          <div className="flex-grow overflow-y-auto p-8 scrollbar-hide bg-white">
              
              {activeTab === 'frames' && (
                  <div className="space-y-10 animate-fade-in">
                      {/* Frame Grid */}
                      <section>
                          <h3 className="section-title">Select Frame</h3>
                          <div className="grid grid-cols-3 gap-4">
                              {FRAMES.map(frame => (
                                  <button
                                    key={frame.id}
                                    onClick={() => setSelectedFrame(frame)}
                                    className={`
                                        aspect-square border rounded-2xl flex flex-col items-center justify-center p-3 gap-3 transition-all group relative overflow-hidden
                                        ${selectedFrame.id === frame.id ? 'border-black bg-black/5 ring-1 ring-black shadow-inner' : 'border-gray-100 hover:border-black/30 hover:shadow-lg hover:-translate-y-1'}
                                    `}
                                  >
                                      <div className={`w-8 h-10 border shadow-sm rounded-sm ${frame.id === 'matte-black' ? 'bg-black' : 'bg-white'}`} style={{borderColor: frame.id === 'thin-black' ? 'black' : '#eee'}}></div>
                                      <span className="text-[9px] font-bold text-center uppercase tracking-wide truncate w-full text-gray-600 group-hover:text-black">{frame.name}</span>
                                  </button>
                              ))}
                          </div>
                      </section>
                      
                      {/* Info Toggles */}
                      <section>
                           <h3 className="section-title">Overlay Info</h3>
                           <div className="flex gap-4">
                               <label className="toggle-label group">
                                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showDate ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                       <input type="checkbox" checked={showDate} onChange={() => setShowDate(!showDate)} className="opacity-0 absolute" />
                                       {showDate && <motion.div initial={{scale:0}} animate={{scale:1}}><Settings2 size={12} className="text-white"/></motion.div>}
                                   </div>
                                   <span className="group-hover:text-black transition-colors">Show Date</span>
                               </label>
                               <label className="toggle-label group">
                                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showTime ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                       <input type="checkbox" checked={showTime} onChange={() => setShowTime(!showTime)} className="opacity-0 absolute" />
                                        {showTime && <motion.div initial={{scale:0}} animate={{scale:1}}><Settings2 size={12} className="text-white"/></motion.div>}
                                   </div>
                                   <span className="group-hover:text-black transition-colors">Show Time</span>
                               </label>
                           </div>
                      </section>
                  </div>
              )}

              {activeTab === 'shapes' && (
                   <div className="space-y-8 animate-fade-in">
                       <h3 className="section-title">Photo Shape</h3>
                       <div className="flex flex-wrap gap-4">
                           {['square', 'rounded', 'circle', 'heart'].map(shape => (
                               <button 
                                  key={shape}
                                  onClick={() => setPhotoShape(shape)}
                                  className={`
                                    w-24 h-24 bg-gray-50 border-2 transition-all flex items-center justify-center rounded-2xl
                                    ${photoShape === shape ? 'border-black bg-white shadow-md scale-105' : 'border-transparent hover:border-gray-200'}
                                  `}
                               >
                                   <div className={`w-12 h-12 bg-gray-800 shadow-lg ${shape === 'rounded' ? 'rounded-lg' : shape === 'circle' ? 'rounded-full' : shape === 'heart' ? 'mask-heart' : ''}`} />
                               </button>
                           ))}
                       </div>
                   </div>
              )}

              {activeTab === 'stickers' && (
                  <div className="space-y-8 animate-fade-in">
                       <h3 className="section-title">Monochrome Stickers</h3>
                       <div className="grid grid-cols-4 gap-4">
                           {STICKERS.map(sticker => (
                               <button
                                 key={sticker.id}
                                 onClick={() => addSticker(sticker.icon)}
                                 className="aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-700 hover:text-black hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all group"
                               >
                                   <sticker.icon size={26} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                               </button>
                           ))}
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-6 text-center">Drag icons on the preview to move them</p>
                  </div>
              )}

          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-black/5 bg-gray-50 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-40">
              <button 
                onClick={handleDownloadClick}
                disabled={isSaving}
                className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gray-800 hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                  <Download size={18} /> {isSaving ? 'Processing...' : 'Download High-Res'}
              </button>
              
              <div className="grid grid-cols-4 gap-2">
                   <button 
                     onClick={onRetake}
                     className="py-3 bg-white border border-black/10 text-gray-500 rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black transition-all flex flex-col items-center justify-center gap-1 text-[9px]"
                   >
                       <RefreshCw size={14} /> Retake
                   </button>
                   <button 
                     onClick={handlePrintClick}
                     className="py-3 bg-white border border-black/10 text-gray-500 rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black transition-all flex flex-col items-center justify-center gap-1 text-[9px]"
                   >
                       <Printer size={14} /> Print
                   </button>
                   <button 
                     onClick={handleShareClick}
                     className="py-3 bg-white border border-black/10 text-gray-500 rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black transition-all flex flex-col items-center justify-center gap-1 text-[9px]"
                   >
                       <Share2 size={14} /> Share
                   </button>
                   <button 
                     onClick={handleSaveClick}
                     className="py-3 bg-white border border-black/10 text-gray-500 rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black hover:bg-black hover:text-white transition-all flex flex-col items-center justify-center gap-1 text-[9px]"
                   >
                       <Save size={14} /> Save
                   </button>
              </div>
          </div>

      </div>

      <style>{`
        .section-title {
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: #999;
            margin-bottom: 1.5rem;
        }
        .toggle-label {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #777;
        }
      `}</style>
    </div>
  );
};

export default Editor;
