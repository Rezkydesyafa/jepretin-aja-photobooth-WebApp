import { useState } from 'react';
import { drawFrameBackground } from './canvasUtils';

export const usePhotoStripCanvas = () => {
  const [isSaving, setIsSaving] = useState(false);

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });

  const drawPhotoWithShape = (ctx, img, x, y, w, h, photoShape, SCALE = 1) => {
    ctx.save();
    ctx.beginPath();

    if (photoShape === 'rounded') {
      const r = 20 * SCALE; // Scaled corner radius
      ctx.roundRect(x, y, w, h, r);
      ctx.clip();
    } else if (photoShape === 'circle') {
      const size = Math.min(w, h);
      ctx.arc(x + w / 2, y + h / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (photoShape === 'heart') {
      const topCurveHeight = h * 0.3;
      ctx.moveTo(x + w / 2, y + h / 5);
      ctx.bezierCurveTo(x + w / 2, y + h / 6, x, y, x, y + topCurveHeight);
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
      ctx.bezierCurveTo(x + w, y, x + w / 2, y + h / 6, x + w / 2, y + h / 5);
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
  };

  const drawHeaderText = (
    ctx,
    showDate,
    showTime,
    selectedFrame,
    WIDTH,
    headerY,
    SCALE = 1
  ) => {
    if (!showDate && !showTime) return headerY;

    ctx.fillStyle = selectedFrame.textColor || '#000000';
    ctx.font = `500 ${20 * SCALE}px Inter, sans-serif`; // Scaled font
    ctx.textAlign = 'center';

    let text = '';
    if (showDate) text += new Date().toLocaleDateString();
    if (showDate && showTime) text += ' • ';
    if (showTime)
      text += new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    ctx.fillText(text.toUpperCase(), WIDTH / 2, headerY);
    return headerY + 40 * SCALE; // Scaled spacing
  };

  const drawStickers = async (ctx, stickers, WIDTH, HEIGHT, SCALE = 1) => {
    for (const sticker of stickers) {
      if (sticker.type === 'image') {
        const img = await loadImage(sticker.content);
        if (img) {
          const x = (sticker.x / 100) * WIDTH;
          const y = (sticker.y / 100) * HEIGHT;
          const size = 150 * sticker.scale * SCALE; // Scaled sticker size
          ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        }
      }
    }
    ctx.globalAlpha = 1.0;
  };

  const generateFinalStrip = async ({
    photos,
    selectedFrame,
    photoShape,
    showDate,
    showTime,
    stickers,
  }) => {
    setIsSaving(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Optimized resolution (2x scale for quality + smaller file size)
    const SCALE = 2;
    const BASE_WIDTH = 600;
    const BASE_HEIGHT = 1900; // Increased from 1800 to prevent bottom cropping
    const WIDTH = BASE_WIDTH * SCALE; // 1200px
    const HEIGHT = BASE_HEIGHT * SCALE; // 3800px (increased for bottom padding)

    // Increased padding to prevent frame cropping
    const BASE_PADDING = 50; // Increased from 40
    const PADDING = BASE_PADDING * SCALE; // 100px
    const PHOTO_WIDTH = WIDTH - PADDING * 2;
    const PHOTO_HEIGHT = PHOTO_WIDTH * 0.75;
    const GAP = 30 * SCALE; // 60px
    const BOTTOM_PADDING = 80 * SCALE; // Extra padding for signature

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw background
    drawFrameBackground(ctx, selectedFrame, WIDTH, HEIGHT, PADDING, SCALE);

    // Draw header
    let currentY = PADDING + 30 * SCALE;
    currentY = drawHeaderText(
      ctx,
      showDate,
      showTime,
      selectedFrame,
      WIDTH,
      currentY,
      SCALE
    );
    currentY += 10 * SCALE;

    // Draw photos
    for (let photoSrc of photos) {
      if (photoSrc) {
        const img = await loadImage(photoSrc);
        if (img) {
          const x = PADDING;
          const y = currentY;
          const w = PHOTO_WIDTH;
          const h = PHOTO_HEIGHT;
          drawPhotoWithShape(ctx, img, x, y, w, h, photoShape, SCALE);
        }
      }
      currentY += PHOTO_HEIGHT + GAP;
    }

    // Draw footer signature (scaled font) with proper bottom spacing
    ctx.font = `${40 * SCALE}px "Dancing Script", cursive`;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = selectedFrame.textColor || '#000000';
    ctx.fillText('Jepretin.', WIDTH / 2, currentY + 60 * SCALE);
    ctx.globalAlpha = 1.0;

    // Draw stickers (scaled)
    await drawStickers(ctx, stickers, WIDTH, HEIGHT, SCALE);

    setIsSaving(false);

    // Use JPEG with 0.92 quality for smaller file size (< 2MB)
    // JPEG compression significantly reduces file size while maintaining quality
    return canvas.toDataURL('image/jpeg', 0.92);
  };

  return {
    generateFinalStrip,
    isSaving,
  };
};
