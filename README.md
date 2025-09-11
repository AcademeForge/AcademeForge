
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AcademeForge — Coming Soon</title>
<style>
:root{
  --bg-1:#020617;
  --bg-2:#071029;
  --glass: rgba(255,255,255,0.04);
  --muted: #97b0c8;
  --accent-1: #00f5a0;
  --accent-2: #7c5cff;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{
  background: linear-gradient(180deg,var(--bg-1),var(--bg-2));
  color:#e6eef8;
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:32px;
}

canvas#matrix{
  position:fixed; inset:0; width:100%; height:100%; z-index:0;
  background: linear-gradient(180deg, rgba(3,7,18,0.35), rgba(2,6,20,0.55));
}

/* Layout */
.container{
  position:relative; z-index:2;
  width:100%; max-width:1200px;
  display:grid; grid-template-columns:1fr 420px;
  gap:30px; align-items:start;
}

/* Hero */
.hero{
  position:relative;
  border-radius:14px;
  padding:34px;
  min-height:460px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow: 0 14px 50px rgba(2,6,23,0.7), inset 0 1px 0 rgba(255,255,255,0.02);
  backdrop-filter: blur(6px);
  overflow:hidden;
}
.brand{display:flex; gap:14px; align-items:center; margin-bottom:14px;}
.logo{
  width:64px; height:64px; border-radius:12px;
  background: linear-gradient(135deg,var(--accent-2),var(--accent-1));
  display:grid; place-items:center; color:#021018; font-weight:800; font-size:20px;
}
.brand h3{margin:0;font-size:20px}
.brand p{margin:0;color:var(--muted);font-size:13px}
h1{font-size:48px;margin:6px 0 4px;line-height:1.02;font-weight:800;}
.glow{background: linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip:text;color: transparent;text-shadow:0 12px 40px rgba(124,92,255,0.09);}
.sub{color:var(--muted); margin-top:8px;font-size:16px;max-width:60ch;}
.typing{font-family:var(--mono);color:#9fb1c9;margin-top:18px;font-size:15px;min-height:22px;letter-spacing:0.2px;}

/* Card */
.card-wrap{perspective:1200px;display:flex;justify-content:center;}
.card{
  width:100%; max-width:420px; height:460px;
  transform-style:preserve-3d;
  transition: transform 0.85s cubic-bezier(.2,.9,.3,1);
  position:relative;
  cursor:pointer;
}
.card.is-flipped{transform:rotateY(180deg);}
.face{
  position:absolute; inset:0; border-radius:14px;
  padding:22px; display:flex; flex-direction:column;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow:0 18px 60px rgba(2,6,23,0.65);
  backface-visibility:hidden; -webkit-backface-visibility:hidden;
}
.face.back{transform: rotateY(180deg);}

.card-title{font-size:18px;font-weight:700;}
.card-muted{color:var(--muted);font-size:13px;margin-top:6px;}
.af-mark{margin-top:18px;display:grid;place-items:center;font-size:84px;font-weight:900;line-height:1;-webkit-background-clip:text;color:transparent;background:linear-gradient(90deg,var(--accent-1),var(--accent-2));text-shadow:0 22px 80px rgba(124,92,255,0.08);}
.flip-hint{margin-top:12px;color:var(--muted);font-size:13px;}
.chip{margin-left:auto;padding:6px 10px;border-radius:999px;background:var(--glass);color:#cfe7ff;font-size:12px;}
.back-section{margin-top:18px;color:#cfe7ff;font-size:14px;}
.socials{margin-top:auto;display:flex;gap:10px;align-items:center;}
.socials a{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:8px;background:rgba(255,255,255,0.02);}

@media(max-width:980px){
  .container{grid-template-columns:1fr;gap:18px;padding:0 10px;}
  .card{max-width:520px;height:380px;margin:0 auto;}
  h1{font-size:36px;}
  .af-mark{font-size:64px;}
}
</style>
</head>
<body>
<canvas id="matrix"></canvas>
<main class="container">

<section class="hero">
  <div class="brand">
    <div class="logo">AF</div>
    <div>
      <h3>AcademeForge</h3>
      <p>Build. Learn. Launch. — Modern learning platform</p>
    </div>
  </div>
  <h1><span class="glow">Coming</span> <span>Soon</span></h1>
  <p class="sub">A new space for builders and learners — courses, projects and mentorship.</p>
  <div class="typing" id="typing"></div>
</section>

<aside class="card-wrap">
  <div class="card" id="card" tabindex="0" role="button" aria-pressed="false" aria-label="Flip card">
    <div class="face front">
      <div style="display:flex;align-items:center;gap:10px;">
        <div>
          <div class="card-title">AcademeForge</div>
          <div class="card-muted">Early access & pilot programs</div>
        </div>
        <div class="chip">Beta</div>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;">
        <div class="af-mark">AF</div>
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
      <div class="socials">
        <span class="card-muted">Or join us on</span>
        <a href="#">Telegram</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  </div>
</aside>

</main>

<script>
/* Typing */
(function(){
  const el=document.getElementById('typing');
  const items=['Preparing the classroom of the future...','Designing hands-on projects','Onboarding mentors & instructors','Curating career-ready curricula'];
  let mi=0, ti=0, del=false;
  function tick(){
    const msg=items[mi];
    if(!del){ti++; el.textContent=msg.slice(0,ti); if(ti===msg.length){del=true;setTimeout(tick,900);return;}}
    else {ti--; el.textContent=msg.slice(0,ti); if(ti===0){del=false;mi=(mi+1)%items.length;}}
    setTimeout(tick,del?40:40+Math.random()*40);
  }
  tick();
})();

/* Flip card */
(function(){
  const card=document.getElementById('card');
  function toggle(){card.classList.toggle('is-flipped'); card.setAttribute('aria-pressed', card.classList.contains('is-flipped'));}
  card.addEventListener('click',(e)=>{if(!['BUTTON','A'].includes(e.target.tagName)) toggle();});
  card.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
})();

/* Matrix rain */
(function(){
  const canvas=document.getElementById('matrix'),ctx=canvas.getContext('2d');
  let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
  const letters='01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]()=+-_*;:,.$%#@