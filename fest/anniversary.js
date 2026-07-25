/* fest/anniversary.js
   ═══════════════════════════════════════════════════════════════════
   Indian Flag Anniversary Intro Animation — Premium Edition
   Injects all DOM, sequences the animation, cleans up completely.
   No external dependencies. Pure Vanilla JS. IIFE-wrapped.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Timing (ms) ─────────────────────────────────────────────────
     stripeDur   : CSS stripe animation (matches --anv-stripe-dur)
     stripeSettle: brief pause after stripes land, flag complete
     chakraDur   : CSS chakra appear animation (matches --anv-chakra-dur)
     pause       : hold complete flag before exit
     exitDur     : CSS overlay exit animation (matches --anv-exit-dur)
  ─────────────────────────────────────────────────────────────────── */
  var T = {
    stripeDur   : 900,
    stripeSettle: 300,
    chakraDur   : 700,
    pause       : 1000,
    exitDur     : 820,
  };

  /* Derived trigger points */
  var tChakra = T.stripeDur + T.stripeSettle;           // 1 200ms
  var tExit   = tChakra + T.chakraDur + T.pause;        // 2 900ms
  var tRemove = tExit + T.exitDur + 40;                 // 3 760ms

  /* ── Reduced-motion check ────────────────────────────────────────── */
  var reducedMotion = (
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  /* ── State ───────────────────────────────────────────────────────── */
  var overlay       = null;
  var timers        = [];
  var originalOverflow    = '';
  var originalOverflowBody = '';

  /* ── Tiny scheduler that tracks IDs for cleanup ─────────────────── */
  function after(delay, fn) {
    timers.push(setTimeout(fn, delay));
  }

  /* ── Lock / unlock scroll ────────────────────────────────────────── */
  function lockScroll() {
    originalOverflow     = document.documentElement.style.overflow;
    originalOverflowBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow             = 'hidden';
  }

  function unlockScroll() {
    document.documentElement.style.overflow = originalOverflow;
    document.body.style.overflow             = originalOverflowBody;
  }

  /* ── Build Ashoka Chakra SVG ─────────────────────────────────────── *
     Accurate 24-spoke design with:
       • outer ring (thick)
       • inner hub circle (filled)
       • 24 evenly spaced spokes (15° apart)
       • small teardrop caps at each spoke tip
       • mid-ring for structural detail
  ─────────────────────────────────────────────────────────────────── */
  function buildChakraSVG() {
    var NS  = 'http://www.w3.org/2000/svg';
    var CX  = 100, CY = 100;     /* viewBox centre */
    var R   = 94;                /* outer rim radius */
    var RIN = 8;                 /* hub radius */
    var RSP = 78;                /* spoke end (just inside outer rim) */
    var RMID = 54;               /* mid-ring radius */
    var NAVY = '#000080';

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Ashoka Chakra');
    svg.classList.add('anv-chakra-svg');

    function el(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    /* Outer ring */
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: R,
      fill: 'none', stroke: NAVY, 'stroke-width': '4.5'
    }));

    /* Mid structural ring */
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: RMID,
      fill: 'none', stroke: NAVY, 'stroke-width': '1.2', opacity: '0.45'
    }));

    /* Thin inner-hub ring */
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: RIN + 3,
      fill: 'none', stroke: NAVY, 'stroke-width': '1.2', opacity: '0.5'
    }));

    /* 24 spokes + teardrop tips */
    for (var i = 0; i < 24; i++) {
      var deg = i * 15;
      var rad = deg * Math.PI / 180;

      /* Spoke line */
      svg.appendChild(el('line', {
        x1: CX + (RIN + 3) * Math.cos(rad),
        y1: CY + (RIN + 3) * Math.sin(rad),
        x2: CX + RSP        * Math.cos(rad),
        y2: CY + RSP        * Math.sin(rad),
        stroke: NAVY, 'stroke-width': '2.1',
        'stroke-linecap': 'round'
      }));

      /* Teardrop cap at spoke tip */
      var tipX = CX + (RSP + 8) * Math.cos(rad);
      var tipY = CY + (RSP + 8) * Math.sin(rad);
      var cap  = el('ellipse', {
        cx: tipX, cy: tipY,
        rx: '2.6', ry: '5.8',
        fill: NAVY,
        transform: 'rotate(' + (deg + 90) + ',' + tipX + ',' + tipY + ')'
      });
      svg.appendChild(cap);
    }

    /* Filled centre hub */
    svg.appendChild(el('circle', {
      cx: CX, cy: CY, r: RIN,
      fill: NAVY
    }));

    return svg;
  }

  /* ── Build the full overlay DOM ──────────────────────────────────── */
  function buildOverlay() {
    /* Root overlay */
    overlay = document.createElement('div');
    overlay.id = 'anv-intro-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'presentation');

    /* Flag container */
    var flagWrap = document.createElement('div');
    flagWrap.className = 'anv-flag-container';

    var saffron = document.createElement('div');
    saffron.className = 'anv-stripe anv-stripe-saffron';

    /* White middle — just the overlay background, but add a shine div */
    var shine = document.createElement('div');
    shine.className = 'anv-stripe-white-shine';

    var green = document.createElement('div');
    green.className = 'anv-stripe anv-stripe-green';

    flagWrap.appendChild(saffron);
    flagWrap.appendChild(shine);
    flagWrap.appendChild(green);

    /* Chakra */
    var chakraWrap = document.createElement('div');
    chakraWrap.className = 'anv-chakra-container';

    var chakraInner = document.createElement('div');
    chakraInner.className = 'anv-chakra-inner';
    chakraInner.id = 'anv-chakra-inner';

    chakraInner.appendChild(buildChakraSVG());
    chakraWrap.appendChild(chakraInner);

    overlay.appendChild(flagWrap);
    overlay.appendChild(chakraWrap);

    document.body.appendChild(overlay);
  }

  /* ── Exit — add class, wait, then remove everything ─────────────── */
  function startExit() {
    if (!overlay) return;
    overlay.classList.add('anv-exit');

    after(T.exitDur + 40, function () {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      overlay = null;
      unlockScroll();
    });
  }

  /* ── Reduced-motion fast path ────────────────────────────────────── */
  function runReducedMotion() {
    /* Flag is already fully visible (CSS nullifies animations).
       Show chakra immediately, then exit after a short pause. */
    var inner = document.getElementById('anv-chakra-inner');
    if (inner) inner.classList.add('anv-chakra-in');

    after(900, startExit);
  }

  /* ── Full animation sequence ─────────────────────────────────────── */
  function runFullSequence() {
    /* Chakra appears after stripes settle */
    after(tChakra, function () {
      var inner = document.getElementById('anv-chakra-inner');
      if (inner) inner.classList.add('anv-chakra-in');
    });

    /* Start cinematic exit */
    after(tExit, startExit);
  }

  /* ── Entry point ─────────────────────────────────────────────────── */
  function init() {
    try {
      lockScroll();
      buildOverlay();

      if (reducedMotion) {
        runReducedMotion();
      } else {
        runFullSequence();
      }
    } catch (err) {
      /* Fail silently — never break the host page */
      console.warn('[Anniversary] init error:', err);
      unlockScroll();
      timers.forEach(clearTimeout);
    }
  }

  /* ── Boot ────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

})();
