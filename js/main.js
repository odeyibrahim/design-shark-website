// Main JavaScript - Core functionality

// Logo Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Ensure images are loaded
    const images = document.images;
    const totalImages = images.length;
    let loadedImages = 0;
    
    // Check if all images are loaded
    const imageLoadHandler = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
            removePreloader();
        }
    };
    
    // If no images or all cached, remove preloader after timeout
    if (totalImages === 0) {
        setTimeout(removePreloader, 1000);
    } else {
        Array.from(images).forEach(img => {
            if (img.complete) {
                imageLoadHandler();
            } else {
                img.addEventListener('load', imageLoadHandler);
                img.addEventListener('error', imageLoadHandler); // Handle broken images too
            }
        });
        
        // Fallback timeout
        setTimeout(removePreloader, 3000);
    }
    
    function removePreloader() {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Initialize animations after preloader is gone
            animateOnScroll();
            updateScrollProgress();
        }, 800);
    }
});

// Image lazy loading with fade-in effect
const lazyImages = document.querySelectorAll('.process-image');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => {
    img.classList.add('will-change');
    imageObserver.observe(img);
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const body = document.body;

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    body.classList.add('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
});

// Close mobile menu
menuCloseBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
});

// Close menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show active tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
        
        // Scroll tabs into view on mobile
        if (window.innerWidth <= 768) {
            const activeContent = document.getElementById(tabId);
            activeContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a, .mobile-nav-links a, .poem-cta').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cookie Consent
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');

// Check if user has already made a choice
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 20000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.classList.remove('show');
    // Initialize analytics here
    initAnalytics();
});

cookieReject.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    cookieConsent.classList.remove('show');
});

// Analytics initialization (Google Analytics example)
function initAnalytics() {
    // Only initialize if cookies are accepted
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        // Replace with your actual Google Analytics ID
        const gaId = 'G-XXXXXXXXXX';
        
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gaId);
    }
}

// Handle reduced motion preference
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

mediaQuery.addEventListener('change', () => {
    if (mediaQuery.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    } else {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateScrollProgress();
    
    // Add loading="lazy" to non-critical images if not already present
    document.querySelectorAll('img:not(.logo-loader-img):not(.process-image)').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
    
    // Animate opening poem lines
    const poemLines = document.querySelectorAll('.poem-line');
    poemLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = index % 2 === 0 ? '0.8' : '0.6';
        }, index * 200);
    });
});