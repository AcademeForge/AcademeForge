<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AcademeForge - Coming Soon</title>
  <style>
    * {margin:0;padding:0;box-sizing:border-box;}
    body {
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#000;
      font-family:Arial, sans-serif;
      overflow:hidden;
      color:#fff;
    }
    canvas {position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;}.card {
  width:360px;
  height:500px;
  perspective:1000px;
}
.card-inner {
  position:relative;
  width:100%;
  height:100%;
  transform-style:preserve-3d;
  transition:transform 1s;
  cursor:pointer;
}
.card.flipped .card-inner {transform:rotateY(180deg);}
.card-front, .card-back {
  position:absolute;
  width:100%;
  height:100%;
  backface-visibility:hidden;
  border-radius:18px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:20px;
}
.card-front {
  background:rgba(20,20,20,0.85);
  box-shadow:0 0 20px rgba(0,255,128,0.4);
  text-align:center;
}
.card-front h1 {
  font-size:2.2rem;
  margin-bottom:10px;
  color:#0ff;
}
.card-front h2 {font-size:1.4rem;color:#0f0;}
.card-front p {margin-top:10px;color:#ccc;}

.card-back {
  background:rgba(15,15,15,0.9);
  box-shadow:0 0 20px rgba(0,200,255,0.4);
  transform:rotateY(180deg);
  text-align:center;
}
.card-back h1 {font-size:1.6rem;margin-bottom:10px;color:#0ff;}
.card-back p {font-size:0.95rem;color:#aaa;margin-bottom:20px;}

form {display:flex;gap:10px;margin-bottom:20px;}
input[type="email"] {
  padding:10px;
  border:none;
  border-radius:6px;
  outline:none;
  background:rgba(255,255,255,0.1);
  color:#fff;
}
input::placeholder {color:#bbb;}
button {
  padding:10px 16px;
  border:none;
  border-radius:6px;
  background:linear-gradient(90deg,#06f,#0f9);
  color:#fff;
  font-weight:600;
  cursor:pointer;
  transition:transform .2s;
}
button:hover {transform:scale(1.05)}

.links a {
  display:block;
  margin:6px 0;
  color:#0ff;
  text-decoration:none;
  transition:color .3s;
}
.links a:hover {color:#0f9;}

.countdown {display:flex;gap:14px;justify-content:center;margin-top:14px;}
.time-box {
  background:rgba(255,255,255,0.08);
  padding:10px;
  border-radius:8px;
  font-family:monospace;
  font-size:1rem;
  font-weight:600;
}
.label {font-size:0.7rem;color:#bbb;margin-top:4px;}

  </style>
</head>
<body>
  <canvas id="matrix"></canvas>  <div class="card" id="flipCard">
    <div class="card-inner">
      <!-- Front in Hindi -->
      <div class="card-front">
        <h1>अकैडमीफोर्ज</h1>
        <h2>जल्द ही आ रहा है 🚀</h2>
        <p>शिक्षा और तकनीक का संगम</p>
        <p style="margin-top:20px;color:#0ff;font-size:0.85rem;">(फ्लिप करने के लिए क्लिक करें)</p>
      </div><!-- Back in English -->
  <div class="card-back">
    <h1>AcademeForge — Coming Soon</h1>
    <p>We are building the future of learning and innovation.</p>

    <h3 style="color:#0f9;margin-bottom:10px;">Get Updates</h3>
    <form onsubmit="event.preventDefault()">
      <input type="email" placeholder="Enter your email" required />
      <button type="submit">Notify me</button>
    </form>

    <div class="links">
      <a href="#">Join us on LinkedIn</a>
      <a href="#">Follow us on Twitter</a>
    </div>

    <div class="countdown">
      <div>
        <div class="time-box" id="days">00</div>
        <div class="label">Days</div>
      </div>
      <div>
        <div class="time-box" id="hours">00</div>
        <div class="label">Hours</div>
      </div>
      <div>
        <div class="time-box" id="minutes">00</div>
        <div class="label">Minutes</div>
      </div>
      <div>
        <div class="time-box" id="seconds">00</div>
        <div class="label">Seconds</div>
      </div>
    </div>
  </div>
</div>

  </div>  <script>
    // flip card toggle
    const card=document.getElementById('flipCard');
    card.addEventListener('click',()=>card.classList.toggle('flipped'));

    // countdown
    const targetDate=new Date();
    targetDate.setDate(targetDate.getDate()+30);
    function updateCountdown(){
      const now=new Date().getTime();
      const distance=targetDate-now;
      const days=Math.floor(distance/(1000*60*60*24));
      const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
      const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
      const seconds=Math.floor((distance%(1000*60))/1000);
      document.getElementById('days').textContent=days;
      document.getElementById('hours').textContent=hours;
      document.getElementById('minutes').textContent=minutes;
      document.getElementById('seconds').textContent=seconds;
    }
    setInterval(updateCountdown,1000);
    updateCountdown();

    // background matrix effect
    const c=document.getElementById("matrix"),ctx=c.getContext("2d");
    c.height=window.innerHeight;
    c.width=window.innerWidth;
    const letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZअआइईउऊएऐओऔकखगघचछजझटठडढतथदधनपफबभमयरलवशषसह";
    const matrix=letters.split("");
    const font_size=14;
    const columns=c.width/font_size;
    const drops=[];
    for(let x=0;x<columns;x++) drops[x]=1;
    function draw(){
      ctx.fillStyle="rgba(0,0,0,0.05)";
      ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle="#0f0";
      ctx.font=font_size+"px monospace";
      for(let i=0;i<drops.length;i++){
        const text=matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text,i*font_size,drops[i]*font_size);
        if(drops[i]*font_size>c.height&&Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
    }
    setInterval(draw,33);
  </script></body>
</html>