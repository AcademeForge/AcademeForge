<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AcademeForge — Coming Soon</title>
  <meta name="description" content="AcademeForge — modern education platform. Coming soon." />
  <style>
    :root{
      --bg-1:#0b1220; --bg-2:#071029; --accent-1:#00f5a0; --accent-2:#7c5cff; --glass: rgba(255,255,255,0.04);
      --mono: 'SFMono-Regular', ui-monospace, Menlo, Monaco, 'Roboto Mono', monospace;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%}
    body{
      margin:0; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      background: radial-gradient(1200px 600px at 10% 10%, rgba(124,92,255,0.06), transparent 6%),
                  radial-gradient(800px 500px at 90% 90%, rgba(0,245,160,0.04), transparent 8%),
                  linear-gradient(180deg,var(--bg-1),var(--bg-2));
      color:#e6eef8; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      display:flex;align-items:center;justify-content:center;padding:16px;
    }

    /* Container */
    .wrap{
      position:relative;
      width:100%;
      max-width:600px;
    }

    /* Hero box */
    .hero{
      padding:28px 20px;
      border-radius:16px;
      background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      box-shadow: 0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
      min-height:380px;
      backdrop-filter: blur(6px);
      position:relative;
      overflow:hidden;
    }

    .brand{display:flex;align-items:center;gap:12px;margin-bottom:14px}
    .logo{
      width:48px;height:48px;border-radius:12px;
      background:linear-gradient(135deg,var(--accent-2),var(--accent-1));
      display:grid;place-items:center;font-weight:800;color:#021018;font-size:16px;
      box-shadow:0 4px 20px rgba(124,92,255,0.12);
    }
    .brand h3{margin:0;font-size:18px}
    .brand p{margin:0;color:#9fb1c9;font-size:12px}

    h1{font-size:32px;margin:6px 0 8px;line-height:1.1;text-align:left}
    .glow{font-weight:800;background:linear-gradient(90deg,var(--accent-1),var(--accent-2));
      -webkit-background-clip:text;color:transparent;text-shadow:0 6px 20px rgba(124,92,255,0.08)}
    .sub{color:#a8bacf;margin-top:6px;font-size:14px;line-height:1.4}

    /* typing */
    .typing{font-family:var(--mono);font-size:13px;color:#9fb1c9;margin-top:10px}

    /* countdown */
    .count{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
    .count .seg{background:var(--glass);padding:6px 10px;border-radius:8px;font-family:var(--mono);font-size:13px;font-weight:700}

    .info{margin-top:12px;font-size:12px;color:#93a8bd;line-height:1.4}

    /* Code rain background */
    .code-rain{position:absolute;inset:0;pointer-events:none;opacity:0.18;font-family:var(--mono);font-size:10px;line-height:16px;color:#7fffd4}
    .code-rain pre{position:absolute;white-space:nowrap}

    /* particles */
    .particle{position:absolute;border-radius:50%;filter:blur(6px);opacity:0.16}

    /* Larger screens */
    @media(min-width:768px){
      h1{font-size:44px}
      .sub{font-size:16px}
      .typing{font-size:15px}
      .count .seg{font-size:14px;padding:8px 12px}
      .info{font-size:13px}
    }
  </style>
</head>
<body>
  <div class="wrap">
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
      <div class="particle" style="width:120px;height:120px;right:-30px;top:-30px;background:linear-gradient(135deg,var(--accent-2),var(--accent-1));opacity:0.07"></div>
      <div class="particle" style="width:80px;height:80px;left:-20px;bottom:-20px;background:linear-gradient(135deg,#00f5a0,#7c5cff);opacity:0.06"></div>

      <!-- code rain overlay -->
      <div class="code-rain" aria-hidden></div>
    </section>
  </div>

  <script>
    /* Code rain */
    const codeRain = document.querySelector('.code-rain');
    const lines = 14;
    const charset = '01<>\\/{}[]()=+-_*;:,.$%#@abcdefghijklmnopqrstuvwxyz0123456789';
    function makePre(x, delay){
      const pre = document.createElement('pre');
      pre.style.left = x + '%';
      pre.style.top = Math.random()*14 + '%';
      pre.style.opacity = 0.9;
      pre.style.transform = 'translateY(-10%)';
      pre.style.animation = `fall ${8 + Math.random()*6}s linear ${delay}s infinite`;
      pre.textContent = Array.from({length: 30}, ()=> charset.charAt(Math.floor(Math.random()*charset.length))).join('');
      return pre;
    }
    for(let i=0;i<lines;i++){
      const pre = makePre((i/(lines-1))*100, Math.random()*4);
      codeRain.appendChild(pre);
    }
    setInterval(()=>{
      document.querySelectorAll('.code-rain pre').forEach(pre=>{
        if(Math.random() > 0.6) pre.textContent = Array.from({length: 20 + Math.floor(Math.random()*20)}, ()=> charset.charAt(Math.floor(Math.random()*charset.length))).join('');
      })
    }, 2200);
    const style = document.createElement('style');
    style.textContent = `@keyframes fall{0%{transform:translateY(-10%);opacity:0}10%{opacity:0.5}50%{opacity:0.9}100%{transform:translateY(120%);opacity:0}}`;
    document.head.appendChild(style);

    /* Typing */
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

    /* Countdown */
    const target = new Date(); target.setDate(target.getDate()+18);
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
  </script>
</body>
</html>