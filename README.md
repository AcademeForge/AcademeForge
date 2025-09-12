
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>AcademeForge — Coming Soon (Cinematic)</title>
<meta name="description" content="AcademeForge coming soon — cinematic preview. High-graphic Three.js + GSAP experience." />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
<!-- GSAP (for smooth timeline + flip) and Three.js -->
<script src="https://unpkg.com/three@0.162.0/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.162.0/examples/js/controls/OrbitControls.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<style>
  /* ===================== Global styles ===================== */
  :root{
    --bg-1:#020217;
    --bg-2:#06031a;
    --muted:#98b6cf;
    --accent1:#00f5a0;
    --accent2:#7c5cff;
    --glass: rgba(255,255,255,0.03);
    --mono: 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    --maxw:1280px;
  }
  *{box-sizing:border-box}
  html,body{height:100%;margin:0;background:linear-gradient(180deg,var(--bg-1),var(--bg-2));font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;color:#eaf6ff; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; overflow:hidden}
  a{color:inherit}
  /* Canvas full-bleed */
  canvas#glCanvas { position:fixed; inset:0; width:100%; height:100%; z-index:0; display:block; }
  /* UI overlay (glass panels) */
  .ui {
    position:relative; z-index:6; width:100%; max-width:var(--maxw); margin:0 auto; padding:36px; display:grid; grid-template-columns: 1fr 480px; gap:34px; align-items:start; pointer-events:none;
  }
  .panel {
    pointer-events:auto;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    backdrop-filter: blur(10px);
    border-radius:16px; padding:26px; box-shadow: 0 30px 120px rgba(2,6,23,0.7); overflow:visible;
  }

  /* Left hero */
  .hero { min-height:560px; display:flex; flex-direction:column; gap:12px; }
  .brand { display:flex; gap:12px; align-items:center; }
  .logo { width:72px; height:72px; border-radius:16px; display:grid; place-items:center; font-weight:900; color:#021018; background:linear-gradient(135deg,var(--accent2),var(--accent1)); box-shadow: 0 18px 90px rgba(124,92,255,0.14); font-size:22px; }
  .brand h3{ margin:0; font-size:18px; }
  .brand p{ margin:0; color:var(--muted); font-size:13px; }

  .headline { display:flex; gap:12px; align-items:baseline; flex-wrap:wrap; margin-top:6px; }
  .coming { font-size:80px; font-weight:900; line-height:0.95; text-transform:none;
    background: linear-gradient(90deg,var(--accent1),var(--accent2),#00d4ff); -webkit-background-clip:text; color:transparent; background-size:300% 100%;
    animation: grad 6s linear infinite; text-shadow: 0 60px 160px rgba(124,92,255,0.12);
  }
  @keyframes grad { from{ background-position:0% 50% } to{ background-position:100% 50% } }
  .soon { font-size:44px; font-weight:700; color:#dfffee; margin-left:6px; transform:translateY(4px) }

  .sub { color:var(--muted); font-size:16px; max-width:64ch; margin-top:6px; }

  /* cinematic type / glitch */
  .glitch { font-family:var(--mono); font-size:18px; color:#9fb9d2; padding:12px 16px; border-radius:12px; display:inline-block; background:rgba(255,255,255,0.02); box-shadow: 0 8px 40px rgba(2,6,23,0.36); overflow:hidden; position:relative; }
  .glitch[data-text]::before, .glitch[data-text]::after { content:attr(data-text); position:absolute; left:0; right:0; top:0; bottom:0; }
  .glitch::before { transform: translateX(0.6px); text-shadow:-2px 0 rgba(255,90,180,0.8); clip-path: inset(0 0 60% 0); opacity:0.7; }
  .glitch::after { transform: translateX(-0.6px); text-shadow:2px 0 rgba(120,255,192,0.7); clip-path: inset(40% 0 0 0); opacity:0.6; }
  .glitch.anim { animation: microglitch 3s infinite linear; }
  @keyframes microglitch { 0%{ transform:translateX(0) } 20%{ transform:translateX(-1px) } 40%{ transform:translateX(1px) } 60%{ transform:translateX(-0.6px) } 80%{ transform:translateX(0.6px) } 100%{ transform:translateX(0) } }

  /* countdown pills - decorative */
  .count { display:flex; gap:12px; margin-top:18px; flex-wrap:wrap; }
  .pill { font-family:var(--mono); background: rgba(255,255,255,0.03); padding:10px 14px; border-radius:12px; font-weight:800; min-width:66px; text-align:center; box-shadow: 0 12px 44px rgba(2,6,23,0.45); color:#e6fff7; }

  /* Right side: 3D card */
  .right { display:flex; align-items:center; justify-content:center; min-height:560px; pointer-events:none; }
  .card {
    pointer-events:auto;
    width:100%; max-width:520px; min-height:520px; border-radius:18px; transform-style:preserve-3d; transition: transform 0.9s cubic-bezier(.16,.9,.3,1);
    position:relative; box-shadow: 0 40px 180px rgba(2,6,23,0.7);
  }
  .card.is-flipped { transform: rotateY(180deg); }
  .face { position:absolute; inset:0; border-radius:18px; padding:26px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); backface-visibility:hidden; -webkit-backface-visibility:hidden; display:flex; flex-direction:column; overflow:hidden; }
  .face.back { transform: rotateY(180deg); }

  .card-head { display:flex; align-items:center; gap:12px; }
  .chip { margin-left:auto; padding:8px 14px; border-radius:999px; font-weight:900; background:linear-gradient(90deg,var(--accent1),var(--accent2)); color:#021018; box-shadow:0 18px 80px rgba(124,92,255,0.14); }

  .holo { font-size:110px; font-weight:900; -webkit-background-clip:text; background:linear-gradient(90deg,var(--accent1),var(--accent2)); color:transparent; text-shadow: 0 60px 180px rgba(124,92,255,0.12); display:grid; place-items:center; animation: holoFloat 6s ease-in-out infinite; }
  @keyframes holoFloat { 0%{ transform:translateY(0) } 50%{ transform:translateY(-12px) } 100%{ transform:translateY(0) } }

  .card-mid { flex:1; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; text-align:center; }
  .card-foot { display:flex; justify-content:space-between; align-items:center; margin-top:12px; color:var(--muted); font-size:13px; }

  .back-desc { margin-top:12px; color:#dff6ff; font-size:14px; line-height:1.45; }

  .social-row { margin-top:14px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
  .social-row a { text-decoration:none; color:var(--muted); background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; }

  /* page socials */
  .page-socials { position:relative; z-index:7; display:flex; gap:12px; justify-content:center; align-items:center; padding:18px 0; color:var(--muted); font-size:14px; pointer-events:auto; }

  /* dramatic lens overlay */
  .lens { position:fixed; inset:0; z-index:3; pointer-events:none; mix-blend-mode:overlay; opacity:0.45; background-image: radial-gradient(circle at 18% 8%, rgba(124,92,255,0.08), transparent 8%), radial-gradient(circle at 88% 86%, rgba(0,245,160,0.04), transparent 10%); }

  /* unsupported full-screen */
  .unsupported {
    position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#000012,#080010);
    color:#fff; text-align:center; padding:40px; display:none;
  }
  .unsupported.show { display:flex; }
  .unsupported h2{ font-size:28px; margin:0 0 10px; }
  .unsupported p{ color:#bfcfdc; margin:0 0 16px; max-width:70ch; }

  /* responsive tweaks */
  @media (max-width:1150px){ .ui{ grid-template-columns: 1fr 380px; gap:22px; padding:24px } .coming{ font-size:64px } .holo{ font-size:86px } .card{ max-width:420px; min-height:460px } }
  @media (max-width:900px){
    .ui{ grid-template-columns:1fr; padding:18px; gap:16px } .right{ min-height:auto } .card{ transform:none !important; max-width:100%; min-height:360px } .card.is-flipped{ transform:none } .face{ position:relative; transform:none; backface-visibility:visible }
    .coming{ font-size:44px } .soon{ font-size:28px } .holo{ font-size:64px }
  }
  @media (max-width:560px){
    .coming{ font-size:36px } .holo{ font-size:48px } .pill{ min-width:48px; padding:8px 10px } .logo{ width:56px; height:56px }
  }
</style>
</head>
<body>

<!-- Three.js canvas -->
<canvas id="glCanvas" aria-hidden="true"></canvas>
<!-- lens overlay for cinematic effect -->
<div class="lens" aria-hidden="true"></div>

<!-- UI overlay -->
<main class="ui" aria-labelledby="title">
  <!-- LEFT panel -->
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

    <div id="type" class="glitch anim" data-text="Preparing the classroom of the future...">Preparing the classroom of the future...</div>

    <div class="count" aria-hidden="true">
      <div class="pill" id="pill-days">00d</div>
      <div class="pill" id="pill-hours">00h</div>
      <div class="pill" id="pill-mins">00m</div>
      <div class="pill" id="pill-secs">00s</div>
    </div>

    <blockquote style="margin-top:18px;">
      "As a new and evolving platform, Academeforge is still refining the full scope, reliability, and recognition of its assessments and certifications to ensure the highest quality experience for our users."
    </blockquote>
  </section>

  <!-- RIGHT panel -->
  <aside class="panel right" aria-hidden="false">
    <div class="card" id="card" tabindex="0" role="button" aria-pressed="false" aria-label="Flip card to view details">
      <!-- FRONT -->
      <div class="face front" id="front">
        <div class="card-head">
          <div style="font-weight:900;font-size:18px">AcademeForge</div>
          <div class="chip" aria-hidden>Beta</div>
        </div>

        <div class="card-mid">
          <div class="holo" aria-hidden>AF</div>
          <div style="max-width:420px;color:var(--muted)">Designing hands-on projects · Onboarding mentors · Curating career-ready curricula</div>
          <div style="margin-top:8px;color:var(--muted);font-size:13px">Hover / Click / Press Enter to flip →</div>
        </div>

        <div class="card-foot"><div class="muted">Visual preview only</div><div style="font-size:12px;color:var(--muted)">v0.9</div></div>
      </div>

      <!-- BACK -->
      <div class="face back" id="back">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-weight:900;font-size:18px">About AcademeForge</div>
            <div class="muted" style="font-size:13px;margin-top:6px">Beta — Concept Preview</div>
          </div>
          <div class="chip" aria-hidden>v0.9</div>
        </div>

        <!-- ORIGINAL back text written for AcademeForge per user's request -->
        <div class="back-desc">
          AcademeForge is a next-generation learning lab built for builders, not observers. We fuse hands-on project tracks, mentor-led cohorts, and real-world assessments to create pathways that employers value. In early Beta, we are focusing on:
          <ul style="margin-top:10px;color:var(--muted);font-size:13px;line-height:1.5;">
            <li><strong>Project-first learning:</strong> real deliverables that sit in your portfolio.</li>
            <li><strong>Mentor matching:</strong> industry mentors guiding small cohorts.</li>
            <li><strong>Applied assessment:</strong> evaluation tied to practical outcomes.</li>
          </ul>
          This preview is a cinematic glimpse — the platform will evolve with emphasis on reliability, recognition, and impactful learning outcomes.
        </div>

        <div class="social-row" aria-label="social links">
          <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
          <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
    </div>
  </aside>
</main>

<!-- page socials -->
<div class="page-socials">
  <div class="muted">Follow for cinematic launch updates:</div>
  <a href="https://t.me/+c1Ll3CiaGL9lOTA1" target="_blank" rel="noopener">Telegram</a>
  <a href="https://www.instagram.com/academeforge.in" target="_blank" rel="noopener">Instagram</a>
</div>

<!-- unsupported overlay (if device doesn't meet req) -->
<div class="unsupported" id="unsupported">
  <div>
    <h2>Experience Unavailable on This Device</h2>
    <p>AcademeForge cinematic preview requires a modern GPU and WebGL support. Your device does not meet the necessary graphics requirements to render this high-fidelity experience. This page intentionally refuses to degrade visuals to preserve the cinematic integrity.</p>
    <p>If you have a desktop or laptop with GPU acceleration (Chrome / Edge recommended), please try opening the page there for the full experience.</p>
    <div style="margin-top:18px; color:#9fb7cf; font-size:13px">Detected info: <span id="detect-info">checking…</span></div>
  </div>
</div>

<!-- ================================= JS: Three.js scene + GSAP + interactions ================================= -->
<script>
(() => {
  // Capability check: must have WebGL & min deviceMemory (1.5GB)
  const detectInfo = document.getElementById('detect-info');
  const unsupported = document.getElementById('unsupported');

  function hasWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e){ return false; }
  }
  const deviceMemory = navigator.deviceMemory || 0;
  const webgl = hasWebGL();
  const memOK = deviceMemory >= 1.5;

  // fill detect info
  detectInfo.textContent = `WebGL: ${webgl ? 'yes' : 'no'} • deviceMemory: ${deviceMemory ? deviceMemory + ' GB' : 'unknown'}`;

  if(!webgl || !memOK) {
    // show overlay and stop further execution
    unsupported.classList.add('show');
    // remove canvas to ensure no heavy work
    const glCanvas = document.getElementById('glCanvas');
    if(glCanvas) glCanvas.style.display = 'none';
    return;
  }

  // If supported, proceed to heavy scene
  const canvas = document.getElementById('glCanvas');
  // Basic three.js renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);

  // Scene + camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 3000);
  camera.position.set(0, 0, 120);

  // Resize handler
  window.addEventListener('resize', onResize);
  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  }

  // --- Nebula point cloud (shader-based) ---
  const particlesCount = Math.floor(Math.min(25000, (window.innerWidth * window.innerHeight) / 600));
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const sizes = new Float32Array(particlesCount);

  for(let i=0;i<particlesCount;i++){
    const i3 = i*3;
    // spherical distribution with jitter
    const r = 60 + Math.random()*260;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random()*2)-1);
    positions[i3] = Math.sin(phi) * Math.cos(theta) * r * (0.6 + Math.random()*0.9);
    positions[i3+1] = Math.sin(phi) * Math.sin(theta) * r * (0.3 + Math.random()*0.9);
    positions[i3+2] = Math.cos(phi) * r * (0.6 + Math.random()*0.9);
    // color teal->purple->cyan
    const t = Math.random();
    colors[i3] = 0.25 + 0.6*(1-t) + Math.random()*0.1;
    colors[i3+1] = 0.4 + 0.6*t + Math.random()*0.1;
    colors[i3+2] = 0.6 + 0.3*t + Math.random()*0.08;
    sizes[i] = 6 + Math.random()*24;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Shader material for particles: size attenuation + subtle flicker
  const particleMat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float uTime;
      uniform float pixelRatio;
      void main(){
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float att = 300.0 / -mvPosition.z;
        gl_PointSize = size * pixelRatio * att * (0.85 + 0.25 * sin(uTime*0.6 + position.x*0.02));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uTime;
      void main(){
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float alpha = smoothstep(0.6, 0.0, d);
        float flick = 0.85 + 0.25 * sin(uTime*1.3 + gl_FragCoord.x*0.01);
        gl_FragColor = vec4(vColor * flick, alpha * 0.9);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      pixelRatio: { value: renderer.getPixelRatio() }
    }
  });

  const points = new THREE.Points(geometry, particleMat);
  scene.add(points);

  // Aurora planes: soft blurred planes moving slowly
  const auroraGroup = new THREE.Group();
  const planeGeo = new THREE.PlaneGeometry(480, 180, 1, 1);
  for(let i=0;i<5;i++){
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent:true, opacity:0.06 + i*0.01, blending:THREE.AdditiveBlending, depthWrite:false });
    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.position.set((Math.random()-0.5)*40, -30 + i*22, -150 + i*24);
    mesh.rotation.x = -0.55 + (Math.random()-0.5)*0.12;
    auroraGroup.add(mesh);
  }
  scene.add(auroraGroup);

  // Glow element
  const glowGeo = new THREE.IcosahedronGeometry(18, 3);
  const glowMat = new THREE.MeshBasicMaterial({ color:0x7c5cff, transparent:true, opacity:0.08, blending:THREE.AdditiveBlending, depthWrite:false });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, -26, -34);
  scene.add(glow);

  // small streak rings for motion
  const torGeo = new THREE.TorusGeometry(36, 0.6, 8, 160);
  const torMat = new THREE.MeshBasicMaterial({ color:0x00f5a0, transparent:true, opacity:0.06, blending:THREE.AdditiveBlending });
  const tor = new THREE.Mesh(torGeo, torMat);
  tor.rotation.x = 0.35;
  tor.position.set(0, -10, -60);
  scene.add(tor);

  // subtle ambient
  scene.add(new THREE.AmbientLight(0xffffff, 0.12));

  // mouse parallax
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // GSAP master timeline for cinematic intro
  const uiElems = {
    coming: document.querySelector('.coming'),
    soon: document.querySelector('.soon'),
    type: document.getElementById('type'),
    card: document.getElementById('card'),
    panelEls: document.querySelectorAll('.panel')
  };

  // initial UI visibility (fade in later)
  