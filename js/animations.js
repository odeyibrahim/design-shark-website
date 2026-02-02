// Scroll animations and effects

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
    
    // Navigation scroll effect
    const mainNav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Animate elements on scroll
    animateOnScroll();
}

// Throttle scroll events for performance
let scrollThrottleTimer;
window.addEventListener('scroll', () => {
    if (!scrollThrottleTimer) {
        scrollThrottleTimer = setTimeout(() => {
            scrollThrottleTimer = null;
            updateScrollProgress();
        }, 100);
    }
}, { passive: true });

// Animate elements on scroll with Intersection Observer for better performance
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .section-label, .stat-item, .philosophy-poem p, .philosophy-description p, .timeline-item, .craft-item, .feature-item, .contact-title .poem-line, .contact-info, .contact-email, .copyright');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialize fade-in elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.classList.add('will-change');
        fadeInObserver.observe(element);
    });
}

// Performance optimizations - Preload critical images
const criticalImages = [
    'https://erectmitten.s6-tastewp.com/wp-content/uploads/2026/01/0.png',
    'https://plus.unsplash.com/premium_photo-1678937611277-25401c00db38'
];

criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});