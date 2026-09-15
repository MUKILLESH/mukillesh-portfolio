import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const PremiumBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // Calculate the progress of the loop (0 to 1)
  const progress = frame / durationInFrames;
  
  // Calculate an angle (0 to 2PI) for seamless sine/cosine loops
  const angle = progress * Math.PI * 2;

  // Layer 2: Ebb & Flow (Color Fields)
  // We use sin/cos to make them move in smooth, seamless elliptical paths
  const blueX = Math.cos(angle) * (width * 0.15);
  const blueY = Math.sin(angle) * (height * 0.2);
  
  const coralX = Math.sin(angle + Math.PI) * (width * 0.2); // Opposite phase
  const coralY = Math.cos(angle + Math.PI) * (height * 0.15);

  // Layer 3: Structure (Grid scaling)
  // Scale pulses very slightly from 1 to 1.05 and back seamlessly
  const gridScale = 1 + (Math.sin(angle) + 1) / 2 * 0.05;

  // Layer 4: Fragments (Abstract letters)
  // Moving slowly across the screen, looping seamlessly
  const frag1X = (progress * width) % width;
  const frag2X = ((progress + 0.5) * width) % width; // Starts halfway across

  return (
    <AbsoluteFill style={{ backgroundColor: '#F7F6F2', overflow: 'hidden' }}>
      
      {/* --- LAYER 1: TEXTURE --- */}
      {/* The grain overlay is already handled in index.css, so we keep this base clean */}

      {/* --- LAYER 2: EBB & FLOW --- */}
      {/* Electric Blue Field */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60vw',
          height: '60vw',
          minWidth: '600px',
          minHeight: '600px',
          borderRadius: '50%',
          backgroundColor: '#2D46FF',
          filter: 'blur(150px)',
          opacity: 0.15, // Extremely subtle
          transform: `translate(calc(-50% + ${blueX}px), calc(-50% + ${blueY}px))`,
          willChange: 'transform',
        }}
      />
      
      {/* Coral Field */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '70%',
          width: '50vw',
          height: '50vw',
          minWidth: '500px',
          minHeight: '500px',
          borderRadius: '50%',
          backgroundColor: '#FF4D4D',
          filter: 'blur(120px)',
          opacity: 0.12,
          transform: `translate(calc(-50% + ${coralX}px), calc(-50% + ${coralY}px))`,
          willChange: 'transform',
        }}
      />

      {/* --- LAYER 3: STRUCTURE --- */}
      {/* A fine architectural grid that slowly shifts */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%', // Make it larger so scaling doesn't show edges
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `scale(${gridScale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />

      {/* --- LAYER 4: FRAGMENTS --- */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: frag1X - 200, // Offset to allow moving off-screen
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '30vw',
          fontWeight: 700,
          color: '#1A1A1A',
          opacity: 0.02,
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        M
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: frag2X - 200,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '25vw',
          fontWeight: 300,
          color: '#2D46FF',
          opacity: 0.015,
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        O
      </div>

    </AbsoluteFill>
  );
};
