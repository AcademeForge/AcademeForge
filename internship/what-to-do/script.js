"use strict";

const THEME_KEY = "academeforge_theme";

// THEME LOGIC
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "system";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const theme = e.currentTarget.dataset.theme;
      applyTheme(theme);
    });
  });
  
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem(THEME_KEY) === "system") {
      applyTheme("system");
    }
  });
}

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

// SIDEBAR TOC LOGIC
function initToc() {
  const sections = document.querySelectorAll('.doc-section');
  const tocLinks = document.querySelectorAll('.toc-list a');

  if (!sections.length || !tocLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  initTheme();
  initToc();
});
