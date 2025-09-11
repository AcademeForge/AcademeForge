
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>AcademeForge — Coming Soon</title>
<meta name="description" content="AcademeForge — modern education platform. Coming soon." />
<style>
  :root{
    --bg-1:#020617;
    --bg-2:#071029;
    --glass: rgba(255,255,255,0.04);
    --muted: #97b0c8;
    --accent-1: #00f5a0;
    --accent-2: #7c5cff;
    --neon: rgba(124,92,255,0.12);
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
  }
  *{box-sizing:border-box}
  html,body{height:100%;margin:0}
  body{
    background: linear-gradient(180deg,var(--bg-1),var(--bg-2));
    color:#e6eef8;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
    overflow-x:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:32px;
  }

  /* ---------- Canvas ---------- */
  canvas#matrix {
    position:fixed; inset:0; width:100%; height:100%; display:block; z-index:0;
    background: linear-gradient(180deg, rgba(3,7,18,0.35), rgba(2,6,20,0.55));
  }

  /* ---------- Layout ---------- */
  .container{
    position:relative;
    z-index:2;
    width:100%;
    max-width:1200px;
    display:grid;
    grid-template-columns: 1fr 420px;
    gap:30px;
    align-items:start; /* card top aligned to avoid cut */
    justify-content:center;
  }

  /* ---------- Hero ---------- */
  .hero {
    position:relative;
    border-radius:14px;
    padding:34px;
    min-height:500px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    box-shadow: 0 14px 50px rgba(2,6,23,0.7), inset 0 1px 0 rgba(255,255,255,0.02);
    backdrop-filter: blur(6px);
    overflow:hidden;
  }
  .brand { display:flex; gap:14px; align-items:center; margin-bottom:14px; }
  .logo {
    width:64px; height:64px; border-radius:12px;
    background: linear-gradient(135deg,var(--accent-2),var(--accent-1));
    display:grid; place-items:center; color:#021018; font-weight:800; font-size:20px;
    box-shadow: 0 8px 38px var(--neon);
  }
  .brand h3{margin:0;font-size:20px}
  .brand p{margin:0;color:var(--muted);font-size:13px}

  h1 {
    font-size:48px; margin:6px 0 4px; line-height:1.02;
    font-weight:800;
  }
  .glow {
    background: linear-gradient(90deg,var(--accent-1),var(--accent-2));
    -webkit-background-clip: text; color: transparent;
    text-shadow: 0 12px 40px rgba(124,92,255,0.09);
  }
  .sub { color:var(--muted); margin-top:8px; font-size:16px; max-width:60ch; }

  .typing {
    font-family: var(--mono);
    color:#9fb1c9;
    margin-top:18px;
    font-size:15px;
    min-height:22px;
    letter-spacing:0.2px;
  }

  .countdown {
    margin-top:20px;
    display:flex; gap:10px; align-items:center;
    flex-wrap: wrap;
  }
  .count-pill {
    background: rgba(255,255,255,0.04);
    padding:10px 14px; border-radius:10px;
    font-family:var(--mono); font-weight:700;
    color:#e6eef8; min-width:62px; text-align:center;
  }
  .muted-small { color:var(--muted); margin-top:10px; font-size:13px; }

  /* ---------- Flip Card ---------- */
  .card-wrap { perspective:1200px; display:flex; justify-content:center; }
  .card {
    width:100%; max-width:420px; min-height:500px; height:auto;
    transform-style:preserve-3d;
    transition: transform 0.85s cubic-bezier(.2,.9,.3,1);
    position:relative;
    cursor:pointer;
  }
  .card.is-flipped { transform: rotateY(180deg); }

  .face {
    position:absolute; inset:0; border-radius:14px;
    padding:22px; display:flex; flex-direction:column;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    box-shadow: 0 18px 60px rgba(2,6,23,0.65);
    backface-visibility:hidden; -webkit-backface-visibility:hidden;
    overflow:hidden;
  }
  .face.back { transform: rotateY(180deg); }

  .card-title { font-size:18px; font-weight:700; }
  .card-muted { color:var(--muted); font-size:13px; margin-top:6px; }

  .af-mark {
    margin-top:18px; display:grid; place-items:center;
    font-size:84px; font-weight:900; line-height:1;
    -webkit-background-clip:text; color:transparent;
    background: linear-gradient(90deg,var(--accent-1),var(--accent-2));
    text-shadow: 0 22px 80px rgba(124,92,255,0.08);
  }
  .flip-hint { margin-top:12px; color:var(--muted); font-size:13px; }

  .chip { margin-left:auto; padding:6px 10px; border-radius:999px; background:var(--glass); color:#cfe7ff; font-size:12px; }

  .back-section { margin-top:18px; color:#cfe7ff; font-size:14px; }

  .socials { margin-top:auto; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .socials a { text-decoration:none; color:var(--muted); padding:8px 10px; border-radius:8px; background:rgba(255,255,255,0.02); }

  /* ---------- Responsive ---------- */
  @media (max-width:980px){
    .container { grid-template-columns: 1fr; gap:18px; padding:0 10px; }
    .card { max-width:100%; min-height:380px; height:auto; margin:0 auto; }
    h1 { font-size:36px; line-height:1.1; }
    .af-mark { font-size:64px; }
    .typing { font-size:14px; }
    .count-pill { min-width:50px; padding:8px 12px; }
    .sub { font-size:14px; max-width:100%; }
  }
  @media (max-width:600px){
    body { padding:16px; }
    .hero { padding:20px; min-height:auto; }
    .brand h3 { font-size:18px; }
    .brand p { font-size:12px; }
    h1 { font-size:28px; }
    .af-mark { font-size:48px; }
    .typing { font-size:13px; }
    .count-pill { min-width:40px; padding:6px 10px; font-size:12px; }
    .flip-hint { font-size:12px; }
  }
</style>
</head>
<body>
<canvas id="matrix"></canvas>

<main class="container" role="main" aria-labelledby="title">
  <section class="hero" aria-labelledby="title">
    <div class="brand">
      <div class="logo" aria-hidden>AF</div>
      <div>
        <h3 id="title">AcademeForge</h3>
        <p>Build. Learn. Launch. — Modern learning platform</p>
      </div>
    </div>

    <h1><span class="glow">Coming</span> <span>Soon</span></h1>
    <p class="sub">A new space for builders and learners — courses, projects and mentorship.</p>

    <div class="typing" id="typing" aria-live="polite"></div>

    <div class="countdown" aria-hidden="false">
      <div class="count-pill" id="pill-days">00d</div>
      <div class="count-pill" id="pill-hours">00h</div>
      <div class="count-pill" id="pill-mins">00m</div>
      <div class="count-pill" id="pill-secs">00s</div>
    </div>

    <div class="muted-small">Get early access, resources and launch updates directly through our social handles.</div>
  </section>

  <aside class="card-wrap" aria-hidden="false">
    <div class="card" id="card" role="button" tabindex="0" aria-pressed="false" aria-label="Flip card to see updates">
      <div class="face front">
        <div style="display:flex;align-items:center;gap:10px;">
          <div>
            <div class="card-title">AcademeForge</div>
            <div class="card-muted">Early access & pilot programs</div>
          </div>
          <div class="chip">Beta</div>
        </div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;">
          <div class="af-mark" aria-hidden>AF</div>
          <div class="flip-hint">Click card to see more →</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div class="card-muted">Join waitlist for launch perks</div>
          <div style="font-size:12px;color:var(--muted)">v0.9</div>
        </div>
      </div>
      <div class="face back">
        <div style="display:flex;align-items:center;gap:12px;">
          <div>
            <div class="card-title">Get Updates</div>
            <div class="card-muted">We’ll notify you when we go live</div>
          </div>
          <div class="chip">v0.9</div>
        </div>
        <div class="back-section">
          As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users.
        </div>
        <div class="socials" aria-label="social links">
          <span class="card-muted">Or join us on</span>
          <a href="https://t.me/+c1Ll3CiaGL9lOTA1" aria-label="Telegram">Telegram</a>
          <a href="https://www.instagram.com/academeforge.in?igsh=MXc2eTlmenozNnN1Mg==" aria-label="Instagram">Instagram</a>
        </div>
      </div>
    </div>
  </aside>
</main>

<script>
  /* Typing */
  (function typing(){
    const el = document.getElementById('typing');
    const items = [
      'Preparing the classroom of the future...',
      'Designing hands-on projects',
      'Onboarding mentors & instructors',
      'Curating career-ready curricula'
    ];
    let mi = 0, ti = 0, deleting = false;
    function tick(){
      const msg = items[mi];
      if(!deleting){
        ti++;
        el.textContent = msg.slice(0, ti);
        if(ti === msg.length){ deleting = true; setTimeout(tick, 900); return; }
      } else {
        ti--;
        el.textContent = msg.slice(0, ti);
        if(ti === 0){ deleting = false; mi = (mi+1) % items.length; }
      }
      setTimeout(tick, deleting ? 40 : (40 + Math.random()*40));
    }
    tick();
  })();

  /* Countdown */
  (function countdown(){
    const target = new Date();
    target.setDate(target.getDate() + 97);
    function update(){
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000*60*60*24)); diff %= (1000*60*60*24);
      const hours = Math.floor(diff / (1000*60*60)); diff %= (1000*60*60);
      const mins = Math.floor(diff / (1000*60)); diff %= (1000*60);
      const secs = Math.floor(diff / 1000);
      document.getElementById('pill-days').textContent = String(days).padStart(2,'0') + 'd';
      document.getElementById('pill-hours').textContent = String(hours).padStart(2,'0') + 'h';
      document.getElementById('pill-mins').textContent = String(mins).padStart(2,'0') + 'm';
      document.getElementById('pill-secs').textContent = String(secs).padStart(2,'0') + 's';
    }
    update(); setInterval(update,1000);
  })();

  /* Flip card */
  (function flipCard(){
    const card = document.getElementById('card');
    function toggle(){
      card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', card.classList.contains('is-flipped'));
    }
    card.addEventListener('click',(e)=>{if(!['A','BUTTON'].includes(e.target.tagName)) toggle();});
    card.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); toggle();}});
  })();

  /* Matrix */
  (function matrix(){
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]()=+-_*;:,.$%#@';
    const chars = letters.split('');
    const fontSize = 14;
    let columns = Math.floor(W / fontSize);
    const drops = new Array(columns).fill(0);
    window.addEventListener('resize',()=>{
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      columns = Math.floor(W / fontSize);
      drops.length=0;
      for(let i=0;i<columns;i++) drops[i] = Math.floor(Math.random()*H/fontSize);
    });
    function draw(){
      ctx.fillStyle='rgba(0,0,0,0.06)'; ctx.fillRect(0,0,W,H);
      ctx.font = fontSize + 'px monospace';
      for(let i=0;i<drops.length;i++){
        const text = chars[Math.floor(Math.random()*chars.length)];
        const x = i*fontSize, y=drops[i]*fontSize;
        ctx.fillStyle='#b7ffcf'; ctx.fillText(text,x,y);
        ctx.fillStyle='rgba(45,255,180,0.12)'; ctx.fillText(text,x,y-fontSize*0.6);
        ctx.fillStyle='rgba(124,92,255,0.03)'; ctx.fillText(text,x,y-fontSize*1.4);
        if(y>H && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
      const g = ctx.createRadialGradient(W*0.15,H*0.1,0,W*0.15,H*0.1,W*0.8);
      g.addColorStop(0,'rgba(124,92,255,0.06)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      requestAnimationFrame(draw);
    }
    for(let i=0;i<columns;i++) drops[i]=Math.floor(Math.random()*H/fontSize);
    requestAnimationFrame(draw);
  })();
</script>
</body>
</html>