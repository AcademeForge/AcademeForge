(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────── */
  var CFG = {
    topOffset    : 0,      // px below nav bottom where pin sits
    hangLength   : 67,     // px of string from pin to balloon knot
    confettiSrc  : 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    /* 6 unique durations + delays — one per balloon (L0,L1,L2,R0,R1,R2).
       Durations 5–8 s, delays staggered so no two balloons ever sync.  */
    swayDur      : [6.2, 7.8, 5.4, 7.1, 5.9, 6.7],
    swayDelay    : [0,   0.9, 1.8, 0.4, 1.4, 2.3],
    chainDelay   : 150,    // ms between each balloon in chain reaction
  };

  /* ── Content configuration — edit here to change all text ───────────
     BALLOON_TEXT   : text shown on every balloon
     OVERLAY_TITLE  : heading shown in the pop overlay
     OVERLAY_SUBTITLE: subheading shown in the pop overlay            */
  var CONFIG = {
    BALLOON_TEXT     : 'NEW',
    OVERLAY_TITLE    : '🎉 Welcome to the AcademeForge Ecosystem 🎉',
    OVERLAY_SUBTITLE : 'One Ecosystem. Multiple Experiences.',
    /* Bump the version string (v1 → v2) to re-show the experience for all users */
    STORAGE_KEY      : 'af_ecosystem_launch_v1',
  };

  /* ── Colour palettes — preserved exactly ─────────────────────────── */
  var LEFT_C = [
    { g1:'#FFE566', g2:'#F57F00', shine:'rgba(255,255,220,0.62)', rim:'rgba(255,180,0,0.32)'  }, // Gold
    { g1:'#E040FB', g2:'#6A1B9A', shine:'rgba(255,210,255,0.56)', rim:'rgba(160,0,220,0.28)'  }, // Purple
    { g1:'#FF6F9C', g2:'#B71C5A', shine:'rgba(255,220,235,0.56)', rim:'rgba(200,0,80,0.26)'   }, // Rose
  ];
  var RIGHT_C = [
    { g1:'#4DD0E1', g2:'#006978', shine:'rgba(210,255,255,0.60)', rim:'rgba(0,160,180,0.28)'  }, // Teal
    { g1:'#FFB347', g2:'#D84315', shine:'rgba(255,240,210,0.56)', rim:'rgba(220,100,0,0.26)'  }, // Amber
    { g1:'#5C9BF5', g2:'#0D2F8E', shine:'rgba(210,230,255,0.56)', rim:'rgba(30,60,200,0.26)'  }, // Blue
  ];

  /* ── State ────────────────────────────────────────────────────────── */
  var container        = null;
  var leftGroup        = null;
  var rightGroup       = null;
  var confettiFn       = null;
  var rafId            = null;
  var chainFired       = false;   // guard: chain runs only once
  var messagShown      = false;   // guard: overlay shown only once
  var allSlots         = [];      // ordered list of all 6 slot elements

  /* ── SVG helper ───────────────────────────────────────────────────── */
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k){ el.setAttribute(k, attrs[k]); });
    }
    return el;
  }

  /* ── Attachment pin SVG ────────────────────────────────────────────
     A small circle + stud that sits at the very top of the slot,
     visually nailed to the header bottom.                             */
  function makePinSVG() {
    var svg = s('svg', {
      viewBox : '0 0 10 10',
      xmlns   : NS,
      width   : '10',
      height  : '10',
      'aria-hidden' : 'true',
    });
    svg.classList.add('anv-pin-svg');

    /* Shadow ring */
    svg.appendChild(s('circle',{
      cx:'5', cy:'5', r:'4.5',
      fill:'rgba(0,0,0,0.12)',
    }));
    /* Pin body */
    svg.appendChild(s('circle',{
      cx:'5', cy:'5', r:'3.8',
      fill:'#C8A800',
    }));
    /* Specular shine */
    svg.appendChild(s('circle',{
      cx:'3.4', cy:'3.4', r:'1.4',
      fill:'rgba(255,255,255,0.55)',
    }));

    return svg;
  }

  /* ── String SVG ────────────────────────────────────────────────────
     Slightly curved, more visible stroke.
     Height = CFG.hangLength. Connects pin bottom to balloon knot top. */
  function makeStringSVG(uid) {
    var H  = CFG.hangLength;
    var CX = 3;   // centre X in a 6-wide viewBox
    var svg = s('svg', {
      viewBox        : '0 0 6 '+H,
      xmlns          : NS,
      width          : '6',
      height         : H,
      'aria-hidden'  : 'true',
      preserveAspectRatio: 'none',
    });
    svg.classList.add('anv-string-svg');
    svg.style.height = H + 'px';

    /* Gentle S-curve */
    svg.appendChild(s('path',{
      d              : 'M'+CX+',0 C'+(CX+2)+','+(H*0.28)+' '+(CX-2)+','+(H*0.68)+' '+CX+','+H,
      stroke         : 'rgba(90,65,30,0.48)',
      'stroke-width' : '1.6',
      fill           : 'none',
      'stroke-linecap':'round',
    }));

    return svg;
  }

  /* ── Balloon SVG ────────────────────────────────────────────────────
     ViewBox 94×182 — knot at the very top (cy-ry) so string connects
     naturally. No string inside the SVG.                              */
  function makeSVG(c, uid) {
    var W=94, H=182, CX=47, CY=46, RX=34, RY=38;
    var KNOT_Y = CY - RY;   // = 8 — top of ellipse

    var svg = s('svg', {
      viewBox       : '0 0 '+W+' '+H,
      xmlns         : NS,
      'aria-hidden' : 'true',
    });
    svg.classList.add('anv-balloon-svg');

    var defs = s('defs');

    /* Main gradient — radial from upper-left for gloss */
    var grad = s('radialGradient',{
      id:'anv-g-'+uid, cx:'28%', cy:'22%', r:'70%', fx:'22%', fy:'16%',
    });
    grad.appendChild(s('stop',{'offset':'0%',   'stop-color':c.g1, 'stop-opacity':'1'}));
    grad.appendChild(s('stop',{'offset':'52%',  'stop-color':c.g2, 'stop-opacity':'0.90'}));
    grad.appendChild(s('stop',{'offset':'100%', 'stop-color':c.g2, 'stop-opacity':'1'}));
    defs.appendChild(grad);

    /* Clip for shine + rim */
    var clip = s('clipPath',{id:'anv-c-'+uid});
    clip.appendChild(s('ellipse',{cx:CX,cy:CY,rx:RX,ry:RY}));
    defs.appendChild(clip);

    /* Darken filter — inner shadow illusion */
    var flt = s('filter',{id:'anv-f-'+uid, x:'-15%', y:'-15%', width:'130%', height:'130%', colorInterpolationFilters:'sRGB'});
    var feB = s('feGaussianBlur',{'in':'SourceAlpha', stdDeviation:'4', result:'blur'});
    var feF = s('feFlood',{'flood-color':c.g2,'flood-opacity':'0.35','result':'col'});
    var feC = s('feComposite',{'in':'col','in2':'blur','operator':'in','result':'sh'});
    var feM = s('feMerge');
    feM.appendChild(s('feMergeNode',{'in':'SourceGraphic'}));
    feM.appendChild(s('feMergeNode',{'in':'sh'}));
    flt.appendChild(feB); flt.appendChild(feF); flt.appendChild(feC); flt.appendChild(feM);
    defs.appendChild(flt);

    svg.appendChild(defs);

    /* Balloon body */
    svg.appendChild(s('ellipse',{
      cx:CX, cy:CY, rx:RX, ry:RY,
      fill:'url(#anv-g-'+uid+')',
      filter:'url(#anv-f-'+uid+')',
    }));

    /* Subtle rim gradient (gives roundness) */
    svg.appendChild(s('ellipse',{
      cx:CX, cy:CY, rx:RX-0.5, ry:RY-0.5,
      fill:'none',
      stroke: c.rim,
      'stroke-width':'3',
      'clip-path':'url(#anv-c-'+uid+')',
    }));

    /* Primary soft shine — wide oval, upper-left */
    svg.appendChild(s('ellipse',{
      cx          : CX - RX*0.26,
      cy          : CY - RY*0.28,
      rx          : RX*0.40,
      ry          : RY*0.27,
      fill        : c.shine,
      'clip-path' : 'url(#anv-c-'+uid+')',
    }));

    /* Secondary specular — crisp bright dot */
    svg.appendChild(s('ellipse',{
      cx          : CX - RX*0.40,
      cy          : CY - RY*0.46,
      rx          : RX*0.13,
      ry          : RY*0.09,
      fill        : 'rgba(255,255,255,0.80)',
      'clip-path' : 'url(#anv-c-'+uid+')',
    }));

    /* Tertiary edge gleam — thin crescent on right side for 3-D depth */
    svg.appendChild(s('ellipse',{
      cx          : CX + RX*0.62,
      cy          : CY + RY*0.05,
      rx          : RX*0.09,
      ry          : RY*0.22,
      fill        : 'rgba(255,255,255,0.14)',
      'clip-path' : 'url(#anv-c-'+uid+')',
    }));

    /* Knot at TOP of balloon */
    var KX = CX, KY = KNOT_Y;
    svg.appendChild(s('path',{
      d    : 'M'+(KX-3.5)+','+(KY+3)+' Q'+KX+','+(KY-5)+' '+(KX+3.5)+','+(KY+3)+' Q'+KX+','+(KY+9)+' '+(KX-3.5)+','+(KY+3),
      fill : c.g2,
    }));

    /* Text — driven entirely by CONFIG.BALLOON_TEXT ── */
    var txt      = String(CONFIG.BALLOON_TEXT);
    var fontSize = txt.length <= 3 ? '17' : txt.length <= 5 ? '13' : '10';
    var t1 = s('text',{
      x:''+CX, y:''+CY,
      'text-anchor'      :'middle',
      'dominant-baseline':'middle',
      fill               :'rgba(255,255,255,0.97)',
      'font-size'        :fontSize,
      'font-weight'      :'800',
      'font-family'      :"Inter,'Segoe UI',Arial,sans-serif",
      'letter-spacing'   :'0.5',
    });
    t1.textContent = txt;
    svg.appendChild(t1);

    return svg;
  }

  /* ── Create full slot (pin + string + balloon) ──────────────────────
     globalIdx 0-5 maps into CFG.swayDur/swayDelay so every balloon
     gets its own unique duration and delay.                            */
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

    /* Click → pop this balloon, then chain-react all others */
    w.addEventListener('click', function(e){
      e.stopPropagation();
      handleFirstPop(slot_el, w);
    }, {once: true});

    return slot_el;
  }

  /* ── First pop handler ──────────────────────────────────────────────
     Pops the clicked balloon immediately, then triggers chain +
     overlay if not already fired.                                     */
  function handleFirstPop(slot_el, wrapper) {
    if (slot_el.classList.contains('anv-popping')) return;

    /* Pop the clicked one */
    var r  = wrapper.getBoundingClientRect();
    var px = r.left + r.width  / 2;
    var py = r.top  + r.height * 0.28;
    celebrate(px, py);
    triggerPop(slot_el);

    /* Chain reaction + overlay — only once */
    if (!chainFired) {
      chainFired = true;
      markExperienceSeen();   /* persist flag so return visits skip the experience */
      showAnniversaryMessage();
      scheduleChain(slot_el);
    }
  }

  /* ── Chain reaction ─────────────────────────────────────────────────
     Collect remaining (non-popping) slots, interleave left/right
     for a cinematic spread, schedule pops with CFG.chainDelay gap.   */
  function scheduleChain(skipSlot) {
    /* Build interleaved order: L0,R0, L1,R1, L2,R2 */
    var leftSlots  = [];
    var rightSlots = [];
    allSlots.forEach(function(sl){
      if (sl === skipSlot || sl.classList.contains('anv-popping') || !sl.isConnected) return;
      /* Determine side by parent */
      if (sl.parentElement === leftGroup)  leftSlots.push(sl);
      else                                  rightSlots.push(sl);
    });

    var queue = [];
    var maxLen = Math.max(leftSlots.length, rightSlots.length);
    for (var i = 0; i < maxLen; i++) {
      if (i < leftSlots.length)  queue.push(leftSlots[i]);
      if (i < rightSlots.length) queue.push(rightSlots[i]);
    }

    queue.forEach(function(sl, idx){
      var delay = (idx + 1) * CFG.chainDelay;
      setTimeout(function(){
        if (sl.classList.contains('anv-popping') || !sl.isConnected) return;
        var wrapper = sl.querySelector('.anv-balloon-wrapper');
        if (!wrapper) return;
        var r  = wrapper.getBoundingClientRect();
        var px = r.left + r.width  / 2;
        var py = r.top  + r.height * 0.28;
        celebrate(px, py);
        triggerPop(sl);
      }, delay);
    });

    /* Grand finale confetti burst after all have popped */
    var finalDelay = (queue.length + 1) * CFG.chainDelay + 200;
    setTimeout(function(){
      grandFinale();
    }, finalDelay);
  }

  /* ── Trigger pop animation on a slot ─────────────────────────────── */
  function triggerPop(slot_el) {
    slot_el.classList.add('anv-popping');
    slot_el.addEventListener('animationend', function(){ slot_el.remove(); }, {once:true});
    setTimeout(function(){ if(slot_el.isConnected) slot_el.remove(); }, 600);
  }

  /* ── Celebrate burst at a point ──────────────────────────────────── */
  function celebrate(x, y) {
    var ox = x / window.innerWidth;
    var oy = y / window.innerHeight;

    if (confettiFn) {
      confettiFn({
        particleCount : 65,
        spread        : 65,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FF8C00','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#64B5F6'],
        startVelocity : 24,
        gravity       : 0.80,
        scalar        : 0.85,
        ticks         : 90,
        zIndex        : 9999,
      });
      confettiFn({
        particleCount : 30,
        spread        : 45,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FFF176','#FFEB3B','#FFD54F'],
        shapes        : ['circle'],
        startVelocity : 14,
        gravity       : 0.38,
        scalar        : 0.48,
        ticks         : 115,
        zIndex        : 9999,
        drift         : 0.45,
      });
    }

    spawnSparkles(x, y);
    spawnStars(x, y);
  }

  /* ── Grand finale after chain completes ──────────────────────────── */
  function grandFinale() {
    if (!confettiFn) return;

    /* Twin side cannons */
    confettiFn({
      particleCount : 80,
      angle         : 55,
      spread        : 60,
      origin        : {x:0.04, y:0.32},
      colors        : ['#FFD700','#FF6B6B','#E040FB','#5C9BF5','#fff'],
      startVelocity : 50,
      gravity       : 0.85,
      scalar        : 0.82,
      ticks         : 110,
      zIndex        : 9999,
    });
    confettiFn({
      particleCount : 80,
      angle         : 125,
      spread        : 60,
      origin        : {x:0.96, y:0.32},
      colors        : ['#FFD700','#4DD0E1','#FFB347','#ffffff','#FF6B6B'],
      startVelocity : 50,
      gravity       : 0.85,
      scalar        : 0.82,
      ticks         : 110,
      zIndex        : 9999,
    });
    /* Golden centre cascade */
    setTimeout(function(){
      if (!confettiFn) return;
      confettiFn({
        particleCount : 90,
        spread        : 110,
        origin        : {x:0.5, y:0.20},
        colors        : ['#FFD700','#FFF176','#FFEB3B','#FFD54F','#fff'],
        shapes        : ['circle'],
        startVelocity : 22,
        gravity       : 0.32,
        scalar        : 0.54,
        ticks         : 170,
        zIndex        : 9999,
        drift         : 0.5,
      });
    }, 280);

    spawnSparkles(window.innerWidth*0.5, window.innerHeight*0.22);
    spawnStars(window.innerWidth*0.5, window.innerHeight*0.22);
  }

  /* ── Launch message overlay ───────────────────────────────────────
     Text pulled from CONFIG — change CONFIG values to update copy.   */
  function showAnniversaryMessage() {
    if (messagShown) return;
    messagShown = true;

    var overlay = document.createElement('div');
    overlay.className = 'anv-message-overlay';
    overlay.style.top = (getHeaderBottom() + 18) + 'px';

    var card = document.createElement('div');
    card.className = 'anv-message-card';

    /* Title — from CONFIG.OVERLAY_TITLE */
    var title = document.createElement('div');
    title.className = 'anv-message-title';
    title.textContent = CONFIG.OVERLAY_TITLE;

    /* Divider */
    var divider = document.createElement('div');
    divider.className = 'anv-message-divider';

    /* Subtitle — from CONFIG.OVERLAY_SUBTITLE */
    var subtitle = document.createElement('div');
    subtitle.className = 'anv-message-subtitle';
    subtitle.textContent = CONFIG.OVERLAY_SUBTITLE;

    card.appendChild(title);
    card.appendChild(divider);
    card.appendChild(subtitle);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    /* Remove after animation completes (0.18 delay + 0.55 in + 2.8 hold + 0.5 out) */
    setTimeout(function(){
      if (overlay.isConnected) overlay.remove();
    }, 4200);
  }

  /* ── Welcome celebration — once on load ──────────────────────────── */
  function welcomeCelebration() {
    if (!confettiFn) return;

    var ox = 0.5, oy = 0.14;

    /* Burst 1 */
    confettiFn({
      particleCount : 90,
      spread        : 95,
      origin        : {x:ox, y:oy},
      colors        : ['#FFD700','#FF8C00','#E040FB','#00BCD4','#FF6B6B','#5C9BF5','#ffffff'],
      startVelocity : 32,
      gravity       : 0.72,
      scalar        : 0.90,
      ticks         : 125,
      zIndex        : 9999,
    });

    /* Burst 2 — golden glitter */
    setTimeout(function(){
      if (!confettiFn) return;
      confettiFn({
        particleCount : 55,
        spread        : 78,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FFF176','#FFD54F','#FFFFFF'],
        shapes        : ['circle'],
        startVelocity : 18,
        gravity       : 0.32,
        scalar        : 0.52,
        ticks         : 155,
        zIndex        : 9999,
        drift         : 0.55,
      });
    }, 650);

    /* Burst 3 — side cannons */
    setTimeout(function(){
      if (!confettiFn) return;
      confettiFn({
        particleCount : 45,
        angle         : 60,
        spread        : 50,
        origin        : {x:0.05, y:0.28},
        colors        : ['#FFD700','#FF6B6B','#E040FB','#5C9BF5'],
        startVelocity : 42,
        gravity       : 0.88,
        scalar        : 0.78,
        ticks         : 95,
        zIndex        : 9999,
      });
      confettiFn({
        particleCount : 45,
        angle         : 120,
        spread        : 50,
        origin        : {x:0.95, y:0.28},
        colors        : ['#FFD700','#4DD0E1','#FFB347','#ffffff'],
        startVelocity : 42,
        gravity       : 0.88,
        scalar        : 0.78,
        ticks         : 95,
        zIndex        : 9999,
      });
    }, 1300);

    /* Sparkle near balloons */
    setTimeout(function(){
      spawnSparkles(window.innerWidth * 0.07, window.innerHeight * 0.26);
      spawnSparkles(window.innerWidth * 0.93, window.innerHeight * 0.26);
    }, 2100);
  }

  /* ── CSS sparkle circles ──────────────────────────────────────────── */
  function spawnSparkles(cx, cy) {
    var pal = ['#FFD700','#FFA500','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#FFB74D','#E040FB'];
    var N   = 18;
    for (var i = 0; i < N; i++) {
      (function(i){
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
          'left:'+cx+'px',
          'top:'+cy+'px',
          'width:'+sz+'px',
          'height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+(sz*2.4)+'px '+col,
          'border-radius:'+(Math.random()>0.38?'50%':'3px'),
          '--dx:'+dx+'px',
          '--dy:'+dy+'px',
          '--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function(){ if(el.isConnected) el.remove(); }, dur+80);
      })(i);
    }
  }

  /* ── CSS star shapes ──────────────────────────────────────────────── */
  function spawnStars(cx, cy) {
    var pal = ['#FFD700','#FFF176','#FF8C00','#ffffff'];
    var N   = 8;
    for (var i = 0; i < N; i++) {
      (function(){
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
          'left:'+cx+'px',
          'top:'+cy+'px',
          'width:'+sz+'px',
          'height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+sz+'px '+col,
          '--sx:'+sx+'px',
          '--sy:'+sy+'px',
          '--dx:'+dx+'px',
          '--dy:'+dy+'px',
          '--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function(){ if(el.isConnected) el.remove(); }, dur+80);
      })();
    }
  }

  /* ── Measure sticky nav bottom ────────────────────────────────────── */
  function getHeaderBottom() {
    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav) {
      var r = nav.getBoundingClientRect();
      return Math.max(0, r.bottom);
    }
    var fallback = 0;
    ['header','[role="banner"]'].forEach(function(sel){
      var el = document.querySelector(sel);
      if (el) fallback = Math.max(fallback, el.getBoundingClientRect().bottom);
    });
    return fallback || 72;
  }

  /* ── Position groups flush to header bottom ───────────────────────── */
  function positionGroups() {
    if (!leftGroup || !rightGroup) return;
    var top = getHeaderBottom() + CFG.topOffset;
    leftGroup.style.top  = top + 'px';
    rightGroup.style.top = top + 'px';
  }

  /* ── Build DOM ────────────────────────────────────────────────────── */
  function buildDOM() {
    container = document.createElement('div');
    container.className = 'anv-balloons-container';
    container.setAttribute('aria-hidden','true');
    container.setAttribute('role','presentation');

    leftGroup  = document.createElement('div');
    rightGroup = document.createElement('div');
    leftGroup.className  = 'anv-group anv-group-left';
    rightGroup.className = 'anv-group anv-group-right';

    allSlots = [];   /* reset */

    /* globalIdx 0-2 → left balloons, 3-5 → right balloons
       Each gets a unique duration/delay from CFG.swayDur/swayDelay.   */
    for (var i = 0; i < 3; i++) {
      var ls = makeBalloonSlot(LEFT_C[i],  i,     'L'+i);
      var rs = makeBalloonSlot(RIGHT_C[i], i + 3, 'R'+i);
      leftGroup.appendChild(ls);
      rightGroup.appendChild(rs);
      allSlots.push(ls, rs);
    }

    container.appendChild(leftGroup);
    container.appendChild(rightGroup);
    document.body.appendChild(container);

    requestAnimationFrame(function(){
      positionGroups();
    });
  }

  /* ── Event listeners ──────────────────────────────────────────────── */
  function attachListeners() {
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(positionGroups, 180);
    }, {passive:true});

    window.addEventListener('scroll', function(){
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function(){
        positionGroups();
        rafId = null;
      });
    }, {passive:true});

    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav && window.MutationObserver) {
      new MutationObserver(positionGroups).observe(nav, {
        attributes      : true,
        attributeFilter : ['class','style'],
      });
    }
  }

  /* ── Load canvas-confetti, then fire welcome ──────────────────────── */
  function loadConfetti() {
    var existing = document.querySelector('script[src="'+CFG.confettiSrc+'"]');
    if (existing) {
      confettiFn = window.confetti || null;
      if (confettiFn) {
        setTimeout(welcomeCelebration, 420);
      } else {
        existing.addEventListener('load', function(){
          confettiFn = window.confetti || null;
          setTimeout(welcomeCelebration, 420);
        });
      }
      return;
    }
    var sc   = document.createElement('script');
    sc.src   = CFG.confettiSrc;
    sc.async = true;
    sc.onload = function(){
      confettiFn = window.confetti || null;
      setTimeout(welcomeCelebration, 420);
    };
    document.head.appendChild(sc);
  }

  /* ── localStorage helpers ─────────────────────────────────────────── */
  function hasSeenExperience() {
    try { return localStorage.getItem(CONFIG.STORAGE_KEY) === '1'; }
    catch(e) { return false; }   /* private-browsing / blocked — fail open */
  }

  function markExperienceSeen() {
    try { localStorage.setItem(CONFIG.STORAGE_KEY, '1'); }
    catch(e) { /* ignore storage errors */ }
  }

  /* ── Entry point ──────────────────────────────────────────────────── */
  function init() {
    /* Skip everything on return visits — load the page normally */
    if (hasSeenExperience()) return;

    try {
      buildDOM();
      attachListeners();
      loadConfetti();
    } catch(e) {
      console.warn('[Anniversary] init error:', e);
    }
  }

})();
