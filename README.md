<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>AcademeForge — Coming Soon</title>
<meta name="description" content="AcademeForge — Build. Learn. Launch. Futuristic coming soon." />
<style>
  /* ========================= Variables & base ========================= */
  :root{
    --bg-1: #020617;
    --bg-2: #071029;
    --muted: #98b6d0;
    --accent-a: #00f5a0;
    --accent-b: #7c5cff;
    --accent-c: #00d4ff;
    --glass: rgba(255,255,255,0.03);
    --card-bg: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
    --ease: cubic-bezier(.16,.9,.3,1);
    --maxw: 1280px;
  }
  *{box-sizing:border-box}
  html,body{height:100%;margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;color:#e9f5ff; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;}
  body{
    background: radial-gradient(1200px 600px at 10% 10%, rgba(124,92,255,0.06), transparent 10%),
                radial-gradient(900px 500px at 90% 90%, rgba(0,245,160,0.03), transparent 8%),
                linear-gradient(180deg,var(--bg-1),var(--bg-2));
    display:flex; align-items:center; justify-content:center;
    padding:28px; overflow-x:hidden;
  }
  a{color:inherit}
  /* reduce motion toggle visible for testing */
  .reduced *{ transition:none !important; animation:none !important; }

  /* ========================= Stage: grid layout ========================= */
  .stage {
    width:100%; max-width:var(--maxw); z-index:2; position:relative;
    display:grid; grid-template-columns: 1fr 460px; gap:28px; align-items:start;
    padding:34px; border-radius:16px; background: var(--card-bg);
    box-shadow: 0 30px 120px rgba(1,6,20,0.72), inset 0 1px 0 rgba(255,255,255,0.02);
    backdrop-filter: blur(8px);
    overflow:visible;
  }

  /* ========================= Left hero ========================= */
  .hero{ position:relative; padding:22px 22px 28px 22px; min-height:520px; display:flex; flex-direction:column; gap:14px; }
  .brand { display:flex; gap:12px; align-items:center; }
  .logo{ width:64px; height:64px; border-radius:14px; display:grid; place-items:center; font-weight:900; font-size:20px;
    background: linear-gradient(135deg,var(--accent-b),var(--accent-a)); color:#021018; box-shadow: 0 14px 60px rgba(124,92,255,0.12); }
  .brand h3{ margin:0; font-size:18px; }
  .brand p{ margin:0; color:var(--muted); font-size:13px; }

  .headline{ display:flex; gap:10px; align-items:baseline; flex-wrap:wrap; margin-top:6px; }
  .headline h1{ margin:0; font-size:68px; line-height:0.9; font-weight:900; letter-spacing:-1px; }
  .headline .soon{ font-size:36px; font-weight:700; color:#dfffee; opacity:0.95; margin-left:6px; }

  /* animated gradient mask for 'Coming' */
  .glow {
    display:inline-block; color:transparent; -webkit-background-clip:text; background-clip:text;
    background-image: linear-gradient(90deg, var(--accent-a), var(--accent-b), var(--accent-c));
    background-size: 300% 100%; animation: gradientShift 6s linear infinite;
    text-shadow: 0 36px 120px rgba(124,92,255,0.08);
  }
  @keyframes gradientShift { from{background-position:0% 50%} to{background-position:100% 50%} }

  .sub { color:var(--muted); font-size:16px; max-width:64ch; margin-top:6px; }

  /* typewriter + accent badges */
  .meta { display:flex; gap:14px; align-items:center; margin-top:14px; flex-wrap:wrap; }
  .typing { font-family:var(--mono); font-size:16px; color:#a8c6da; min-height:22px; background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:10px; box-shadow: 0 8px 40px rgba(2,6,23,0.36); }
  .beta-chip { font-weight:800; padding:8px 12px; border-radius:999px; background: linear-gradient(90deg,var(--accent-a),var(--accent-b)); color:#021018; box-shadow:0 18px 64px rgba(124,92,255,0.12); }

  /* countdown pills (decorative) */
  .count { display:flex; gap:10px; margin-top:20px; flex-wrap:wrap; }
  .pill { background:rgba(255,255,255,0.03); padding:10px 14px; border-radius:12px; font-family:var(--mono); font-weight:800; color:#e6f6ef; min-width:64px; text-align:center; box-shadow: 0 10px 36px rgba(2,6,23,0.45); }

  /* quote */
  blockquote{ margin-top:22px; margin-bottom:0; padding-left:14px; border-left:3px solid rgba(124,92,255,0.12); color:#cfe7ff; font-size:14px; max-width:70ch; }

  /* ========================= Right: card & visuals ========================= */
  .side{ display:flex; flex-direction:column; gap:12px; align-items:stretch; justify-content:flex-start; perspective:1400px; min-height:520px; }

  /* decorative SVG translucent shapes + starfield canvas overlay */
  .decor { position:absolute; inset:0; pointer-events:none; z-index:0; filter: blur(14px); opacity:0.9; mix-blend-mode:screen; }

  /* 3D card */
  .card-wrap{ display:flex; align-items:center; justify-content:center; height:100%; z-index:3; }
  .card{ width:100%; max-width:460px; min-height:520px; border-radius:16px; transform-style:preserve-3d; transition: transform .9s var(--ease); cursor:pointer; position:relative; }
  .card:focus{ outline: 3px solid rgba(124,92,255,0.18); outline-offset:8px; }
  .card.is-flipped{ transform: rotateY(180deg); }

  .face{ position:absolute; inset:0; border-radius:16px; padding:22px; background:var(--card-bg); box-shadow:0 30px 120px rgba(1,6,20,0.6); backface-visibility:hidden; -webkit-backface-visibility:hidden; display:flex; flex-direction:column; overflow:hidden; }
  .face.back{ transform: rotateY(180deg); }

  .card-head{ display:flex; align-items:center; gap:10px; }
  .af-logo{ font-size:92px; font-weight:900; -webkit-background-clip:text; color:transparent; background-image: linear-gradient(90deg,var(--accent-a),var(--accent-b)); text-shadow:0 36px 120px rgba(124,92,255,0.08); display:grid; place-items:center; margin-top:18px; animation: floaty 6s ease-in-out infinite; }
  @keyframes floaty { 0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)} }

  .front-mid{ flex:1; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; text-align:center; }
  .front-foot{ display:flex; justify-content:space-between; align-items:center; margin-top:12px; }

  .back-text{ color:#cfe7ff; font-size:14px; line-height:1.45; margin-top:12px; flex:1; overflow:auto; }
  .back-list{ margin-top:12px; color:var(--muted); font-size:13px; }

  .socials { display:flex; gap:10px; align-items:center; margin-top:18px; flex-wrap:wrap; }
  .socials a { text-decoration:none; color:var(--muted); background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; }

  /* pronounced hover neon on desktop */
  .card:hover .af-logo{ transform: translateY(-6px) scale(1.008); filter: drop-shadow(0 40px 120px rgba(124,92,255,0.12)); }
  .card:hover{ transform: perspective(1400px) rotateY(6deg) translateY(-6px); }

  /* ========================= Particles / starfield canvas ========================= */
  .bg-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; }

  /* ========================= Footer socials (page-level) ========================= */
  .page-socials { margin-top:18px; display:flex; gap:12px; justify-content:center; align-items:center; width:100%; padding:14px 0; color:var(--muted); font-size:14px; }

  /* ========================= Responsiveness ========================= */
  @media (max-width:1100px){
    .stage{ grid-template-columns: 1fr 380px; gap:20px; padding:24px; }
    .headline h1{ font-size:54px; }
    .af-logo{ font-size:78px; }
    .card{ max-width:380px; min-height:460px; }
  }
  @media (max-width:900px){
    .stage{ grid-template-columns: 1fr; padding:18px; gap:16px; }
    .side{ min-height:auto; }
    .card{ max-width:100%; min-height:380px; transform:none !important; }
    /* disable 3D rotate on small screens, use visibility toggle */
    .card.is-flipped{ transform:none; }
    .face{ position:relative; transform:none; backface-visibility:visible; }
    .af-logo{ font-size:64px; }
    .headline h1{ font-size:42px; }
    .meta{ gap:10px; }
  }
  @media (max-width:560px){
    body{ padding:12px; }
    .headline h1{ font-size:36px; }
    .af-logo{ font-size:48px; }
    .typing{ font-size:14px; padding:8px 10px; }
    .pill{ min-width:48px; padding:8px 10px; }
  }

  /* ========================= Micro animations ========================= */
  @keyframes flicker {
    0%{ opacity:1 } 50%{ opacity:0.88 } 100%{ opacity:1 }
  }
  .muted{ color:var(--muted); }

  /* prefer reduced motion support */
  @media (prefers-reduced-motion: reduce){
    .card, .af-logo, .glow, .typing { animation: none !important; transition: none !important; transform: none !important; }
  }
</style>
</head>
<body>
  <!-- starfield + particle canvas (background) -->
  <canvas id="bgCanvas" class="bg-canvas" aria-hidden="true"></canvas>

  <!-- subtle decorative SVG -->
  <div class="decor" aria-hidden="true">
    <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gA" x1="0" x2="1">
          <stop offset="0" stop-color="#7c5cff" stop-opacity="0.14"/>
          <stop offset="1" stop-color="#00f5a0" stop-opacity="0.12"/>
        </linearGradient>
      </defs>
      <path d="M0,120 C220,260 420,40 720,140 C920,210 1000,340 1200,260 L1200,600 L0,600 Z" fill="url(#gA)"></path>
    </svg>
  </div>

  <main class="stage" role="main" aria-labelledby="title">
    <!-- LEFT: Hero -->
    <section class="hero" aria-labelledby="title">
      <div class="brand">
        <div class="logo" aria-hidden>AF</div>
        <div>
          <h3 id="title">AcademeForge</h3>
          <p class="muted">Build. Learn. Launch. — Modern learning platform</p>
        </div>
      </div>

      <div class="headline" role="heading" aria-level="1">
        <h1><span class="glow">Coming</span></h1>
        <div class="soon">Soon</div>
      </div>

      <p class="sub">A new space for builders and learners — courses, projects and mentorship.</p>

      <div class="meta" aria-live="polite">
        <div class="typing" id="typing">Preparing the classroom of the future...</div>
        <div class="beta-chip" aria-hidden>Beta</div>
      </div>

      <div class="count" aria-hidden="true">
        <div class="pill" id="pill-days">00d</div>
        <div class="pill" id="pill-hours">00h</div>
        <div class="pill" id="pill-mins">00m</div>
        <div class="pill" id="pill-secs">00s</div>
      </div>

      <blockquote>
        "As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users."
      </blockquote>
    </section>

    <!-- RIGHT: visuals + card -->
    <aside class="side" aria-hidden="false">
      <div class="card-wrap">
        <div class="card" id="card" role="button" tabindex="0" aria-pressed="false" aria-label="Flip card to view details">
          <!-- FRONT -->
          <div class="face front" id="front-face" aria-hidden="false">
            <div class="card-head">
              <div>
                <div style="font-weight:900;font-size:18px">AcademeForge</div>
                <div class="muted" style="font-size:13px;margin-top:6px">Early access & pilot programs</div>
              </div>
              <div class="beta-chip" aria-hidden>Beta</div>
            </div>

            <div class="front-mid">
              <div class="af-logo" aria-hidden>AF</div>
              <div class="muted" style="max-width:300px;">Designing hands-on projects · Onboarding mentors · Curating career-ready curricula</div>
              <div style="margin-top:8px;color:var(--muted);font-size:13px">Click / Tap / Press Enter to flip →</div>
            </div>

            <div class="front-foot">
              <div class="muted">Join waitlist (coming soon)</div>
              <div style="font-size:12px;color:var(--muted)">v0.9</div>
            </div>
          </div>

          <!-- BACK -->
          <div class="face back" id="back-face" aria-hidden="true">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="font-weight:900;font-size:18px">Get Updates</div>
                <div class="muted" style="font-size:13px;margin-top:6px">We’ll notify when platform evolves</div>
              </div>
              <div class="beta-chip" aria-hidden>v0.9</div>
            </div>

            <div class="back-text">
              As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users.
              <div class="back-list">
                • Hands-on project tracks<br>
                • Mentor-led cohorts<br>
                • Industry-aligned evaluation
              </div>
            </div>

            <div class="socials" aria-label="social links">
              <div class="muted">Or follow us for updates</div>
              <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
              <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align:center;color:var(--muted);font-size:13px;margin-top:6px;">Ultra-futuristic preview — optimized for laptop & mobile</div>
    </aside>
  </main>

  <!-- final page-level socials only -->
  <div class="page-socials" aria-hidden="false">
    <div class="muted">Follow for launch updates:</div>
    <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
    <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
  </div>

<script>
/* ========================= Background starfield + particle trails ========================= */
(function background(){
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  // particles
  const stars = [];
  const numStars = Math.max(60, Math.floor((W*H)/80000)); // scale with screen
  for(let i=0;i<numStars;i++){
    stars.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.8 + 0.3,
      a: Math.random()*0.9 + 0.1,
      vx: (Math.random()-0.5)*0.05,
      vy: (Math.random()-0.5)*0.05
    });
  }

  const trails = []; // moving drift particles
  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);

  // perf heuristic: reduce on small or low-memory devices
  const reduce = window.matchMedia('(max-width:900px)').matches || (navigator.deviceMemory && navigator.deviceMemory < 1.5);

  function draw(){
    ctx.clearRect(0,0,W,H);
    // subtle gradient overlay
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0, 'rgba(4,10,20,0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0.24)');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    // stars
    for(let s of stars){
      s.x += s.vx; s.y += s.vy;
      if(s.x < -10) s.x = W + 10;
      if(s.x > W + 10) s.x = -10;
      if(s.y < -10) s.y = H + 10;
      if(s.y > H + 10) s.y = -10;
      ctx.beginPath();
      ctx.globalAlpha = s.a;
      ctx.fillStyle = '#eafdf2';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // create moving small trails near cursor occasionally
    if(!reduce && Math.random() > 0.96) {
      trails.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.3)*2, life: 120, size: Math.random()*2+1 });
    }
    // draw trails
    for(let i = trails.length-1; i>=0; i--){
      const t = trails[i];
      t.x += t.vx; t.y += t.vy; t.life--;
      ctx.beginPath();
      ctx.globalAlpha = Math.max(0, t.life/120);
      ctx.fillStyle = 'rgba(124,92,255,0.6)';
      ctx.arc(t.x, t.y, t.size, 0, Math.PI*2);
      ctx.fill();
      if(t.life<=0) trails.splice(i,1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ========================= Typewriter (stronger effect) ========================= */
(function typewriter(){
  const el = document.getElementById('typing');
  const lines = [
    'Preparing the classroom of the future...',
    'Designing hands-on projects',
    'Onboarding mentors & instructors',
    'Curating career-ready curricula'
  ];
  let li = 0, ci = 0, deleting = false;
  const typeSpeed = 26, deleteSpeed = 20, pause = 900;

  function tick(){
    const line = lines[li];
    if(!deleting){
      ci++;
      el.textContent = line.slice(0,ci);
      if(ci === line.length){ deleting = true; setTimeout(tick, pause); return; }
    } else {
      ci--;
      el.textContent = line.slice(0,ci);
      if(ci === 0){ deleting = false; li = (li+1)%lines.length; }
    }
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed + Math.random()*28);
  }
  tick();
})();

/* ========================= Countdown (decorative) ========================= */
(function countdown(){
  const d = document.getElementById('pill-days');
  const h = document.getElementById('pill-hours');
  const m = document.getElementById('pill-mins');
  const s = document.getElementById('pill-secs');
  const target = new Date(); target.setDate(target.getDate() + 97);
  function upd(){
    const now = Date.now(); let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24)); diff %= (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60)); diff %= (1000*60*60);
    const mins = Math.floor(diff / (1000*60)); diff %= (1000*60);
    const secs = Math.floor(diff / 1000);
    d.textContent = String(days).padStart(2,'0')+'d';
    h.textContent = String(hours).padStart(2,'0')+'h';
    m.textContent = String(mins).padStart(2,'0')+'m';
    s.textContent = String(secs).padStart(2,'0')+'s';
  }
  upd(); setInterval(upd,1000);
})();

/* ========================= Card flip (desktop 3D, mobile toggle) ========================= */
(function flipCard(){
  const card = document.getElementById('card');
  const front = document.getElementById('front-face');
  const back = document.getElementById('back-face');

  function setFlipped(state){
    const small = window.matchMedia('(max-width:900px)').matches;
    if(small){
      // mobile: toggle display instead of 3D rotate
      front.style.display = state ? 'none' : 'flex';
      back.style.display = state ? 'flex' : 'none';
      card.classList.toggle('is-flipped', state);
      card.setAttribute('aria-pressed', String(state));
      return;
    }
    card.classList.toggle('is-flipped', state);
    front.setAttribute('aria-hidden', String(state));
    back.setAttribute('aria-hidden', String(!state));
    card.setAttribute('aria-pressed', String(state));
  }

  // initialize faces visibility for small screens
  if(window.matchMedia('(max-width:900px)').matches){
    setFlipped(false);
  } else {
    // ensure both faces present for 3D effect
    front.style.display = 'flex';
    back.style.display = 'flex';
  }

  card.addEventListener('click', (e) => {
    if(['A','BUTTON','INPUT'].includes(e.target.tagName)) return;
    setFlipped(!card.classList.contains('is-flipped'));
  });

  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setFlipped(!card.classList.contains('is-flipped')); }
    if(e.key === 'Escape'){ setFlipped(false); }
  });

  // when resizing, reset to appropriate mode
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=> {
      if(window.matchMedia('(max-wid