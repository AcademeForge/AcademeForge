document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------------------------------------------------------
  // 0. ACCOUNT BAR (conditional visibility + dismissal)
  // ---------------------------------------------------------
  const accountBar = document.getElementById('account-bar');
  const accountDismissBtn = document.getElementById('account-dismiss');

  const AUTH_STORAGE_KEY = 'af_user_authenticated';
  const DISMISS_STORAGE_KEY = 'af_account_bar_dismissed';

  function isUserAuthenticated() {
    try {
      return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch (err) {
      // localStorage unavailable (private browsing, disabled storage, etc.)
      return false;
    }
  }

  function isAccountBarDismissed() {
    try {
      return window.sessionStorage.getItem(DISMISS_STORAGE_KEY) === 'true';
    } catch (err) {
      return false;
    }
  }

  function initAccountBar() {
    if (!accountBar) return;

    // Only ever show real personalized data to an authenticated session.
    // Never show fabricated "welcome back" content to anonymous visitors.
    const shouldShow = isUserAuthenticated() && !isAccountBarDismissed();
    accountBar.hidden = !shouldShow;

    if (accountDismissBtn) {
      accountDismissBtn.addEventListener('click', () => {
        accountBar.hidden = true;
        try {
          window.sessionStorage.setItem(DISMISS_STORAGE_KEY, 'true');
        } catch (err) {
          // Non-fatal: dismissal just won't persist across tabs/reloads.
        }
      });
    }
  }

  initAccountBar();

  // ---------------------------------------------------------
  // 1. MOBILE DRAWER LOGIC (with backdrop + focus management)
  // ---------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  let lastFocusedElement = null;

  function getFocusableDrawerElements() {
    if (!mobileDrawer) return [];
    return Array.from(
      mobileDrawer.querySelectorAll(
        'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function trapDrawerFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusableDrawerElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openDrawer() {
    if (!mobileDrawer) return;
    lastFocusedElement = document.activeElement;

    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('open');
    }
    document.body.classList.add('no-scroll');

    if (mobileToggleBtn) {
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }

    document.addEventListener('keydown', handleDrawerKeydown);

    if (drawerCloseBtn) {
      drawerCloseBtn.focus();
    }
  }

  function closeDrawer() {
    if (!mobileDrawer) return;

    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('open');
    }
    document.body.classList.remove('no-scroll');

    if (mobileToggleBtn) {
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }

    document.removeEventListener('keydown', handleDrawerKeydown);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleDrawerKeydown(event) {
    if (event.key === 'Escape') {
      closeDrawer();
      return;
    }
    trapDrawerFocus(event);
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  const drawerLinks = document.querySelectorAll('.drawer-product-link');
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // ---------------------------------------------------------
  // 1b. DESKTOP DROPDOWN ARIA STATE (mega-menu / internship)
  // ---------------------------------------------------------
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('button.nav-link');
    if (!trigger) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const setOpen = (open) => {
      dropdown.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    dropdown.addEventListener('mouseenter', () => setOpen(true));
    dropdown.addEventListener('mouseleave', () => setOpen(false));
    dropdown.addEventListener('focusin', () => setOpen(true));
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });
  });

  // ---------------------------------------------------------
  // 2. PRODUCT FILTERING LOGIC
  // ---------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const productRows = document.querySelectorAll('.product-row');
  const FILTER_TRANSITION_MS = 300;
  const FADE_IN_DELAY_MS = 50;

  function applyFilter(filter) {
    filterChips.forEach((c) => {
      const isActive = c.getAttribute('data-filter') === filter;
      c.classList.toggle('active', isActive);
      c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    productRows.forEach((row) => {
      row.classList.add('fade-out');

      window.setTimeout(() => {
        const matches = filter === 'all' || row.getAttribute('data-category') === filter;

        if (matches) {
          row.classList.remove('hidden');
          window.setTimeout(() => {
            row.classList.remove('fade-out');
          }, FADE_IN_DELAY_MS);
        } else {
          row.classList.add('hidden');
        }
      }, FILTER_TRANSITION_MS);
    });
  }

  filterChips.forEach((chip) => {
    chip.setAttribute('aria-pressed', chip.classList.contains('active') ? 'true' : 'false');
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      if (filter) applyFilter(filter);
    });
  });

  // ---------------------------------------------------------
  // 3. QUICK PICKER (HERO) LOGIC
  // ---------------------------------------------------------
  const quickPicker = document.getElementById('hero-quick-picker');
  const productsSection = document.getElementById('products-section');

  const INTENT_TO_FILTER = {
    learn: 'learn',
    exams: 'learn',
    productivity: 'track',
    wellbeing: 'personal',
    reading: 'create',
    create: 'create'
  };

  if (quickPicker) {
    quickPicker.addEventListener('change', (event) => {
      const intent = event.target.value;
      const targetFilter = INTENT_TO_FILTER[intent] || 'all';

      applyFilter(targetFilter);

      window.setTimeout(() => {
        if (!productsSection) return;

        const offset = 100; // Account for sticky nav
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = productsSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        productRows.forEach((row) => {
          if (row.getAttribute('data-picker') === intent) {
            row.style.backgroundColor = 'var(--bg-secondary)';
            window.setTimeout(() => {
              row.style.backgroundColor = 'transparent';
            }, 1500);
          }
        });
      }, 350);
    });
  }

  // ---------------------------------------------------------
  // 6. COMMAND PALETTE (SEARCH) LOGIC
  // ---------------------------------------------------------
  const cmdPaletteOverlay = document.getElementById('cmd-palette-overlay');
  const openSearchBtn = document.getElementById('open-search');
  const cmdCloseBtn = document.getElementById('cmd-close');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');

  const searchData = [
    { title: 'AF Nexus', desc: 'Platform', url: '#product-nexus' },
    { title: 'AcademeForge AI', desc: 'Tool', url: '#product-ai' },
    { title: 'Scholars Test', desc: 'Platform', url: '#product-test' },
    { title: 'Timezy', desc: 'App', url: '#product-timezy' },
    { title: 'Capacity', desc: 'Platform', url: '#product-capacity' },
    { title: 'Zenopulsky', desc: 'Publication', url: '#product-zenopulsky' },
    { title: 'Nexora Studio', desc: 'Studio', url: '#product-studio' },
    { title: 'Download Center', desc: 'Resource', url: '#' },
    { title: 'Internship Application', desc: 'Careers', url: '#' },
    { title: 'Help Desk', desc: 'Support', url: '#' }
  ];

  let cmdLastFocusedElement = null;

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }

  function renderCmdResults(data) {
    if (!cmdResults) return;

    if (data.length === 0) {
      cmdResults.innerHTML = '<div class="cmd-empty">No results found.</div>';
      return;
    }

    // Built with escaped, static template strings only — no inline event
    // handler attributes, so this remains compatible with a strict CSP
    // (script-src 'self') in production. Click handling is delegated below.
    cmdResults.innerHTML = data
      .map(
        (item, index) => `
      <a href="${escapeHtml(item.url)}" class="cmd-item" data-cmd-index="${index}">
        <span>${escapeHtml(item.title)}</span>
        <span>${escapeHtml(item.desc)}</span>
      </a>
    `
      )
      .join('');
  }

  function openCmdPalette() {
    if (!cmdPaletteOverlay || !cmdInput) return;

    cmdLastFocusedElement = document.activeElement;

    cmdPaletteOverlay.classList.add('active');
    cmdPaletteOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    cmdInput.value = '';
    renderCmdResults(searchData);

    if (openSearchBtn) {
      openSearchBtn.setAttribute('aria-expanded', 'true');
    }

    window.setTimeout(() => cmdInput.focus(), 100);
  }

  function closeCmdPalette() {
    if (!cmdPaletteOverlay) return;

    cmdPaletteOverlay.classList.remove('active');
    cmdPaletteOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    if (openSearchBtn) {
      openSearchBtn.setAttribute('aria-expanded', 'false');
    }

    if (cmdLastFocusedElement && typeof cmdLastFocusedElement.focus === 'function') {
      cmdLastFocusedElement.focus();
    }
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openCmdPalette);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdPalette);

  if (cmdPaletteOverlay) {
    cmdPaletteOverlay.addEventListener('click', (event) => {
      if (event.target === cmdPaletteOverlay) closeCmdPalette();
    });
  }

  if (cmdResults) {
    cmdResults.addEventListener('click', (event) => {
      const target = event.target.closest('.cmd-item');
      if (target) {
        closeCmdPalette();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifierPressed = isMac ? event.metaKey : event.ctrlKey;

    if (modifierPressed && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCmdPalette();
    }

    if (
      event.key === 'Escape' &&
      cmdPaletteOverlay &&
      cmdPaletteOverlay.classList.contains('active')
    ) {
      closeCmdPalette();
    }
  });

  if (cmdInput) {
    cmdInput.addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase().trim();
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      );
      renderCmdResults(filtered);
    });
  }

  // ---------------------------------------------------------
  // 8. STICKY SECONDARY CTA & SCROLL STATES
  // ---------------------------------------------------------
  const stickyCta = document.getElementById('sticky-cta');
  const mainNav = document.getElementById('main-nav');
  const heroSection = document.querySelector('.hero');

  let scrollTicking = false;

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    if (mainNav) {
      mainNav.style.boxShadow = scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.04)' : 'none';
    }

    if (stickyCta && heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom + scrollY;
      stickyCta.classList.toggle('visible', scrollY > heroBottom - 200);
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(handleScrollEffects);
      scrollTicking = true;
    }
  });

  // ---------------------------------------------------------
  // 9. LANGUAGE TOGGLE LOGIC
  // ---------------------------------------------------------
  const LANG_STORAGE_KEY = 'af_preferred_lang';
  const langToggles = document.querySelectorAll('.lang-toggle');

  function setActiveLanguage(lang) {
    langToggles.forEach((toggle) => {
      const btns = toggle.querySelectorAll('.lang-btn');
      btns.forEach((btn) => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    });

    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (err) {
      // Non-fatal: preference just won't persist across sessions.
    }

   
  }

  langToggles.forEach((toggle) => {
    const btns = toggle.querySelectorAll('.lang-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const lang = event.currentTarget.getAttribute('data-lang');
        if (lang) setActiveLanguage(lang);
      });
    });
  });

  try {
    const storedLang = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLang) setActiveLanguage(storedLang);
  } catch (err) {
    // Non-fatal: falls back to markup default (EN).
  }
});
