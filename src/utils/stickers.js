import {
  Heart,
  Star,
  Sparkles,
  Smile,
  Sun,
  Moon,
  Cloud,
  Music,
  Camera,
  Zap,
  Crown,
  Anchor,
} from 'lucide-react';

export const STICKERS = [
  // Image Stickers
  {
    id: 'sticker-hearts',
    type: 'image',
    src: '/stickers/hearts.png',
    label: 'Hearts',
  },
  {
    id: 'sticker-couple',
    type: 'image',
    src: '/stickers/couple.png',
    label: 'Couple',
  },
  {
    id: 'sticker-love',
    type: 'image',
    src: '/stickers/love-text.png',
    label: 'Love',
  },
  {
    id: 'sticker-bear',
    type: 'image',
    src: '/stickers/bear.png',
    label: 'Bear',
  },

  // Icon Stickers
  { id: 'heart', type: 'icon', icon: Heart, label: 'Heart' },
  { id: 'star', type: 'icon', icon: Star, label: 'Star' },
  { id: 'sparkle', type: 'icon', icon: Sparkles, label: 'Sparkle' },
  { id: 'smile', type: 'icon', icon: Smile, label: 'Smile' },
  { id: 'sun', type: 'icon', icon: Sun, label: 'Sun' },
  { id: 'moon', type: 'icon', icon: Moon, label: 'Moon' },
  { id: 'cloud', type: 'icon', icon: Cloud, label: 'Cloud' },
  { id: 'music', type: 'icon', icon: Music, label: 'Music' },
  { id: 'camera', type: 'icon', icon: Camera, label: 'Camera' },
  { id: 'zap', type: 'icon', icon: Zap, label: 'Zap' },
  { id: 'crown', type: 'icon', icon: Crown, label: 'Crown' },
  { id: 'anchor', type: 'icon', icon: Anchor, label: 'Anchor' },
];
