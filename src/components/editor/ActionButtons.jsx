import React from 'react';
import { Download, RefreshCw, Printer, Save } from 'lucide-react';

const ActionButtons = ({ isSaving, onDownload, onRetake, onPrint, onSave }) => {
  const secondaryActions = [
    { icon: RefreshCw, label: 'Retake', action: onRetake },
    { icon: Printer, label: 'Print', action: onPrint },
    { icon: Save, label: 'Save', action: onSave },
  ];

  return (
    <div className='p-4 md:p-8 border-t border-gray-100 bg-white space-y-3 md:space-y-4'>
      <button
        onClick={onDownload}
        disabled={isSaving}
        className='w-full py-3 md:py-4 bg-black text-white rounded-xl font-bold text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-gray-800 hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50'
      >
        {isSaving ? (
          <RefreshCw className='animate-spin' size={16} />
        ) : (
          <Download size={16} />
        )}
        <span>Download Strip</span>
      </button>

      <div className='grid grid-cols-3 gap-2 md:gap-3'>
        {secondaryActions.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className='py-2 md:py-3 bg-white border border-gray-200 text-gray-600 rounded-lg md:rounded-xl font-bold uppercase tracking-wider hover:text-black hover:border-black transition-all flex flex-col items-center justify-center gap-1 text-[9px] md:text-[10px]'
          >
            <btn.icon size={14} className='md:w-4 md:h-4' /> {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
