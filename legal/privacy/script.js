// Custom script for legal pages
document.addEventListener("DOMContentLoaded", () => {
    // Scroll spy for TOC
    const sections = document.querySelectorAll('.doc-section');
    const tocLinks = document.querySelectorAll('.toc-list a');

    if (sections.length > 0 && tocLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        // set first active initially
        if(!document.querySelector('.toc-list a.active')) {
            tocLinks[0].classList.add('active');
        }
    }
});
