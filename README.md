<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>AcademeForge — Coming Soon</title>
  <meta name="description" content="AcademeForge — modern learning platform. Coming soon." />
  <!-- Tailwind Play CDN (good for prototypes) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* small custom additions */
    :root{
      --accent-from: #06f5a0;
      --accent-to: #7c5cff;
      --muted: #94adc4;
      --glass: rgba(255,255,255,0.04);
    }

    /* animated gradient for headline */
    .grad-anim {
      background: linear-gradient(90deg, var(--accent-from), var(--accent-to), #00d4ff);
      background-size: 300% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: shift 6s linear infinite;
      text-shadow: 0 18px 48px rgba(124,92,255,0.08);
    }
    @keyframes shift {
      0%{ background-position:0% 50% } 100%{ background-position:100% 50% }
    }

    /* floating subtle dots */
    .float-dot {
      width:6px; height:6px; border-radius:999px; background:rgba(255,255,255,0.12);
      position:absolute; opacity:0.9;
      animation: floaty 6s ease-in-out infinite;
    }
    @keyframes floaty {
      0%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } 100%{ transform: translateY(0) }
    }

    /* glass card flip */
    .card-3d { perspective:1200px; }
    .card-inner {
      transform-style:preserve-3d;
      transition: transform 0.8s cubic-bezier(.16,.9,.3,1);
    }
    .card-front, .card-back {
      backface-visibility:hidden;
      -webkit-backface-visibility:hidden;
      transform-style:preserve-3d;
    }
    .card-back { transform: rotateY(180deg); }

    /* small neon outline on hover */
    .neon-outline:hover { box-shadow: 0 8px 28px rgba(124,92,255,0.12), inset 0 1px 0 rgba(255,255,255,0.02); }

    /* simple responsive tweaks for demo */
    @media (prefers-reduced-motion: reduce){
      .grad-anim, .float-dot, .card-inner { animation: none !important; transition: none !important; }
    }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-b from-[#050617] to-[#071029] text-slate-100 antialiased flex items-center justify-center p-6">
  <!-- floating dots (decor) -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="float-dot" style="left:6%;top:18%; animation-delay:0s"></div>
    <div class="float-dot" style="left:88%;top:12%; animation-delay:1.2s; opacity:0.7;"></div>
    <div class="float-dot" style="left:20%;top:78%; animation-delay:2.1s; opacity:0.5;"></div>
    <div class="float-dot" style="left:70%;top:66%; animation-delay:0.6s; opacity:0.6;"></div>
    <div class="float-dot" style="left:50%;top:6%; animation-delay:3s; opacity:0.5;"></div>
  </div>

  <main class="relative z-10 w-full max-w-6xl grid lg:grid-cols-[1fr_420px] gap-8 items-start">
    <!-- LEFT: hero panel -->
    <section class="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] backdrop-blur rounded-2xl p-8 lg:p-12 shadow-[0_20px_80px_rgba(2,6,23,0.7)]">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-xl grid place-items-center font-extrabold text-slate-900"
             style="background:linear-gradient(135deg,#7c5cff,#06f5a0); box-shadow:0 16px 60px rgba(124,92,255,0.12);">
          AF
        </div>
        <div>
          <h3 id="title" class="text-lg font-semibold">AcademeForge</h3>
          <p class="text-sm text-[--muted]">Build. Learn. Launch. — Modern learning platform</p>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-end gap-4 flex-wrap">
          <h1 class="grad-anim text-5xl lg:text-6xl font-extrabold leading-tight">Coming</h1>
          <div class="text-3xl lg:text-4xl font-bold text-slate-200">Soon</div>
        </div>

        <p class="mt-4 text-[--muted] max-w-3xl">A new space for builders and learners — courses, projects and mentorship.</p>

        <!-- typing -->
        <div class="mt-6 flex items-center gap-3 flex-wrap">
          <div id="typing" class="font-mono text-slate-300 text-sm min-w-[220px]"></div>
          <div class="ml-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[linear-gradient(90deg,#07f3b0,#7c5cff)] text-slate-900">Beta</div>
        </div>

        <!-- decorative dots -->
        <div class="mt-6 flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-[#caa0ff] opacity-80 animate-pulse"></div>
          <div class="h-2 w-2 rounded-full bg-[#b2ffd8] opacity-60 animate-pulse delay-200"></div>
          <div class="h-2 w-2 rounded-full bg-[#a9b6ff] opacity-60 animate-pulse delay-400"></div>
          <div class="h-2 w-2 rounded-full bg-[#ffb5f0] opacity-50 animate-pulse delay-600"></div>
        </div>

        <!-- countdown (decorative only) -->
        <div class="mt-8 grid grid-cols-4 gap-4 w-full max-w-md">
          <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 text-center">
            <div id="days" class="text-2xl font-extrabold">00</div>
            <div class="text-xs text-[--muted] mt-1">DAYS</div>
          </div>
          <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 text-center">
            <div id="hours" class="text-2xl font-extrabold">00</div>
            <div class="text-xs text-[--muted] mt-1">HOURS</div>
          </div>
          <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 text-center">
            <div id="minutes" class="text-2xl font-extrabold">00</div>
            <div class="text-xs text-[--muted] mt-1">MINUTES</div>
          </div>
          <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 text-center">
            <div id="seconds" class="text-2xl font-extrabold">00</div>
            <div class="text-xs text-[--muted] mt-1">SECONDS</div>
          </div>
        </div>

        <!-- quote -->
        <blockquote class="mt-6 border-l-2 border-slate-700 pl-4 text-slate-200">
          "As a new and evolving platform, AcademeForge is refining the scope and reliability of its assessments and certifications to ensure the highest quality experience."
        </blockquote>
      </div>
    </section>

    <!-- RIGHT: flip card -->
    <aside class="card-3d">
      <div id="cardInner" class="card-inner rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] shadow-[0_30px_90px_rgba(2,6,23,0.7)] w-full max-w-[420px] min-h-[420px]">
        <!-- FRONT -->
        <div id="cardFront" class="card-front p-6 rounded-2xl">
          <div class="flex items-center gap-3">
            <div class="font-bold text-lg">AcademeForge</div>
            <div class="ml-auto text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-[#06f5a0] to-[#7c5cff] text-slate-900">Beta</div>
          </div>

          <div class="flex-1 flex flex-col items-center justify-center text-center mt-6">
            <div class="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#06f5a0] to-[#7c5cff] drop-shadow-[0_30px_100px_rgba(124,92,255,0.07)]">AF</div>
            <p class="mt-4 text-[--muted] max-w-xs">Designing hands-on projects, onboarding mentors, and curating career-ready curricula.</p>
            <div class="mt-4 text-[--muted] text-sm">Click / tap / press Enter to flip →</div>
          </div>

          <div class="mt-6 flex items-center justify-between text-[--muted]">
            <div>Visual preview only</div>
            <div class="text-xs">v0.9</div>
          </div>
        </div>

        <!-- BACK -->
        <div id="cardBack" class="card-back p-6 rounded-2xl transform rotate-y-180 hidden">
          <div class="flex items-center gap-3">
            <div class="font-bold text-lg">Get Updates</div>
            <div class="ml-auto text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-[#06f5a0] to-[#7c5cff] text-slate-900">v0.9</div>
          </div>

          <div class="mt-6 text-[--muted] text-sm">
            <p>AcademeForge focuses on:</p>
            <ul class="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Project-first learning</strong> — real deliverables for portfolios.</li>
              <li><strong>Mentor-led cohorts</strong> for hands-on guidance.</li>
              <li><strong>Applied assessment</strong> tied to practical outcomes.</li>
            </ul>
          </div>

          <div class="mt-6 flex justify-center gap-3">
            <a class="px-4 py-2 rounded-md bg-[rgba(255,255,255,0.02)] text-[--muted]">Telegram</a>
            <a class="px-4 py-2 rounded-md bg-[rgba(255,255,255,0.02)] text-[--muted]">Instagram</a>
          </div>

          <div class="mt-6 text-center text-[--muted] text-sm">Press Esc to flip back</div>
        </div>
      </div>
    </aside>

    <!-- page-level socials -->
    <div class="col-span-full mt-6 flex items-center justify-center gap-6">
      <div class="text-[--muted]">Follow for updates:</div>
      <a class="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)] text-[--muted]" href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
      <a class="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)] text-[--muted]" href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
    </div>
  </main>

  <!-- small script: typing, countdown, flip -->
  <script>
    // Typing
    (function(){
      const lines = [
        'Preparing the classroom of the future...',
        'Designing hands-on projects',
        'Onboarding mentors & instructors',
        'Curating career-ready curricula'
      ];
      const el = document.getElementById('typing');
      let li=0, ci=0, deleting=false;
      function tick(){
        const line = lines[li];
        if(!deleting){
          ci++; el.textContent = line.slice(0,ci);
          if(ci===line.length){ deleting=true; setTimeout(tick,900); return; }
        } else {
          ci--; el.textContent = line.slice(0,ci);
          if(ci===0){ deleting=false; li=(li+1)%lines.length; }
        }
        setTimeout(tick, deleting?28: (28+Math.random()*30));
      }
      tick();
    })();

    // Countdown (decorative)
    (function(){
      // set target days ahead or specific date
      const target = new Date();
      target.setDate(target.getDate() + 00); // example value
      const elDays = document.getElementById('days'), elHours = document.getElementById('hours'), elMinutes = document.getElementById('minutes'), elSeconds = document.getElementById('seconds');
      function update(){
        const now = Date.now();
        let diff = Math.max(0, target - now);
        const days = Math.floor(diff / (1000*60*60*24)); diff %= (1000*60*60*24);
        const hours = Math.floor(diff / (1000*60*60)); diff %= (1000*60*60);
        const minutes = Math.floor(diff / (1000*60)); diff %= (1000*60);
        const seconds = Math.floor(diff / 1000);
        elDays.textContent = String(days).padStart(2,'0');
        elHours.textContent = String(hours).padStart(2,'0');
        elMinutes.textContent = String(minutes).padStart(2,'0');
        elSeconds.textContent = String(seconds).padStart(2,'0');
      }
      update(); setInterval(update,1000);
    })();

    // Card flip (works on desktop and mobile)
    (function(){
      const cardInner = document.getElementById('cardInner');
      const front = document.getElementById('cardFront');
      const back = document.getElementById('cardBack');
      let flipped = false;

      function setFlip(state){
        flipped = !!state;
        if(window.matchMedia('(max-width:900px)').matches){
          // mobile: simple show/hide
          front.style.display = flipped ? 'none' : 'block';
          back.style.display = flipped ? 'block' : 'none';
          cardInner.style.transform = 'none';
        } else {
          // desktop: 3D rotate
          cardInner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
          front.style.display = 'block'; back.style.display = 'block';
        }
      }

      // init
      setFlip(false);

      // click / keyboard
      document.getElementById('cardInner').addEventListener('click', (e) => {
        if(['A','BUTTON','INPUT'].includes(e.target.tagName)) return;
        setFlip(!flipped);
      });
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlip(!flipped); }
        if(e.key === 'Escape') setFlip(false);
      });

      // ensure proper state on resize
      window.addEventListener('resize', () => setFlip(false));
    })();
  </script>
</body>
</html>