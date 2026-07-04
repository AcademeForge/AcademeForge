document.addEventListener('DOMContentLoaded', () => {
 
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
      
      // We map the picker values to categories/products
      // Intent mapping:
      // learn -> learn
      // exams -> learn (scrolls to Scholars test)
      // productivity -> track
      // wellbeing -> personal
      // reading -> create
      // create -> create

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
    { title: 'AF Bazzar', desc: 'Store', url: 'https://shop.academeforge.in' },
    { title: 'Certificate Verification Portal', desc: 'Tool', url: '#' },
    { title: 'Team Verification Portal', desc: 'Tool', url: '#' },
    { title: 'HopeNext Portal', desc: 'Platform', url: '#' },
    { title: 'Download Center', desc: 'Resource', url: 'https://download.academeforge.in' },
    { title: 'Internship Application', desc: 'Careers', url: '#' },
    { title: 'Help Desk', desc: 'Support', url: 'https://faq.academeforge.in' }
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
  
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Nav shadow
    if (scrollY > 10) {
      mainNav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
    } else {
      mainNav.style.boxShadow = 'none';
    }

    // Sticky CTA visibility (only show when scrolling down and past hero)
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom + scrollY;
      const isScrollingDown = scrollY > lastScrollY;
      
      if (scrollY > heroBottom && isScrollingDown) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }
    
    lastScrollY = scrollY;
  });

  // ---------------------------------------------------------
  // 9. LANGUAGE TOGGLE LOGIC
  // ---------------------------------------------------------
  const langToggles = document.querySelectorAll('.lang-toggle');
  const i18nElements = document.querySelectorAll('.i18n-text');
  
  const translations = {
    "Have a project or idea? Let's build something meaningful together.": "क्या आपके पास कोई प्रोजेक्ट या विचार है? आइए मिलकर कुछ सार्थक बनाएं।",
    "Let's Talk": "बातचीत करें",
    "We are actively upgrading the ecosystem. Some features may not work as expected.": "हम सक्रिय रूप से इकोसिस्टम को अपग्रेड कर रहे हैं। कुछ सुविधाएँ अपेक्षित रूप से काम नहीं कर सकती हैं।",
    "Products": "उत्पाद",
    "The central student platform for learning.": "सीखने के लिए केंद्रीय छात्र मंच।",
    "An intelligent learning companion.": "एक बुद्धिमान सीखने का साथी।",
    "A dedicated examination platform.": "एक समर्पित परीक्षा मंच।",
    "A productivity and time management platform.": "एक उत्पादकता और समय प्रबंधन मंच।",
    "A private wellbeing platform.": "एक निजी भलाई मंच।",
    "An independent publishing platform.": "एक स्वतंत्र प्रकाशन मंच।",
    "The creative and innovation studio.": "रचनात्मक और नवाचार स्टूडियो।",
    "The official AcademeForge store and marketplace.": "आधिकारिक एकेडमीफोर्ज स्टोर और बाज़ार।",
    "Internship": "इंटर्नशिप",
    "Apply": "आवेदन करें",
    "Application Status": "आवेदन की स्थिति",
    "Workspace Policy": "कार्यक्षेत्र नीति",
    "What To Do": "क्या करें",
    "Company": "कंपनी",
    "Contact": "संपर्क करें",
    "Download Center": "डाउनलोड सेंटर",
    "Menu": "मेनू",
    "Status": "स्थिति",
    "Language": "भाषा",
    "India's Learning & Technology Ecosystem": "भारत का लर्निंग और टेक्नोलॉजी इकोसिस्टम",
    "AcademeForge is a growing Indian technology ecosystem building digital platforms that help students learn, create, stay productive, and grow beyond the classroom.": "एकेडमीफोर्ज एक बढ़ता हुआ भारतीय टेक्नोलॉजी इकोसिस्टम है जो ऐसे डिजिटल प्लेटफॉर्म बना रहा है जो छात्रों को कक्षा से परे सीखने, बनाने, उत्पादक बने रहने और बढ़ने में मदद करते हैं।",
    "What are you here for?": "आप यहाँ किस लिए आए हैं?",
    "Select a goal...": "एक लक्ष्य चुनें...",
    "Learning & Courses": "लर्निंग और पाठ्यक्रम",
    "Assessments & Exams": "मूल्यांकन और परीक्षा",
    "Productivity & Planning": "उत्पादकता और योजना",
    "Personal Wellbeing": "व्यक्तिगत भलाई",
    "Reading & Journalism": "पढ़ना और पत्रकारिता",
    "Design & Innovation": "डिजाइन और नवाचार",
    "Shopping & Marketplace": "खरीदारी और बाज़ार",
    "Instead of offering just one application, AcademeForge brings together multiple connected platforms designed for different aspects of a student's journey—from learning and AI to examinations, productivity, wellbeing, journalism, and creative innovation.": "केवल एक एप्लिकेशन पेश करने के बजाय, एकेडमीफोर्ज एक छात्र की यात्रा के विभिन्न पहलुओं के लिए डिज़ाइन किए गए कई जुड़े हुए प्लेटफार्मों को एक साथ लाता है—लर्निंग और एआई से लेकर परीक्षाओं, उत्पादकता, भलाई, पत्रकारिता और रचनात्मक नवाचार तक।",
    "Whether you're learning a new skill, preparing for an exam, organizing your day, exploring AI, or connecting with a community, AcademeForge provides a unified experience through one ecosystem.": "चाहे आप कोई नया कौशल सीख रहे हों, परीक्षा की तैयारी कर रहे हों, अपना दिन व्यवस्थित कर रहे हों, एआई की खोज कर रहे हों, या किसी समुदाय से जुड़ रहे हों, एकेडमीफोर्ज एक इकोसिस्टम के माध्यम से एक एकीकृत अनुभव प्रदान करता है।",
    "Explore the Ecosystem": "इकोसिस्टम का अन्वेषण करें",
    "All": "सभी",
    "Learn & Grow": "सीखें और बढ़ें",
    "Stay on Track": "ट्रैक पर रहें",
    "Personal": "व्यक्तिगत",
    "Explore & Create": "अन्वेषण और निर्माण",
    "Shopping": "खरीदारी",
    "The central student platform for learning, courses, assessments, certificates, progress tracking, and community.": "लर्निंग, पाठ्यक्रम, मूल्यांकन, प्रमाण पत्र, प्रगति ट्रैकिंग और समुदाय के लिए केंद्रीय छात्र मंच।",
    "Start Learning": "सीखना शुरू करें",
    "An intelligent learning companion designed to assist with coding, problem-solving, writing, career guidance, and productivity.": "कोडिंग, समस्या-समाधान, लेखन, कैरियर मार्गदर्शन और उत्पादकता में सहायता के लिए डिज़ाइन किया गया एक बुद्धिमान सीखने का साथी।",
    "Chat Now": "अभी चैट करें",
    "A dedicated examination platform for students and schools, offering secure assessments, admit cards, results, and academic services.": "छात्रों और स्कूलों के लिए एक समर्पित परीक्षा मंच, जो सुरक्षित मूल्यांकन, प्रवेश पत्र, परिणाम और शैक्षणिक सेवाएं प्रदान करता है।",
    "Book Exam": "परीक्षा बुक करें",
    "A productivity and time management platform that helps users organize tasks, plan schedules, and stay focused throughout the day.": "एक उत्पादकता और समय प्रबंधन मंच जो उपयोगकर्ताओं को कार्यों को व्यवस्थित करने, कार्यक्रम की योजना बनाने और दिन भर केंद्रित रहने में मदद करता है।",
    "Plan Your Day": "अपने दिन की योजना बनाएं",
    "A private wellbeing platform where users can share how they're feeling, stay connected with trusted people, and maintain meaningful conversations.": "एक निजी भलाई मंच जहां उपयोगकर्ता साझा कर सकते हैं कि वे कैसा महसूस कर रहे हैं, विश्वसनीय लोगों से जुड़े रह सकते हैं, और सार्थक बातचीत बनाए रख सकते हैं।",
    "Open Privately": "निजी तौर पर खोलें",
    "An independent publishing platform focused on journalism, technology, education, society, and stories that matter.": "पत्रकारिता, प्रौद्योगिकी, शिक्षा, समाज और मायने रखने वाली कहानियों पर केंद्रित एक स्वतंत्र प्रकाशन मंच।",
    "Read Stories": "कहानियां पढ़ें",
    "The creative and innovation studio behind the AcademeForge ecosystem, focused on design, branding, product development, and digital experiences.": "डिजाइन, ब्रांडिंग, उत्पाद विकास और डिजिटल अनुभवों पर केंद्रित एकेडमीफोर्ज इकोसिस्टम के पीछे रचनात्मक और नवाचार स्टूडियो।",
    "Enter Studio": "स्टूडियो में प्रवेश करें",
    "The official AcademeForge store and marketplace for digital and physical resources.": "डिजिटल और भौतिक संसाधनों के लिए आधिकारिक एकेडमीफोर्ज स्टोर और बाज़ार।",
    "Shop Now": "अभी खरीदारी करें",
    "One Ecosystem.<br>Multiple Experiences.": "एक इकोसिस्टम।<br>कई अनुभव।",
    "Every AcademeForge product is designed to work independently while remaining connected through a shared ecosystem.": "प्रत्येक एकेडमीफोर्ज उत्पाद को एक साझा इकोसिस्टम के माध्यम से जुड़े रहने के साथ स्वतंत्र रूप से काम करने के लिए डिज़ाइन किया गया है।",
    "One account.": "एक खाता।",
    "Multiple platforms.": "कई प्लेटफार्म।",
    "A consistent experience.": "एक सुसंगत अनुभव।",
    "Built for students, creators, educators, and future innovators.": "छात्रों, रचनाकारों, शिक्षकों और भविष्य के नवोन्मेषकों के लिए बनाया गया।",
    "Why AcademeForge?": "एकेडमीफोर्ज क्यों?",
    "Learn practical digital skills.": "व्यावहारिक डिजिटल कौशल सीखें।",
    "Explore AI-powered learning.": "एआई-संचालित शिक्षण का अन्वेषण करें।",
    "Prepare for examinations.": "परीक्षा की तैयारी करें।",
    "Stay productive with dedicated tools.": "समर्पित उपकरणों के साथ उत्पादक बने रहें।",
    "Take care of your wellbeing.": "अपनी भलाई का ख्याल रखें।",
    "Connect with a growing student community.": "बढ़ते छात्र समुदाय से जुड़ें।",
    "Discover new ideas through independent journalism.": "स्वतंत्र पत्रकारिता के माध्यम से नए विचारों की खोज करें।",
    "Learning Beyond the Classroom": "कक्षा से परे सीखना",
    "Learning Beyond The Classroom": "कक्षा से परे सीखना",
    "AcademeForge is building a future where education extends beyond traditional classrooms—bringing learning, technology, creativity, productivity, and innovation together in one connected ecosystem for the next generation of learners.": "एकेडमीफोर्ज एक ऐसे भविष्य का निर्माण कर रहा है जहां शिक्षा पारंपरिक कक्षाओं से आगे बढ़ती है—लर्निंग, प्रौद्योगिकी, रचनात्मकता, उत्पादकता और नवाचार को शिक्षार्थियों की अगली पीढ़ी के लिए एक जुड़े हुए इकोसिस्टम में एक साथ लाती है।",
    "Visit Download Center": "डाउनलोड सेंटर पर जाएं",
    "Learning beyond the classroom.": "कक्षा से परे सीखना।",
    "About": "के बारे में",
    "Clients": "ग्राहक",
    "News": "समाचार",
    "Help Desk": "हेल्प डेस्क",
    "Legal": "कानूनी",
    "Privacy Policy": "गोपनीयता नीति",
    "Terms of Service": "सेवा की शर्तें",
    "Designed in India.": "भारत में डिज़ाइन किया गया।",
    "Get Started Free": "मुफ़्त में शुरू करें",
    "Book a Call": "एक कॉल बुक करें",
    "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
    "Got questions? We've got answers about the AcademeForge ecosystem.": "क्या आपके कोई प्रश्न हैं? हमारे पास एकेडमीफोर्ज इकोसिस्टम के बारे में उत्तर हैं।",
    "What is AcademeForge?": "एकेडमीफोर्ज क्या है?",
    "AcademeForge is a technology ecosystem building multiple platforms for students to learn, prepare for exams, stay productive, and more, all under one unified account.": "एकेडमीफोर्ज एक प्रौद्योगिकी इकोसिस्टम है जो छात्रों को सीखने, परीक्षा की तैयारी करने, उत्पादक बने रहने और बहुत कुछ करने के लिए कई प्लेटफॉर्म बनाता है, वह भी एक एकीकृत खाते के तहत।",
    "Do I need separate accounts for each app?": "क्या मुझे प्रत्येक ऐप के लिए अलग खाते चाहिए?",
    "No, a single AcademeForge account grants you access to all our platforms, including AF Nexus, AcademeForge AI, Scholars Test, and Timezy.": "नहीं, एक एकल एकेडमीफोर्ज खाता आपको हमारे सभी प्लेटफॉर्म तक पहुंच प्रदान करता है, जिसमें AF Nexus, AcademeForge AI, Scholars Test, और Timezy शामिल हैं।",
    "More Doubts?": "और अधिक शंकाएँ?",
    "Visit faq.academeforge.in": "faq.academeforge.in पर जाएं",
    "View All FAQs": "सभी प्रश्न देखें",
    "Other tools": "अन्य उपकरण",
    "Certificate Verification Portal": "प्रमाणपत्र सत्यापन पोर्टल",
    "Team Verification Portal": "टीम सत्यापन पोर्टल",
    "HopeNext Portal": "HopeNext पोर्टल"
  };

  // Store original English text
  i18nElements.forEach(el => {
    if (!el.getAttribute('data-en')) {
      el.setAttribute('data-en', el.innerHTML.trim());
    }
  });

  langToggles.forEach(toggle => {
    const btns = toggle.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Sync all toggles
        document.querySelectorAll('.lang-btn').forEach(b => {
          if (b.getAttribute('data-lang') === e.target.getAttribute('data-lang')) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        
        const lang = e.target.getAttribute('data-lang');
        
        i18nElements.forEach(el => {
          const enText = el.getAttribute('data-en');
          if (lang === 'hi') {
            if (translations[enText]) {
              el.innerHTML = translations[enText];
            }
          } else {
            el.innerHTML = enText;
          }
        });
      });
    });
  });

  // ---------------------------------------------------------
  // 10. FAQ ACCORDION LOGIC
  // ---------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
