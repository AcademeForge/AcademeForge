
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
      animation: bounce-dot 1.2s infinite ease-in-out;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center px-4">

  <!-- Title -->
  <h1 class="text-5xl font-extrabold drop-shadow-lg">Academeforge</h1>

  <!-- Subtitle -->
  <p class="mt-4 text-lg max-w-xl">
    Empowering learners with cutting-edge resources. Something amazing is coming your way!
  </p>

  <!-- Animated Loader -->
  <div class="flex mt-12 space-x-3">
    <span class="w-4 h-4 rounded-full bg-white dot"></span>
    <span class="w-4 h-4 rounded-full bg-white dot"></span>
    <span class="w-4 h-4 rounded-full bg-white dot"></span>
  </div>

  <!-- Coming Soon Text -->
  <p class="mt-8 text-2xl font-semibold tracking-wide">🚀 Coming Soon</p>

  <!-- Footer -->
  <footer class="absolute bottom-6 text-sm text-gray-200">
    © <span id="year"></span> Academeforge. All rights reserved.
  </footer>

  <script>
    document.getElementById("year").textContent = new Date().getFullYear();
  </script>
</body>
</html>