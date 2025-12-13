export const drawFrameBackground = (
  ctx,
  selectedFrame,
  WIDTH,
  HEIGHT,
  PADDING,
  SCALE = 1
) => {
  // --- 1. BASE BACKGROUND ---
  const bg = selectedFrame.containerStyle.backgroundColor || '#FFFFFF';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // --- 2. PATTERNS & EFFECTS BASED ON FRAME ID ---

  if (selectedFrame.id === 'retro-groovy') {
    // Retro Groovy: Warm yellow bg with wavy/flower patterns
    ctx.fillStyle = '#FEF9E7';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw repeating circles/flowers pattern
    const size = 60 * SCALE;
    ctx.fillStyle = 'rgba(255, 183, 178, 0.4)'; // Soft warm color
    for (let y = 0; y < HEIGHT; y += size) {
      for (let x = 0; x < WIDTH; x += size) {
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Green Border
    ctx.lineWidth = 16 * SCALE;
    ctx.strokeStyle = '#E2F0CB';
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  } else if (selectedFrame.id === 'pop-art') {
    // Pop Art: Comic dots (Halftone effect)
    ctx.fillStyle = '#FFE135'; // Bright Yellow
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Black dots
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    const size = 16 * SCALE;
    for (let y = 0; y < HEIGHT; y += size) {
      for (let x = 0; x < WIDTH; x += size) {
        if ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 0) {
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Bold Border & Shadow
    ctx.lineWidth = 12 * SCALE;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    // Hard Shadow (drawn manually)
    ctx.fillStyle = '#FF4081'; // Pink shadow
    ctx.fillRect(10 * SCALE, HEIGHT - 20 * SCALE, WIDTH, 20 * SCALE);
    ctx.fillRect(WIDTH - 20 * SCALE, 10 * SCALE, 20 * SCALE, HEIGHT);
  } else if (selectedFrame.id === 'coquette') {
    // Coquette: Soft Pink with inner border
    ctx.fillStyle = '#FFF0F5';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Inner Pink Border
    const borderWidth = 6 * SCALE;
    const offset = 12 * SCALE;
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = '#FFC1CC';
    ctx.strokeRect(offset, offset, WIDTH - offset * 2, HEIGHT - offset * 2);

    // Bow decorations
    ctx.font = `${40 * SCALE}px serif`;
    ctx.fillText('🎀', 20 * SCALE, 50 * SCALE);
    ctx.fillText('🎀', WIDTH - 60 * SCALE, 50 * SCALE);
    ctx.fillText('🎀', 20 * SCALE, HEIGHT - 20 * SCALE);
    ctx.fillText('🎀', WIDTH - 60 * SCALE, HEIGHT - 20 * SCALE);
  } else if (selectedFrame.id === 'y2k') {
    // Y2K: Black with Neon Green Grid
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Neon Grid
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 1 * SCALE;
    const gridSize = 40 * SCALE;

    for (let x = 0; x <= WIDTH; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= HEIGHT; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }

    // Outer Glow Border
    ctx.shadowBlur = 10 * SCALE;
    ctx.shadowColor = '#00FF00';
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 4 * SCALE;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    ctx.shadowBlur = 0; // Reset
  } else if (selectedFrame.id === 'polco') {
    // Polco: Soft white/grey with polaroid space
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Simple light border
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  } else if (selectedFrame.id === 'analog-film') {
    // Analog Film: Black edges with film sprocket holes
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Dashed white lines on sides (simulating sprockets)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 12 * SCALE;
    ctx.setLineDash([20 * SCALE, 15 * SCALE]); // Dash pattern

    // Left sprocket
    ctx.beginPath();
    ctx.moveTo(20 * SCALE, 0);
    ctx.lineTo(20 * SCALE, HEIGHT);
    ctx.stroke();

    // Right sprocket
    ctx.beginPath();
    ctx.moveTo(WIDTH - 20 * SCALE, 0);
    ctx.lineTo(WIDTH - 20 * SCALE, HEIGHT);
    ctx.stroke();

    ctx.setLineDash([]); // Reset
  } else if (selectedFrame.id === 'banana-circuit') {
    // Banana Circuit: PCB Green with Gold lines
    ctx.fillStyle = '#004d40';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // PCB Lines Pattern
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)'; // Faint gold lines
    ctx.lineWidth = 2 * SCALE;
    const size = 30 * SCALE;

    ctx.beginPath();
    for (let x = 0; x < WIDTH; x += size) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
    }
    for (let y = 0; y < HEIGHT; y += size) {
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
    }
    ctx.stroke();

    // Gold Border
    ctx.shadowBlur = 5 * SCALE;
    ctx.shadowColor = '#FFD700';
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6 * SCALE;
    ctx.strokeRect(10, 10, WIDTH - 20, HEIGHT - 20);
    ctx.shadowBlur = 0;
  } else if (selectedFrame.id === '8bit-banana') {
    // 8-Bit Glitch: Dark grey with Neon Pink Dashed Border
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = '#FF00FF';
    ctx.lineWidth = 4 * SCALE;
    ctx.setLineDash([10 * SCALE, 10 * SCALE]);
    ctx.strokeRect(10, 10, WIDTH - 20, HEIGHT - 20);
    ctx.setLineDash([]);

    // Glitch green text effect simulated by simple rects
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(
      WIDTH - 40 * SCALE,
      HEIGHT - 40 * SCALE,
      20 * SCALE,
      20 * SCALE
    );
  } else if (selectedFrame.id === 'cyber-monkey') {
    // Cyber Mech: Mechanical grey with yellow pipes
    ctx.fillStyle = '#ECEFF1';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = '#607D8B';
    ctx.lineWidth = 8 * SCALE;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    // Yellow Pipes (Inner Border)
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4 * SCALE;
    ctx.strokeRect(
      10 * SCALE,
      10 * SCALE,
      WIDTH - 20 * SCALE,
      HEIGHT - 20 * SCALE
    );
  } else if (selectedFrame.id === 'neon-tropical') {
    // Neon Tropical: Deep purple with Cyan border
    const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    grad.addColorStop(0, '#0D001A');
    grad.addColorStop(1, '#300030');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.shadowBlur = 15 * SCALE;
    ctx.shadowColor = '#FF00FF';
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 4 * SCALE;
    ctx.strokeRect(10, 10, WIDTH - 20, HEIGHT - 20);
    ctx.shadowBlur = 0;
  } else if (selectedFrame.id === 'banana-space') {
    // Space Odyssey: Deep blue with stars
    ctx.fillStyle = '#0B0B2A';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * WIDTH;
      const y = Math.random() * HEIGHT;
      const s = Math.random() * 2 * SCALE;
      ctx.beginPath();
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(10, 10, WIDTH - 20, HEIGHT - 20);
  } else if (selectedFrame.id === 'gameboy-peel') {
    // Gameboy Peel: Translucent Yellow
    ctx.fillStyle = 'rgba(255, 235, 59, 1)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Frosted Border effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 8 * SCALE;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  }
};
