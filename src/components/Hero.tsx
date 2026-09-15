import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface HeroProps {
  introComplete: boolean;
}

export const Hero: React.FC<HeroProps> = ({ introComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-color)',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero-bg.mp4"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1
          className="heading-xl"
          style={{ margin: 0, color: 'var(--text-primary)' }}
        >
          S.R.
        </h1>
        <h1
          className="heading-xl"
          style={{ margin: 0, color: 'var(--accent-blue)' }}
        >
          MUKILLESH
        </h1>

        <p
          ref={subtitleRef}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            marginTop: '2rem',
            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
            maxWidth: '500px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Software Engineer &bull; Algorithm Specialist &bull; Creative Developer
        </p>
      </div>
    </section>
  );
};
