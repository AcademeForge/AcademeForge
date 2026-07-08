document.addEventListener("DOMContentLoaded", () => {
    
    // Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other active items
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Real-time Search Logic
    const searchInput = document.getElementById('faqSearchInput');
    const categories = document.querySelectorAll('.faq-category');
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        
        // Filter FAQs
        faqItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if(text.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            }
        });
        
        // Hide categories if all items under them are hidden
        categories.forEach(cat => {
            let nextEl = cat.nextElementSibling;
            let hasVisibleItem = false;
            
            while(nextEl && nextEl.classList.contains('faq-item')) {
                if(nextEl.style.display !== 'none') {
                    hasVisibleItem = true;
                    break;
                }
                nextEl = nextEl.nextElementSibling;
            }
            
            cat.style.display = hasVisibleItem ? 'block' : 'none';
        });
    });
});
