(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────── */
  var CFG = {
    topOffset    : 0,     // px below nav bottom where string starts
    hangLength   : 80,    // px of string from header bottom to balloon knot
    confettiSrc  : 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    swayDur      : [5.8, 4.9, 6.6],   // animation-duration per slot (slower = calmer)
    swayDelay    : [0,   1.1, 2.3],   // animation-delay per slot
  };

  /* ── Colour palettes ──────────────────────────────────────────────
     Premium glossy gradients — preserved from original palette     */
  var LEFT_C = [
    { g1:'#FFE566', g2:'#F57F00', shine:'rgba(255,255,220,0.60)', rim:'rgba(255,160,0,0.35)'  }, // Gold
    { g1:'#E040FB', g2:'#6A1B9A', shine:'rgba(255,210,255,0.55)', rim:'rgba(160,0,220,0.30)'  }, // Purple
    { g1:'#FF6F9C', g2:'#B71C5A', shine:'rgba(255,220,235,0.55)', rim:'rgba(200,0,80,0.28)'   }, // Rose
  ];
  var RIGHT_C = [
    { g1:'#4DD0E1', g2:'#006978', shine:'rgba(210,255,255,0.58)', rim:'rgba(0,160,180,0.30)'  }, // Teal
    { g1:'#FFB347', g2:'#D84315', shine:'rgba(255,240,210,0.55)', rim:'rgba(220,100,0,0.28)'  }, // Amber
    { g1:'#5C9BF5', g2:'#0D2F8E', shine:'rgba(210,230,255,0.55)', rim:'rgba(30,60,200,0.28)'  }, // Blue
  ];

  /* ── State ────────────────────────────────────────────────────────  */
  var container  = null;
  var leftGroup  = null;
  var rightGroup = null;
  var confettiFn = null;
  var rafId      = null;

  /* ── SVG helper ───────────────────────────────────────────────────  */
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k){ el.setAttribute(k, attrs[k]); });
    }
    return el;
  }

  /* ── Build balloon SVG ────────────────────────────────────────────
     ViewBox 0 0 94 182 (≈20% larger than original 78×152).
     Knot is at the TOP of the balloon (cy - ry) so the string
     connects naturally from above.
     NO string inside balloon SVG — string is a separate element above. */
  function makeSVG(c, uid) {
    var W=94, H=182, CX=47, CY=46, RX=34, RY=38;
    // Knot sits at the very top of the ellipse
    var KNOT_Y = CY - RY;     // = 8  (top of balloon body)

    var svg = s('svg', {
      viewBox : '0 0 '+W+' '+H,
      xmlns   : NS,
      'aria-hidden' : 'true',
    });
    svg.classList.add('anv-balloon-svg');

    /* ── defs ── */
    var defs = s('defs');

    /* Main body gradient — radial from upper-left for glossy look */
    var grad = s('radialGradient', {
      id:'anv-g-'+uid, cx:'30%', cy:'24%', r:'72%', fx:'24%', fy:'18%',
      gradientUnits:'userSpaceOnUse',
      x1:'0', y1:'0', x2:W, y2:H,
    });
    grad.appendChild(s('stop',{'offset':'0%',   'stop-color':c.g1,                'stop-opacity':'1'}));
    grad.appendChild(s('stop',{'offset':'55%',  'stop-color':c.g2,                'stop-opacity':'0.92'}));
    grad.appendChild(s('stop',{'offset':'100%', 'stop-color':c.g2,                'stop-opacity':'1'}));
    defs.appendChild(grad);

    /* Clip path for shine */
    var clip = s('clipPath',{id:'anv-c-'+uid});
    clip.appendChild(s('ellipse',{cx:CX,cy:CY,rx:RX,ry:RY}));
    defs.appendChild(clip);

    /* Inner shadow filter for depth */
    var flt = s('filter',{id:'anv-f-'+uid, x:'-10%', y:'-10%', width:'120%', height:'120%'});
    var fe1 = s('feGaussianBlur',{'in':'SourceAlpha', stdDeviation:'3', result:'blur'});
    var fe2 = s('feFlood',{'flood-color':c.g2,'flood-opacity':'0.3','result':'color'});
    var fe3 = s('feComposite',{'in':'color','in2':'blur','operator':'in','result':'shadow'});
    var fe4 = s('feComposite',{'in':'SourceGraphic','in2':'shadow','operator':'over'});
    flt.appendChild(fe1); flt.appendChild(fe2); flt.appendChild(fe3); flt.appendChild(fe4);
    defs.appendChild(flt);

    svg.appendChild(defs);

    /* ── Balloon body ── */
    svg.appendChild(s('ellipse',{
      cx:CX, cy:CY, rx:RX, ry:RY,
      fill:'url(#anv-g-'+uid+')',
    }));

    /* ── Rim highlight (subtle edge glow) ── */
    svg.appendChild(s('ellipse',{
      cx:CX, cy:CY, rx:RX, ry:RY,
      fill:'none',
      stroke: c.rim,
      'stroke-width':'2.5',
      'clip-path':'url(#anv-c-'+uid+')',
    }));

    /* ── Primary shine — large soft oval, upper left ── */
    svg.appendChild(s('ellipse',{
      cx          : CX - RX*0.28,
      cy          : CY - RY*0.30,
      rx          : RX*0.38,
      ry          : RY*0.25,
      fill        : c.shine,
      'clip-path' : 'url(#anv-c-'+uid+')',
    }));

    /* ── Secondary specular highlight — tiny crisp dot ── */
    svg.appendChild(s('ellipse',{
      cx          : CX - RX*0.38,
      cy          : CY - RY*0.44,
      rx          : RX*0.12,
      ry          : RY*0.08,
      fill        : 'rgba(255,255,255,0.72)',
      'clip-path' : 'url(#anv-c-'+uid+')',
    }));

    /* ── Knot at TOP of balloon ──
       Small triangle/teardrop shape where string attaches          */
    var KX = CX, KY = KNOT_Y;
    svg.appendChild(s('path',{
      d : 'M'+(KX-3)+','+(KY+2)+' Q'+KX+','+(KY-6)+' '+(KX+3)+','+(KY+2)+' Q'+KX+','+(KY+7)+' '+(KX-3)+','+(KY+2),
      fill   : c.g2,
      stroke : 'none',
    }));

    /* ── Text line 1: "3rd" ── */
    var t1 = s('text',{
      x:''+CX, y:''+(CY-5),
      'text-anchor'      :'middle',
      'dominant-baseline':'middle',
      fill               :'rgba(255,255,255,0.97)',
      'font-size'        :'17',
      'font-weight'      :'800',
      'font-family'      :"Inter,'Segoe UI',Arial,sans-serif",
      'letter-spacing'   :'0.6',
      style              :'text-shadow:0 1px 3px rgba(0,0,0,0.18)',
    });
    t1.textContent = '3rd';
    svg.appendChild(t1);

    /* ── Text line 2: "Anniversary" ── */
    var t2 = s('text',{
      x:''+CX, y:''+(CY+13),
      'text-anchor'      :'middle',
      'dominant-baseline':'middle',
      fill               :'rgba(255,255,255,0.88)',
      'font-size'        :'8.4',
      'font-weight'      :'700',
      'font-family'      :"Inter,'Segoe UI',Arial,sans-serif",
      'letter-spacing'   :'0.5',
    });
    t2.textContent = 'Anniversary';
    svg.appendChild(t2);

    return svg;
  }

  /* ── Build hanging string SVG ─────────────────────────────────────
     A thin, slightly curved line that hangs from the header down
     to the knot of the balloon. Height = CFG.hangLength px.         */
  function makeStringSVG(color, uid) {
    var H   = CFG.hangLength;
    var CX  = 2;   // centre X in a 4-wide viewBox
    var svg = s('svg', {
      viewBox        : '0 0 4 '+H,
      xmlns          : NS,
      width          : '4',
      height         : H,
      'aria-hidden'  : 'true',
      preserveAspectRatio: 'none',
    });
    svg.classList.add('anv-string-svg');
    svg.style.height = H + 'px';

    /* Gentle S-curve using cubic bezier */
    svg.appendChild(s('path',{
      d              : 'M'+CX+',0 C'+(CX+1.5)+','+(H*0.3)+' '+(CX-1.5)+','+(H*0.7)+' '+CX+','+H,
      stroke         : 'rgba(80,60,40,0.38)',
      'stroke-width' : '1.2',
      fill           : 'none',
      'stroke-linecap':'round',
    }));

    return svg;
  }

  /* ── Create slot (string + balloon) and wire pop ─────────────────  */
  function makeBalloonSlot(color, slot, uid) {
    /* Outer slot — this is what sways */
    var slot_el = document.createElement('div');
    slot_el.className = 'anv-balloon-slot';
    slot_el.style.animationDuration = CFG.swayDur[slot]   + 's';
    slot_el.style.animationDelay    = CFG.swayDelay[slot]  + 's';

    /* String hangs from top of slot */
    slot_el.appendChild(makeStringSVG(color, uid));

    /* Balloon wrapper (pointer events only here) */
    var w = document.createElement('div');
    w.className = 'anv-balloon-wrapper';
    w.appendChild(makeSVG(color, uid));
    slot_el.appendChild(w);

    /* Pop on click */
    w.addEventListener('click', function(e){
      e.stopPropagation();
      popBalloon(slot_el, w);
    }, {once: true});

    return slot_el;
  }

  /* ── Pop handler ──────────────────────────────────────────────────  */
  function popBalloon(slot_el, wrapper) {
    if (slot_el.classList.contains('anv-popping')) return;
    var r  = wrapper.getBoundingClientRect();
    var px = r.left + r.width  / 2;
    var py = r.top  + r.height * 0.28;
    celebrate(px, py);
    slot_el.classList.add('anv-popping');
    slot_el.addEventListener('animationend', function(){ slot_el.remove(); }, {once:true});
    setTimeout(function(){ if(slot_el.isConnected) slot_el.remove(); }, 600);
  }

  /* ── Celebration burst ────────────────────────────────────────────  */
  function celebrate(x, y) {
    var ox = x / window.innerWidth;
    var oy = y / window.innerHeight;

    if (confettiFn) {
      /* Colourful confetti */
      confettiFn({
        particleCount : 90,
        spread        : 68,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FF8C00','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#64B5F6'],
        startVelocity : 26,
        gravity       : 0.82,
        scalar        : 0.88,
        ticks         : 95,
        zIndex        : 9999,
      });
      /* Golden glitter drift */
      confettiFn({
        particleCount : 45,
        spread        : 50,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FFF176','#FFEB3B','#FFD54F','#FFFFFF'],
        shapes        : ['circle'],
        startVelocity : 16,
        gravity       : 0.40,
        scalar        : 0.50,
        ticks         : 120,
        zIndex        : 9999,
        drift         : 0.5,
      });
    }

    spawnSparkles(x, y);
    spawnStars(x, y);
  }

  /* ── Welcome celebration on page load ────────────────────────────
     Runs once from the centre-top of the viewport for ~3 seconds.   */
  function welcomeCelebration() {
    if (!confettiFn) return;

    var ox = 0.5, oy = 0.15;

    /* Burst 1 — immediate wide spray */
    confettiFn({
      particleCount : 120,
      spread        : 100,
      origin        : {x:ox, y:oy},
      colors        : ['#FFD700','#FF8C00','#E040FB','#00BCD4','#FF6B6B','#5C9BF5','#ffffff'],
      startVelocity : 35,
      gravity       : 0.75,
      scalar        : 0.92,
      ticks         : 130,
      zIndex        : 9999,
    });

    /* Burst 2 — golden glitter, 600 ms later */
    setTimeout(function(){
      if (!confettiFn) return;
      confettiFn({
        particleCount : 70,
        spread        : 80,
        origin        : {x:ox, y:oy},
        colors        : ['#FFD700','#FFF176','#FFD54F','#FFFFFF'],
        shapes        : ['circle'],
        startVelocity : 20,
        gravity       : 0.35,
        scalar        : 0.55,
        ticks         : 160,
        zIndex        : 9999,
        drift         : 0.6,
      });
    }, 600);

    /* Burst 3 — side cannons at 1200 ms */
    setTimeout(function(){
      if (!confettiFn) return;
      confettiFn({
        particleCount : 55,
        angle         : 60,
        spread        : 55,
        origin        : {x:0.05, y:0.3},
        colors        : ['#FFD700','#FF6B6B','#E040FB','#5C9BF5'],
        startVelocity : 45,
        gravity       : 0.9,
        scalar        : 0.8,
        ticks         : 100,
        zIndex        : 9999,
      });
      confettiFn({
        particleCount : 55,
        angle         : 120,
        spread        : 55,
        origin        : {x:0.95, y:0.3},
        colors        : ['#FFD700','#4DD0E1','#FFB347','#ffffff'],
        startVelocity : 45,
        gravity       : 0.9,
        scalar        : 0.8,
        ticks         : 100,
        zIndex        : 9999,
      });
    }, 1200);

    /* Sparkle scatter around balloons at 2000 ms */
    setTimeout(function(){
      spawnSparkles(window.innerWidth * 0.08, window.innerHeight * 0.25);
      spawnSparkles(window.innerWidth * 0.92, window.innerHeight * 0.25);
      spawnStars(window.innerWidth * 0.5, window.innerHeight * 0.18);
    }, 2000);
  }

  /* ── CSS sparkle circles ──────────────────────────────────────────  */
  function spawnSparkles(cx, cy) {
    var pal = ['#FFD700','#FFA500','#FF6B6B','#9C27B0','#00BCD4','#ffffff','#FFB74D','#E040FB'];
    var N   = 24;
    for (var i=0; i<N; i++) {
      (function(i){
        var ang  = (360/N)*i + (Math.random()-0.5)*12;
        var dist = 48 + Math.random()*90;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 5 + Math.random()*9;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 420 + Math.random()*360;
        var el   = document.createElement('div');
        el.className = 'anv-sparkle';
        el.style.cssText = [
          'left:'+cx+'px',
          'top:'+cy+'px',
          'width:'+sz+'px',
          'height:'+sz+'px',
          'background:'+col,
          'box-shadow:0 0 '+(sz*2.6)+'px '+col,
          'border-radius:'+(Math.random()>0.35?'50%':'3px'),
          '--dx:'+dx+'px',
          '--dy:'+dy+'px',
          '--dur:'+dur+'ms',
        ].join(';');
        document.body.appendChild(el);
        setTimeout(function(){ if(el.isConnected) el.remove(); }, dur+80);
      })(i);
    }
  }

  /* ── CSS star shapes ──────────────────────────────────────────────  */
  function spawnStars(cx, cy) {
    var pal = ['#FFD700','#FFF176','#FF8C00','#ffffff'];
    var N   = 10;
    for (var i=0; i<N; i++) {
      (function(){
        var ang  = Math.random()*360;
        var dist = 30 + Math.random()*72;
        var dx   = Math.cos(ang*Math.PI/180)*dist;
        var dy   = Math.sin(ang*Math.PI/180)*dist;
        var sz   = 9 + Math.random()*10;
        var col  = pal[Math.floor(Math.random()*pal.length)];
        var dur  = 500 + Math.random()*380;
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

  /* ── Measure sticky nav bottom ────────────────────────────────────
     Returns viewport-relative bottom of the sticky nav.            */
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

  /* ── Position groups flush to header bottom ───────────────────────
     The top of each slot (= top of string) sits right at nav bottom. */
  function positionGroups() {
    if (!leftGroup || !rightGroup) return;
    var top = getHeaderBottom() + CFG.topOffset;
    leftGroup.style.top  = top + 'px';
    rightGroup.style.top = top + 'px';
  }

  /* ── Build DOM ────────────────────────────────────────────────────  */
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
      leftGroup.appendChild( makeBalloonSlot(LEFT_C[i],  i, 'L'+i));
      rightGroup.appendChild(makeBalloonSlot(RIGHT_C[i], i, 'R'+i));
    }

    container.appendChild(leftGroup);
    container.appendChild(rightGroup);
    document.body.appendChild(container);

    requestAnimationFrame(function(){
      positionGroups();
    });
  }

  /* ── Event listeners ──────────────────────────────────────────────  */
  function attachListeners() {
    /* Resize — debounced */
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(positionGroups, 180);
    }, {passive:true});

    /* Scroll — rAF throttled (nav is sticky so its rect changes
       as account-bar / maintenance-banner scroll away)              */
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

  /* ── Load canvas-confetti silently ───────────────────────────────
     After load fires welcome celebration (once per page load).      */
  function loadConfetti() {
    var existing = document.querySelector('script[src="'+CFG.confettiSrc+'"]');
    if (existing) {
      confettiFn = window.confetti || null;
      if (confettiFn) {
        setTimeout(welcomeCelebration, 400);
      } else {
        existing.addEventListener('load', function(){
          confettiFn = window.confetti || null;
          setTimeout(welcomeCelebration, 400);
        });
      }
      return;
    }
    var sc    = document.createElement('script');
    sc.src    = CFG.confettiSrc;
    sc.async  = true;
    sc.onload = function(){
      confettiFn = window.confetti || null;
      setTimeout(welcomeCelebration, 400);  /* slight delay so page feels settled */
    };
    document.head.appendChild(sc);
  }

  /* ── Entry point ──────────────────────────────────────────────────
     DOM built first → instant visual.
     Confetti loaded in parallel → welcome fires when ready.         */
  function init() {
    try {
      buildDOM();
      attachListeners();
      loadConfetti();
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
