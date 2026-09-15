import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        // Simple parallax depth effect
        gsap.fromTo(item, 
          { y: 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 70%",
              scrub: 1
            },
            y: 0,
            opacity: 1,
            ease: "none"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const eduData = [
    {
      year: "2025 – 2029",
      degree: "B.Tech in Computer Science Engineering",
      institution: "Vellore Institute of Technology (VIT)",
      details: "Current CGPA: 8.2. Focus on data structures, algorithmic problem solving, and core programming skills."
    },
    {
      year: "2025",
      degree: "ISC (Class 12)",
      institution: "The Vikasa School, Tuticorin",
      details: "Overall Score: 95.25%. Physics: 100%. Strong analytical foundation developed through physics and mathematics."
    },
    {
      year: "2023",
      degree: "Cambridge IGCSE",
      institution: "The Vikasa International School",
      details: "Score: 89%. Achieved 5 A* grades in Mathematics, Physics, Chemistry, Biology, and Tamil."
    }
  ];

  itemsRef.current = []; // Reset on every render to prevent memory leak

  return (
    <section ref={containerRef} style={{ padding: '15vh 0', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '10vh', color: 'var(--text-primary)' }}>ACADEMICS</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8vh' }}>
          {eduData.map((edu, idx) => (
            <div 
              key={idx} 
              ref={addToRefs}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '4rem',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                paddingTop: '3rem'
              }}
            >
              <div>
                <span style={{ 
                  color: 'var(--accent-blue)', 
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  letterSpacing: '0.1em',
                  fontWeight: 600
                }}>
                  {edu.year}
                </span>
              </div>
              
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  {edu.degree}
                </h3>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 400 }}>
                  {edu.institution}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
