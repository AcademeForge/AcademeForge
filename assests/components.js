/* AcademeForge — Shared Components */

const AF = {
  nav: [
    { label: 'Courses', href: 'courses.html' },
    { label: 'LearnSpace', href: 'courses.html#learnspace' },
    { label: 'AF ProGuide AI', href: 'proguide.html' },
    { label: 'Test Arena', href: 'arena.html' },
    { label: 'Scholars Test', href: 'scholars.html' },
    { label: 'Community', href: 'community.html' },
    { label: 'Apps', href: 'apps.html' },
    { label: 'About', href: 'about.html' },
  ],

  injectNav() {
    const el = document.getElementById('site-nav');
    if (!el) return;
    const cur = location.pathname.split('/').pop() || 'index.html';
    el.innerHTML = `
      <nav id="main-nav" class="fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2.5 flex-shrink-0">
              <div class="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span class="text-white font-black text-sm" style="font-family:Manrope,sans-serif;">AF</span>
              </div>
              <span class="font-black text-slate-900 tracking-tight" style="font-family:Manrope,sans-serif;font-size:1.05rem;">AcademeForge</span>
            </a>
            <!-- Desktop nav -->
            <div class="hidden lg:flex items-center gap-1">
              ${AF.nav.map(n => `
                <a href="${n.href}" class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                  ${cur === n.href.split('#')[0] ? 'text-orange-600 bg-orange-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}">${n.label}</a>
              `).join('')}
            </div>
            <!-- CTA -->
            <div class="flex items-center gap-3">
              <a href="student-app-preview/" class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                Student Portal
              </a>
              <a href="https://help.academeforge.in" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200">
                <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                AF ProGuide AI
              </a>
              <!-- Hamburger -->
              <button id="mob-toggle" class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Mobile menu -->
        <div id="mob-menu" class="hidden lg:hidden border-t border-slate-100 bg-white px-4 pb-4">
          <div class="pt-3 space-y-1">
            ${AF.nav.map(n => `
              <a href="${n.href}" class="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50">${n.label}</a>
            `).join('')}
            <a href="student-app-preview/" class="block px-3 py-2 text-sm font-semibold text-orange-600">Student Portal</a>
          </div>
        </div>
      </nav>
      <div class="h-16"></div>
    `;

    // mobile toggle
    document.getElementById('mob-toggle')?.addEventListener('click', () => {
      document.getElementById('mob-menu')?.classList.toggle('hidden');
    });

    // nav scroll glass
    window.addEventListener('scroll', () => {
      document.getElementById('main-nav')?.classList.toggle('nav-scrolled', window.scrollY > 20);
    }, { passive: true });
  },

  injectFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
      <footer class="bg-slate-900 text-slate-300 mt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div class="lg:col-span-1">
              <a href="index.html" class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <span class="text-white font-black text-sm" style="font-family:Manrope,sans-serif;">AF</span>
                </div>
                <span class="text-white font-black" style="font-family:Manrope,sans-serif;">AcademeForge</span>
              </a>
              <p class="text-sm leading-relaxed text-slate-400">India's all-in-one learning ecosystem — courses, AI mentor, gamified quizzes, Scholars Test & free productivity apps.</p>
              <p class="text-xs text-slate-500 mt-3">Made in Patna, Bihar, India 🇮🇳</p>
              <div class="flex gap-4 mt-4">
                ${[
                  ['LinkedIn','https://www.linkedin.com/company/academeforge/'],
                  ['Instagram','https://www.instagram.com/academeforge.in'],
                  ['YouTube','https://youtube.com/@academeforgepro'],
                  ['Telegram','https://t.me/+46ubatq-EV0wNjY1'],
                ].map(([l,h]) => `<a href="${h}" target="_blank" rel="noopener noreferrer" class="text-xs text-slate-500 hover:text-orange-400 transition-colors">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm mb-4" style="font-family:Manrope,sans-serif;">Platform</h4>
              <div class="space-y-2">
                ${[
                  ['Explore Courses','courses.html'],
                  ['LearnSpace Programs','courses.html#learnspace'],
                  ['AF ProGuide AI','proguide.html'],
                  ['AF Test Arena','arena.html'],
                  ['Scholars Test (AST)','scholars.html'],
                  ['Community','community.html'],
                ].map(([l,h]) => `<a href="${h}" class="block text-sm text-slate-400 hover:text-white transition-colors">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm mb-4" style="font-family:Manrope,sans-serif;">Companion Apps</h4>
              <div class="space-y-2">
                ${[
                  ['Timezy — Planner','apps.html'],
                  ['Zenopulsky — Journalism','https://zenopulsky.academeforge.in'],
                  ['Capacity — Wellbeing','apps.html'],
                  ['Student Portal Preview','student-app-preview/'],
                ].map(([l,h]) => `<a href="${h}" class="block text-sm text-slate-400 hover:text-white transition-colors">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm mb-4" style="font-family:Manrope,sans-serif;">Quick Links</h4>
              <div class="space-y-2">
                ${[
                  ['About & Founder','about.html'],
                  ['Verify Certificate','/verify-Certificate/'],
                  ['Join Team','/join-team/'],
                  ['AI Help Desk','https://help.academeforge.in'],
                  ['AST Portal','https://ast.academeforge.in'],
                  ['academeforge@gmail.com','mailto:academeforge@gmail.com'],
                ].map(([l,h]) => `<a href="${h}" class="block text-sm text-slate-400 hover:text-white transition-colors">${l}</a>`).join('')}
              </div>
            </div>
          </div>
          <div class="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© <span id="footer-year"></span> AcademeForge · AF NEXUS. All rights reserved.</span>
            <div class="flex gap-4">
              <span class="cursor-pointer hover:text-white transition-colors" onclick="AF.modal('Privacy Policy', AF.text.privacy)">Privacy</span>
              <span class="cursor-pointer hover:text-white transition-colors" onclick="AF.modal('Terms of Service', AF.text.terms)">Terms</span>
              <a href="/WorkplacePolicy/" class="hover:text-white transition-colors">Workplace Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
    document.getElementById('footer-year').textContent = new Date().getFullYear();
  },

  injectAIFab() {
    document.body.insertAdjacentHTML('beforeend', `
      <a href="https://help.academeforge.in" target="_blank" rel="noopener noreferrer" class="ai-fab" aria-label="Open AF ProGuide AI">
        <span class="ai-fab-dot"></span>
        <span>AF ProGuide AI</span>
      </a>
    `);
  },

  modal(title, html) {
    let bd = document.getElementById('af-modal');
    if (!bd) {
      document.body.insertAdjacentHTML('beforeend', `
        <div id="af-modal" class="modal-backdrop" onclick="if(event.target===this)AF.closeModal()">
          <div class="modal-card">
            <div class="flex items-center justify-between mb-5">
              <h3 id="af-modal-title" class="text-lg font-bold text-slate-900" style="font-family:Manrope,sans-serif;"></h3>
              <button onclick="AF.closeModal()" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div id="af-modal-body" class="text-sm leading-relaxed text-slate-600 space-y-3"></div>
          </div>
        </div>
      `);
      bd = document.getElementById('af-modal');
    }
    document.getElementById('af-modal-title').textContent = title;
    document.getElementById('af-modal-body').innerHTML = html;
    bd.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('af-modal')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  initReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },

  text: {
    privacy: `<p>AcademeForge collects only the data necessary to run the platform — account details, course progress, quiz results, and community posts. Your data is never sold to third parties.</p><p>The AI mentor (AF ProGuide) conversations are processed to generate responses and are not stored permanently beyond session logs. Companion apps (Timezy, Capacity) are designed with minimal data collection by default.</p><p>For deletion requests or data queries, email academeforge@gmail.com.</p>`,
    terms: `<p>By using AcademeForge, you agree to use the platform for personal, educational purposes only. Certificates are issued on genuine completion of course content and must not be falsified.</p><p>Impersonation, scraping, or sharing account credentials is strictly prohibited. AcademeForge reserves the right to suspend accounts violating these terms.</p><p>Course fees, where applicable, are non-refundable after 7 days of enrolment.</p>`,
  },

  init() {
    this.injectNav();
    this.injectFooter();
    this.injectAIFab();
    document.addEventListener('DOMContentLoaded', () => this.initReveal());
    if (document.readyState !== 'loading') this.initReveal();
  }
};

AF.init();
