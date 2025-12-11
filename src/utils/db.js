const STORAGE_KEY = 'photobooth_photos';

export const savePhoto = async (dataUrl) => {
  // Simulate async for interface compatibility
  return new Promise((resolve, reject) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const newPhoto = {
        id: Date.now(), // Simple ID using timestamp
        date: new Date(),
        dataUrl
      };
      
      const updated = [...existing, newPhoto];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      resolve(newPhoto.id);
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        reject(new Error("Storage full! Please delete some photos to save new ones."));
      } else {
        reject(error);
      }
    }
  });
};

export const getAllPhotos = async () => {
  return new Promise((resolve) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      // Fix date objects restoration
      const processed = existing.map(p => ({
        ...p,
        date: new Date(p.date) 
      }));
      resolve(processed);
    } catch (e) {
      resolve([]);
    }
  });
};

export const deletePhoto = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = existing.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
