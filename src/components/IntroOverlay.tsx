import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  onComplete: () => void;
}

/**
 * "The Monograph" — Editorial typography intro.
 *
 * The name starts viewport-scale, only a narrow strip visible.
 * The strip widens, revealing the monumental letterforms.
 * Then the text scales down and repositions to match the Hero's
 * exact final layout, so the transition is invisible.
 */
export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const srRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Phase 1: Stillness (0–1s)
      // Everything is black. Tension builds through absence.
      tl.set(maskRef.current, { height: '0%' })
        .set(nameRef.current, {
          scale: 3.5,
          opacity: 0,
          y: 0,
        })
        .set(srRef.current, { opacity: 0, y: -20 });

      // Phase 2: The Aperture (1s–3s)
      // A narrow horizontal strip reveals the name at extreme scale.
      tl.to(nameRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.8')
      .to(maskRef.current, {
        height: '15%',
        duration: 0.6,
        ease: 'power3.out',
      }, '<')
      .to(maskRef.current, {
        height: '100%',
        duration: 1.4,
        ease: 'power2.inOut',
      }, '+=0.3');

      // Phase 3: The Resolve (3s–4.5s)
      // The monumental text scales down to the Hero's final position.
      // "S.R." fades in above it.
      tl.to(nameRef.current, {
        scale: 1,
        duration: 1.5,
        ease: 'power3.inOut',
      }, '-=0.5')
      .to(srRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.8');

      // Phase 4: Dissolve overlay (4.5s–5s)
      // The overlay fades out, revealing the live Hero underneath
      // which is already in the exact same visual position.
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '+=0.2');
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Skip — ultra-minimal */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          zIndex: 10,
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        Skip
      </button>

      {/* Typography container — positioned to match Hero layout */}
      <div
        style={{
          paddingLeft: '5vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* S.R. line — starts invisible, fades in during Phase 3 */}
        <span
          ref={srRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            opacity: 0,
            margin: 0,
          }}
        >
          S.R.
        </span>

        {/* MUKILLESH — the monograph centerpiece */}
        <div
          ref={maskRef}
          style={{
            overflow: 'hidden',
            height: '0%',
          }}
        >
          <div
            ref={nameRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              transformOrigin: 'left center',
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            MUKILLESH
          </div>
        </div>
      </div>
    </div>
  );
};
