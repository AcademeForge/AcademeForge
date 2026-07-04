document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. MOBILE DRAWER LOGIC
  // ---------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  // Close drawer if clicking on a product link
  const drawerLinks = document.querySelectorAll('.drawer-product-link');
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));


  // ---------------------------------------------------------
  // 2. PRODUCT FILTERING LOGIC
  // ---------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const productRows = document.querySelectorAll('.product-row');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Update active chip
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      // Filter products with animation
      productRows.forEach(row => {
        // Start fade out
        row.classList.add('fade-out');
        
        setTimeout(() => {
          if (filter === 'all' || row.getAttribute('data-category') === filter) {
            row.classList.remove('hidden');
            // Slight delay to allow display block to apply before fading in
            setTimeout(() => {
              row.classList.remove('fade-out');
            }, 50);
          } else {
            row.classList.add('hidden');
          }
        }, 300); // Wait for fade out animation
      });
    });
  });


  // ---------------------------------------------------------
  // 3. QUICK PICKER (HERO) LOGIC
  // ---------------------------------------------------------
  const quickPicker = document.getElementById('hero-quick-picker');
  
  if (quickPicker) {
    quickPicker.addEventListener('change', (e) => {
      const intent = e.target.value;
      
      // Auto-filter the products list
      const correspondingChip = document.querySelector(`.filter-chip[data-filter="${intent}"]`);
      
    
      let targetFilter = 'all';
      if (intent === 'learn' || intent === 'exams') targetFilter = 'learn';
      if (intent === 'productivity') targetFilter = 'track';
      if (intent === 'wellbeing') targetFilter = 'personal';
      if (intent === 'reading' || intent === 'create') targetFilter = 'create';

      // Click the relevant filter chip programmatically
      const targetChip = document.querySelector(`.filter-chip[data-filter="${targetFilter}"]`);
      if (targetChip) targetChip.click();

      // Scroll to the products section smoothly
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        const offset = 100; // Account for sticky nav
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = productsSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Highlight the specific product if intent maps perfectly
        productRows.forEach(row => {
           if(row.getAttribute('data-picker') === intent) {
             row.style.backgroundColor = 'var(--bg-secondary)';
             setTimeout(() => {
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

  function openCmdPalette() {
    cmdPaletteOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
    cmdInput.value = '';
    renderCmdResults(searchData); // Show all initially
    setTimeout(() => cmdInput.focus(), 100);
  }

  function closeCmdPalette() {
    cmdPaletteOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  function renderCmdResults(data) {
    if (data.length === 0) {
      cmdResults.innerHTML = '<div style="padding: 16px; color: var(--text-tertiary);">No results found.</div>';
      return;
    }
    
    cmdResults.innerHTML = data.map(item => `
      <a href="${item.url}" class="cmd-item" onclick="document.getElementById('cmd-close').click()">
        <span>${item.title}</span>
        <span>${item.desc}</span>
      </a>
    `).join('');
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openCmdPalette);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdPalette);
  
  // Close on background click
  if (cmdPaletteOverlay) {
    cmdPaletteOverlay.addEventListener('click', (e) => {
      if (e.target === cmdPaletteOverlay) closeCmdPalette();
    });
  }

  // Keyboard shortcut Cmd+K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCmdPalette();
    }
    if (e.key === 'Escape' && cmdPaletteOverlay.classList.contains('active')) {
      closeCmdPalette();
    }
  });

  // Filter logic
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = searchData.filter(item => 
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

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Nav shadow
    if (scrollY > 10) {
      mainNav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
    } else {
      mainNav.style.boxShadow = 'none';
    }

    // Sticky CTA visibility (show after scrolling past hero)
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom + scrollY;
      if (scrollY > heroBottom - 200) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }
  });

  // ---------------------------------------------------------
  // 9. LANGUAGE TOGGLE LOGIC
  // ---------------------------------------------------------
  const langToggles = document.querySelectorAll('.lang-toggle');
  
  langToggles.forEach(toggle => {
    const btns = toggle.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        btns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        // In a real app, this would trigger an i18n change
      });
    });
  });

});
