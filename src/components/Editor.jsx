import React, { useState, useRef } from 'react';
import { FRAMES } from '../utils/frames';
import PhotoStrip from './editor/PhotoStrip';
import CustomizationPanel from './editor/CustomizationPanel';
import { usePhotoStripCanvas } from './editor/usePhotoStripCanvas';

// Editor Component - Refactored

const Editor = ({ capturedImage, onRetake, onSave }) => {
  // Prepare photos array
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

  // State management
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [photoShape, setPhotoShape] = useState('square');
  const [stickers, setStickers] = useState([]);
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [language, setLanguage] = useState('ENG');

  const stripRef = useRef(null);
  const { generateFinalStrip, isSaving } = usePhotoStripCanvas();

  // Sticker Logic
  const addSticker = (stickerDef) => {
    const newSticker = {
      id: Date.now(),
      type: stickerDef.type || 'icon',
      content: stickerDef.type === 'image' ? stickerDef.src : stickerDef.icon,
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

  // Canvas & Export handlers
  const handleSaveClick = async () => {
    const dataUrl = await generateFinalStrip({
      photos,
      selectedFrame,
      photoShape,
      showDate,
      showTime,
      stickers,
    });
    onSave(dataUrl);
  };

  const handleDownloadClick = async () => {
    const dataUrl = await generateFinalStrip({
      photos,
      selectedFrame,
      photoShape,
      showDate,
      showTime,
      stickers,
    });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'jepretin-photostrip.jpg'; // Changed to JPEG
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintClick = async () => {
    const dataUrl = await generateFinalStrip({
      photos,
      selectedFrame,
      photoShape,
      showDate,
      showTime,
      stickers,
    });
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
      const dataUrl = await generateFinalStrip({
        photos,
        selectedFrame,
        photoShape,
        showDate,
        showTime,
        stickers,
      });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'jepretin-photostrip.jpg', {
        type: 'image/jpeg',
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
        <PhotoStrip
          ref={stripRef}
          photos={photos}
          selectedFrame={selectedFrame}
          photoShape={photoShape}
          showDate={showDate}
          showTime={showTime}
          stickers={stickers}
          onRemoveSticker={removeSticker}
        />
      </div>

      {/* RIGHT COLUMN: CUSTOMIZATION PANEL */}
      <CustomizationPanel
        selectedFrame={selectedFrame}
        onFrameChange={setSelectedFrame}
        photoShape={photoShape}
        onPhotoShapeChange={setPhotoShape}
        showDate={showDate}
        onShowDateChange={() => setShowDate(!showDate)}
        showTime={showTime}
        onShowTimeChange={() => setShowTime(!showTime)}
        onAddSticker={addSticker}
        isSaving={isSaving}
        onDownload={handleDownloadClick}
        onRetake={onRetake}
        onPrint={handlePrintClick}
        onShare={handleShareClick}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

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
