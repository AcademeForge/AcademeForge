
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Academeforge - Coming Soon</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes bounce-dot {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-12px); }
    }
    .dot {
      animation: bounce-dot 1.4s infinite ease-in-out;
    }
    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.3s; }
    .dot:nth-child(4) { animation-delay: 0.45s; }
    .dot:nth-child(5) { animation-delay: 0.6s; }
    .dot:nth-child(6) { animation-delay: 0.75s; }
    .dot:nth-child(7) { animation-delay: 0.9s; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up {
      opacity: 0;
      animation: fadeUp 1s ease forwards;
    }
    .fade-up.delay-1 { animation-delay: 0.3s; }
    .fade-up.delay-2 { animation-delay: 0.6s; }
    .fade-up.delay-3 { animation-delay: 0.9s; }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center px-4">

  <!-- Title -->
  <h1 class="text-5xl font-extrabold drop-shadow-lg fade-up">Academeforge</h1>

  <!-- Subtitle -->
  <p class="mt-4 text-lg max-w-xl fade-up delay-1">
    Empowering learners with cutting-edge resources. Something amazing is coming your way!
  </p>

  <!-- Animated Loader (7 Dots) -->
  <div class="flex mt-12 space-x-3 fade-up delay-2">
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
    <span class="w-3 h-3 rounded-full bg-white dot"></span>
  </div>

  <!-- Coming Soon Text -->
  <p class="mt-8 text-2xl font-semibold tracking-wide fade-up delay-3">🚀 Coming Soon</p>

  <!-- Footer -->
  <footer class="absolute bottom-6 text-sm text-gray-200 fade-up delay-3">
    © <span id="year"></span> Academeforge. All rights reserved.
  </footer>

  <script>
    document.getElementById("year").textContent = new Date().getFullYear();
  </script>
</body>
</html>