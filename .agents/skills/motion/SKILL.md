---
name: motion
description: Build polished React UI motion and micro-interactions using Motion (formerly Framer Motion).
---

# Motion React UI Skill

Use Motion for React component-level animation, layout transitions, gestures, hover states, presence animations, and lightweight UI interactions.

## Use Motion for
- Component entrance and exit animations
- Modal and menu transitions
- Hover and tap interactions
- Button micro-interactions
- Card interactions
- Layout transitions
- Animated navigation
- Shared-layout style transitions
- Drag and gesture interactions where useful

## Rules
- Prefer Motion for local React UI behavior.
- Keep animation declarations close to the component they control.
- Use AnimatePresence for clean enter/exit behavior when appropriate.
- Use spring physics selectively; don't make every element bounce.
- Keep durations and easing consistent across the design.
- Use variants when multiple components share animation states.
- Avoid unnecessary re-renders caused by animation state.
- Respect prefers-reduced-motion.
- Do not use Motion for effects better handled by GSAP timelines or WebGL.
- Preserve keyboard accessibility and usable focus states.
