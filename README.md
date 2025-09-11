
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AcademeForge — Coming Soon</title>
  <style>
    :root{
      --bg-1:#0b1220; --bg-2:#071029;
      --accent-1:#00f5a0; --accent-2:#7c5cff;
      --glass: rgba(255,255,255,0.04);
      --mono: 'SFMono-Regular', ui-monospace, Menlo, Monaco, 'Courier New', monospace;
    }
    *{box-sizing:border-box}
    html,body{height:100%;margin:0;padding:0;overflow:hidden;font-family:Inter,system-ui,sans-serif;}
    body{display:flex;align-items:center;justify-content:center;color:#e6eef8;}

    /* Canvas background */
    canvas#matrix {
      position: fixed;
      top:0;left:0;
      width:100%;height:100%;
      background:black;
      z-index:-1;
    }

    /* Layout */
    .wrap{position:relative;max-width:1100px;width:100%;display:grid;grid-template-columns:1fr 420px;gap:32px;align-items:center;z-index:2}

    .hero{
      padding:36px 28px;border-radius:16px;
      background:rgba(255,255,255,0.02);
      box-shadow:0 10px 40px rgba(2,6,23,0.6);
      min-height:420px;backdrop-filter:blur(6px);
    }
    .brand{display:flex;align-items:center;gap:14px;margin-bottom:18px}
    .logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent-2),var(--accent-1));display:grid;place-items:center;font-weight:800;color:#021018;font-size:18px}
    .brand h3{margin:0;font-size:20px}
    .brand p{margin:0;color:#9fb1c9;font-size:13px}
    h1{font-size:44px;margin:6px 0 8px;line-height:1.02}
    .accent{background:linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip:text;color:transparent}
    .sub{color:#a8bacf;margin-top:8px;font-size:16px}
    .typing{font-family:var(--mono);font-size:16px;color:#9fb1c9;margin-top:10px}
    .count{display:flex;gap:8px;margin-top:14px}
    .count .seg{background:var(--glass);padding:8px 12px;border-radius:8px;font-family:var(--mono);font-weight:700}

    /* Card flip */
    .card-wrap{perspective:1200px}
    .card{width:100%;max-width:420px;height:420px;margin:0 auto;transform-style:preserve-3d;transition:transform 0.9s cubic-bezier(.2,.9,.3,1);position:relative}
    .card.is-flipped{transform:rotateY(180deg)}
    .side{position:absolute;inset:0;border-radius:14px;background:rgba(255,255,255,0.02);backdrop-filter:blur(6px);box-shadow:0 12px 40px rgba(2,6,23,0.6);padding:26px;display:flex;flex-direction:column}
    .side.back{transform:rotateY(180deg)}
    .card .title{font-size:20px;font-weight:700}
    .muted{color:#9fb1c9;font-size:13px}
    .chip{padding:6px 10px;border-radius:999px;background:var(--glass);font-size:12px;color:#bcd3e6}
    .flip-hint{font-size:12px;color:#8ea8c7;margin-top:10px}
    .footer{display:flex;gap:10px;align-items:center;margin-top:14px}
    .footer a{color:#9fb1c9;text-decoration:none}
  </style>
</head>
<body>
  <canvas id="matrix"></canvas>

  <div class="wrap">
    <!-- Left -->
    <section class="hero">
      <div class="brand">
        <div class="logo">AF</div>
        <div>
          <h3>AcademeForge</h3>
          <p>Build. Learn. Launch.</p>
        </div>
      </div>
      <h1><span class="accent">Coming</span> Soon</h1>
      <div class="sub">A new space for builders and learners — courses, projects and mentorship.</div>
      <div class="typing" id="typing">Preparing the classroom of the future...</div>
      <div class="count">
        <div class="seg" id="cd-days">00d</div>
        <div class="seg" id="cd-hours">00h</div>
        <div class="seg" id="cd-mins">00m</div>
        <div class="seg" id="cd-secs">00s</div>
      </div>
    </section>

    <!-- Right Card -->
    <aside class="card-wrap">
      <div class="card" id="card">
        <div class="side front">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div><div class="title">AcademeForge</div><div class="muted">Early access & pilot programs</div></div>
            <div class="chip">Beta</div>
          </div>
          <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column">
            <div style="font-size:72px;font-weight:800;color:transparent;-webkit-background-clip:text;background:linear-gradient(90deg,var(--accent-1),var(--accent-2));line-height:1">AF</div>
            <div class="flip-hint">Click card to see more →</div>
          </div>
        </div>
        <div class="side back">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div><div class="title">Get Updates</div><div class="muted">We’ll notify you when we go live</div></div>
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
    // Typing effect
    const typingEl = document.getElementById('typing');
    const messages = [
      'Preparing the classroom of the future...',
      'Designing hands-on projects',
      'Onboarding mentors & instructors',
      'Curating career-ready curricula'
    ];
    let mi=0, ti=0;
    function typeLoop(){
      const msg=messages[mi];
      typingEl.textContent = msg.slice(0,ti);
      ti++;
      if(ti>msg.length){setTimeout(()=>{ti=0;mi=(mi+1)%messages.length;typeLoop();},1200);}
      else setTimeout(typeLoop,50+Math.random()*40);
    }
    typeLoop();

    // Countdown
    const target = new Date(); target.setDate(target.getDate()+30);
    function updateCountdown(){
      const now = new Date(), diff=Math.max(0,target-now);
      const d=Math.floor(diff/(1000*60*60*24));
      const h=Math.floor((diff/(1000*60*60))%24);
      const m=Math.floor((diff/(1000*60))%60);
      const s=Math.floor((diff/1000)%60);
      document.getElementById('cd-days').textContent=d+'d';
      document.getElementById('cd-hours').textContent=h+'h';
      document.getElementById('cd-mins').textContent=m+'m';
      document.getElementById('cd-secs').textContent=s+'s';
    }
    setInterval(updateCountdown,1000); updateCountdown();

    // Flip card
    const card=document.getElementById('card');
    function flipCard(){card.classList.toggle('is-flipped');}
    card.addEventListener('click',e=>{
      if(['a','button'].includes(e.target.tagName.toLowerCase())) return;
      flipCard();
    });

    // Matrix Rain
    const canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d");
    canvas.height=window.innerHeight; canvas.width=window.innerWidth;
    const letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrix=letters.split("");
    const font_size=14; const columns=canvas.width/font_size;
    const drops=Array.from({length:columns}).fill(1);
    function draw(){
      ctx.fillStyle="rgba(0,0,0,0.05)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#0f0"; ctx.font=font_size+"px monospace";
      for(let i=0;i<drops.length;i++){
        const text=matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text,i*font_size,drops[i]*font_size);
        if(drops[i]*font_size>canvas.height&&Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
    }
    setInterval(draw,33);
  </script>
</body>
</html>