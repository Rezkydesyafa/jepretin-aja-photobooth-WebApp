import React, { useEffect, useState } from 'react';
import { getAllPhotos, deletePhoto } from '../utils/db';
import { Trash2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  const loadPhotos = async () => {
    const loaded = await getAllPhotos();
    setPhotos(loaded.sort((a, b) => b.date - a.date));
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleDelete = async (id) => {
    await deletePhoto(id);
    loadPhotos();
  };

  const handleDownload = (dataUrl, id) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `photobooth-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 text-dark-text-secondary">
        <p className="text-lg font-light tracking-wide">No captures yet.</p>
        <p className="text-sm opacity-50 mt-2">Start a session to create memories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-4">
      <AnimatePresence>
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)" }}
            className="group relative rounded-2xl overflow-hidden bg-white border border-black/5 transition-all duration-500"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                 {/* Shiny border effect on hover */}
                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-black/5 transition-colors z-20 rounded-2xl pointer-events-none" />
                 
                <img 
                src={photo.dataUrl} 
                alt="Gallery" 
                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
                />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 backdrop-blur-sm z-30">
               <button 
                onClick={() => handleDownload(photo.dataUrl, photo.id)}
                className="p-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                title="Download"
               >
                 <Download size={20} />
               </button>
               <button 
                onClick={() => handleDelete(photo.id)}
                className="p-4 bg-white/10 border border-white/20 rounded-full text-white hover:bg-red-500 hover:border-red-500 hover:text-white hover:scale-110 transition-all duration-300"
                title="Delete"
               >
                 <Trash2 size={20} />
               </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
