import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Interactive DSA Visualizer",
      description: "Real-time animations, complexity insights, and AI-powered explanations for Data Structures and Algorithms.",
      link: "https://dsa-visualizer-mukillesh.netlify.app/",
      number: "01",
      bgColor: "#2D46FF" // accent-blue
    },
    {
      title: "Emotion-Based Study Assistant",
      description: "An innovative tool adapting learning flows based on real-time emotional analysis.",
      link: "https://github.com/MUKILLESH/Emotion-Based-Study-Assistant",
      number: "02",
      bgColor: "#FF4D4D" // accent-coral
    },
    {
      title: "Laptop Remote",
      description: "A full-stack Android & FastAPI system to securely control a laptop (mouse, keyboard, media, streaming) over WebSockets.",
      link: "https://github.com/MUKILLESH/Laptop-Remote",
      number: "03",
      bgColor: "#5B21B6" // Violet
    },
    {
      title: "Secure SALT API",
      description: "A secure sandboxed file manager and API hub featuring dynamic path resolution and strict traversal protection.",
      link: "https://github.com/MUKILLESH/SALT_APP",
      number: "04",
      bgColor: "#FF8C42" // Orange
    },
    {
      title: "Web 3D FPS Engine",
      description: "A browser-based first-person shooter game engine built with Three.js and Cannon-es for rigid-body physics.",
      link: "#",
      number: "05",
      bgColor: "#06B6D4" // Cyan
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Calculate total scroll distance based on number of projects.
      // We use 100% per panel so it feels smooth, but not overly long.
      const scrollDistance = (projects.length - 1) * 100; 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (projects.length - 1),
          end: `+=${scrollDistance}%` // e.g., +=400% for 5 projects
        }
      });

      // 1. Animate the wrapper sliding horizontally.
      tl.to(scrollWrapperRef.current, {
        x: () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        duration: 1
      }, 0);

      // 2. Animate the background color. 
      tl.to(containerRef.current, {
        keyframes: projects.slice(1).map(p => ({ backgroundColor: p.bgColor })),
        ease: 'none',
        duration: 1
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor: projects[0].bgColor, position: 'relative' }}>

      <div style={{ position: 'absolute', top: '10vh', left: '5vw', zIndex: 10 }}>
        <h2 className="heading-lg" style={{ color: '#fff' }}>SELECTED WORKS</h2>
      </div>

      <div
        ref={scrollWrapperRef}
        style={{
          display: 'flex',
          width: `${projects.length * 100}vw`,
          height: '100%',
          willChange: 'transform'
        }}
      >
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="project-panel"
            style={{
              width: '100vw',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '20vw'
            }}
          >
            <div style={{ maxWidth: '600px', zIndex: 2 }}>
              <h3 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {proj.title}
              </h3>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', lineHeight: 1.6 }}>
                {proj.description}
              </p>

              <motion.a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-block',
                  padding: '1rem 3rem',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'background 0.3s, color 0.3s',
                  color: '#fff'
                }}
              >
                View Project
              </motion.a>
            </div>

            <div style={{
              position: 'absolute',
              right: '10%',
              bottom: '-10%',
              fontSize: '40vw',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-heading)',
              pointerEvents: 'none',
              lineHeight: 0.8
            }}>
              {proj.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
