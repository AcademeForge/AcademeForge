/*
 * anniversary.css
 * AcademeForge 3rd Anniversary Balloon Effect
 * All class names prefixed with "anv-" to avoid style collisions.
 * ---------------------------------------------------------------- */

/* ═══════════════════════════════════════════════════════════════════
   FIXED OVERLAY CONTAINER
   Covers the full viewport but passes pointer-events through
   the transparent gaps; only individual balloons capture clicks.
   z-index 900 keeps balloons below a typical sticky nav (≥ 1000)
   while floating above page content.
   ═══════════════════════════════════════════════════════════════════ */
.anv-balloons-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;   /* pass-through: navigation remains fully clickable */
  z-index: 900;
  overflow: visible;
}

/* ═══════════════════════════════════════════════════════════════════
   BALLOON GROUPS  (left side / right side)
   Each group is absolutely positioned at the header bottom.
   positionContainer() in JS updates the `top` value.
   ═══════════════════════════════════════════════════════════════════ */
.anv-group {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}

.anv-group-left  { left: 14px; }
.anv-group-right { right: 14px; }

/* ═══════════════════════════════════════════════════════════════════
   INDIVIDUAL BALLOON WRAPPER
   This is the element that receives the float animation and the
   click handler.  pointer-events: auto re-enables interaction just
   for the balloon itself.
   ═══════════════════════════════════════════════════════════════════ */
.anv-balloon-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
  /* Float animation is injected per-balloon via inline style
     so each has its own duration & delay for organic variance */
  animation-name: anv-float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  transform-origin: center bottom;
  /* Subtle 3-D depth cue */
  will-change: transform;
}

/* Hover lift — gives tactile feedback before the click */
.anv-balloon-wrapper:hover .anv-balloon-svg {
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35))
          drop-shadow(0 0 12px rgba(255, 215, 0, 0.3));
  transform: scale(1.06);
}

/* ═══════════════════════════════════════════════════════════════════
   BALLOON SVG  (body + knot + string all in one SVG)
   ═══════════════════════════════════════════════════════════════════ */
.anv-balloon-svg {
  width: 80px;
  height: 155px;         /* viewBox 0 0 80 155 */
  overflow: visible;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.22));
  transition: filter 0.25s ease, transform 0.25s ease;
}

/* ═══════════════════════════════════════════════════════════════════
   FLOAT KEYFRAME
   Combines vertical drift with slight lateral sway and micro-
   rotation so every balloon looks physically tethered.
   ═══════════════════════════════════════════════════════════════════ */
@keyframes anv-float {
  0%   { transform: translateY(0px)   rotate(-1.5deg); }
  20%  { transform: translateY(-11px) rotate( 1.2deg); }
  40%  { transform: translateY(-18px) rotate(-0.8deg); }
  60%  { transform: translateY(-10px) rotate( 1.8deg); }
  80%  { transform: translateY(-15px) rotate(-1.0deg); }
  100% { transform: translateY(0px)   rotate(-1.5deg); }
}

/* ═══════════════════════════════════════════════════════════════════
   POP KEYFRAME
   Quick scale-up (rubber-band) → sudden collapse → fade out.
   Added via JS class .anv-popping which overrides the float
   animation with !important so they don't fight.
   ═══════════════════════════════════════════════════════════════════ */
@keyframes anv-pop {
  0%   { transform: scale(1);    opacity: 1;   }
  20%  { transform: scale(1.28); opacity: 1;   }
  50%  { transform: scale(0.35); opacity: 0.6; }
  80%  { transform: scale(0.1);  opacity: 0.2; }
  100% { transform: scale(0);    opacity: 0;   }
}

.anv-balloon-wrapper.anv-popping {
  animation: anv-pop 0.38s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards !important;
  pointer-events: none;
}

/* ═══════════════════════════════════════════════════════════════════
   SPARKLE PARTICLES
   Small glowing dots fired outward from the pop origin.
   --dx / --dy CSS custom properties are set inline per-particle.
   ═══════════════════════════════════════════════════════════════════ */
.anv-sparkle {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  animation: anv-sparkle-burst var(--dur, 500ms) ease-out forwards;
}

@keyframes anv-sparkle-burst {
  0%   {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(
                 calc(-50% + var(--dx, 0px)),
                 calc(-50% + var(--dy, 0px))
               ) scale(0);
    opacity: 0;
  }
}

/* Star-shaped sparkle variant */
.anv-sparkle-star {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  animation: anv-star-burst var(--dur, 600ms) ease-out forwards;
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
}

@keyframes anv-star-burst {
  0%   {
    transform: translate(var(--sx, 0px), var(--sy, 0px))
               scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(
                 calc(var(--sx, 0px) + var(--dx, 0px)),
                 calc(var(--sy, 0px) + var(--dy, 0px))
               ) scale(0) rotate(180deg);
    opacity: 0;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   RESPONSIVE  — shrink on narrow screens so balloons don't
   crowd each other or overlap page content.
   ═══════════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .anv-balloon-svg {
    width: 58px;
    height: 113px;      /* maintain aspect ratio */
  }
  .anv-group {
    gap: 4px;
  }
  .anv-group-left  { left: 4px; }
  .anv-group-right { right: 4px; }
}

@media (max-width: 380px) {
  .anv-balloon-svg {
    width: 48px;
    height: 94px;
  }
  .anv-group { gap: 2px; }
}

/* Honour reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .anv-balloon-wrapper {
    animation: none !important;
  }
  .anv-balloon-wrapper.anv-popping {
    animation: none !important;
    opacity: 0 !important;
  }
  .anv-sparkle,
  .anv-sparkle-star {
    animation: none !important;
    opacity: 0 !important;
  }
}
