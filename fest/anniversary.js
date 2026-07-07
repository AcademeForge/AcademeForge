(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────── */
  var CFG = {
    topOffset      : 0,
    hangLengthBase : 67,
    mobileScale    : 0.725,
    confettiSrc    : 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    swayDur        : [6.2, 7.8, 5.4, 7.1, 5.9, 6.7],
    swayDelay      : [0,   0.9, 1.8, 0.4, 1.4, 2.3],
    chainDelay     : 150,
    autoPopDelay   : 6000,   // ms of no interaction before automatic first pop
  };

  var BP = {
    TABLET_MIN : 768,
    DESKTOP_MIN: 1024,
  };

  var RUNTIME = {
    hangLength: CFG.hangLengthBase,
  };

  /* ── Content — edit here to change all copy ───────────────────────── */
  var CONFIG = {
    BALLOON_TEXT          : 'NEW',
    OVERLAY_TITLE         : '🎉 Welcome to the AcademeForge Ecosystem 🎉',
    OVERLAY_TITLE_MOBILE  : '🎉 AcademeForge Ecosystem 🎉',
    OVERLAY_SUBTITLE      : 'One Ecosystem. Multiple Experiences.',
    STORAGE_KEY           : 'af_ecosystem_launch_v1',
    STORAGE_TTL_MS        : 7 * 24 * 60 * 60 * 1000,
  };

  /* ── Colour palettes ─────────────────────────────────────────────── */
  var LEFT_C = [
    { g1:'#FFE566', g2:'#F57F00', shine:'rgba(255,255,220,0.62)', rim:'rgba(255,180,0,0.32)'  },
    { g1:'#E040FB', g2:'#6A1B9A', shine:'rgba(255,210,255,0.56)', rim:'rgba(160,0,220,0.28)'  },
    { g1:'#FF6F9C', g2:'#B71C5A', shine:'rgba(255,220,235,0.56)', rim:'rgba(200,0,80,0.26)'   },
  ];
  var RIGHT_C = [
    { g1:'#4DD0E1', g2:'#006978', shine:'rgba(210,255,255,0.60)', rim:'rgba(0,160,180,0.28)'  },
    { g1:'#FFB347', g2:'#D84315', shine:'rgba(255,240,210,0.56)', rim:'rgba(220,100,0,0.26)'  },
    { g1:'#5C9BF5', g2:'#0D2F8E', shine:'rgba(210,230,255,0.56)', rim:'rgba(30,60,200,0.26)'  },
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var container    = null;
  var leftGroup    = null;
  var rightGroup   = null;
  var confettiFn   = null;
  var rafId        = null;
  var chainFired   = false;
  var messagShown  = false;
  var allSlots     = [];
  var activeConfig = null;

  /* Auto-pop state — isolated from manual-click state */
  var autoPopTimer = null;   // setTimeout handle; null when not pending
  var autoPopFired = false;  // true once the timer has ever fired

  /* ── SVG helper ──────────────────────────────────────────────────── */
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function(k){ el.setAttribute(k, attrs[k]); });
    return el;
  }

  /* ── Pin SVG ─────────────────────────────────────────────────────── */
  function makePinSVG() {
    var svg = s('svg', { viewBox:'0 0 10 10', xmlns:NS, width:'10', height:'10', 'aria-hidden':'true' });
    svg.classList.add('anv-pin-svg');
    svg.appendChild(s('circle', { cx:'5', cy:'5', r:'4.5', fill:'rgba(0,0,0,0.12)' }));
    svg.appendChild(s('circle', { cx:'5', cy:'5', r:'3.8', fill:'#C8A800' }));
    svg.appendChild(s('circle', { cx:'3.4', cy:'3.4', r:'1.4', fill:'rgba(255,255,255,0.55)' }));
    return svg;
  }

  /* ── String SVG ──────────────────────────────────────────────────── */
  function makeStringSVG(uid) {
    var H = RUNTIME.hangLength, CX = 3;
    var svg = s('svg', { viewBox:'0 0 6 '+H, xmlns:NS, width:'6', height:H,
                         'aria-hidden':'true', preserveAspectRatio:'none' });
    svg.classList.add('anv-string-svg');
    svg.style.height = H + 'px';
    svg.appendChild(s('path', {
      d: 'M'+CX+',0 C'+(CX+2)+','+(H*0.28)+' '+(CX-2)+','+(H*0.68)+' '+CX+','+H,
      stroke:'rgba(90,65,30,0.48)', 'stroke-width':'1.6', fill:'none', 'stroke-linecap':'round',
    }));
    return svg;
  }

  /* ── Balloon SVG ─────────────────────────────────────────────────── */
  function makeSVG(c, uid) {
    var W=94, H=182, CX=47, CY=46, RX=34, RY=38;
    var KNOT_Y = CY - RY;
    var svg = s('svg', { viewBox:'0 0 '+W+' '+H, xmlns:NS, 'aria-hidden':'true' });
    svg.classList.add('anv-balloon-svg');

    var defs = s('defs');
    var grad = s('radialGradient', { id:'anv-g-'+uid, cx:'28%', cy:'22%', r:'70%', fx:'22%', fy:'16%' });
    grad.appendChild(s('stop', { 'offset':'0%',   'stop-color':c.g1, 'stop-opacity':'1'    }));
    grad.appendChild(s('stop', { 'offset':'52%',  'stop-color':c.g2, 'stop-opacity':'0.90' }));
    grad.appendChild(s('stop', { 'offset':'100%', 'stop-color':c.g2, 'stop-opacity':'1'    }));
    defs.appendChild(grad);

    var clip = s('clipPath', { id:'anv-c-'+uid });
    clip.appendChild(s('ellipse', { cx:CX, cy:CY, rx:RX, ry:RY }));
    defs.appendChild(clip);

    var flt = s('filter', { id:'anv-f-'+uid, x:'-15%', y:'-15%', width:'130%', height:'130%', colorInterpolationFilters:'sRGB' });
    var feB = s('feGaussianBlur', { 'in':'SourceAlpha', stdDeviation:'4', result:'blur' });
    var feF = s('feFlood',        { 'flood-color':c.g2, 'flood-opacity':'0.35', result:'col' });
    var feC = s('feComposite',    { 'in':'col', 'in2':'blur', operator:'in', result:'sh' });
    var feM = s('feMerge');
    feM.appendChild(s('feMergeNode', { 'in':'SourceGraphic' }));
    feM.appendChild(s('feMergeNode', { 'in':'sh' }));
    flt.appendChild(feB); flt.appendChild(feF); flt.appendChild(feC); flt.appendChild(feM);
    defs.appendChild(flt);
    svg.appendChild(defs);

    svg.appendChild(s('ellipse', { cx:CX, cy:CY, rx:RX, ry:RY,
      fill:'url(#anv-g-'+uid+')', filter:'url(#anv-f-'+uid+')' }));
    svg.appendChild(s('ellipse', { cx:CX, cy:CY, rx:RX-0.5, ry:RY-0.5,
      fill:'none', stroke:c.rim, 'stroke-width':'3', 'clip-path':'url(#anv-c-'+uid+')' }));
    svg.appendChild(s('ellipse', { cx:CX-RX*0.26, cy:CY-RY*0.28, rx:RX*0.40, ry:RY*0.27,
      fill:c.shine, 'clip-path':'url(#anv-c-'+uid+')' }));
    svg.appendChild(s('ellipse', { cx:CX-RX*0.40, cy:CY-RY*0.46, rx:RX*0.13, ry:RY*0.09,
      fill:'rgba(255,255,255,0.80)', 'clip-path':'url(#anv-c-'+uid+')' }));
    svg.appendChild(s('ellipse', { cx:CX+RX*0.62, cy:CY+RY*0.05, rx:RX*0.09, ry:RY*0.22,
      fill:'rgba(255,255,255,0.14)', 'clip-path':'url(#anv-c-'+uid+')' }));

    var KX = CX, KY = KNOT_Y;
    svg.appendChild(s('path', {
      d: 'M'+(KX-3.5)+','+(KY+3)+' Q'+KX+','+(KY-5)+' '+(KX+3.5)+','+(KY+3)+' Q'+KX+','+(KY+9)+' '+(KX-3.5)+','+(KY+3),
      fill:c.g2,
    }));

    var txt = String(CONFIG.BALLOON_TEXT);
    var fontSize = txt.length <= 3 ? '17' : txt.length <= 5 ? '13' : '10';
    var t1 = s('text', { x:''+CX, y:''+CY,
      'text-anchor':'middle', 'dominant-baseline':'middle',
      fill:'rgba(255,255,255,0.97)', 'font-size':fontSize, 'font-weight':'800',
      'font-family':"Inter,'Segoe UI',Arial,sans-serif", 'letter-spacing':'0.5' });
    t1.textContent = txt;
    svg.appendChild(t1);
    return svg;
  }


  function cancelAutoPop() {
    if (autoPopTimer !== null) {
      clearTimeout(autoPopTimer);
      autoPopTimer = null;
    }
  }

  function scheduleAutoPop() {
    if (autoPopFired || autoPopTimer !== null) return;

    autoPopTimer = setTimeout(function () {
      autoPopTimer = null;
      if (chainFired || autoPopFired) return;   // manual click won the race

      // Find the first eligible slot
      var target = null;
      for (var i = 0; i < allSlots.length; i++) {
        var sl = allSlots[i];
        if (sl.isConnected && !sl.classList.contains('anv-popping')) {
          target = sl;
          break;
        }
      }
      if (!target) return;

      autoPopFired = true;

      var wrapper = target.querySelector('.anv-balloon-wrapper');
      if (!wrapper) return;

      // Identical pipeline to a manual balloon click
      handleFirstPop(target, wrapper);
    }, CFG.autoPopDelay);
  }

  /* ── Create full slot (pin + string + balloon) ──────────────────── */
  function makeBalloonSlot(color, globalIdx, uid) {
    var slot_el = document.createElement('div');
    slot_el.className = 'anv-balloon-slot';
    slot_el.style.animationDuration = CFG.swayDur[globalIdx]  + 's';
    slot_el.style.animationDelay    = CFG.swayDelay[globalIdx] + 's';

    slot_el.appendChild(makePinSVG());
    slot_el.appendChild(makeStringSVG(uid));

    var w = document.createElement('div');
    w.className = 'anv-balloon-wrapper';
    w.appendChild(makeSVG(color, uid));
    slot_el.appendChild(w);

    w.addEventListener('click', function (e) {
      e.stopPropagation();
      cancelAutoPop();           // prevent auto-pop from also firing
      handleFirstPop(slot_el, w);
    }, { once: true });

    return slot_el;
  }

  /* ── First pop — shared entry point for manual and auto paths ───── */
  function handleFirstPop(slot_el, wrapper) {
    if (slot_el.classList.contains('anv-popping')) return;

    var r  = wrapper.getBoundingClientRect();
    var px = r.left + r.width  / 2;
    var py = r.top  + r.height * 0.28;
    celebrate(px, py);
    triggerPop(slot_el);

    if (!chainFired) {
      chainFired = true;
      markExperienceSeen();
      showAnniversaryMessage();
      scheduleChain(slot_el);
    }
  }

  /* ── Chain reaction ─────────────────────────────────────────────── */
  function scheduleChain(skipSlot) {
    var leftSlots = [], rightSlots = [];
    allSlots.forEach(function (sl) {
      if (sl === skipSlot || sl.classList.contains('anv-popping') || !sl.isConnected) return;
      if (sl.parentElement === leftGroup) leftSlots.push(sl);
      else                                rightSlots.push(sl);
    });

    var queue = [];
    var maxLen = Math.max(leftSlots.length, rightSlots.length);
    for (var i = 0; i < maxLen; i++) {
      if (i < leftSlots.length)  queue.push(leftSlots[i]);
      if (i < rightSlots.length) queue.push(rightSlots[i]);
    }

    queue.forEach(function (sl, idx) {
      setTimeout(function () {
        if (sl.classList.contains('anv-popping') || !sl.isConnected) return;
        var wrapper = sl.querySelector('.anv-balloon-wrapper');
        if (!wrapper) return;
        var r  = wrapper.getBoundingClientRect();
        celebrate(r.left + r.width / 2, r.top + r.height * 0.28);
        triggerPop(sl);
      }, (idx + 1) * CFG.chainDelay);
    });

    setTimeout(grandFinale, (queue.length + 1) * CFG.chainDelay + 200);
  }

  /* ── Pop animation ───────────────────────────────────────────────── */
  function triggerPop(slot_el) {
    slot_el.classList.add('anv-popping');
    slot_el.addEventListener('animationend', function () { slot_el.remove(); }, { once: true });
    setTimeout(function () { if (slot_el.isConnected) slot_el.remove(); }, 600);
  }

  /* ── Celebrate burst ─────────────────────────────────────────────── */
  function celebrate(x, y) {
    var ox = x / window.innerWidth;
    var oy = y / window.innerHeight;
    if (confettiFn) {
      confettiFn({ particleCount:65, spread:65, origin:{x:ox,y:oy},
        colors:['#FFD700','#FF8C00','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#64B5F6'],
        startVelocity:24, gravity:0.80, scalar:0.85, ticks:90, zIndex:9999 });
      confettiFn({ particleCount:30, spread:45, origin:{x:ox,y:oy},
        colors:['#FFD700','#FFF176','#FFEB3B','#FFD54F'], shapes:['circle'],
        startVelocity:14, gravity:0.38, scalar:0.48, ticks:115, zIndex:9999, drift:0.45 });
    }
    spawnSparkles(x, y);
    spawnStars(x, y);
  }

  /* ── Grand finale ────────────────────────────────────────────────── */
  function grandFinale() {
    if (!confettiFn) return;
    confettiFn({ particleCount:80, angle:55,  spread:60, origin:{x:0.04,y:0.32},
      colors:['#FFD700','#FF6B6B','#E040FB','#5C9BF5','#fff'],
      startVelocity:50, gravity:0.85, scalar:0.82, ticks:110, zIndex:9999 });
    confettiFn({ particleCount:80, angle:125, spread:60, origin:{x:0.96,y:0.32},
      colors:['#FFD700','#4DD0E1','#FFB347','#ffffff','#FF6B6B'],
      startVelocity:50, gravity:0.85, scalar:0.82, ticks:110, zIndex:9999 });
    setTimeout(function () {
      if (!confettiFn) return;
      confettiFn({ particleCount:90, spread:110, origin:{x:0.5,y:0.20},
        colors:['#FFD700','#FFF176','#FFEB3B','#FFD54F','#fff'], shapes:['circle'],
        startVelocity:22, gravity:0.32, scalar:0.54, ticks:170, zIndex:9999, drift:0.5 });
    }, 280);
    spawnSparkles(window.innerWidth * 0.5, window.innerHeight * 0.22);
    spawnStars(window.innerWidth * 0.5, window.innerHeight * 0.22);
  }

  /* ── Launch message overlay ─────────────────────────────────────────
     Two title elements are created:
       .anv-message-title        — desktop copy, CSS hides it on mobile
       .anv-message-title-mobile — shorter mobile copy, CSS hides it on
                                   desktop/tablet (≥768px)
     The toggle is purely CSS (display:none / display:block in the
     <768px media query) — no JS viewport check is needed here.        */
  function showAnniversaryMessage() {
    if (messagShown) return;
    messagShown = true;

    var overlay = document.createElement('div');
    overlay.className = 'anv-message-overlay';
    overlay.style.top = (getHeaderBottom() + 18) + 'px';

    var card = document.createElement('div');
    card.className = 'anv-message-card';

    var title = document.createElement('div');
    title.className = 'anv-message-title';
    title.textContent = CONFIG.OVERLAY_TITLE;

    var titleMobile = document.createElement('div');
    titleMobile.className = 'anv-message-title anv-message-title-mobile';
    titleMobile.textContent = CONFIG.OVERLAY_TITLE_MOBILE;

    var divider = document.createElement('div');
    divider.className = 'anv-message-divider';

    var subtitle = document.createElement('div');
    subtitle.className = 'anv-message-subtitle';
    subtitle.textContent = CONFIG.OVERLAY_SUBTITLE;

    card.appendChild(title);
    card.appendChild(titleMobile);
    card.appendChild(divider);
    card.appendChild(subtitle);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    setTimeout(function () {
      if (overlay.isConnected) overlay.remove();
    }, 4200);
  }

  /* ── Welcome celebration ─────────────────────────────────────────── */
  function welcomeCelebration() {
    if (!confettiFn) return;
    var ox = 0.5, oy = 0.14;

    confettiFn({ particleCount:90, spread:95, origin:{x:ox,y:oy},
      colors:['#FFD700','#FF8C00','#E040FB','#00BCD4','#FF6B6B','#5C9BF5','#ffffff'],
      startVelocity:32, gravity:0.72, scalar:0.90, ticks:125, zIndex:9999 });

    setTimeout(function () {
      if (!confettiFn) return;
      confettiFn({ particleCount:55, spread:78, origin:{x:ox,y:oy},
        colors:['#FFD700','#FFF176','#FFD54F','#FFFFFF'], shapes:['circle'],
        startVelocity:18, gravity:0.32, scalar:0.52, ticks:155, zIndex:9999, drift:0.55 });
    }, 650);

    setTimeout(function () {
      if (!confettiFn) return;
      confettiFn({ particleCount:45, angle:60,  spread:50, origin:{x:0.05,y:0.28},
        colors:['#FFD700','#FF6B6B','#E040FB','#5C9BF5'],
        startVelocity:42, gravity:0.88, scalar:0.78, ticks:95, zIndex:9999 });
      confettiFn({ particleCount:45, angle:120, spread:50, origin:{x:0.95,y:0.28},
        colors:['#FFD700','#4DD0E1','#FFB347','#ffffff'],
        startVelocity:42, gravity:0.88, scalar:0.78, ticks:95, zIndex:9999 });
    }, 1300);

    setTimeout(function () {
      spawnSparkles(window.innerWidth * 0.07, window.innerHeight * 0.26);
      spawnSparkles(window.innerWidth * 0.93, window.innerHeight * 0.26);
    }, 2100);

    // Start 6-second idle countdown — cancelAutoPop() in click handlers
    // ensures only one of the two paths (manual or auto) ever fires.
    scheduleAutoPop();
  }

  /* ── Sparkles ────────────────────────────────────────────────────── */
  function spawnSparkles(cx, cy) {
    var pal = ['#FFD700','#FFA500','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#FFB74D','#E040FB'];
    var N = 18;
    for (var i = 0; i < N; i++) {
      (function (i) {
        var ang  = (360/N)*i + (Math.random()-0.5)*14;
        var dist = 40 + Math.random()*80;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 5 + Math.random()*8;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 400 + Math.random()*320;
        var el   = document.createElement('div');
        el.className = 'anv-sparkle';
        el.style.cssText = [
          'left:'+cx+'px','top:'+cy+'px',
          'width:'+sz+'px','height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+(sz*2.4)+'px '+col,
          'border-radius:'+(Math.random()>0.38?'50%':'3px'),
          '--dx:'+dx+'px','--dy:'+dy+'px','--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function () { if (el.isConnected) el.remove(); }, dur+80);
      })(i);
    }
  }

  /* ── Stars ───────────────────────────────────────────────────────── */
  function spawnStars(cx, cy) {
    var pal = ['#FFD700','#FFF176','#FF8C00','#ffffff'];
    var N = 8;
    for (var i = 0; i < N; i++) {
      (function () {
        var ang  = Math.random()*360;
        var dist = 28 + Math.random()*65;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 8 + Math.random()*9;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 480 + Math.random()*360;
        var sx   = (Math.random()-0.5)*9;
        var sy   = (Math.random()-0.5)*9;
        var el   = document.createElement('div');
        el.className = 'anv-star';
        el.style.cssText = [
          'left:'+cx+'px','top:'+cy+'px',
          'width:'+sz+'px','height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+sz+'px '+col,
          '--sx:'+sx+'px','--sy:'+sy+'px',
          '--dx:'+dx+'px','--dy:'+dy+'px','--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function () { if (el.isConnected) el.remove(); }, dur+80);
      })();
    }
  }

  /* ── Header bottom ───────────────────────────────────────────────── */
  function getHeaderBottom() {
    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav) return Math.max(0, nav.getBoundingClientRect().bottom);
    var fallback = 0;
    ['header','[role="banner"]'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) fallback = Math.max(fallback, el.getBoundingClientRect().bottom);
    });
    return fallback || 72;
  }

  /* ── Breakpoint ──────────────────────────────────────────────────── */
  function getBreakpointName() {
    var w = window.innerWidth;
    if (w >= BP.DESKTOP_MIN) return 'desktop';
    if (w >= BP.TABLET_MIN)  return 'tablet';
    return 'mobile';
  }

  function getConfigForBreakpoint(name) {
    if (name === 'mobile') return { name:'mobile', leftCount:1, rightCount:1,
      hangLength: Math.round(CFG.hangLengthBase * CFG.mobileScale) };
    if (name === 'tablet') return { name:'tablet', leftCount:1, rightCount:1,
      hangLength: CFG.hangLengthBase };
    return { name:'desktop', leftCount:3, rightCount:3, hangLength:CFG.hangLengthBase };
  }

  /* ── DOM lifecycle ───────────────────────────────────────────────── */
  function destroyDOM() {
    if (container && container.isConnected) container.remove();
    container = null; leftGroup = null; rightGroup = null; allSlots = [];
  }

  function positionGroups() {
    if (!leftGroup || !rightGroup) return;
    var top = getHeaderBottom() + CFG.topOffset;
    leftGroup.style.top  = top + 'px';
    rightGroup.style.top = top + 'px';
  }

  function buildDOM(bpConfig) {
    destroyDOM();
    activeConfig = bpConfig;
    RUNTIME.hangLength = bpConfig.hangLength;

    container = document.createElement('div');
    container.className = 'anv-balloons-container anv-bp-' + bpConfig.name;
    container.setAttribute('aria-hidden','true');
    container.setAttribute('role','presentation');

    leftGroup  = document.createElement('div');
    rightGroup = document.createElement('div');
    leftGroup.className  = 'anv-group anv-group-left';
    rightGroup.className = 'anv-group anv-group-right';
    allSlots = [];

    var maxCount = Math.max(bpConfig.leftCount, bpConfig.rightCount);
    for (var i = 0; i < maxCount; i++) {
      if (i < bpConfig.leftCount) {
        var ls = makeBalloonSlot(LEFT_C[i % LEFT_C.length], i, 'L'+i);
        leftGroup.appendChild(ls);
        allSlots.push(ls);
      }
      if (i < bpConfig.rightCount) {
        var rs = makeBalloonSlot(RIGHT_C[i % RIGHT_C.length], i + 3, 'R'+i);
        rightGroup.appendChild(rs);
        allSlots.push(rs);
      }
    }

    container.appendChild(leftGroup);
    container.appendChild(rightGroup);
    document.body.appendChild(container);
    requestAnimationFrame(positionGroups);
  }

  function rebuildIfBreakpointChanged() {
    var name = getBreakpointName();
    if (activeConfig && activeConfig.name === name) { positionGroups(); return; }
    if (chainFired) { positionGroups(); return; }
    buildDOM(getConfigForBreakpoint(name));
  }

  /* ── Listeners ───────────────────────────────────────────────────── */
  function attachListeners() {
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuildIfBreakpointChanged, 180);
    }, { passive: true });

    window.addEventListener('scroll', function () {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () { positionGroups(); rafId = null; });
    }, { passive: true });

    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav && window.MutationObserver) {
      new MutationObserver(positionGroups).observe(nav, {
        attributes: true, attributeFilter: ['class','style'],
      });
    }
  }

  /* ── Load confetti then fire welcome ─────────────────────────────── */
  function loadConfetti() {
    var existing = document.querySelector('script[src="'+CFG.confettiSrc+'"]');
    if (existing) {
      confettiFn = window.confetti || null;
      if (confettiFn) { setTimeout(welcomeCelebration, 420); }
      else existing.addEventListener('load', function () {
        confettiFn = window.confetti || null;
        setTimeout(welcomeCelebration, 420);
      });
      return;
    }
    var sc = document.createElement('script');
    sc.src = CFG.confettiSrc;
    sc.async = true;
    sc.onload = function () {
      confettiFn = window.confetti || null;
      setTimeout(welcomeCelebration, 420);
    };
    document.head.appendChild(sc);
  }

  /* ── sessionStorage helpers ──────────────────────────────────────── */
  function hasSeenExperience() {
    try {
      var raw = sessionStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) return false;
      var payload = JSON.parse(raw);
      if (!payload || typeof payload.ts !== 'number') return false;
      return (Date.now() - payload.ts) < CONFIG.STORAGE_TTL_MS;
    } catch (e) { return false; }
  }

  function markExperienceSeen() {
    try { sessionStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ ts: Date.now() })); }
    catch (e) { /* quota / private mode — fail silently */ }
  }

  /* ── Entry point ─────────────────────────────────────────────────── */
  function init() {
    if (hasSeenExperience()) return;
    try {
      buildDOM(getConfigForBreakpoint(getBreakpointName()));
      attachListeners();
      loadConfetti();
    } catch (e) {
      console.warn('[Anniversary] init error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
