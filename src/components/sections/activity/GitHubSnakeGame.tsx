import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Theme-matched color palette (Tokyo Night)
   ───────────────────────────────────────────── */
const COLORS = {
  bg: '#0d0d1a',
  cellEmpty: '#13132a',
  cellBorder: 'rgba(139, 92, 246, 0.06)',
  // Contribution levels — elegant purple scale
  levels: [
    '#13132a',   // 0 - empty
    '#2c1b4d',   // 1 - low
    '#452a75',   // 2 - medium-low
    '#633fa3',   // 3 - medium
    '#8452d4',   // 4 - high
  ],
  // Snake gradient (head → tail)
  snakeHead: '#c4b5fd',
  snakeBody: ['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
  snakeTail: '#5b21b6',
  snakeEye: '#1e1b4b',
  snakeTongue: '#f472b6',
  // Particle colors
  particles: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#e9d5ff', '#ddd6fe'],
};

/* ─────────────────────────────────────────────
   Grid config
   ───────────────────────────────────────────── */
const COLS = 52;
const ROWS = 7;
const CELL_SIZE = 13;
const CELL_GAP = 3;
const CELL_RADIUS = 2.5;
const SNAKE_LENGTH = 12;

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface Point { x: number; y: number }
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
  alpha: number;
}
interface CellState {
  level: number;      // original contribution level
  eaten: boolean;     // has the snake eaten this cell?
  fadeOut: number;     // 0–1 for fade animation when eaten
}

/* ─────────────────────────────────────────────
   Utility: generate pseudo-random contribution grid
   (mimics a real GitHub graph pattern)
   ───────────────────────────────────────────── */
function generateContribGrid(): CellState[][] {
  const grid: CellState[][] = [];
  // Create a "wave" pattern that looks organic
  for (let col = 0; col < COLS; col++) {
    const column: CellState[] = [];
    for (let row = 0; row < ROWS; row++) {
      let level = 0;
      const colRatio = col / COLS;
      // More activity towards the right (recent)
      const activityBias = colRatio * colRatio;
      const rand = Math.random();
      
      if (rand < 0.15 * activityBias) level = 4;
      else if (rand < 0.25 * activityBias) level = 3;
      else if (rand < 0.40 * activityBias) level = 2;
      else if (rand < 0.55 * activityBias) level = 1;
      else level = 0;
      
      // Weekend rows (0 = Sun, 6 = Sat) have less activity
      if ((row === 0 || row === 6) && Math.random() > 0.3) level = 0;
      
      column.push({ level, eaten: false, fadeOut: 1 });
    }
    grid.push(column);
  }
  return grid;
}

/* ─────────────────────────────────────────────
   Snake path: generates a meandering path 
   through the grid (left→right, weaving up/down)
   ───────────────────────────────────────────── */
function generateSnakePath(): Point[] {
  const path: Point[] = [];
  let row = Math.floor(ROWS / 2);
  
  for (let col = 0; col < COLS; col++) {
    path.push({ x: col, y: row });
    
    // Randomly meander up or down
    if (Math.random() > 0.5) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const newRow = row + direction;
      if (newRow >= 0 && newRow < ROWS) {
        row = newRow;
        path.push({ x: col, y: row });
      }
    }
  }
  
  // Loop back: go back left on a different row
  row = Math.min(ROWS - 1, row + 1);
  if (row >= ROWS) row = 0;
  
  for (let col = COLS - 1; col >= 0; col--) {
    path.push({ x: col, y: row });
    if (Math.random() > 0.6) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const newRow = row + direction;
      if (newRow >= 0 && newRow < ROWS) {
        row = newRow;
        path.push({ x: col, y: row });
      }
    }
  }
  
  return path;
}

/* ─────────────────────────────────────────────
   Convert grid coordinates to pixel coordinates
   ───────────────────────────────────────────── */
function gridToPixel(gx: number, gy: number, offsetX: number, offsetY: number): Point {
  return {
    x: offsetX + gx * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2,
    y: offsetY + gy * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2,
  };
}

/* ─────────────────────────────────────────────
   Draw a rounded rectangle
   ───────────────────────────────────────────── */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ─────────────────────────────────────────────
   Draw the 2D snake with proper body, head, eyes, tongue
   ───────────────────────────────────────────── */
function drawSnake(
  ctx: CanvasRenderingContext2D,
  positions: Point[],  // pixel positions of each segment (index 0 is head, last is tail)
  tonguePhase: number, // 0–1 for tongue flick animation
) {
  if (positions.length < 2) return;
  
  const segmentCount = positions.length;
  
  // ── Draw body (from tail to head so head is on top) ──
  for (let i = segmentCount - 1; i >= 0; i--) {
    const pos = positions[i];
    const t = (segmentCount - 1 - i) / (segmentCount - 1); // 0 = tail, 1 = head
    
    // Size tapers from head to tail
    const radius = 5.5 + t * 3;
    
    // Color gradient from tail to head
    let color: string;
    if (i === segmentCount - 1) {
      color = COLORS.snakeTail;
    } else if (i === 0) {
      color = COLORS.snakeHead;
    } else {
      const bodyIdx = Math.floor((1 - t) * (COLORS.snakeBody.length - 1));
      color = COLORS.snakeBody[Math.min(bodyIdx, COLORS.snakeBody.length - 1)];
    }
    
    // Draw segment with subtle shadow
    ctx.save();
    ctx.shadowColor = 'rgba(139, 92, 246, 0.2)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    
    // Belly highlight (subtle lighter circle on top)
    ctx.beginPath();
    ctx.arc(pos.x - radius * 0.15, pos.y - radius * 0.2, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fill();
  }
  
  // ── Draw pattern on body (diamond marks) ──
  for (let i = 2; i < segmentCount - 1; i += 3) {
    const pos = positions[i];
    const t = (segmentCount - 1 - i) / (segmentCount - 1);
    const size = 2 + t * 1.5;
    
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
  }
  
  // ── Draw head details ──
  const head = positions[0];
  const neck = positions[1];
  const headAngle = Math.atan2(head.y - neck.y, head.x - neck.x);
  
  ctx.save();
  ctx.translate(head.x, head.y);
  ctx.rotate(headAngle);
  
  // Eyes
  const eyeOffsetX = 3;
  const eyeOffsetY = 3.5;
  const eyeRadius = 2.5;
  const pupilRadius = 1.5;
  
  // Left eye
  ctx.beginPath();
  ctx.arc(eyeOffsetX, -eyeOffsetY, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ede9fe';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(eyeOffsetX + 0.5, -eyeOffsetY, pupilRadius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.snakeEye;
  ctx.fill();
  // Eye shine
  ctx.beginPath();
  ctx.arc(eyeOffsetX + 1, -eyeOffsetY - 0.8, 0.7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fill();
  
  // Right eye
  ctx.beginPath();
  ctx.arc(eyeOffsetX, eyeOffsetY, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ede9fe';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(eyeOffsetX + 0.5, eyeOffsetY, pupilRadius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.snakeEye;
  ctx.fill();
  // Eye shine
  ctx.beginPath();
  ctx.arc(eyeOffsetX + 1, eyeOffsetY - 0.8, 0.7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fill();
  
  // Forked tongue
  const tongueExtend = 4 + Math.sin(tonguePhase * Math.PI * 2) * 4;
  const tongueBase = 7;
  ctx.strokeStyle = COLORS.snakeTongue;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  
  // Tongue base
  ctx.beginPath();
  ctx.moveTo(tongueBase, 0);
  ctx.lineTo(tongueBase + tongueExtend * 0.6, 0);
  ctx.stroke();
  
  // Fork top
  ctx.beginPath();
  ctx.moveTo(tongueBase + tongueExtend * 0.6, 0);
  ctx.lineTo(tongueBase + tongueExtend, -2.5);
  ctx.stroke();
  
  // Fork bottom
  ctx.beginPath();
  ctx.moveTo(tongueBase + tongueExtend * 0.6, 0);
  ctx.lineTo(tongueBase + tongueExtend, 2.5);
  ctx.stroke();
  
  ctx.restore();
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
export default function GitHubSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  
  const stateRef = useRef({
    grid: null as CellState[][] | null,
    path: null as Point[] | null,
    snakeProgress: 0,       // float index along the path
    particles: [] as Particle[],
    tonguePhase: 0,
    initialized: false,
    canvasWidth: 0,
    canvasHeight: 0,
    offsetX: 0,
    offsetY: 0,
    dpr: 1,
  });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    
    const gridPixelW = COLS * (CELL_SIZE + CELL_GAP) - CELL_GAP;
    const gridPixelH = ROWS * (CELL_SIZE + CELL_GAP) - CELL_GAP;
    
    // Scale to fit width
    const scale = Math.min(1, (width - 32) / gridPixelW);
    const scaledW = gridPixelW * scale + 32;
    const scaledH = gridPixelH * scale + 48;
    
    canvas.width = scaledW * dpr;
    canvas.height = scaledH * dpr;
    canvas.style.width = `${scaledW}px`;
    canvas.style.height = `${scaledH}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    }
    
    stateRef.current.canvasWidth = scaledW;
    stateRef.current.canvasHeight = scaledH;
    stateRef.current.offsetX = 16 / scale;
    stateRef.current.offsetY = 24 / scale;
    stateRef.current.dpr = dpr;
    
    if (!stateRef.current.initialized) {
      stateRef.current.grid = generateContribGrid();
      stateRef.current.path = generateSnakePath();
      stateRef.current.initialized = true;
    }
  }, []);

  useEffect(() => {
    initCanvas();
    
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      
      const st = stateRef.current;
      if (!st.grid || !st.path) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const { grid, path, offsetX, offsetY } = st;
      
      // ── Update snake position ──
      st.snakeProgress += dt * 2.8; // speed: cells per second
      if (st.snakeProgress >= path.length) {
        // Reset: regenerate path and restore grid
        st.path = generateSnakePath();
        st.snakeProgress = 0;
        for (const col of grid) {
          for (const cell of col) {
            cell.eaten = false;
            cell.fadeOut = 1;
          }
        }
      }
      
      // ── Update tongue ──
      st.tonguePhase = (st.tonguePhase + dt * 3) % 1;
      
      // ── Calculate snake segment positions (smooth interpolation) ──
      const snakePositions: Point[] = [];
      for (let seg = 0; seg < SNAKE_LENGTH; seg++) {
        const idx = st.snakeProgress - seg * 0.8;
        if (idx < 0) break;
        
        const floorIdx = Math.floor(idx);
        const frac = idx - floorIdx;
        
        if (floorIdx >= path.length - 1) {
          const p = path[path.length - 1];
          snakePositions.push(gridToPixel(p.x, p.y, offsetX, offsetY));
        } else {
          const p0 = path[floorIdx];
          const p1 = path[Math.min(floorIdx + 1, path.length - 1)];
          const px0 = gridToPixel(p0.x, p0.y, offsetX, offsetY);
          const px1 = gridToPixel(p1.x, p1.y, offsetX, offsetY);
          snakePositions.push({
            x: px0.x + (px1.x - px0.x) * frac,
            y: px0.y + (px1.y - px0.y) * frac,
          });
        }
      }
      
      // ── Eat cells under the snake head ──
      const headPathIdx = Math.floor(st.snakeProgress);
      if (headPathIdx >= 0 && headPathIdx < path.length) {
        const headCell = path[headPathIdx];
        const { x: cx, y: cy } = headCell;
        if (cx >= 0 && cx < COLS && cy >= 0 && cy < ROWS) {
          const cell = grid[cx][cy];
          if (!cell.eaten && cell.level > 0) {
            cell.eaten = true;
            // Spawn particles!
            const cellPx = gridToPixel(cx, cy, offsetX, offsetY);
            const particleCount = 6 + cell.level * 3;
            for (let p = 0; p < particleCount; p++) {
              const angle = (Math.PI * 2 / particleCount) * p + Math.random() * 0.5;
              const speed = 15 + Math.random() * 30;
              st.particles.push({
                x: cellPx.x,
                y: cellPx.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 0.6 + Math.random() * 0.4,
                size: 1.5 + Math.random() * 2.5,
                color: COLORS.particles[Math.floor(Math.random() * COLORS.particles.length)],
                alpha: 1,
              });
            }
          }
        }
      }
      
      // ── Update cell fade animations ──
      for (const col of grid) {
        for (const cell of col) {
          if (cell.eaten && cell.fadeOut > 0) {
            cell.fadeOut = Math.max(0, cell.fadeOut - dt * 3);
          }
        }
      }
      
      // ── Update particles ──
      st.particles = st.particles.filter(p => {
        p.life -= dt / p.maxLife;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha = Math.max(0, p.life);
        p.size *= 0.995;
        return p.life > 0;
      });
      
      // ═══════ DRAW ═══════
      const gridW = COLS * (CELL_SIZE + CELL_GAP) - CELL_GAP;
      const gridH = ROWS * (CELL_SIZE + CELL_GAP) - CELL_GAP;
      
      ctx.save();
      ctx.clearRect(0, 0, gridW + offsetX * 2, gridH + offsetY * 2);
      
      // ── Draw grid cells ──
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const cell = grid[col][row];
          const x = offsetX + col * (CELL_SIZE + CELL_GAP);
          const y = offsetY + row * (CELL_SIZE + CELL_GAP);
          
          let fillColor: string;
          if (cell.eaten) {
            // Cell has been eaten — fade to empty
            const alpha = cell.fadeOut;
            if (alpha <= 0) {
              fillColor = COLORS.cellEmpty;
            } else {
              fillColor = COLORS.levels[cell.level];
              ctx.globalAlpha = alpha;
            }
          } else {
            fillColor = COLORS.levels[cell.level];
          }
          
          drawRoundedRect(ctx, x, y, CELL_SIZE, CELL_SIZE, CELL_RADIUS);
          ctx.fillStyle = fillColor;
          ctx.fill();
          
          // Subtle border
          ctx.strokeStyle = COLORS.cellBorder;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          ctx.globalAlpha = 1;
        }
      }
      
      // ── Draw particles (behind snake) ──
      for (const p of st.particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      
      // ── Draw snake ──
      if (snakePositions.length >= 2) {
        drawSnake(ctx, snakePositions, st.tonguePhase);
      }
      
      ctx.restore();
      
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    animFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initCanvas]);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-full"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
