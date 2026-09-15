import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { IntroOverlay } from './components/IntroOverlay';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Education } from './components/Education';

import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Single Lenis instance — only after intro is done
  useEffect(() => {
    if (!introComplete) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [introComplete]);

  return (
    <>
      <div className="grain-overlay" />
      
      {/* Intro — completely removed from DOM when done */}
      {!introComplete && (
        <IntroOverlay onComplete={handleIntroComplete} />
      )}

      {/* Portfolio — visible behind the intro overlay, ready for the seamless handoff */}
      <div style={{
        visibility: introComplete ? 'visible' : 'hidden',
      }}>
        <Hero introComplete={introComplete} />
        <About />
        <Projects />
        <Education />

        <footer style={{
          padding: '5vh 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          marginTop: '10vh',
          backgroundColor: 'var(--bg-secondary)',
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            &copy; {new Date().getFullYear()} S.R. Mukillesh. Crafted with intent.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
