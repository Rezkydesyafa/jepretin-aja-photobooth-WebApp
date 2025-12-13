export const drawFrameBackground = (
  ctx,
  selectedFrame,
  WIDTH,
  HEIGHT,
  PADDING,
  SCALE = 1
) => {
  const bg = selectedFrame.containerStyle.backgroundColor || '#FFFFFF';

  // Default Fill
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Special frame backgrounds
  if (
    selectedFrame.id === 'cloud-dream' ||
    selectedFrame.id === 'silver-gradient'
  ) {
    const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
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
    ctx.lineWidth = 2 * SCALE; // Scaled line width
    const gridSize = 40 * SCALE; // Scaled grid size
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
    const size = 32 * SCALE; // Scaled dot spacing
    const radius = size * 0.2;
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
    const size = 64 * SCALE; // Scaled checker size
    for (let y = 0; y < HEIGHT; y += size) {
      for (let x = 0; x < WIDTH; x += size) {
        if ((x / size + y / size) % 2 !== 0) {
          ctx.fillRect(x, y, size, size);
        }
      }
    }
  } else if (selectedFrame.id === 'love-hearts') {
    ctx.fillStyle = '#FFEBEE';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#FFCDD2';
    const heartCount = 50 * SCALE; // More hearts for larger canvas
    for (let i = 0; i < heartCount; i++) {
      const hx = Math.random() * WIDTH;
      const hy = Math.random() * HEIGHT;
      const hs = (10 + Math.random() * 20) * SCALE; // Scaled heart size
      ctx.font = `${hs}px serif`;
      ctx.fillText('❤', hx, hy);
    }
  } else if (selectedFrame.id === 'starry-night') {
    ctx.fillStyle = '#0D1B2A';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#FFF';
    const starCount = 100 * SCALE; // More stars for larger canvas
    for (let i = 0; i < starCount; i++) {
      const sx = Math.random() * WIDTH;
      const sy = Math.random() * HEIGHT;
      const ss = Math.random() * 3 * SCALE; // Scaled star size
      ctx.globalAlpha = Math.random();
      ctx.beginPath();
      ctx.arc(sx, sy, ss, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  } else if (selectedFrame.id === 'bear-hug') {
    ctx.fillStyle = '#F7E7CE';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#D7CCC8';
    const dotSpacing = 80 * SCALE; // Scaled dot spacing
    const dotRadius = 10 * SCALE; // Scaled dot radius
    for (let y = 0; y < HEIGHT; y += dotSpacing) {
      for (let x = 0; x < WIDTH; x += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (selectedFrame.id === 'comic-pop') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#FFEB3B';
    const dotSpacing = 20 * SCALE; // Scaled spacing
    const dotRadius = 8 * SCALE; // Scaled radius
    for (let y = 0; y < HEIGHT; y += dotSpacing) {
      for (let x = 0; x < WIDTH; x += dotSpacing) {
        if ((x + y) % (40 * SCALE) === 0) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  } else if (selectedFrame.id === 'matte-black') {
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  } else {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // Special borders
  if (selectedFrame.id === 'thin-black') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE; // Scaled border width
    ctx.strokeRect(PADDING / 2, PADDING / 2, WIDTH - PADDING, HEIGHT - PADDING);
  }
};
