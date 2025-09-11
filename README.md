<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to bottom, #111827, #000000, #111827);
      font-family: Arial, sans-serif;
      color: #fff;
      overflow: hidden;
      text-align: center;
    }
    h1 {
      font-size: 4rem;
      font-weight: 800;
      background: linear-gradient(90deg, #ec4899, #6366f1, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 6px 30px rgba(99,102,241,0.3);
    }
    h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-top: 10px;
    }
    p {
      margin-top: 20px;
      font-size: 1.2rem;
      color: #d1d5db;
    }
    .dots {
      margin: 30px 0;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(90deg, #ec4899, #6366f1);
      box-shadow: 0 0 10px rgba(99,102,241,0.7);
      animation: bounce 1.2s infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.12s; }
    .dot:nth-child(3) { animation-delay: 0.24s; }
    .dot:nth-child(4) { animation-delay: 0.36s; }
    .dot:nth-child(5) { animation-delay: 0.48s; }
    .dot:nth-child(6) { animation-delay: 0.60s; }@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
input[type="email"] {
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  min-width: 240px;
  background: rgba(255,255,255,0.08);
  color: #fff;
}
input::placeholder {
  color: #9ca3af;
}
button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #6366f1, #10b981);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}
button:hover { transform: scale(1.05); }
button:active { transform: scale(0.95); }

.countdown {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.time-box {
  background: rgba(255,255,255,0.06);
  padding: 14px 18px;
  border-radius: 12px;
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
}
.label {
  margin-top: 8px;
  font-size: 0.7rem;
  color: #9ca3af;
  text-transform: uppercase;
}
footer {
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
}
/* floating sparkles */
.sparkle {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: sparkle 6s infinite;
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0.6) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(45deg); }
}

  </style>
</head>
<body>
  <div>
    <h1>Coming</h1>
    <h2>soon</h2>
    <p>We're working hard on something amazing. Stay tuned!</p><div class="dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

<form onsubmit="event.preventDefault()">
  <input type="email" placeholder="Enter your email" required />
  <button type="submit">Notify me</button>
</form>

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

  </div>  <footer>
    Built with ❤️ — Launching soon
  </footer>  <script>
    // countdown (example target date: 30 days later)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // add sparkles randomly
    for (let i = 0; i < 15; i++) {
      const s = document.createElement("div");
      s.classList.add("sparkle");
      s.style.width = s.style.height = Math.random() * 6 + 3 + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDuration = 4 + Math.random() * 6 + "s";
      s.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(s);
    }
  </script></body>
</html>