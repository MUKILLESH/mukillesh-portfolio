---
name: gsap
description: Create sophisticated, performant web animations with GSAP and ScrollTrigger for premium interactive websites.
---

# GSAP Web Animation Skill

Use GSAP when animation requires coordinated timelines, scroll-driven choreography, advanced sequencing, SVG motion, or precise control.

## Use GSAP for
- Hero entrance sequences
- Scroll-triggered reveals
- Scroll-linked motion and parallax
- Text and typography animation
- SVG/path animation
- Pinned sections
- Horizontal scrolling experiences
- Complex multi-element timelines
- Page-transition choreography

## Rules
- Prefer GSAP timelines for coordinated sequences.
- Use ScrollTrigger for scroll-based animation.
- Animate transform and opacity where possible for performance.
- Keep motion purposeful and visually coherent.
- Avoid excessive bouncing, spinning, or random motion.
- Clean up GSAP/ScrollTrigger instances when components unmount.
- Avoid layout-triggering animations such as repeatedly animating width/height/top/left when transform can achieve the same effect.
- Respect prefers-reduced-motion.
- Make animations responsive and test mobile behavior.
- Never let animation interfere with navigation, readability, or accessibility.
