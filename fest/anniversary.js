(function () {
  'use strict';

  var noMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var overlay = null;
  var timers  = [];

  var docOvf  = '';
  var bodyOvf = '';

  function lockScroll() {
    docOvf  = document.documentElement.style.overflow;
    bodyOvf = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow             = 'hidden';
  }

  function unlockScroll() {
    document.documentElement.style.overflow = docOvf;
    document.body.style.overflow             = bodyOvf;
  }

  function wait(ms, fn) {
    timers.push(setTimeout(fn, ms));
  }

  function buildChakra() {
    var NS   = 'http://www.w3.org/2000/svg';
    var NAVY = '#000080';

    function node(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Ashoka Chakra');
    svg.className = 'anv-chakra-svg';

    svg.appendChild(node('circle', { cx:100, cy:100, r:94, fill:'none', stroke:NAVY, 'stroke-width':'5' }));
    svg.appendChild(node('circle', { cx:100, cy:100, r:80, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.35' }));
    svg.appendChild(node('circle', { cx:100, cy:100, r:50, fill:'none', stroke:NAVY, 'stroke-width':'1', opacity:'0.3' }));
    svg.appendChild(node('circle', { cx:100, cy:100, r:13, fill:'none', stroke:NAVY, 'stroke-width':'1.5', opacity:'0.5' }));

    for (var i = 0; i < 24; i++) {
      var rad = (i * 15) * Math.PI / 180;
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);

      svg.appendChild(node('line', {
        x1: 100 + 13 * cos,
        y1: 100 + 13 * sin,
        x2: 100 + 78 * cos,
        y2: 100 + 78 * sin,
        stroke: NAVY,
        'stroke-width': '2.2',
        'stroke-linecap': 'round'
      }));

      var tx = 100 + 87 * cos;
      var ty = 100 + 87 * sin;
      svg.appendChild(node('ellipse', {
        cx: tx, cy: ty,
        rx: '2.8', ry: '6.5',
        fill: NAVY,
        transform: 'rotate(' + (i * 15 + 90) + ',' + tx + ',' + ty + ')'
      }));
    }

    svg.appendChild(node('circle', { cx:100, cy:100, r:9, fill:NAVY }));

    return svg;
  }

  function buildDOM() {
    overlay = document.createElement('div');
    overlay.id = 'anv-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'presentation');

    var flag    = document.createElement('div');
    flag.className = 'anv-flag';

    var saffron = document.createElement('div');
    saffron.className = 'anv-stripe anv-stripe-saffron';

    var green   = document.createElement('div');
    green.className = 'anv-stripe anv-stripe-green';

    flag.appendChild(saffron);
    flag.appendChild(green);

    var chakraWrap  = document.createElement('div');
    chakraWrap.className = 'anv-chakra-wrap';

    var chakraInner = document.createElement('div');
    chakraInner.className = 'anv-chakra-inner';
    chakraInner.id        = 'anv-ci';

    chakraInner.appendChild(buildChakra());
    chakraWrap.appendChild(chakraInner);

    overlay.appendChild(flag);
    overlay.appendChild(chakraWrap);
    document.body.appendChild(overlay);
  }

  function exit() {
    if (!overlay) return;
    overlay.classList.add('anv-exit');
    wait(900, function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
      unlockScroll();
    });
  }

  function run() {
    if (noMotion) {
      overlay.classList.add('anv-go');
      var ci = document.getElementById('anv-ci');
      if (ci) ci.classList.add('anv-show');
      wait(1000, exit);
      return;
    }

    /* Force reflow so the browser registers the initial
       translateY(-100%) / translateY(100%) before transitioning */
    void overlay.offsetHeight;

    overlay.classList.add('anv-go');

    wait(1080, function () {
      var ci = document.getElementById('anv-ci');
      if (ci) ci.classList.add('anv-show');
    });

    wait(4530, exit);
  }

  function init() {
    try {
      lockScroll();
      buildDOM();
      run();
    } catch (e) {
      console.warn('[Anniversary]', e);
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
