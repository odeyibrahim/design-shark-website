// Contact form and newsletter functionality

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In production, this would be an AJAX call to your newsletter service
    console.log('Newsletter subscription:', email);
    
    // Show success message
    const submitBtn = newsletterForm.querySelector('.newsletter-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribed!';
    submitBtn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 2000);
    
    emailInput.value = '';
});

// Contact form submission (if added later)
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual fetch/axios call)
            setTimeout(() => {
                // Show success message
                const successMessage = this.querySelector('.form-success') || document.createElement('div');
                if (!successMessage.classList.contains('form-success')) {
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = 'Thank you for your message! We\'ll get back to you soon.';
                    this.appendChild(successMessage);
                }
                successMessage.style.display = 'block';
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
}

// Initialize contact form on load
document.addEventListener('DOMContentLoaded', setupContactForm);