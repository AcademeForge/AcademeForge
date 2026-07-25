/* fest/anniversary.js
   ═══════════════════════════════════════════════════════════════════
   Indian Flag Anniversary Intro — Premium Edition v3
   All animations are transition-based, triggered by JS class toggles.
   No external dependencies. Pure Vanilla JS. IIFE-wrapped.

   Sequence
   ────────
   0 ms        → Overlay injected (stripes off-screen), scroll locked
   ~20 ms      → .anv-go added → saffron slides down, green slides up
   920 ms      → Stripes fully formed (flag complete)
   1 080 ms    → Chakra fades in + spins (simultaneously)
   1 830 ms    → Chakra fully visible
   1 830 ms    → Hold flag + chakra for 2 700 ms
   4 530 ms    → .anv-exit added → overlay fades out (850 ms)
   5 430 ms    → DOM removed, scroll restored
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Timing ──────────────────────────────────────────────────────── */
  var STRIPE_DUR    = 920;   /* matches --anv-stripe-spd  */
  var STRIPE_SETTLE = 160;   /* tiny pause after stripes land */
  var CHAKRA_DUR    = 750;   /* matches --anv-chakra-spd  */
  var HOLD          = 2700;  /* flag fully visible hold   */
  var EXIT_DUR      = 880;   /* matches --anv-exit-spd    */
  var CLEANUP_EXTRA = 60;    /* safety buffer after exit  */

  var T_CHAKRA = STRIPE_DUR + STRIPE_SETTLE;               /* 1 080 ms */
  var T_EXIT   = T_CHAKRA   + CHAKRA_DUR + HOLD;           /* 4 530 ms */
  var T_REMOVE = T_EXIT     + EXIT_DUR   + CLEANUP_EXTRA;  /* 5 470 ms */

  /* ── Reduced motion ──────────────────────────────────────────────── */
  var noMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ── State ───────────────────────────────────────────────────────── */
  var overlay = null;
  var timers  = [];

  /* ── Scroll lock ─────────────────────────────────────────────────── */
  var _docOvf  = '';
  var _bodyOvf = '';

  function lockScroll() {
    _docOvf  = document.documentElement.style.overflow;
    _bodyOvf = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow             = 'hidden';
  }

  function unlockScroll() {
    document.documentElement.style.overflow = _docOvf;
    document.body.style.overflow             = _bodyOvf;
  }

  /* ── Scheduled helpers ───────────────────────────────────────────── */
  function after(ms, fn) { timers.push(setTimeout(fn, ms)); }

  function raf2(fn) {
    /* Two rAF frames guarantee the browser has painted the initial state
       before we trigger transitions — the key fix for "no animation". */
    requestAnimationFrame(function () {
      requestAnimationFrame(fn);
    });
  }

  /* ── Build Ashoka Chakra SVG ─────────────────────────────────────── */
  function buildChakra() {
    var NS   = 'http://www.w3.org/2000/svg';
    var CX   = 100, CY = 100;
    var NAVY = '#000080';

    function el(tag, a) {
      var e = document.createElementNS(NS, tag);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('aria-label', 'Ashoka Chakra');
    svg.setAttribute('role', 'img');
    svg.className = 'anv-chakra-svg';

    /* Outer ring */
    svg.appendChild(el('circle', { cx:CX, cy:CY, r:94, fill:'none', stroke:NAVY, 'stroke-width':'5' }));

    /* Inner rim ring */
    svg.appendChild(el('circle', { cx:CX, cy:CY, r:82, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.4' }));

    /* Mid ring */
    svg.appendChild(el('circle', { cx:CX, cy:CY, r:52, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.35' }));

    /* Inner hub ring */
    svg.appendChild(el('circle', { cx:CX, cy:CY, r:12, fill:'none', stroke:NAVY, 'stroke-width':'1.2', opacity:'0.5' }));

    /* 24 spokes + teardrop tips */
    for (var i = 0; i < 24; i++) {
      var rad = (i * 15) * Math.PI / 180;
      var cos = Math.cos(rad), sin = Math.sin(rad);

      /* Spoke */
      svg.appendChild(el('line', {
        x1: CX + 12 * cos, y1: CY + 12 * sin,
        x2: CX + 80 * cos, y2: CY + 80 * sin,
        stroke: NAVY, 'stroke-width': '2.2', 'stroke-linecap': 'round'
      }));

      /* Teardrop at tip */
      var tx = CX + 88 * cos, ty = CY + 88 * sin;
      svg.appendChild(el('ellipse', {
        cx: tx, cy: ty, rx: '2.8', ry: '6.2', fill: NAVY,
        transform: 'rotate(' + (i * 15 + 90) + ',' + tx + ',' + ty + ')'
      }));
    }

    /* Centre hub */
    svg.appendChild(el('circle', { cx:CX, cy:CY, r:9, fill:NAVY }));

    return svg;
  }

  /* ── Build full overlay DOM ──────────────────────────────────────── */
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'anv-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'presentation');

    /* Flag */
    var flag = document.createElement('div');
    flag.className = 'anv-flag';

    var saffron = document.createElement('div');
    saffron.className = 'anv-stripe anv-stripe-saffron';

    var green = document.createElement('div');
    green.className = 'anv-stripe anv-stripe-green';

    flag.appendChild(saffron);
    flag.appendChild(green);

    /* Chakra */
    var wrap = document.createElement('div');
    wrap.className = 'anv-chakra-wrap';

    var inner = document.createElement('div');
    inner.className = 'anv-chakra-inner';
    inner.id = 'anv-chakra-inner';
    inner.appendChild(buildChakra());
    wrap.appendChild(inner);

    overlay.appendChild(flag);
    overlay.appendChild(wrap);
    document.body.appendChild(overlay);
  }

  /* ── Exit: fade overlay, remove DOM ─────────────────────────────── */
  function doExit() {
    if (!overlay) return;
    overlay.classList.add('anv-exit');

    after(EXIT_DUR + CLEANUP_EXTRA, function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
      unlockScroll();
    });
  }

  /* ── Reduced-motion fast path ────────────────────────────────────── */
  function runReduced() {
    /* CSS already shows flag (transitions disabled). Show chakra right away. */
    var inner = document.getElementById('anv-chakra-inner');
    if (inner) inner.classList.add('anv-chakra-in');
    after(1200, doExit);
  }

  /* ── Full animation sequence ─────────────────────────────────────── */
  function runFull() {
    /* Step 1 — wait 2 frames so browser paints the initial hidden state,
       then trigger stripe transitions by adding .anv-go */
    raf2(function () {
      if (overlay) overlay.classList.add('anv-go');
    });

    /* Step 2 — Chakra appears (fade in + scale up + starts spinning) */
    after(T_CHAKRA, function () {
      var inner = document.getElementById('anv-chakra-inner');
      if (inner) inner.classList.add('anv-chakra-in');
    });

    /* Step 3 — Hold complete flag for HOLD ms, then exit */
    after(T_EXIT, doExit);
  }

  /* ── Entry point ─────────────────────────────────────────────────── */
  function init() {
    try {
      lockScroll();
      buildOverlay();
      noMotion ? runReduced() : runFull();
    } catch (err) {
      console.warn('[Anniversary] error:', err);
      unlockScroll();
      timers.forEach(clearTimeout);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

})();
