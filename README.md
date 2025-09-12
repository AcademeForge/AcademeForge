
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>AcademeForge — Coming Soon</title>
<meta name="description" content="AcademeForge — Cinematic coming soon. Futuristic preview." />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  /* ================= base ================= */
  :root{
    --bg-1:#030417;
    --bg-2:#07041a;
    --muted:#9fb7cf;
    --accent-a:#00f5a0;
    --accent-b:#7c5cff;
    --glass: rgba(255,255,255,0.04);
    --mono: 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    --ease: cubic-bezier(.16,.9,.3,1);
    --maxw:1280px;
  }
  *{box-sizing:border-box}
  html,body{height:100%;margin:0;background:linear-gradient(180deg,var(--bg-1),var(--bg-2));font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;color:#eaf6ff;overflow:hidden}
  a{color:inherit}
  /* ================= canvas full screen ================= */
  #glCanvas, #fallbackCanvas { position:fixed; inset:0; width:100%; height:100%; z-index:0; display:block; }
  /* overlay UI stage */
  .stage { position:relative; z-index:5; width:100%; max-width:var(--maxw); margin:0 auto; padding:36px; display:grid; grid-template-columns: 1fr 460px; gap:34px; align-items:start; pointer-events:none; }
  /* glass panel container */
  .panel { backdrop-filter: blur(10px); background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:16px; box-shadow: 0 30px 120px rgba(0,0,0,0.6); padding:28px; pointer-events:auto; overflow:visible; }
  /* left hero */
  .hero { min-height:520px; display:flex; flex-direction:column; gap:14px; }
  .brand { display:flex; gap:12px; align-items:center; }
  .logo { width:68px; height:68px; border-radius:14px; display:grid; place-items:center; font-weight:900; color:#021018; background:linear-gradient(135deg,var(--accent-b),var(--accent-a)); box-shadow: 0 16px 80px rgba(124,92,255,0.14); font-size:22px; }
  .brand h3 { margin:0; font-size:18px; }
  .brand p { margin:0; color:var(--muted); font-size:13px; }
  /* headline cinematic */
  .headline { display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; margin-top:6px; }
  .coming { font-size:68px; font-weight:900; line-height:0.95; letter-spacing:-1px; margin:0; color:transparent; -webkit-background-clip:text; background-clip:text; background-image:linear-gradient(90deg,var(--accent-a),var(--accent-b),#00d4ff); background-size:300% 100%; animation: gradientShift 5s linear infinite; text-shadow: 0 40px 120px rgba(124,92,255,0.12); }
  .soon { font-size:36px; font-weight:700; color:#e6fff6; margin-left:8px; transform:translateY(2px); }
  @keyframes gradientShift { from{ background-position:0% 50% } to{ background-position:100% 50% } }
  .sub { color:var(--muted); font-size:16px; max-width:64ch; margin-top:6px; }
  /* big cine type reveal with glitch */
  .glitch-wrap { position:relative; margin-top:10px; }
  .glitch {
    font-family:var(--mono); font-size:18px; color:#9fb9d2; padding:10px 14px; border-radius:10px; background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); display:inline-block; box-shadow: 0 8px 40px rgba(2,6,23,0.35);
    overflow:hidden; position:relative;
  }
  .glitch::before, .glitch::after { content:attr(data-text); position:absolute; left:0; right:0; top:0; bottom:0; }
  .glitch::before { left:1px; text-shadow:-2px 0 #ff77d9; clip-path: inset(0 0 60% 0); opacity:0.7; transform:translateX(0.6px) }
  .glitch::after { left:-1px; text-shadow:2px 0 #7bffcf; clip-path: inset(40% 0 0 0); opacity:0.7; transform:translateX(-0.6px) }
  /* pulse & micro glitch */
  @keyframes microGlitch { 0%{ transform:translateX(0) } 20%{ transform:translateX(-1px) } 40%{ transform:translateX(1px) } 60%{ transform:translateX(-.6px) } 80%{ transform:translateX(.6px) } 100%{ transform:translateX(0) } }
  .glitch.anim { animation: microGlitch 3.2s linear infinite; }
  /* countdown style */
  .countdown { display:flex; gap:10px; margin-top:20px; flex-wrap:wrap; }
  .pill { font-family:var(--mono); background:rgba(255,255,255,0.03); padding:10px 14px; border-radius:12px; font-weight:800; min-width:64px; text-align:center; box-shadow: 0 10px 36px rgba(0,0,0,0.45); color:#e8fff7; }
  /* right side card */
  .side { min-height:520px; display:flex; align-items:center; justify-content:center; pointer-events:none; }
  .card-3d { width:100%; max-width:460px; min-height:520px; border-radius:16px; transform-style:preserve-3d; transition: transform .9s var(--ease); pointer-events:auto; position:relative; }
  .card-3d.is-flipped { transform: rotateY(180deg); }
  .face { position:absolute; inset:0; border-radius:16px; padding:22px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); box-shadow: 0 30px 120px rgba(0,0,0,0.6); backface-visibility:hidden; -webkit-backface-visibility:hidden; display:flex; flex-direction:column; overflow:hidden; }
  .face.back { transform: rotateY(180deg); }
  .af-holo { font-size:96px; font-weight:900; -webkit-background-clip:text; color:transparent; background-image:linear-gradient(90deg,var(--accent-a),var(--accent-b)); text-shadow: 0 48px 140px rgba(124,92,255,0.12); display:grid; place-items:center; animation: floaty 6s ease-in-out infinite; }
  @keyframes floaty { 0%{ transform:translateY(0) } 50%{ transform:translateY(-10px) } 100%{ transform:translateY(0) } }
  .chip { margin-left:auto; padding:8px 12px; border-radius:999px; font-weight:900; background:linear-gradient(90deg,var(--accent-a),var(--accent-b)); color:#021018; box-shadow:0 18px 64px rgba(124,92,255,0.12); }
  .card-info { flex:1; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; text-align:center; }
  .card-foot { display:flex; justify-content:space-between; align-items:center; margin-top:12px; color:var(--muted); font-size:13px; }
  .back-text { color:#dff6ff; font-size:14px; line-height:1.45; margin-top:12px; }
  .socials { display:flex; gap:10px; margin-top:18px; justify-content:center; flex-wrap:wrap; }
  .socials a { text-decoration:none; color:var(--muted); background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; pointer-events:auto; }

  /* footer socials */
  .page-socials { position:relative; z-index:6; display:flex; gap:12px; justify-content:center; align-items:center; padding:18px 0; color:var(--muted); font-size:14px; pointer-events:auto; }

  /* dramatic overlay lens / scanlines */
  .lens { position:fixed; inset:0; z-index:4; pointer-events:none; mix-blend-mode:overlay; opacity:0.35; background-image: radial-gradient(circle at 20% 10%, rgba(124,92,255,0.08), transparent 10%), radial-gradient(circle at 85% 80%, rgba(0,245,160,0.04), transparent 12%); }

  /* responsive */
  @media (max-width:1100px){ .stage{ grid-template-columns: 1fr 360px; gap:20px; padding:24px } .headline .coming{ font-size:56px } .af-holo{ font-size:78px } .card-3d{ max-width:380px; min-height:460px } }
  @media (max-width:900px){
    .stage{ grid-template-columns:1fr; padding:18px; gap:16px }
    .side{ min-height:auto }
    .card-3d{ transform:none !important; max-width:100%; min-height:360px }
    .card-3d.is-flipped{ transform:none; }
    .face{ position:relative; transform:none; backface-visibility:visible }
    .af-holo{ font-size:64px }
    .headline .coming{ font-size:44px }
  }
  @media (max-width:560px){
    .headline .coming{ font-size:36px } .af-holo{ font-size:48px } .typing{ font-size:14px } .pill{ min-width:48px; padding:8px 10px } .logo{ width:56px; height:56px }
  }

  /* accessibility reduced motion */
  @media (prefers-reduced-motion: reduce){ .card-3d, .af-holo, .coming, .glitch { animation:none !important; transition:none !important; } }
</style>
</head>
<body>
  <!-- Heavy WebGL canvas (Three.js). Fallback canvas available for low-power devices -->
  <canvas id="glCanvas" aria-hidden="true"></canvas>
  <canvas id="fallbackCanvas" aria-hidden="true" style="display:none"></canvas>

  <!-- dramatic lens overlay -->
  <div class="lens" aria-hidden="true"></div>

  <!-- UI overlay (glass panels) -->
  <main class="stage" role="main" aria-labelledby="title">
    <!-- left -->
    <section class="panel hero" aria-labelledby="title">
      <div class="brand">
        <div class="logo" aria-hidden>AF</div>
        <div>
          <h3 id="title">AcademeForge</h3>
          <p class="muted">Build. Learn. Launch. — Modern learning platform</p>
        </div>
      </div>

      <div class="headline" role="heading" aria-level="1">
        <div class="coming">Coming</div>
        <div class="soon">Soon</div>
      </div>

      <p class="sub">A new space for builders and learners — courses, projects and mentorship.</p>

      <div class="glitch-wrap">
        <div id="type" class="glitch anim" data-text="Preparing the classroom of the future...">Preparing the classroom of the future...</div>
      </div>

      <div class="countdown" aria-hidden="true">
        <div class="pill" id="pill-days">00d</div>
        <div class="pill" id="pill-hours">00h</div>
        <div class="pill" id="pill-mins">00m</div>
        <div class="pill" id="pill-secs">00s</div>
      </div>

      <blockquote>
        "As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users."
      </blockquote>
    </section>

    <!-- right -->
    <aside class="side panel" aria-hidden="false">
      <div class="card-3d" id="card" tabindex="0" role="button" aria-pressed="false" aria-label="Flip card to view details">
        <!-- front -->
        <div class="face front" id="front">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-weight:900;font-size:18px">AcademeForge</div>
            <div class="chip">Beta</div>
          </div>

          <div class="card-info">
            <div class="af-holo">AF</div>
            <div style="max-width:340px;color:var(--muted)">Designing hands-on projects · Onboarding mentors · Curating career-ready curricula</div>
            <div style="margin-top:8px;color:var(--muted);font-size:13px">Hover / Click / Press Enter to flip →</div>
          </div>

          <div class="card-foot">
            <div class="muted">Visual preview only</div>
            <div style="font-size:12px;color:var(--muted)">v0.9</div>
          </div>
        </div>

        <!-- back -->
        <div class="face back" id="back">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-weight:900;font-size:18px">Get Updates</div>
              <div class="muted" style="font-size:13px;margin-top:6px">Follow our socials for launch</div>
            </div>
            <div class="chip">v0.9</div>
          </div>

          <div class="back-text">
            As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users.
          </div>

          <div class="socials" aria-label="social links">
            <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
            <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
      </div>
    </aside>
  </main>

  <!-- page-level socials -->
  <div class="page-socials">
    <div class="muted">Follow for launch updates:</div>
    <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
    <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
  </div>

  <!-- load Three.js from CDN -->
  <script src="https://unpkg.com/three@0.162.0/build/three.min.js"></script>
  <script>
  /* ================== Heavily graphical Three.js scene ==================
     Features:
     - layered particle cloud (nebula) using points + custom sizes
     - moving fog planes for aurora-like streaks (shader-free approach with texture gradient)
     - additive blending for glow
     - performance fallback: if deviceMemory small or prefers-reduced-motion => simplified particle system on fallbackCanvas
  ===================================================================== */

  (function(){
    // heuristics
    const lowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.deviceMemory && navigator.deviceMemory < 1.5) || window.innerWidth < 700;
    const useThree = !lowPower && typeof THREE !== 'undefined';

    const glCanvas = document.getElementById('glCanvas');
    const fallbackCanvas = document.getElementById('fallbackCanvas');

    if(!useThree){
      // fallback simple particle animation on 2D canvas
      glCanvas.style.display = 'none';
      fallbackCanvas.style.display = 'block';
      simpleFallback(fallbackCanvas);
      return;
    }

    // --------------------- three.js scene setup ---------------------
    const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 80);

    // controls not needed — we add parallax via mouse

    // -------------------- particle cloud (nebula) --------------------
    const particles = new THREE.BufferGeometry();
    const count = Math.floor( Math.min(20000, (innerWidth*innerHeight) / 1000) ); // scale with screen
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for(let i=0;i<count;i++){
      const i3 = i*3;
      const radius = 80 + Math.random()*260;
      const phi = Math.random()*Math.PI;
      const theta = Math.random()*Math.PI*2;
      positions[i3] = Math.cos(theta) * Math.sin(phi) * radius * (0.6 + Math.random()*0.8);
      positions[i3+1] = Math.cos(phi) * radius * (0.2 + Math.random()*0.9) + (Math.random()-0.5)*20;
      positions[i3+2] = Math.sin(theta) * Math.sin(phi) * radius * (0.6 + Math.random()*0.8);
      // colors between teal -> purple -> cyan
      const t = Math.random();
      const r = (0.1 + 0.9 * (1 - t)) * (0.6 + Math.random()*0.6);
      const g = (0.4 + 0.6 * t) * (0.6 + Math.random()*0.6);
      const b = (0.6 + 0.4 * t) * (0.6 + Math.random()*0.6);
      colors[i3] = r; colors[i3+1] = g; colors[i3+2] = b;
      sizes[i] = 6 + Math.random()*18;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // texture for points (simple radial)
    const sprite = new THREE.TextureLoader().load('data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="white"/><stop offset="40%" stop-color="white" stop-opacity="0.9"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs>
        <rect width="100%" height="100%" fill="transparent"/>
        <circle cx="32" cy="32" r="30" fill="url(#g)"/>
      </svg>`
    ));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: { uTime: {value:0}, uPixelRatio:{value: renderer.getPixelRatio()} },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        uniform float uTime;
        uniform float uPixelRatio;
        void main(){
          vColor = color;
          vSize = size * (1.0 + 0.3 * sin(uTime*0.3 + position.x*0.02));
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = vSize * (uPixelRatio) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;
        uniform float uTime;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d);
          // subtle radial flicker
          float flick = 0.8 + 0.2 * sin(uTime*1.6 + gl_FragCoord.x*0.01);
          gl_FragColor = vec4(vColor * flick, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const cloud = new THREE.Points(particles, particleMat);
    scene.add(cloud);

    // -------------------- aurora planes (soft streaks) --------------------
    const auroraGroup = new THREE.Group();
    const auroraMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent:true, opacity:0.09, blending:THREE.AdditiveBlending, depthWrite:false });
    const planeGeo = new THREE.PlaneBufferGeometry(400, 120);
    for(let i=0;i<4;i++){
      const m = new THREE.Mesh(planeGeo, auroraMat.clone());
      m.rotation.x = -0.6 + (Math.random()-0.5)*0.15;
      m.position.set((Math.random()-0.5)*60, -40 + i*30, -150 + i*20);
      m.material.opacity = 0.04 + i*0.02;
      auroraGroup.add(m);
    }
    scene.add(auroraGroup);

    // subtle glow sphere
    const glowGeo = new THREE.IcosahedronBufferGeometry(18, 3);
    const glowMat = new THREE.MeshBasicMaterial({ color:0x7c5cff, transparent:true, opacity:0.07, blending:THREE.AdditiveBlending, depthWrite:false });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0,-30,-30);
    scene.add(glow);

    // small orbiting streaks
    const streakGeo = new THREE.TorusBufferGeometry(35, 0.6, 8, 120);
    const streakMat = new THREE.MeshBasicMaterial({ color:0x00f5a0, transparent:true, opacity:0.06, blending:THREE.AdditiveBlending });
    const streak = new THREE.Mesh(streakGeo, streakMat);
    streak.rotation.x = Math.PI*0.33;
    streak.position.set(0,-12,-60);
    scene.add(streak);

    // lighting (really subtle)
    const ambient = new THREE.AmbientLight(0xffffff, 0.12);
    scene.add(ambient);

    // handle resize
    function onResize(){
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth/innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // parallax on mouse
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    });

    // subtle time
    let t = 0;

    // render loop
    function animate(){
      t += 0.008;
      particleMat.uniforms.uTime.value = t;
      // rotate cloud slowly
      cloud.rotation.y += 0.0009;
      cloud.rotation.x = 0.05 * Math.sin(t*0.12);
      // aurora move
      auroraGroup.children.forEach((m,i)=>{
        m.position.x += Math.sin(t*0.4 + i) * 0.06;
        m.rotation.z = 0.05 * Math.sin(t*0.22 + i*0.4);
      });
      // glow breathe
      glow.material.opacity = 0.05 + 0.03 * Math.sin(t*0.9);
      streak.rotation.z += 0.002 + 0.001*Math.sin(t*0.6);
      // camera parallax
      camera.position.x += (mouseX*12 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY*8 - camera.position.y) * 0.04;
      camera.lookAt(0,0,