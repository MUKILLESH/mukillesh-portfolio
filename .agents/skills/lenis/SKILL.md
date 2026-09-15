---
name: lenis
description: Add smooth, natural scrolling and scroll coordination with Lenis without harming usability or accessibility.
---

# Lenis Smooth Scrolling Skill

Use Lenis when a website benefits from a refined smooth-scroll experience, especially creative portfolios, product pages, and scroll-driven storytelling.

## Use Lenis for
- Smooth page scrolling
- Premium portfolio experiences
- Scroll storytelling
- Coordinating smooth scroll with animation systems
- Creative landing pages

## Rules
- Use Lenis only when smooth scrolling improves the experience.
- Integrate it cleanly with GSAP ScrollTrigger when both are used.
- Avoid excessive scroll smoothing that makes the interface feel delayed.
- Keep native scrolling behavior usable on touch/mobile devices.
- Do not interfere with keyboard scrolling, focus, accessibility, or browser navigation.
- Respect prefers-reduced-motion and provide a reduced-motion path.
- Avoid nested smooth-scroll containers unless there is a strong reason.
- Keep the implementation lightweight and clean up animation frames/listeners on unmount.
