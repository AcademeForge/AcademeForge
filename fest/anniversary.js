(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────── */
  var CFG = {
    confettiSrc : 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
    effectDuration: 1500, // ms — total time the celebration effect is shown before cleanup
  };

  var CONFIG = {
    STORAGE_KEY : 'af_ecosystem_launch_v1', // 1 device / 1 browser = shown once, ever
  };

  /* ── State ───────────────────────────────────────────────────────── */
  var confettiFn = null;

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

  /* ── Celebration effect (fires once, lasts CFG.effectDuration ms) ─── */
  function runCelebration() {
    if (!confettiFn) return;
    var ox = 0.5, oy = 0.14;

    // Central burst — mixed shapes
    confettiFn({ particleCount:90, spread:95, origin:{x:ox,y:oy},
      colors:['#FFD700','#FF8C00','#E040FB','#00BCD4','#FF6B6B','#5C9BF5','#ffffff'],
      startVelocity:32, gravity:0.72, scalar:0.90, ticks:125, zIndex:9999 });

    spawnSparkles(window.innerWidth * 0.5, window.innerHeight * 0.14);
    spawnStars(window.innerWidth * 0.5, window.innerHeight * 0.14);

    // Gentle floating circles
    setTimeout(function () {
      if (!confettiFn) return;
      confettiFn({ particleCount:55, spread:78, origin:{x:ox,y:oy},
        colors:['#FFD700','#FFF176','#FFD54F','#FFFFFF'], shapes:['circle'],
        startVelocity:18, gravity:0.32, scalar:0.52, ticks:155, zIndex:9999, drift:0.55 });
    }, 350);

    // Side bursts (angled, like a grand finale)
    setTimeout(function () {
      if (!confettiFn) return;
      confettiFn({ particleCount:80, angle:55,  spread:60, origin:{x:0.04,y:0.32},
        colors:['#FFD700','#FF6B6B','#E040FB','#5C9BF5','#fff'],
        startVelocity:50, gravity:0.85, scalar:0.82, ticks:110, zIndex:9999 });
      confettiFn({ particleCount:80, angle:125, spread:60, origin:{x:0.96,y:0.32},
        colors:['#FFD700','#4DD0E1','#FFB347','#ffffff','#FF6B6B'],
        startVelocity:50, gravity:0.85, scalar:0.82, ticks:110, zIndex:9999 });
      spawnSparkles(window.innerWidth * 0.07, window.innerHeight * 0.26);
      spawnSparkles(window.innerWidth * 0.93, window.innerHeight * 0.26);
    }, 650);

    // Cleanup at the end of the effect window
    setTimeout(function () {
      if (confettiFn && confettiFn.reset) confettiFn.reset();
      document.querySelectorAll('.anv-sparkle, .anv-star').forEach(function (el) {
        if (el.isConnected) el.remove();
      });
    }, CFG.effectDuration);
  }

  /* ── Load confetti then fire the celebration ─────────────────────── */
  function loadConfetti() {
    var existing = document.querySelector('script[src="'+CFG.confettiSrc+'"]');
    if (existing) {
      confettiFn = window.confetti || null;
      if (confettiFn) { runCelebration(); }
      else existing.addEventListener('load', function () {
        confettiFn = window.confetti || null;
        runCelebration();
      });
      return;
    }
    var sc = document.createElement('script');
    sc.src = CFG.confettiSrc;
    sc.async = true;
    sc.onload = function () {
      confettiFn = window.confetti || null;
      runCelebration();
    };
    document.head.appendChild(sc);
  }

  /* ── localStorage helpers — 1 device, 1 time, no expiry ────────────
     Uses localStorage (not sessionStorage) so the flag survives across
     browser sessions/tabs on the same device/browser profile.          */
  function hasSeenExperience() {
    try {
      return localStorage.getItem(CONFIG.STORAGE_KEY) === '1';
    } catch (e) { return false; }
  }

  function markExperienceSeen() {
    try { localStorage.setItem(CONFIG.STORAGE_KEY, '1'); }
    catch (e) { /* quota / private mode — fail silently */ }
  }

  /* ── Entry point ─────────────────────────────────────────────────── */
  function init() {
    if (hasSeenExperience()) return;
    try {
      markExperienceSeen();
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
