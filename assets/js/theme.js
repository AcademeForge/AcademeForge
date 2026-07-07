(function() {
  const THEME_KEY = "academeforge_theme";

  function applyTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  // Initialize theme based on saved preference
  const savedTheme = localStorage.getItem(THEME_KEY) || "system";
  applyTheme(savedTheme);

  // Add click listeners to all theme buttons
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      applyTheme(e.currentTarget.dataset.theme);
    });
  });
  
  // Listen for system theme changes if in system mode
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem(THEME_KEY) === "system") {
      applyTheme("system");
    }
  });
})();
