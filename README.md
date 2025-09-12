<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>AcademeForge — Coming Soon</title>
<meta name="description" content="AcademeForge — Build. Learn. Launch. Modern learning platform — Coming Soon" />
<style>
  /* =================== Variables & Base =================== */
  :root{
    --bg-1:#020617;
    --bg-2:#071029;
    --glass: rgba(255,255,255,0.04);
    --muted: #9bb6cc;
    --accent-1: #00f5a0;
    --accent-2: #7c5cff;
    --accent-3: #00d4ff;
    --neon: rgba(124,92,255,0.12);
    --glass-2: rgba(255,255,255,0.02);
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
    --ease-spring: cubic-bezier(.18,.96,.35,1);
    --max-width: 1200px;
  }
  *{box-sizing:border-box}
  html,body{height:100%;margin:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;color:#e6eef8;-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;}
  body{
    background: linear-gradient(180deg,var(--bg-1),var(--bg-2));
    display:flex; align-items:center; justify-content:center;
    padding:28px; overflow-x:hidden;
  }
  a{color:inherit}

  /* =================== Stage & layout =================== */
  .stage {
    position:relative; z-index:2;
    width:100%; max-width:var(--max-width);
    display:grid; gap:28px;
    grid-template-columns: 1fr 460px;
    align-items:start; padding:36px; border-radius:16px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    box-shadow: 0 30px 120px rgba(2,6,23,0.7), inset 0 1px 0 rgba(255,255,255,0.02);
    backdrop-filter: blur(8px);
    overflow:visible;
  }

  /* Left hero */
  .hero {
    position:relative; padding:28px 28px 24px 28px; min-height:520px; display:flex; flex-direction:column;
  }

  .brand {
    display:flex; gap:14px; align-items:center; margin-bottom:8px;
  }
  .logo {
    width:64px; height:64px; border-radius:14px; display:grid; place-items:center;
    font-weight:800; font-size:22px; color:#021018;
    background: linear-gradient(135deg,var(--accent-2),var(--accent-1));
    box-shadow: 0 12px 58px rgba(124,92,255,0.12);
  }
  .brand h3 { margin:0; font-size:18px; letter-spacing:0.2px; }
  .brand p { margin:0; color:var(--muted); font-size:13px; }

  .headline {
    margin-top:12px; display:flex; gap:12px; align-items:baseline; flex-wrap:wrap;
  }
  .headline h1 { margin:0; font-size:64px; line-height:0.95; font-weight:900; letter-spacing:-1px; }
  .glow {
    background: linear-gradient(90deg,var(--accent-1),var(--accent-2));
    -webkit-background-clip:text;color:transparent;
    text-shadow:0 28px 100px rgba(124,92,255,0.08);
    display:inline-block;
  }
  .headline small {
    display:block; font-weight:700; font-size:34px; color:#dfffee; opacity:0.9;
  }

  .sub { margin-top:12px; color:var(--muted); font-size:16px; max-width:62ch; }

  /* Typing / multi-anim */
  .typing-wrap { margin-top:20px; display:flex; gap:18px; align-items:center; flex-wrap:wrap; }
  .typing {
    font-family:var(--mono); color:#9fb1c9; font-size:16px; min-height:22px; letter-spacing:0.2px;
    background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00));
    padding:10px 14px; border-radius:10px;
    box-shadow: 0 6px 26px rgba(2,6,23,0.35);
  }
  .badge {
    font-family:var(--mono); font-weight:700; padding:8px 12px; border-radius:999px; background:linear-gradient(90deg, rgba(0,0,0,0.18), rgba(255,255,255,0.01));
    color:var(--muted); font-size:13px;
  }

  /* Countdown */
  .countdown { margin-top:20px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
  .pill { background: rgba(255,255,255,0.04); padding:10px 14px; border-radius:12px; font-family:var(--mono); font-weight:800; color:#e6eef8; min-width:64px; text-align:center; box-shadow: 0 8px 30px rgba(3,7,20,0.5); }
  .muted-small { color:var(--muted); margin-top:12px; font-size:13px; }

  /* Right column (card + actions) */
  .side {
    display:flex; flex-direction:column; gap:18px; align-items:stretch; justify-content:flex-start;
    perspective:1400px;
  }

  /* Floating background decorations */
  .deco {
    position:absolute; inset:0; pointer-events:none; z-index:1;
  }
  .deco svg { width:100%; height:100%; opacity:0.08; }

  /* Card (3D) */
  .card-wrap { display:flex; align-items:center; justify-content:center; height:100%; }
  .card {
    width:100%; max-width:420px; min-height:520px; height:auto; position:relative; transform-style:preserve-3d;
    transition: transform 0.9s var(--ease-spring); cursor:pointer; border-radius:16px;
  }
  .card.is-flipped { transform: rotateY(180deg); }

  .face {
    position:absolute; inset:0; border-radius:16px; padding:22px; display:flex; flex-direction:column;
    backface-visibility:hidden; -webkit-backface-visibility:hidden;
    box-shadow: 0 20px 80px rgba(2,6,23,0.6); background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    overflow:hidden;
  }
  .face.back { transform: rotateY(180deg); }

  .card-head { display:flex; gap:10px; align-items:center; }
  .chip {
    margin-left:auto; padding:8px 12px; border-radius:999px; font-weight:800; letter-spacing:0.6px;
    background:linear-gradient(90deg,var(--accent-1),var(--accent-2)); color:#021018;
    box-shadow: 0 18px 64px rgba(124,92,255,0.12);
  }

  .af-mark { margin-top:18px; display:grid; place-items:center; font-size:96px; font-weight:900; line-height:1; background:linear-gradient(90deg,var(--accent-1),var(--accent-2)); -webkit-background-clip:text; color:transparent; text-shadow: 0 36px 120px rgba(124,92,255,0.08); }
  .flip-hint { margin-top:12px; color:var(--muted); font-size:13px; text-align:center; }

  .back-section { margin-top:18px; color:#cfe7ff; font-size:14px; line-height:1.45; flex:1; overflow:auto; }

  .socials { margin-top:16px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
  .socials a { text-decoration:none; color:var(--muted); padding:8px 12px; border-radius:10px; background:rgba(255,255,255,0.02); font-size:13px; }

  /* CTA Row */
  .cta-row { display:flex; gap:12px; align-items:center; margin-top:8px; }
  .btn {
    padding:12px 18px; border-radius:12px; font-weight:700; cursor:pointer; border:0;
    background: linear-gradient(90deg,var(--accent-1),var(--accent-2)); color:#021018; box-shadow: 0 12px 44px rgba(124,92,255,0.12);
  }
  .btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--muted); box-shadow:none; }

  /* modal */
  .modal {
    position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:100;
    background:linear-gradient(rgba(1,3,8,0.6), rgba(1,3,8,0.6)); visibility:hidden; opacity:0; transition:opacity .25s ease, visibility .25s ease;
  }
  .modal.open { visibility:visible; opacity:1; }
  .modal-panel { width:clamp(320px, 42vw, 560px); background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); padding:20px; border-radius:12px; box-shadow: 0 30px 140px rgba(2,6,23,0.8); }

  /* subtle performance toggle class for mobile */
  .reduced-anim * { transition:none !important; animation:none !important; }

  /* =================== Responsiveness =================== */
  @media (max-width:1100px){
    .stage { grid-template-columns: 1fr 380px; padding:24px; gap:20px; }
    .card { max-width:380px; min-height:460px; }
    .headline h1 { font-size:48px; }
    .af-mark { font-size:78px; }
  }
  @media (max-width:900px){
    .stage { grid-template-columns: 1fr; padding:18px; gap:16px; }
    .hero { min-height:auto; padding:18px; }
    .card { max-width:640px; min-height:380px; margin:0 auto; position:relative; transform:none !important; }
    .card.is-flipped { transform:none; } /* disable flip transform on small devices; still toggle content via class */
    .face { position:relative; transform:none; backface-visibility:visible; }
    .af-mark { font-size:64px; }
    .headline h1 { font-size:42px; }
  }
  @media (max-width:560px){
    body{padding:14px}
    .stage{padding:14px;gap:12px}
    .headline h1{font-size:36px}
    .af-mark{font-size:48px}
    .typing{font-size:14px;padding:8px 10px}
    .pill{min-width:48px;padding:8px 10px}
    .logo{width:56px;height:56px;font-size:18px}
    .card{min-height:auto}
    .muted-small{font-size:12px}
  }

  /* =================== Micro animations =================== */
  @keyframes floaty {
    0% { transform:translateY(0px) }
    50% { transform:translateY(-8px) }
    100% { transform:translateY(0px) }
  }
  .af-mark { animation: floaty 6s ease-in-out infinite; }

  @keyframes pop {
    0% { transform:scale(.98); opacity:0 }
    60% { transform:scale(1.02); opacity:1 }
    100%{ transform:scale(1); opacity:1 }
  }
  .card { animation: pop .6s ease both; }

  /* accessible focus */
  .card:focus { outline: 3px solid rgba(124,92,255,0.18); outline-offset:6px; }

  /* small helper */
  .muted { color:var(--muted) }
</style>
</head>
<body>
  <!-- Background layers: Matrix Canvas + Particles -->
  <canvas id="matrix" style="position:fixed;inset:0;width:100%;height:100%;z-index:0;"></canvas>

  <!-- decorative svg shapes -->
  <div class="deco" aria-hidden="true" style="z-index:0;">
    <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stop-color="#7c5cff" stop-opacity="0.6"/>
          <stop offset="1" stop-color="#00f5a0" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <path d="M0,120 C220,260 420,40 720,140 C920,210 1000,340 1200,260 L1200,600 L0,600 Z" fill="url(#g1)"></path>
    </svg>
  </div>

  <main class="stage" role="main" aria-labelledby="title">
    <!-- LEFT - HERO -->
    <section class="hero" aria-labelledby="title">
      <div class="brand">
        <div class="logo" aria-hidden>AF</div>
        <div>
          <h3 id="title">AcademeForge</h3>
          <p>Build. Learn. Launch. — Modern learning platform</p>
        </div>
      </div>

      <div class="headline" role="heading" aria-level="1">
        <h1><span class="glow">Coming</span></h1>
        <small>Soon</small>
      </div>

      <p class="sub">A new space for builders and learners — courses, projects and mentorship.</p>

      <div class="typing-wrap" aria-live="polite">
        <div class="typing" id="typing">Preparing the classroom of the future...</div>
        <div class="badge">Beta</div>
      </div>

      <div class="countdown" aria-hidden="false" aria-label="Countdown to launch">
        <div class="pill" id="pill-days">00d</div>
        <div class="pill" id="pill-hours">00h</div>
        <div class="pill" id="pill-mins">00m</div>
        <div class="pill" id="pill-secs">00s</div>
      </div>

      <p class="muted-small">Get early access, resources and launch updates directly through our social handles below or join the beta.</p>

      <!-- CTA -->
      <div style="margin-top:18px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <button class="btn" id="open-beta" aria-haspopup="dialog">Join Beta — Get Early Access</button>
        <button class="btn ghost" id="open-demo">See Demo (preview)</button>
      </div>

      <!-- testimonial / quote block -->
      <blockquote style="margin-top:22px; border-left:3px solid rgba(124,92,255,0.12); padding-left:14px; color:#cfe7ff; font-size:14px; max-width:70ch;">
        "As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users."
      </blockquote>
    </section>

    <!-- RIGHT - CARD -->
    <aside class="side" aria-hidden="false">
      <div class="card-wrap">
        <div class="card" id="card" role="button" tabindex="0" aria-pressed="false" aria-label="Flip card to view details">
          <!-- FRONT -->
          <div class="face front" aria-hidden="false">
            <div class="card-head">
              <div>
                <div style="font-weight:800;font-size:18px;">AcademeForge</div>
                <div style="color:var(--muted);font-size:13px;margin-top:6px;">Early access & pilot programs</div>
              </div>
              <div class="chip" aria-hidden>Beta</div>
            </div>

            <div style="flex:1; display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center;">
              <div class="af-mark" aria-hidden>AF</div>
              <div style="max-width:300px; color:var(--muted); margin-top:8px;">Designing hands-on projects, onboarding mentors, curating career-ready curricula.</div>
              <div class="flip-hint">Click or press Enter to flip →</div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="color:var(--muted); font-size:13px;">Join waitlist for launch perks</div>
              <div style="font-size:12px;color:var(--muted)">v0.9</div>
            </div>
          </div>

          <!-- BACK -->
          <div class="face back" aria-hidden="true">
            <div style="display:flex; gap:12px; align-items:center;">
              <div>
                <div style="font-weight:800;font-size:18px;">Get Updates</div>
                <div style="color:var(--muted); font-size:13px; margin-top:6px;">We’ll notify you when we go live</div>
              </div>
              <div class="chip">v0.9</div>
            </div>

            <div class="back-section" id="back-text">
              As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users.
              <ul style="margin-top:12px; color:var(--muted); font-size:13px;">
                <li>Hands-on project tracks</li>
                <li>Mentor-led cohorts</li>
                <li>Industry-aligned assessments</li>
              </ul>
            </div>

            <div class="socials" aria-label="social links">
              <span class="muted">Or join us on</span>
              <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener" aria-label="Telegram">Telegram</a>
              <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            </div>

            <div style="margin-top:14px; display:flex; gap:10px;">
              <button class="btn" id="open-beta-2">Join Beta</button>
              <button class="btn ghost" id="close-card">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- small hint / version -->
      <div style="margin-top:6px; color:var(--muted); font-size:13px; text-align:center;">High-graphic preview — optimized for laptop & mobile</div>
    </aside>
  </main>

  <!-- modal -->
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-panel" role="document">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-weight:800;font-size:18px;">Join AcademeForge Beta</div>
        <button id="close-modal" aria-label="Close modal" style="background:transparent;border:0;color:var(--muted);cursor:pointer;">✕</button>
      </div>

      <p style="color:var(--muted); margin-top:8px;">Enter email to request early access. We'll reach out with next steps.</p>
      <form id="beta-form" style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
        <input type="email" id="email" placeholder="you@domain.com" required style="flex:1; min-width:220px; padding:10px 12px; border-radius:10px; border:0; background:rgba(255,255,255,0.02); color:#e6eef8;" />
        <button class="btn" type="submit">Request Access</button>
      </form>

      <p id="form-msg" style="color:var(--muted); margin-top:10px; font-size:13px;"></p>
    </div>
  </div>

<script>
/* ================= Matrix background (reduced on mobile) ================= */
(function matrix(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const fontSize = Math.max(12, Math.round(Math.min(W, H) / 80));
  const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]()=+-_*;:,.$%#@';
  const chars = letters.split('');
  let columns = Math.floor(W / fontSize);
  let drops = new Array(columns).fill(0);
  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const newFont = Math.max(12, Math.round(Math.min(W, H) / 80));
    columns = Math.floor(W / newFont);
    drops = new Array(columns).fill(0).map(()=>Math.floor(Math.random()*H/newFont));
  }
  window.addEventListener('resize', resize);

  // on small screens reduce intensity
  const reduce = window.matchMedia('(max-width:900px)').matches;

  for(let i=0;i<columns;i++) drops[i] = Math.floor(Math.random()*H/fontSize);

  function draw(){
    ctx.fillStyle = reduce ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(0,0,W,H);
    ctx.font = fontSize + 'px monospace';
    for(let i=0;i<drops.length;i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      // leading char
      ctx.fillStyle = reduce ? '#8ff7d0' : '#b7ffcf';
      ctx.fillText(text, x, y);
      // small trailing ghost for depth
      if(!reduce){
        ctx.fillStyle = 'rgba(45,255,180,0.12)';
        ctx.fillText(text, x, y - fontSize * 0.6);
        ctx.fillStyle = 'rgba(124,92,255,0.03)';
        ctx.fillText(text, x, y - fontSize * 1.4);
      }
      if (y > H && Math.random() > 0.985) drops[i] = 0;
      drops[i]++;
    }
    // vignette
    const g = ctx.createRadialGradient(W*0.15, H*0.1, 0, W*0.15, H*0.1, W*0.8);
    g.addColorStop(0, 'rgba(124,92,255,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ================= Typing multi-line (type + fade loop) ================= */
(function typer(){
  const el = document.getElementById('typing');
  const lines = [
    'Preparing the classroom of the future...',
    'Designing hands-on projects',
    'Onboarding mentors & instructors',
    'Curating career-ready curricula'
  ];
  let index = 0;
  let char = 0;
  let deleting = false;
  let pause = 1000;

  function tick(){
    const current = lines[index];
    if(!deleting){
      char++;
      el.textContent = current.slice(0,char);
      if(char === current.length){
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      char--;
      el.textContent = current.slice(0,char);
      if(char === 0){
        deleting = false;
        index = (index+1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? 28 : (28 + Math.random()*30));
  }
  tick();
})();

/* ================= Countdown ================= */
(function countdown(){
  const daysEl = document.getElementById('pill-days');
  const hoursEl = document.getElementById('pill-hours');
  const minsEl = document.getElementById('pill-mins');
  const secsEl = document.getElementById('pill-secs');

  // target set to 97 days from now (can be replaced by a specific date)
  const target = new Date();
  target.setDate(target.getDate() + 97);

  function update(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24)); diff %= (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60)); diff %= (1000*60*60);
    const mins = Math.floor(diff / (1000*60)); diff %= (1000*60);
    const secs = Math.floor(diff / 1000);

    daysEl.textContent = St