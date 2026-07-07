

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────────────── */
  var CFG = {
    topOffset    : 14,   // px below nav bottom where balloons appear
    confettiSrc  : 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    floatDur     : [4.4, 3.7, 5.1],   // animation-duration per slot
    floatDelay   : [0,   0.9, 1.7],   // animation-delay per slot
  };

  /* ── Colour palettes ─────────────────────────────────────────────
     Left:  warm jewel tones
     Right: cool electric tones                                      */
  var LEFT_C = [
    { g1:'#FFE566', g2:'#F57F00', sh:'rgba(255,255,190,0.52)' }, // Gold
    { g1:'#E040FB', g2:'#6A1B9A', sh:'rgba(255,200,255,0.45)' }, // Purple
    { g1:'#FF6F9C', g2:'#B71C5A', sh:'rgba(255,205,225,0.45)' }, // Rose
  ];
  var RIGHT_C = [
    { g1:'#4DD0E1', g2:'#006978', sh:'rgba(195,255,255,0.45)' }, // Teal
    { g1:'#FFB347', g2:'#D84315', sh:'rgba(255,235,195,0.45)' }, // Amber
    { g1:'#5C9BF5', g2:'#0D2F8E', sh:'rgba(200,220,255,0.45)' }, // Blue
  ];

  /* ── State ───────────────────────────────────────────────────────  */
  var container  = null;
  var leftGroup  = null;
  var rightGroup = null;
  var confettiFn = null;
  var rafId      = null;

  /* ── SVG helper ──────────────────────────────────────────────────  */
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k){ el.setAttribute(k, attrs[k]); });
    }
    return el;
  }

  /* ── Build one balloon SVG ───────────────────────────────────────
     ViewBox 0 0 78 152:
       balloon ellipse  cx=39 cy=36 rx=28 ry=31
       knot             just below ellipse
       string           wavy cubic-bezier to bottom                  */
  function makeSVG(c, uid) {
    var W=78, H=152, CX=39, CY=36, RX=28, RY=31;
    var KNOT = CY + RY; // y=67

    var svg = s('svg', {
      viewBox : '0 0 '+W+' '+H,
      xmlns   : NS,
      'aria-hidden' : 'true',
    });
    svg.classList.add('anv-balloon-svg');

    /* defs: gradient + clip */
    var defs = s('defs');

    var grad = s('radialGradient', {
      id:'anv-g-'+uid, cx:'32%', cy:'28%', r:'68%', fx:'28%', fy:'24%'
    });
    grad.appendChild(s('stop',{'offset':'0%',  'stop-color':c.g1}));
    grad.appendChild(s('stop',{'offset':'100%','stop-color':c.g2}));
    defs.appendChild(grad);

    var clip = s('clipPath',{id:'anv-c-'+uid});
    clip.appendChild(s('ellipse',{cx:CX,cy:CY,rx:RX,ry:RY}));
    defs.appendChild(clip);
    svg.appendChild(defs);

    /* balloon body */
    svg.appendChild(s('ellipse',{cx:CX,cy:CY,rx:RX,ry:RY,fill:'url(#anv-g-'+uid+')'}));

    /* shine */
    svg.appendChild(s('ellipse',{
      cx      : CX - RX*0.26,
      cy      : CY - RY*0.27,
      rx      : RX*0.29,
      ry      : RY*0.19,
      fill    : c.sh,
      'clip-path':'url(#anv-c-'+uid+')',
    }));

    /* knot */
    svg.appendChild(s('path',{
      d              : 'M'+(CX-3.5)+','+KNOT+' Q'+CX+','+(KNOT+9)+' '+(CX+3.5)+','+KNOT,
      fill           : c.g2,
      stroke         : c.g2,
      'stroke-width' : '2',
      'stroke-linejoin':'round',
    }));

    /* text line 1: "3rd" */
    var t1 = s('text',{
      x:''+CX, y:''+(CY-7),
      'text-anchor'      :'middle',
      'dominant-baseline':'middle',
      fill               :'rgba(255,255,255,0.97)',
      'font-size'        :'14',
      'font-weight'      :'800',
      'font-family'      :"Inter,'Segoe UI',Arial,sans-serif",
      'letter-spacing'   :'0.5',
    });
    t1.textContent = '3rd';
    svg.appendChild(t1);

    /* text line 2: "Anniversary" */
    var t2 = s('text',{
      x:''+CX, y:''+(CY+10),
      'text-anchor'      :'middle',
      'dominant-baseline':'middle',
      fill               :'rgba(255,255,255,0.88)',
      'font-size'        :'7.6',
      'font-weight'      :'700',
      'font-family'      :"Inter,'Segoe UI',Arial,sans-serif",
      'letter-spacing'   :'0.4',
    });
    t2.textContent = 'Anniversary';
    svg.appendChild(t2);

    /* string — wavy cubic bezier */
    svg.appendChild(s('path',{
      d              : 'M'+CX+','+(KNOT+8)+' C'+(CX+15)+','+(KNOT+26)+' '+(CX-14)+','+(KNOT+46)+' '+(CX+5)+','+H,
      stroke         : 'rgba(70,70,70,0.5)',
      'stroke-width' : '1.3',
      fill           : 'none',
      'stroke-linecap':'round',
    }));

    return svg;
  }

  /* ── Create wrapper + wire pop ───────────────────────────────────  */
  function makeBalloon(color, slot, uid) {
    var w = document.createElement('div');
    w.className = 'anv-balloon-wrapper';
    w.style.animationDuration = CFG.floatDur[slot]   + 's';
    w.style.animationDelay    = CFG.floatDelay[slot]  + 's';
    w.appendChild(makeSVG(color, uid));
    w.addEventListener('click', function(e){
      e.stopPropagation();
      popBalloon(w);
    }, {once: true});
    return w;
  }

  /* ── Pop handler ─────────────────────────────────────────────────  */
  function popBalloon(w) {
    if (w.classList.contains('anv-popping')) return;
    var r  = w.getBoundingClientRect();
    var px = r.left + r.width  / 2;
    var py = r.top  + r.height * 0.31;
    celebrate(px, py);
    w.classList.add('anv-popping');
    w.addEventListener('animationend', function(){ w.remove(); }, {once:true});
    setTimeout(function(){ if(w.isConnected) w.remove(); }, 600);
  }

  /* ── Celebration burst ───────────────────────────────────────────  */
  function celebrate(x, y) {
    var ox = x / window.innerWidth;
    var oy = y / window.innerHeight;

    if (confettiFn) {
      /* colourful confetti */
      confettiFn({
        particleCount : 85,
        spread        : 72,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FF8C00','#FF6B6B','#9C27B0','#00BCD4','#fff','#64B5F6'],
        startVelocity : 27,
        gravity       : 0.85,
        scalar        : 0.86,
        ticks         : 90,
        zIndex        : 9999,
      });
      /* golden glitter */
      confettiFn({
        particleCount : 40,
        spread        : 48,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FFF176','#FFEB3B','#FFD54F'],
        shapes        : ['circle'],
        startVelocity : 18,
        gravity       : 0.45,
        scalar        : 0.52,
        ticks         : 115,
        zIndex        : 9999,
        drift         : 0.4,
      });
    }

    spawnSparkles(x, y);
    spawnStars(x, y);
  }

  /* ── CSS sparkle circles ─────────────────────────────────────────  */
  function spawnSparkles(cx, cy) {
    var pal = ['#FFD700','#FFA500','#FF6B6B','#9C27B0','#00BCD4','#fff','#FFB74D','#E040FB'];
    var N   = 22;
    for (var i=0; i<N; i++) {
      (function(i){
        var ang  = (360/N)*i + (Math.random()-0.5)*14;
        var dist = 44 + Math.random()*86;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 5 + Math.random()*9;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 400 + Math.random()*380;
        var el   = document.createElement('div');
        el.className = 'anv-sparkle';
        el.style.cssText = [
          'left:'+cx+'px',
          'top:'+cy+'px',
          'width:'+sz+'px',
          'height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+(sz*2.4)+'px '+col,
          'border-radius:'+(Math.random()>0.4?'50%':'3px'),
          '--dx:'+dx+'px',
          '--dy:'+dy+'px',
          '--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function(){ if(el.isConnected) el.remove(); }, dur+80);
      })(i);
    }
  }

  /* ── CSS star shapes ─────────────────────────────────────────────  */
  function spawnStars(cx, cy) {
    var pal = ['#FFD700','#FFF176','#FF8C00','#fff'];
    var N   = 9;
    for (var i=0; i<N; i++) {
      (function(){
        var ang  = Math.random()*360;
        var dist = 28 + Math.random()*68;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 8 + Math.random()*10;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 480 + Math.random()*380;
        var sx   = (Math.random()-0.5)*10;
        var sy   = (Math.random()-0.5)*10;
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

  /* ── Measure how far down the page header ends ───────────────────
     This site has three stacked header elements:
       1. .account-bar      (not sticky — scrolls away)
       2. .maintenance-banner (not sticky — scrolls away)
       3. .main-nav         (sticky top:0, z-index:100)

     getBoundingClientRect() always returns VIEWPORT-relative coords,
     which is exactly what we need for position:fixed children.       */
  function getHeaderBottom() {
    /* Prefer the sticky nav — most reliable anchor */
    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav) {
      var r = nav.getBoundingClientRect();
      /* If nav rect bottom is <= 0 the nav is scrolled out of view — 
         fall back to 0 so balloons stay near the top edge.           */
      return Math.max(0, r.bottom);
    }
    /* Final fallback: measure any stacked header-like elements */
    var fallback = 0;
    ['header','[role="banner"]'].forEach(function(sel){
      var el = document.querySelector(sel);
      if (el) fallback = Math.max(fallback, el.getBoundingClientRect().bottom);
    });
    return fallback || 72; /* last resort: assume 72px nav */
  }

  /* ── Position groups ─────────────────────────────────────────────  */
  function positionGroups() {
    if (!leftGroup || !rightGroup) return;
    var top = getHeaderBottom() + CFG.topOffset;
    leftGroup.style.top  = top + 'px';
    rightGroup.style.top = top + 'px';
  }

  /* ── Build DOM ───────────────────────────────────────────────────  */
  function buildDOM() {
    container = document.createElement('div');
    container.className = 'anv-balloons-container';
    container.setAttribute('aria-hidden','true');
    container.setAttribute('role','presentation');

    leftGroup  = document.createElement('div');
    rightGroup = document.createElement('div');
    leftGroup.className  = 'anv-group anv-group-left';
    rightGroup.className = 'anv-group anv-group-right';

    for (var i=0; i<3; i++) {
      leftGroup.appendChild( makeBalloon(LEFT_C[i],  i, 'L'+i));
      rightGroup.appendChild(makeBalloon(RIGHT_C[i], i, 'R'+i));
    }

    container.appendChild(leftGroup);
    container.appendChild(rightGroup);
    document.body.appendChild(container);

    /* First positioning after one rAF so layout is fully settled */
    requestAnimationFrame(function(){
      positionGroups();
    });
  }

  /* ── Event listeners ─────────────────────────────────────────────  */
  function attachListeners() {
    /* Resize — debounced */
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(positionGroups, 180);
    }, {passive:true});

    /* Scroll — rAF throttled (needed because nav is sticky:
       its getBoundingClientRect changes as user scrolls past
       account-bar / maintenance-banner)                              */
    window.addEventListener('scroll', function(){
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function(){
        positionGroups();
        rafId = null;
      });
    }, {passive:true});

    /* MutationObserver — catches mobile drawer toggling nav height */
    var nav = document.getElementById('main-nav') || document.querySelector('.main-nav');
    if (nav && window.MutationObserver) {
      new MutationObserver(positionGroups).observe(nav, {
        attributes      : true,
        attributeFilter : ['class','style'],
      });
    }
  }

  /* ── Load canvas-confetti silently in background ─────────────────  */
  function loadConfetti() {
    if (document.querySelector('script[src="'+CFG.confettiSrc+'"]')) {
      confettiFn = window.confetti || null;
      return;
    }
    var sc    = document.createElement('script');
    sc.src    = CFG.confettiSrc;
    sc.async  = true;
    sc.onload = function(){ confettiFn = window.confetti || null; };
    document.head.appendChild(sc);
  }

  /* ── Entry point ─────────────────────────────────────────────────
     Balloons are built FIRST so they appear instantly.
     Confetti loads quietly in parallel — CSS sparkles cover
     the gap if CDN is slow.                                          */
  function init() {
    try {
      buildDOM();
      attachListeners();
      loadConfetti();   /* non-blocking — balloons already visible */
    } catch(e) {
      console.warn('[Anniversary] init error:', e);
    }
  }

  /* Defer until DOM is parsed */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
