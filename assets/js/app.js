// Global app functions and component injection

// Header HTML
const headerHTML = `
<header class="header">
    <nav class="container nav">
        <a href="/" class="logo">mynco</a>
        <ul class="nav-links">
            <li><a href="index.html#features">Features</a></li>
            <li><a href="index.html#how-it-works">How it works</a></li>
            <li><a href="index.html#pricing">Pricing</a></li>
        </ul>
        <div class="nav-actions">
            <a href="auth/login.html" class="btn btn-secondary">Sign In</a>
            <a href="auth/signup.html" class="btn btn-primary">Get Started</a>
        </div>
    </nav>
</header>
`;

// Footer HTML
const footerHTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <a href="/" class="logo">mynco</a>
                <p>Professional client portals for freelancers. Transform your project delivery, impress your clients, and get paid faster with beautiful, branded client experiences.</p>
                <div class="social-links">
                    <a href="mailto:hello@mynco.app" class="social-link" title="Email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/company/mynco" class="social-link" title="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://twitter.com/myncoapp" class="social-link" title="X (Twitter)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/antho8101/mynco" class="social-link" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="footer-section">
                <h4>Product</h4>
                <ul>
                    <li><a href="index.html#features">Features</a></li>
                    <li><a href="index.html#pricing">Pricing</a></li>
                    <li><a href="https://docs.mynco.app">API Docs</a></li>
                    <li><a href="status.html">Status</a></li>
                    <li><a href="changelog.html">Changelog</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Company</h4>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="https://blog.mynco.app">Blog</a></li>
                    <li><a href="/careers">Careers</a></li>
                    <li><a href="/press">Press Kit</a></li>
                    <li><a href="mailto:hello@mynco.app">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Support</h4>
                <ul>
                    <li><a href="https://help.mynco.app">Help Center</a></li>
                    <li><a href="https://docs.mynco.app">Documentation</a></li>
                    <li><a href="https://community.mynco.app">Community</a></li>
                    <li><a href="https://security.mynco.app">Security</a></li>
                    <li><a href="/enterprise">Enterprise</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Mynco Inc. Made with ❤️ for freelancers worldwide.</p>
            <div class="footer-links">
                <a href="privacy.html">Privacy Policy</a>
                <a href="terms.html">Terms of Service</a>
                <a href="cookies.html">Cookie Policy</a>
                <a href="security.html">Security</a>
            </div>
        </div>
    </div>
</footer>
`;

// Cookie Banner HTML
const cookieBannerHTML = `
<!-- Cookie Banner -->
<div id="cookie-banner" class="cookie-banner hidden">
    <div class="cookie-content">
        <div class="cookie-text">
            <h4>🍪 We use cookies</h4>
            <p>We use cookies to enhance your experience, analyze site traffic, and personalize content. By continuing to browse, you consent to our use of cookies.</p>
        </div>
        <div class="cookie-actions">
            <button id="cookie-settings" class="btn btn-ghost btn-sm">Settings</button>
            <button id="cookie-accept" class="btn btn-primary btn-sm">Accept All</button>
        </div>
    </div>
</div>

<!-- Cookie Settings Modal -->
<div id="cookie-modal" class="modal-overlay hidden">
    <div class="modal cookie-modal">
        <div class="modal-header">
            <h3 class="modal-title">🍪 Cookie Preferences</h3>
            <button id="cookie-modal-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4>Essential Cookies</h4>
                    <label class="cookie-toggle">
                        <input type="checkbox" checked disabled>
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <p class="cookie-description">These cookies are necessary for the website to function and cannot be switched off.</p>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4>Analytics Cookies</h4>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="analytics-cookies">
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <p class="cookie-description">These cookies help us understand how visitors interact with our website.</p>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <h4>Marketing Cookies</h4>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="marketing-cookies">
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <p class="cookie-description">These cookies are used to deliver personalized advertisements.</p>
            </div>
        </div>
        <div class="modal-footer">
            <button id="cookie-save" class="btn btn-primary">Save Preferences</button>
            <button id="cookie-accept-all" class="btn btn-secondary">Accept All</button>
        </div>
    </div>
</div>
`;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inject header and footer components
    injectComponents();
    
    // Global navigation handler
    initNavigation();
    
    // Global utilities
    initGlobalUtils();
    
    console.log('🚀 Mynco app initialized');
});

// Inject components directly
function injectComponents() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
    
    // Ajoute le cookie banner au body
    document.body.insertAdjacentHTML('beforeend', cookieBannerHTML);
}

// Navigation management
function initNavigation() {
    // Handle active nav states
    const currentPath = window.location.pathname;
    
    // Wait a bit for components to load
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }, 100);

    // Handle navigation links to landing page with anchors
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-links a[href*="index.html#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const anchor = href.split('#')[1];
                
                // If we're already on the landing page, use smooth scroll
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                    e.preventDefault();
                    const target = document.querySelector('#' + anchor);
                    if (target) {
                        // Use the smooth scroll function from landing.js if available
                        if (typeof window.myncoUtils !== 'undefined' && window.myncoUtils.smoothScrollToSection) {
                            window.myncoUtils.smoothScrollToSection(anchor);
                        } else {
                            // Fallback to basic smooth scroll
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
                // If we're on another page, let the normal navigation happen
                // (redirect to landing page with anchor)
            });
        });
    }, 200);

    // Header hide/show on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 100; // Minimum scroll before hiding header
    
    if (header) {
        window.addEventListener('scroll', utils.debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only hide/show if we've scrolled enough
            if (Math.abs(scrollTop - lastScrollTop) > 10) {
                if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                    // Scrolling down - hide header
                    header.classList.add('header-hidden');
                } else if (scrollTop < lastScrollTop) {
                    // Scrolling up - show header
                    header.classList.remove('header-hidden');
                }
                lastScrollTop = scrollTop;
            }
        }, 10)); // Small debounce for smooth performance
    }
}

// Global utility functions
function initGlobalUtils() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        // Tu pourras ajouter ton error tracking ici
    });
    
    // Global click tracking for analytics
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn');
        if (button) {
            const buttonText = button.textContent.trim();
            const buttonType = button.classList.contains('btn-primary') ? 'primary' : 'secondary';
            
            console.log('Button clicked:', { text: buttonText, type: buttonType });
            
            // Plus tard pour analytics :
            // trackEvent('button_click', { text: buttonText, type: buttonType });
        }
    });
}

// Utility functions that can be used across the app
const utils = {
    // Format currency
    formatCurrency: (amount, currency = 'EUR') => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Generate random ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },
    
    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Copied to clipboard:', text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },
    
    // Show notification (basic implementation)
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style basic
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Colors based on type
        const colors = {
            info: '#3B82F6',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// Make utils available globally
window.myncoUtils = utils;