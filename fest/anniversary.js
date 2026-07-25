(function () {
  'use strict';

  var noMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var overlay, saffron, green, chakraInner;
  var docOvf = '', bodyOvf = '';

  function lockScroll() {
    docOvf  = document.documentElement.style.overflow;
    bodyOvf = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.documentElement.style.overflow = docOvf;
    document.body.style.overflow = bodyOvf;
  }

  function css(el, styles) {
    for (var k in styles) el.style[k] = styles[k];
  }

  function buildChakra() {
    var NS = 'http://www.w3.org/2000/svg';
    var NAVY = '#000080';

    function el(tag, a) {
      var e = document.createElementNS(NS, tag);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }

    var size = window.innerWidth < 768 ? 90 : window.innerWidth < 1024 ? 120 : 150;

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Ashoka Chakra');
    css(svg, {
      display: 'block',
      width: size + 'px',
      height: size + 'px',
      filter: 'drop-shadow(0 0 10px rgba(0,0,128,0.4)) drop-shadow(0 0 24px rgba(0,0,128,0.25))',
      animation: 'anv-spin 9s linear infinite',
      animationPlayState: 'paused'
    });

    svg.appendChild(el('circle', { cx:100, cy:100, r:94, fill:'none', stroke:NAVY, 'stroke-width':'5' }));
    svg.appendChild(el('circle', { cx:100, cy:100, r:80, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.35' }));
    svg.appendChild(el('circle', { cx:100, cy:100, r:50, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.30' }));
    svg.appendChild(el('circle', { cx:100, cy:100, r:13, fill:'none', stroke:NAVY, 'stroke-width':'1.5', opacity:'0.45' }));

    for (var i = 0; i < 24; i++) {
      var rad = (i * 15) * Math.PI / 180;
      var cos = Math.cos(rad), sin = Math.sin(rad);
      svg.appendChild(el('line', {
        x1: 100 + 13*cos, y1: 100 + 13*sin,
        x2: 100 + 78*cos, y2: 100 + 78*sin,
        stroke: NAVY, 'stroke-width': '2.2', 'stroke-linecap': 'round'
      }));
      var tx = 100 + 87*cos, ty = 100 + 87*sin;
      svg.appendChild(el('ellipse', {
        cx: tx, cy: ty, rx: '2.8', ry: '6.5', fill: NAVY,
        transform: 'rotate(' + (i*15+90) + ',' + tx + ',' + ty + ')'
      }));
    }

    svg.appendChild(el('circle', { cx:100, cy:100, r:9, fill:NAVY }));
    return svg;
  }

  function buildDOM() {
    overlay = document.createElement('div');
    css(overlay, {
      position: 'fixed',
      inset: '0',
      top: '0', left: '0', right: '0', bottom: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '2147483647',
      background: '#ffffff',
      overflow: 'hidden',
      opacity: '1'
    });

    var flagWrap = document.createElement('div');
    css(flagWrap, { position: 'absolute', inset: '0', top:'0', left:'0', right:'0', bottom:'0' });

    saffron = document.createElement('div');
    css(saffron, {
      position: 'absolute',
      top: '0', left: '0',
      width: '100%',
      height: '33.334%',
      background: '#FF9933',
      transform: 'translateY(-100%)'
    });

    green = document.createElement('div');
    css(green, {
      position: 'absolute',
      bottom: '0', left: '0',
      width: '100%',
      height: '33.334%',
      background: '#138808',
      transform: 'translateY(100%)'
    });

    flagWrap.appendChild(saffron);
    flagWrap.appendChild(green);

    var chakraWrap = document.createElement('div');
    css(chakraWrap, {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    });

    chakraInner = document.createElement('div');
    css(chakraInner, {
      opacity: '0',
      transform: 'scale(0.4)'
    });

    chakraInner.appendChild(buildChakra());
    chakraWrap.appendChild(chakraInner);

    overlay.appendChild(flagWrap);
    overlay.appendChild(chakraWrap);
    document.body.appendChild(overlay);
  }

  function showChakra() {
    var svg = chakraInner.querySelector('svg');
    css(chakraInner, {
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      opacity: '1',
      transform: 'scale(1)'
    });
    if (svg) svg.style.animationPlayState = 'running';
  }

  function exitOverlay() {
    css(overlay, { transition: 'opacity 0.85s ease', opacity: '0' });
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
      unlockScroll();
    }, 920);
  }

  function runAnimation() {
    var EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
    var stripeTrans = 'transform 0.9s ' + EASE;

    if (noMotion) {
      css(saffron, { transform: 'translateY(0)' });
      css(green,   { transform: 'translateY(0)' });
      showChakra();
      setTimeout(exitOverlay, 1200);
      return;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        css(saffron, { transition: stripeTrans, transform: 'translateY(0)' });
        css(green,   { transition: stripeTrans, transform: 'translateY(0)' });

        setTimeout(showChakra, 1080);

        setTimeout(exitOverlay, 4500);
      });
    });
  }

  function init() {
    try {
      lockScroll();
      buildDOM();
      runAnimation();
    } catch (e) {
      console.warn('[Anniversary]', e);
      unlockScroll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

})();
