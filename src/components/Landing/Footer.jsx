import React from 'react';
import { Camera } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 border-t border-dark-border mt-auto bg-dark-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-2">
           <Camera className="w-6 h-6 text-dark-text-primary" />
           <span className="font-bold tracking-widest uppercase text-sm">SparkleBooth</span>
        </div>
        
        <div className="flex space-x-8 text-xs font-medium tracking-widest uppercase text-dark-text-secondary">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-dark-text-secondary text-xs">
          © 2025 SparkleBooth Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
