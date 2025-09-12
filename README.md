<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AcademeForge — Coming Soon</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --muted: #97b0c8;
    }
    body {
      background: linear-gradient(180deg, #020617, #0b1121);
      color: #e6eef8;
      font-family: Inter, system-ui, sans-serif;
      overflow-x: hidden;
    }
    /* gradient animated text */
    .grad-anim {
      background: linear-gradient(90deg, #00f5a0, #7c5cff, #00f5a0);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientMove 4s linear infinite;
    }
    @keyframes gradientMove {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    /* 3D card */
    .card-3d {
      perspective: 1200px;
      cursor: pointer;
    }
    .card-inner {
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(.2,.9,.3,1);
      position: relative;
    }
    .card-inner.is-flipped {
      transform: rotateY(180deg);
    }
    .card-front,
    .card-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .card-back {
      transform: rotateY(180deg);
    }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">

  <main class="max-w-6xl w-full space-y-12">
    <!-- Hero -->
    <section class="space-y-6 text-center">
      <div>
        <h1 class="grad-anim text-5xl lg:text-6xl font-extrabold">Coming Soon</h1>
        <p class="mt-3 text-lg text-[--muted]">
          A new space for builders and learners — courses, projects and mentorship.
        </p>
      </div>

      <!-- animated dots -->
      <div class="mt-4 flex justify-center gap-2">
        <div class="h-2 w-2 rounded-full bg-[#caa0ff] opacity-80 animate-bounce"></div>
        <div class="h-2 w-2 rounded-full bg-[#b2ffd8] opacity-60 animate-bounce [animation-delay:200ms]"></div>
        <div class="h-2 w-2 rounded-full bg-[#a9b6ff] opacity-60 animate-bounce [animation-delay:400ms]"></div>
        <div class="h-2 w-2 rounded-full bg-[#ffb5f0] opacity-50 animate-bounce [animation-delay:600ms]"></div>
      </div>

      <!-- Countdown -->
      <div class="flex justify-center gap-4 text-center font-mono">
        <div><span id="days" class="block text-3xl font-bold">00</span><span class="text-[--muted] text-sm">Days</span></div>
        <div><span id="hours" class="block text-3xl font-bold">00</span><span class="text-[--muted] text-sm">Hours</span></div>
        <div><span id="mins" class="block text-3xl font-bold">00</span><span class="text-[--muted] text-sm">Minutes</span></div>
        <div><span id="secs" class="block text-3xl font-bold">00</span><span class="text-[--muted] text-sm">Seconds</span></div>
      </div>
    </section>

    <!-- Cards -->
    <aside class="grid lg:grid-cols-2 gap-8">
      <!-- Card 1 -->
      <div class="card-3d">
        <div id="cardInner1" class="card-inner rounded-2xl shadow-lg bg-[rgba(255,255,255,0.02)] w-full min-h-[380px]">
          <!-- front -->
          <div class="card-front p-6">
            <h2 class="text-xl font-bold grad-anim">AcademeForge</h2>
            <p class="mt-3 text-[--muted]">Early access & pilot programs</p>
            <div class="flex-1 flex items-center justify-center">
              <span class="text-6xl font-black grad-anim">AF</span>
            </div>
            <p class="text-sm text-[--muted]">Click to flip →</p>
          </div>
          <!-- back -->
          <div class="card-back p-6">
            <h2 class="text-xl font-bold grad-anim">Get Updates</h2>
            <p class="mt-3 text-[--muted]">
              As a new and evolving platform, AcademeForge is still refining its
              scope and reliability to ensure the highest quality.
            </p>
          </div>
        </div>
        <p class="mt-4 text-center text-[--muted] text-sm">
          Building the bridge between knowledge and creation.
        </p>
      </div>

      <!-- Card 2 -->
      <div class="card-3d">
        <div id="cardInner2" class="card-inner rounded-2xl shadow-lg bg-[rgba(255,255,255,0.02)] w-full min-h-[380px]">
          <!-- front -->
          <div class="card-front p-6">
            <h2 class="text-xl font-bold grad-anim">Changing the Future of Education</h2>
            <p class="mt-3 text-[--muted]">
              AcademeForge is creating a next-gen learning ecosystem.
            </p>
            <div class="flex-1 flex items-center justify-center">
              <span class="text-sm text-[--muted]">Click to flip →</span>
            </div>
          </div>
          <!-- back -->
          <div class="card-back p-6">
            <h2 class="text-xl font-bold grad-anim">AcademeForge</h2>
            <p class="mt-3 text-[--muted]">
              Redefining learning for builders, creators, and dreamers. Our mission:
              empower you with skills that truly matter.
            </p>
            <div class="flex-1 flex items-end justify-center">
              <span class="text-sm text-[--muted]">Press Esc to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Socials -->
    <footer class="text-center space-x-4 mt-10">
      <span class="text-[--muted]">Follow for updates:</span>
      <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" class="text-[#97b0c8] hover:text-white">Telegram</a>
      <a href="https://www.instagram.com/academeforge.in" target="_blank" class="text-[#97b0c8] hover:text-white">Instagram</a>
    </footer>
  </main>

  <script>
    // countdown
    const target = new Date(); target.setDate(target.getDate() + 28);
    function updateCountdown(){
      const now = new Date().getTime();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000*60*60*24));
      diff %= 1000*60*60*24;
      const h = Math.floor(diff / (1000*60*60));
      diff %= 1000*60*60;
      const m = Math.floor(diff / (1000*60));
      diff %= 1000*60;
      const s = Math.floor(diff / 1000);
      document.getElementById("days").textContent = d;
      document.getElementById("hours").textContent = h;
      document.getElementById("mins").textContent = m;
      document.getElementById("secs").textContent = s;
    }
    setInterval(updateCountdown,1000);

    // flip cards
    function setupCard(id){
      const el = document.getElementById(id);
      el.addEventListener("click", ()=> el.classList.toggle("is-flipped"));
      document.addEventListener("keydown",(e)=>{
        if(e.key==="Escape" && el.classList.contains("is-flipped")){
          el.classList.remove("is-flipped");
        }
      });
    }
    setupCard("cardInner1");
    setupCard("cardInner2");
  </script>
</body>
</html>