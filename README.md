
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AcademeForge — Coming Soon</title>
  <meta name="description" content="AcademeForge — modern education platform. Coming soon." />
  <style>
    :root{
      --bg-1:#0b1220; --bg-2:#071029; --accent-1:#00f5a0; --accent-2:#7c5cff; --glass: rgba(255,255,255,0.04);
      --glass-2: rgba(255,255,255,0.02);
      --mono: 'SFMono-Regular', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      background: radial-gradient(1200px 600px at 10% 10%, rgba(124,92,255,0.06), transparent 6%),
                  radial-gradient(800px 500px at 90% 90%, rgba(0,245,160,0.04), transparent 8%),
                  linear-gradient(180deg,var(--bg-1),var(--bg-2));
      color:#e6eef8; overflow:hidden; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      display:flex;align-items:center;justify-content:center;padding:40px;
    }

    /* Container */
    .wrap{position:relative;max-width:1100px;width:100%;display:grid;grid-template-columns:1fr 420px;gap:32px;align-items:center}

    /* Left hero */
    .hero{
      padding:36px 28px;border-radius:16px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      box-shadow: 0 10px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
      min-height:420px;backdrop-filter: blur(6px);position:relative;overflow:hidden;
    }

    .brand{
      display:flex;align-items:center;gap:14px;margin-bottom:18px
    }
    .logo{
      width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent-2),var(--accent-1));
      display:grid;place-items:center;font-weight:800;color:#021018;font-size:18px;box-shadow:0 6px 30px rgba(124,92,255,0.12);
    }
    .brand h3{margin:0;font-size:20px}
    .brand p{margin:0;color:#9fb1c9;font-size:13px}

    h1{font-size:44px;margin:6px 0 8px;line-height:1.02}
    .accent{background:linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip:text;color:transparent}
    .sub{color:#a8bacf;margin-top:8px;font-size:16px}

    /* Code rain background */
    .code-rain{position:absolute;inset:0;pointer-events:none;opacity:0.18;font-family:var(--mono);font-size:12px;line-height:20px;color:#7fffd4}
    .code-rain pre{position:absolute;white-space:nowrap}

    /* Flip card */
    .card-wrap{perspective:1200px}
    .card{width:100%;max-width:420px;height:420px;margin:0 auto;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(.2,.9,.3,1);position:relative}
    .card.is-flipped{transform:rotateY(180deg)}
    .side{position:absolute;inset:0;border-radius:14px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));backdrop-filter:blur(6px);box-shadow:0 12px 40px rgba(2,6,23,0.6);padding:26px;display:flex;flex-direction:column}
    .side.back{transform:rotateY(180deg)}
    .card .title{font-size:20px;font-weight:700}
    .muted{color:#9fb1c9;font-size:13px}

    /* Animated headline */
    .glow{font-weight:800;background:linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip:text;color:transparent;text-shadow:0 10px 40px rgba(124,92,255,0.08)}
    .typing{font-family:var(--mono);font-size:16px;color:#9fb1c9;margin-top:10px}

    /* form */
    .field{display:flex;gap:10px;margin-top:auto}
    input[type=email]{flex:1;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:#e6eef8;font-size:14px}
    button.cta{padding:10px 14px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent-2),var(--accent-1));color:#021018;font-weight:700;cursor:pointer}

    .info{margin-top:12px;font-size:13px;color:#93a8bd}

    /* small utility */
    .row{display:flex;gap:10px;align-items:center}
    .chip{padding:6px 10px;border-radius:999px;background:var(--glass);font-size:12px;color:#bcd3e6}

    /* footer for card */
    .footer{display:flex;gap:10px;align-items:center;margin-top:14px}

    /* particles */
    .particle{position:absolute;border-radius:50%;filter:blur(6px);opacity:0.16}

    /* responsive */
    @media(max-width:980px){.wrap{grid-template-columns:1fr;gap:18px}.card{max-width:520px;height:380px}.hero{min-height:380px}}

    /* micro interactions */
    .flip-hint{font-size:12px;color:#8ea8c7;margin-top:10px}

    /* countdown */
    .count{display:flex;gap:8px;margin-top:14px}
    .count .seg{background:var(--glass);padding:8px 12px;border-radius:8px;font-family:var(--mono);font-weight:700}

  </style>
</head>
<body>
  <div class="wrap">
    <!-- LEFT: Hero + code rain -->
    <section class="hero">
      <div class="brand">
        <div class="logo">AF</div>
        <div>
          <h3>AcademeForge</h3>
          <p>Build. Learn. Launch. — Modern learning platform</p>
        </div>
      </div>

      <h1><span class="glow">Coming</span> <span style="display:block">Soon</span></h1>
      <div class="sub">A new space for builders and learners — courses, projects and mentorship.</div>

      <div class="typing" id="typing">Preparing the classroom of the future...</div>

      <div class="count">
        <div class="seg" id="cd-days">00d</div>
        <div class="seg" id="cd-hours">00h</div>
        <div class="seg" id="cd-mins">00m</div>
        <div class="seg" id="cd-secs">00s</div>
      </div>

      <div class="info">Get early access, resources and launch updates directly in your inbox.</div>

      <!-- subtle particles -->
      <div class="particle" style="width:140px;height:140px;right:-40px;top:-40px;background:linear-gradient(135deg,var(--accent-2),var(--accent-1));opacity:0.07"></div>
      <div class="particle" style="width:90px;height:90px;left:-20px;bottom:-20px;background:linear-gradient(135deg,#00f5a0,#7c5cff);opacity:0.06"></div>

      <!-- code rain overlay -->
      <div class="code-rain" aria-hidden>
        <!-- JS will inject multiple pre blocks here -->
      </div>

    </section>

    <!-- RIGHT: Flip Card -->
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
            <div class="row">
              <div style="font-size:12px;color:#8ea8c7">v0.9</div>
            </div>
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

          <div style="margin-top:18px;font-size:14px;color:#cfe7ff">Early features: curated courses, project labs, mentor sessions, micro-credentials and community projects.</div>

          <form id="notify-form" style="margin-top:18px;display:flex;flex-direction:column;gap:10px" onsubmit="handleForm(event)">
            <input type="email" id="email" placeholder="your@email.com" required />
            <div style="display:flex;gap:8px">
              <button class="cta" type="submit">Notify me</button>
              <button type="button" onclick="flipCard()" style="padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:#d6ecff">Back</button>
            </div>
          </form>

          <div class="footer">
            <div class="muted">Or join us on</div>
            <div style="display:flex;gap:8px">
              <a href="#" class="chip">Twitter</a>
              <a href="#" class="chip">LinkedIn</a>
            </div>
          </div>
        </div>

      </div>
    </aside>
  </div>

  <script>
    /* ----------------- Code rain generation ----------------- */
    const codeRain = document.querySelector('.code-rain');
    const lines = 18; // number of columns
    const charset = '01<>\/{}[]()=+-_*;:,.$%#@abcdefghijklmnopqrstuvwxyz0123456789';

    function makePre(x, delay){
      const pre = document.createElement('pre');
      pre.style.left = x + '%';
      pre.style.top = Math.random()*14 + '%';
      pre.style.opacity = 0.9;
      pre.style.transform = 'translateY(-10%)';
      pre.style.animation = `fall ${9 + Math.random()*8}s linear ${delay}s infinite`;
      pre.textContent = Array.from({length: 40}, ()=> charset.charAt(Math.floor(Math.random()*charset.length))).join('');
      return pre;
    }

    for(let i=0;i<lines;i++){
      const pre = makePre((i/(lines-1))*100, Math.random()*4);
      codeRain.appendChild(pre);
    }

    // update rain occasionally to vary characters
    setInterval(()=>{
      document.querySelectorAll('.code-rain pre').forEach(pre=>{
        if(Math.random() > 0.6) pre.textContent = Array.from({length: 30 + Math.floor(Math.random()*30)}, ()=> charset.charAt(Math.floor(Math.random()*charset.length))).join('');
      })
    }, 2200);

    // fall keyframes (dynamically because we used random durations)
    const style = document.createElement('style');
    style.textContent = `@keyframes fall{0%{transform:translateY(-10%);opacity:0}10%{opacity:0.5}50%{opacity:0.9}100%{transform:translateY(120%);opacity:0}}`;
    document.head.appendChild(style);

    /* ----------------- Typing headline ----------------- */
    const typingEl = document.getElementById('typing');
    const messages = ['Preparing the classroom of the future...', 'Designing hands-on projects', 'Onboarding mentors & instructors', 'Curating career-ready curricula'];
    let mi=0, ti=0;
    function typeLoop(){
      const msg = messages[mi];
      typingEl.textContent = msg.slice(0, ti);
      ti++;
      if(ti > msg.length){
        setTimeout(()=>{ti=0;mi=(mi+1)%messages.length;typeLoop();},1200);
      } else setTimeout(typeLoop, 50 + Math.random()*40);
    }
    typeLoop();

    /* ----------------- Countdown ----------------- */
    // Example: set a target date (you can change exact date here)
    const target = new Date(); target.setDate(target.getDate()+18); // 18 days from now

    function updateCountdown(){
      const now = new Date();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor(diff / (1000*60*60) % 24);
      const m = Math.floor(diff / (1000*60) % 60);
      const s = Math.floor(diff / 1000 % 60);
      document.getElementById('cd-days').textContent = String(d).padStart(2,'0')+'d';
      document.getElementById('cd-hours').textContent = String(h).padStart(2,'0')+'h';
      document.getElementById('cd-mins').textContent = String(m).padStart(2,'0')+'m';
      document.getElementById('cd-secs').textContent = String(s).padStart(2,'0')+'s';
    }
    setInterval(updateCountdown,1000);updateCountdown();

    /* ----------------- Flip card logic ----------------- */
    const card = document.getElementById('card');
    function flipCard(){ card.classList.toggle('is-flipped'); }
    card.addEventListener('click', (e)=>{
      // only flip when clicking center area, not buttons/links
      if(e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase()==='a' || e.target.tagName.toLowerCase()==='input') return;
      flipCard();
    });

    /* ----------------- Form handling (placeholder) ----------------- */
    function handleForm(e){
      e.preventDefault();
      const em = document.getElementById('email');
      if(!em.value) return alert('Please enter email');
      // demo success
      em.value = '';
      alert('Thanks — we\'ll notify you at the provided email (demo).');
    }

    /* ----------------- Accessibility: keyboard flip ----------------- */
    document.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && document.activeElement === document.body) flipCard(); });

  </script>
</body>
</html>



with ❤️ from AcademeForge 