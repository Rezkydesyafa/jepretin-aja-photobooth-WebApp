import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Settings2, Smile } from 'lucide-react';
import FrameSelector from './FrameSelector';
import ShapeSelector from './ShapeSelector';
import StickerPanel from './StickerPanel';
import DisplayOptionsToggle from './DisplayOptionsToggle';
import ActionButtons from './ActionButtons';

const TABS = [
  { id: 'frames', icon: Layout, label: 'Layout' },
  { id: 'shapes', icon: Settings2, label: 'Shapes' },
  { id: 'stickers', icon: Smile, label: 'Stickers' },
];

const CustomizationPanel = ({
  selectedFrame,
  onFrameChange,
  photoShape,
  onPhotoShapeChange,
  showDate,
  onShowDateChange,
  showTime,
  onShowTimeChange,
  onAddSticker,
  isSaving,
  onDownload,
  onRetake,
  onPrint,
  onSave,
  language,
  onToggleLanguage,
}) => {
  const [activeTab, setActiveTab] = useState('frames');

  return (
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
          onClick={onToggleLanguage}
          className='px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white rounded-lg text-[10px] font-bold tracking-widest transition-colors uppercase border border-gray-200 hover:border-black'
          title='Switch Language'
        >
          {language}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className='flex px-8 pt-6 pb-2 gap-6 overflow-x-auto no-scrollbar border-b border-transparent'>
        {TABS.map((tab) => (
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
            <div className='space-y-10'>
              <FrameSelector
                selectedFrame={selectedFrame}
                onFrameChange={onFrameChange}
              />
              <section>
                <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-4'>
                  Display Options
                </h3>
                <div className='flex flex-col gap-3'>
                  <DisplayOptionsToggle
                    label='Show Date'
                    checked={showDate}
                    onChange={onShowDateChange}
                  />
                  <DisplayOptionsToggle
                    label='Show Time'
                    checked={showTime}
                    onChange={onShowTimeChange}
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shapes' && (
            <ShapeSelector
              selectedShape={photoShape}
              onShapeChange={onPhotoShapeChange}
            />
          )}

          {activeTab === 'stickers' && (
            <StickerPanel onAddSticker={onAddSticker} />
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <ActionButtons
        isSaving={isSaving}
        onDownload={onDownload}
        onRetake={onRetake}
        onPrint={onPrint}
        onSave={onSave}
      />
    </div>
  );
};

export default CustomizationPanel;
