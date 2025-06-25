// Landing page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animation on scroll (intersection observer)
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements to animate
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .testimonial-card, .step, .demo-highlight, .feature-mockup'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // Demo video placeholder click handler
    function initDemoVideo() {
        const demoPlaceholder = document.querySelector('.demo-video-placeholder');
        if (demoPlaceholder) {
            demoPlaceholder.addEventListener('click', function() {
                // Pour plus tard quand tu auras ta vidéo
                console.log('Demo video clicked - ready for video integration');
                
                // Tu pourras remplacer par quelque chose comme :
                // this.innerHTML = '<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...></iframe>';
            });
        }
    }

    // Stats counter animation
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = element.textContent;
            const isNumber = /^\d+/.test(target);
            
            if (!isNumber) return;
            
            const number = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d,\.]/g, '');
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                
                // Format number with commas if needed
                const formattedNumber = Math.floor(current).toLocaleString();
                element.textContent = formattedNumber + suffix;
            }, 16);
        };

        // Observer for stats
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // Pricing card highlight on hover
    function initPricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card:not(.featured)');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Form validation for CTAs (si tu ajoutes des forms plus tard)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const email = this.querySelector('input[type="email"]');
                if (email && !isValidEmail(email.value)) {
                    e.preventDefault();
                    showError(email, 'Please enter a valid email address');
                }
            });
        });
    }

    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove existing error
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('error');
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
            input.classList.remove('error');
        }, 3000);
    }

    // Track user interactions for analytics (prêt pour plus tard)
    function initAnalytics() {
        // Track CTA clicks
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', function() {
                const ctaText = this.textContent.trim();
                console.log('CTA clicked:', ctaText);
                
                // Plus tard tu pourras ajouter :
                // gtag('event', 'cta_click', { 'cta_text': ctaText });
                // ou analytics de ton choix
            });
        });

        // Track section views
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.className || entry.target.id || 'unknown';
                    console.log('Section viewed:', sectionName);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // Initialize all functions
    initHeaderScroll();
    initSmoothScrolling();
    initScrollAnimations();
    initDemoVideo();
    initStatsCounter();
    initPricingCards();
    initFormValidation();
    initAnalytics();

    // Console log for debugging
    console.log('🚀 Mynco landing page loaded successfully!');
});