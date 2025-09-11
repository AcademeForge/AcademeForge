
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AcademeForge — Coming Soon</title>
<style>
:root{
  --bg-1:#0b1220; --bg-2:#071029;
  --accent-1:#00f5a0; --accent-2:#7c5cff;
  --glass: rgba(255,255,255,0.04);
  --muted:#9fb1c9;
  --mono:'SFMono-Regular',ui-monospace,Menlo,Monaco,'Roboto Mono','Courier New',monospace;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,sans-serif;overflow:hidden;}
body{background:linear-gradient(180deg,var(--bg-1),var(--bg-2));color:#e6eef8;display:flex;align-items:center;justify-content:center;padding:40px;}

canvas#matrix{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;}

.wrap{position:relative;max-width:1100px;width:100%;display:grid;grid-template-columns:1fr 420px;gap:32px;align-items:center;z-index:2;}

/* Hero */
.hero{padding:36px 28px;border-radius:16px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));box-shadow:0 10px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);min-height:420px;backdrop-filter: blur(6px);position:relative;overflow:hidden;}
.brand{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent-2),var(--accent-1));display:grid;place-items:center;font-weight:800;color:#021018;font-size:18px;box-shadow:0 6px 30px rgba(124,92,255,0.12);}
.brand h3{margin:0;font-size:20px}
.brand p{margin:0;color:var(--muted);font-size:13px}
h1{font-size:44px;margin:6px 0 8px;line-height:1.02}
.glow{background:linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip:text;color:transparent;text-shadow:0 10px 40px rgba(124,92,255,0.08);}
.sub{color:#a8bacf;margin-top:8px;font-size:16px}
.typing{font-family:var(--mono);font-size:16px;color:#9fb1c9;margin-top:10px}
.count{display:flex;gap:8px;margin-top:14px}
.count .seg{background:var(--glass);padding:8px 12px;border-radius:8px;font-family:var(--mono);font-weight:700}
.muted{color:#9fb1c9;font-size:13px}

/* Flip card */
.card-wrap{perspective:1200px}
.card{width:100%;max-width:420px;height:420px;margin:0 auto;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(.2,.9,.3,1);position:relative;cursor:pointer}
.card.is-flipped{transform:rotateY(180deg)}
.side{position:absolute;inset:0;border-radius:14px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));backdrop-filter:blur(6px);box-shadow:0 12px 40px rgba(2,6,23,0.6);padding:26px;display:flex;flex-direction:column}
.side.back{transform:rotateY(180deg)}
.card .title{font-size:20px;font-weight:700}
.card .muted{color:#9fb1c9;font-size:13px}
.card .chip{padding:6px 10px;border-radius:999px;background:var(--glass);font-size:12px;color:#bcd3e6}
.flip-hint{font-size:12px;color:#8ea8c7;margin-top:10px}
.footer{display:flex;gap:10px;align-items:center;margin-top:14px}
.footer a{color:#9fb1c9;text-decoration:none}

/* responsive */
@media(max-width:980px){.wrap{grid-template-columns:1fr;gap:18px}.card{max-width:520px;height:380px}.hero{min-height:380px}}
</style>
</head>
<body>
<canvas id="matrix"></canvas>

<div class="wrap">
  <section class="hero">
    <div class="brand">
      <div class="logo">AF</div>
      <div>
        <h3>AcademeForge</h3>
        <p>Build. Learn. Launch. — Modern learning platform</p>
      </div>
    </div>

    <h1><span class="glow">Coming</span> <span>Soon</span></h1>
    <div class="sub">A new space for builders and learners — courses, projects and mentorship.</div>
    <div class="typing" id="typing">Preparing the classroom of the future...</div>

    <div class="count">
      <div class="seg" id="cd-days">00d</div>
      <div class="seg" id="cd-hours">00h</div>
      <div class="seg" id="cd-mins">00m</div>
      <div class="seg" id="cd-secs">00s</div>
    </div>

    <div class="muted">Get early access, resources and launch updates directly in your inbox.</div>
  </section>

  <aside class="card-wrap">
    <div class="card" id="card">
      <!-- FRONT -->
      <div class="side front">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="title">AcademeForge</div>
            <div class="muted">Early access & pilot programs</div>
          </div>
          <div class="chip">Beta</div>
        </div>

        <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column">
          <div style="font-size:72px;font-weight:800;color:transparent;-webkit-background-clip:text;background:linear-gradient(90deg,var(--accent-1),var(--accent-2));line-height:1">AF</div>
          <div class="flip-hint">Click card to see more →</div>
        </div>

        <div style="display:flex;gap:10px;justify-content:space-between;align-items:center">
          <div class="muted">Join waitlist for launch perks</div>
          <div style="font-size:12px;color:#8ea8c7">v0.9</div>
        </div>
      </div>

      <!-- BACK -->
      <div class="side back">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="title">Get Updates</div>
            <div class="muted">We’ll notify you when we go live</div>
          </div>
          <div class="chip">Notify</div>
        </div>

        <div style="margin-top:18px;font-size:14px;color:#cfe7ff">
          Early features: curated courses, project labs, mentor sessions, micro-credentials and community projects.
        </div>

        <div class="footer">
          <div class="muted">Or join us on</div>
          <div style="display:flex;gap:8px">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</div>

<script>
// Typing text
const typingEl = document.getElementById('typing');
const messages = [
  'Preparing the classroom of the future...',
  'Designing hands-on projects',
  'Onboarding mentors & instructors',
  'Curating career-ready curricula'
];
let mi=0, ti=0;
function typeLoop(){
  const msg = messages[mi];
  typingEl.textContent = msg.slice(0, ti);
  ti++;
  if(ti > msg.length){setTimeout(()=>{ti=0;mi=(mi+1)%messages.length;typeLoop();},1200);}
  else setTimeout(typeLoop,50+Math.random()*40);
}
typeLoop();

// Countdown
const target = new Date(); target.setDate(target.getDate()+18);
function updateCountdown(){
  const now = new Date();
  const diff = Math.max(0,target-now);
  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor(diff/(1000*60*60)%24);
  const m = Math.floor(diff/(1000