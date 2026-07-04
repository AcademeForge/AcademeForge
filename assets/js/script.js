/* ============================================================
   AcademeForge — Ecosystem Homepage Script
   Target: assets/js/script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM REFS ───────────────────────────────────────────── */
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');
  const overlay     = document.getElementById('mobile-overlay');
  const yearEl      = document.getElementById('year');

  /* ── YEAR ───────────────────────────────────────────────── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── STICKY HEADER ──────────────────────────────────────── */
  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── MOBILE NAV ─────────────────────────────────────────── */
  function openMobileNav() {
    if (!mobileNav || !overlay || !hamburger) return;
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !overlay || !hamburger) return;
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (overlay) overlay.addEventListener('click', closeMobileNav);

  // Escape key closes nav
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ── MOBILE SUB-MENU TOGGLES ────────────────────────────── */
  const mnavToggles = document.querySelectorAll('.mnav-toggle');
  mnavToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const sub = toggle.nextElementSibling;
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      // Close all other subs
      mnavToggles.forEach(function (t) {
        if (t !== toggle) {
          t.setAttribute('aria-expanded', 'false');
          t.classList.remove('open');
          const s = t.nextElementSibling;
          if (s) s.classList.remove('open');
        }
      });

      // Toggle this one
      if (isOpen) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('open');
        if (sub) sub.classList.remove('open');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.classList.add('open');
        if (sub) sub.classList.add('open');
      }
    });
  });

  /* ── DESKTOP DROPDOWN KEYBOARD SUPPORT ──────────────────── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dd) {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    const panel   = dd.querySelector('.dropdown-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      // Close all others
      dropdowns.forEach(function (d) {
        const t = d.querySelector('.nav-dropdown-trigger');
        if (t && t !== trigger) t.setAttribute('aria-expanded', 'false');
      });
      trigger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.product-card, .pillar, .eco-node, .feature-item, .section-header, .hero-content'
    );

    if (!targets.length) return;

    // Add reveal class
    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            // Stagger children slightly
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, idx * 40);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = (header ? header.offsetHeight : 64) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── PRODUCT CARD HOVER TILT (subtle) ───────────────────── */
  function initCardTilt() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect  = card.getBoundingClientRect();
        const x     = (e.clientX - rect.left) / rect.width  - 0.5;
        const y     = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── HERO ORBIT ANIMATION CHECK ─────────────────────────── */
  function checkHeroImage() {
    const heroImg    = document.querySelector('.hero-img');
    const orbitFall  = document.querySelector('.hero-orbit-fallback');
    if (!heroImg || !orbitFall) return;

    // If image fails, fallback is already set to display via onerror.
    // Show orbit by default until image loads.
    orbitFall.style.display = 'flex';

    heroImg.addEventListener('load', function () {
      orbitFall.style.display = 'none';
    });
    heroImg.addEventListener('error', function () {
      orbitFall.style.display = 'flex';
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCardTilt();
    checkHeroImage();
    onScroll(); // Initial check
  });

  // If DOM already parsed
  if (document.readyState !== 'loading') {
    initReveal();
    initCardTilt();
    checkHeroImage();
    onScroll();
  }

})();
