
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AcademeForge | All You Need in One Place</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(to bottom right, #e0f7fa, #fce4ec);
      color: #222;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      overflow-x: hidden;
      text-align: center;
    }

    header {
      background: #1e3a8a;
      color: white;
      padding: 40px 20px;
      width: 100%;
      animation: fadeDown 1s ease;
    }

    h1 {
      margin: 0;
      font-size: 2.5rem;
    }

    .tagline {
      margin-top: 10px;
      font-size: 1.2rem;
      color: #444;
    }

    .link-container {
      margin-top: 40px;
      width: 90%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      animation: slideIn 1.3s ease-out;
    }

    a.button {
      text-align: center;
      padding: 14px 20px;
      background: linear-gradient(135deg, #6a5acd, #00bfff);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-size: 1.1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      animation: pulse 2s infinite;
    }

    a.button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    footer {
      margin-top: auto;
      padding: 20px;
      font-size: 0.9rem;
      color: #888;
      animation: fadeIn 1.5s ease-in;
    }

    @keyframes fadeDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      0% { opacity: 0; transform: translateX(-100px); }
      100% { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  </style>
</head>
<body>

  <!-- Autoplay Background Audio (royalty-free link) -->
  <audio autoplay loop hidden>
    <source src="https://www.bensound.com/bensound-music/bensound-inspire.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>

  <header>
    <h1>Welcome to AcademeForge</h1>
    <p class="tagline">Empowering India's Young Minds</p>
  </header>

  <div class="link-container">
    <a class="button" href="http://academeforge.wordpress.com" target="_blank">Academeforge Scholars Test</a>
    <a class="button" href="https://academeforge.github.io/AST/" target="_blank">AST Registration Form</a>
    <a class="button" href="https://www.youtube.com/@AcademeForgePro" target="_blank">YouTube</a>
    <a class="button" href="https://www.instagram.com/academeforgee" target="_blank">Instagram</a>
    <a class="button" href="https://x.com/AcademeForge?t=Q4TXzMVYC9BZDXGEICxQ5w&s=09" target="_blank">Twitter (X)</a>
    <a class="button" href="https://t.me/addlist/CVX57k_dpG4wNGJl" target="_blank">All Telegram Groups/Channels</a>
    <a class="button" href="https://t.me/+DYChuLLgL-83MThl" target="_blank">Main Telegram Chat Group</a>
    <a class="button" href="https://academeforge.github.io/AcademeForge/" target="_blank">Notes Website Class 9 to 12</a>
    <a class="button" href="https://academeforge.github.io/TimeTable/" target="_blank">Time Tables</a>
    <a class="button" href="https://academeforge.pages.dev/" target="_blank">Extra Study Material</a>
  </div>

  <footer>
    Made with love ♥️ by Team AcademeForge
  </footer>
</body>
</html>