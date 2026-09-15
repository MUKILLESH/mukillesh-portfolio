import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Split text roughly by line or words for a premium reveal
      // Note: A real split-text library is best, but we'll use a simple approach or opacity reveal
      
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          },
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }
      );

      const skillItems = gsap.utils.toArray('.skill-item');
      gsap.fromTo(skillItems,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%"
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = ["C / C++", "Java", "Python", "MATLAB", "Object-Oriented Programming", "Data Structures & Algorithms"];

  return (
    <section ref={sectionRef} style={{ padding: '15vh 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center' }}>
        
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>ABOUT</h2>
          <p ref={textRef} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            I am a motivated Computer Science undergraduate at Vellore Institute of Technology. 
            My foundation lies deeply in programming, data structures, and algorithmic problem solving. 
            I possess strong analytical thinking and a relentless eagerness to master new technologies 
            and build systems that matter.
          </p>
        </div>

        <div ref={skillsRef}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Core Capabilities
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-item"
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-coral)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                <span>{skill}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
