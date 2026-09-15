import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const HeroBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // Progress from 0 to 1
  const progress = frame / durationInFrames;
  
  // Angle for seamless trig-based looping (0 to 2PI)
  const angle = progress * Math.PI * 2;

  // --- MATHEMATICAL HELPERS ---
  // Helper to generate a slowly oscillating value between min and max
  const oscillate = (phase: number, min: number, max: number) => {
    const normalized = (Math.sin(angle + phase) + 1) / 2; // 0 to 1
    return min + normalized * (max - min);
  };

  // Helper to generate a complex oscillating coordinate (adds a secondary frequency for organic feel)
  const complexOscillate = (phase1: number, phase2: number, min: number, max: number) => {
    const val1 = Math.sin(angle + phase1);
    const val2 = Math.cos((angle * 2) + phase2); // Double frequency
    const normalized = ((val1 + val2) / 2 + 1) / 2; // Roughly 0 to 1
    return min + normalized * (max - min);
  };

  // --- RIBBON 1 (Top Right to Center) ---
  // A flowing violet/blue dimensional ribbon
  const r1_startX = width * 1.2;
  const r1_startY = -height * 0.2;
  const r1_cp1X = complexOscillate(0, 1, width * 0.6, width * 0.9);
  const r1_cp1Y = complexOscillate(1, 2, height * 0.1, height * 0.4);
  const r1_cp2X = complexOscillate(2, 3, width * 0.3, width * 0.6);
  const r1_cp2Y = complexOscillate(3, 4, height * 0.5, height * 0.8);
  const r1_endX = -width * 0.2;
  const r1_endY = height * 1.2;
  
  // Thickness offsets for Ribbon 1
  const r1_thX = oscillate(4, 150, 300);
  const r1_thY = oscillate(5, -100, 100);

  const ribbon1Path = `
    M ${r1_startX} ${r1_startY}
    C ${r1_cp1X} ${r1_cp1Y}, ${r1_cp2X} ${r1_cp2Y}, ${r1_endX} ${r1_endY}
    L ${r1_endX + r1_thX} ${r1_endY + r1_thY}
    C ${r1_cp2X + r1_thX} ${r1_cp2Y + r1_thY}, ${r1_cp1X + r1_thX} ${r1_cp1Y + r1_thY}, ${r1_startX + r1_thX} ${r1_startY + r1_thY}
    Z
  `;

  // --- RIBBON 2 (Bottom Right sweeping up) ---
  // A flowing coral/orange ribbon overlapping the first
  const r2_startX = width * 0.8;
  const r2_startY = height * 1.2;
  const r2_cp1X = complexOscillate(Math.PI, 1, width * 0.7, width * 1.0);
  const r2_cp1Y = complexOscillate(Math.PI + 1, 2, height * 0.6, height * 0.9);
  const r2_cp2X = complexOscillate(Math.PI + 2, 3, width * 0.4, width * 0.7);
  const r2_cp2Y = complexOscillate(Math.PI + 3, 4, -height * 0.1, height * 0.3);
  const r2_endX = -width * 0.2;
  const r2_endY = -height * 0.2;
  
  const r2_thX = oscillate(Math.PI + 4, 100, 250);
  const r2_thY = oscillate(Math.PI + 5, -50, 150);

  const ribbon2Path = `
    M ${r2_startX} ${r2_startY}
    C ${r2_cp1X} ${r2_cp1Y}, ${r2_cp2X} ${r2_cp2Y}, ${r2_endX} ${r2_endY}
    L ${r2_endX + r2_thX} ${r2_endY + r2_thY}
    C ${r2_cp2X + r2_thX} ${r2_cp2Y + r2_thY}, ${r2_cp1X + r2_thX} ${r2_cp1Y + r2_thY}, ${r2_startX + r2_thX} ${r2_startY + r2_thY}
    Z
  `;

  // --- AMBIENT GRADIENTS ---
  const blueG_X = oscillate(0, 60, 90);
  const blueG_Y = oscillate(1, -10, 30);
  
  const pinkG_X = oscillate(2, 70, 110);
  const pinkG_Y = oscillate(3, 70, 110);
  
  const limeG_X = oscillate(4, 10, 40);
  const limeG_Y = oscillate(5, 80, 110);

  return (
    <AbsoluteFill style={{ backgroundColor: '#F7F6F2', overflow: 'hidden' }}>
      
      {/* 1. TEXTURED ENVIRONMENT */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
          zIndex: 10, // Grain on top of everything
          pointerEvents: 'none'
        }}
      />

      {/* 2. ATMOSPHERIC COLOR FIELDS (Deep Background) */}
      <div style={{ position: 'absolute', inset: 0, filter: 'blur(120px)' }}>
        {/* Deep Blue Top Right */}
        <div style={{
          position: 'absolute',
          left: `${blueG_X}%`, top: `${blueG_Y}%`,
          width: '50vw', height: '50vw',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: '#2D46FF',
          opacity: 0.25,
        }} />
        {/* Deep Coral/Pink Bottom Right */}
        <div style={{
          position: 'absolute',
          left: `${pinkG_X}%`, top: `${pinkG_Y}%`,
          width: '60vw', height: '60vw',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: '#FF4D85',
          opacity: 0.2,
        }} />
        {/* Subtle Lime Bottom Left */}
        <div style={{
          position: 'absolute',
          left: `${limeG_X}%`, top: `${limeG_Y}%`,
          width: '40vw', height: '40vw',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: '#84CC16',
          opacity: 0.1,
        }} />
      </div>

      {/* 3. DIMENSIONAL RIBBONS (SVG Morphing) */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2D46FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F7F6F2" stopOpacity="0.0" />
          </linearGradient>
          
          <linearGradient id="grad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4D" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FF8C42" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F7F6F2" stopOpacity="0.0" />
          </linearGradient>

          {/* Glowing highlight gradients for edges */}
          <linearGradient id="highlight1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          
          <linearGradient id="highlight2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Ribbon 1 */}
        <g style={{ mixBlendMode: 'multiply' }}>
          <path
            d={ribbon1Path}
            fill="url(#grad1)"
            style={{ transition: 'none' }}
          />
          {/* Specular Edge Highlight */}
          <path
            d={`M ${r1_startX} ${r1_startY} C ${r1_cp1X} ${r1_cp1Y}, ${r1_cp2X} ${r1_cp2Y}, ${r1_endX} ${r1_endY}`}
            fill="none"
            stroke="url(#highlight1)"
            strokeWidth="3"
            style={{ transition: 'none' }}
          />
        </g>

        {/* Ribbon 2 */}
        <g style={{ mixBlendMode: 'multiply' }}>
          <path
            d={ribbon2Path}
            fill="url(#grad2)"
            style={{ transition: 'none' }}
          />
          {/* Specular Edge Highlight */}
          <path
            d={`M ${r2_startX} ${r2_startY} C ${r2_cp1X} ${r2_cp1Y}, ${r2_cp2X} ${r2_cp2Y}, ${r2_endX} ${r2_endY}`}
            fill="none"
            stroke="url(#highlight2)"
            strokeWidth="2"
            style={{ transition: 'none' }}
          />
        </g>
      </svg>
      
      {/* 4. SOFT FOREGROUND GLARE (Dimensionality) */}
      {/* Adds a glass-like sheen over the whole composition */}
      <div
        style={{
          position: 'absolute',
          top: '-10%', left: '-10%',
          width: '120vw', height: '120vh',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1) 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

    </AbsoluteFill>
  );
};
