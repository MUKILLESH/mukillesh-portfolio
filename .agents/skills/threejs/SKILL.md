---
name: threejs
description: Create tasteful interactive 3D and WebGL experiences with Three.js or React Three Fiber for premium websites.
---

# Three.js / React Three Fiber Skill

Use Three.js or React Three Fiber when 3D meaningfully improves the visual concept. Do not add WebGL merely to make a page look complicated.

## Use Three.js for
- Interactive 3D hero objects
- Product visualization
- Abstract WebGL backgrounds
- Shader-based visual effects
- Particle fields
- Interactive 3D scenes
- Mouse-reactive depth
- Premium visual storytelling

## Rules
- Prefer React Three Fiber in React applications when it makes integration cleaner.
- Keep scenes lightweight and performant.
- Use low-poly or optimized assets when possible.
- Reuse geometries and materials when practical.
- Avoid unnecessary real-time shadows, high particle counts, and expensive post-processing.
- Handle resize and device-pixel-ratio carefully.
- Pause or reduce rendering when the canvas is not visible when practical.
- Provide a graceful fallback for unsupported/low-power devices.
- Respect prefers-reduced-motion.
- Ensure 3D never blocks text, buttons, navigation, or accessibility.
- Keep important information in normal HTML rather than only inside WebGL.
- Use mouse movement subtly; avoid nausea-inducing camera motion.
