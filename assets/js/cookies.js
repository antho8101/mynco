// Cookie Banner Management
class CookieManager {
    constructor() {
        this.cookieSettings = {
            essential: true,      // Always true, cannot be disabled
            analytics: false,     // Google Analytics, etc.
            marketing: false      // Marketing/advertising cookies
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.bindEvents();
        this.checkCookieConsent();
    }
    
    bindEvents() {
        // Banner buttons
        const acceptBtn = document.getElementById('cookie-accept');
        const settingsBtn = document.getElementById('cookie-settings');
        
        // Modal buttons
        const modalClose = document.getElementById('cookie-modal-close');
        const saveBtn = document.getElementById('cookie-save');
        const acceptAllBtn = document.getElementById('cookie-accept-all');
        
        // Modal overlay (click outside to close)
        const modalOverlay = document.getElementById('cookie-modal');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAllCookies());
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showCookieModal());
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideCookieModal());
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePreferences());
        }
        
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', () => this.acceptAllCookies());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.hideCookieModal();
                }
            });
        }
    }
    
    checkCookieConsent() {
        // MODE DEBUG: Pas de bannière cookies pour Tag Assistant testing
        console.log('🔧 DEBUG MODE: Cookie banner disabled for Tag Assistant testing');
        this.cookieSettings = {
            essential: true,
            analytics: true,
            marketing: true
        };
        this.applyCookieSettings();
        return;
        
        // Si pas dans EEE, pas besoin de bannière cookies (DÉSACTIVÉ TEMPORAIREMENT)
        /*
        if (typeof window.isEEARegion === 'function' && !window.isEEARegion()) {
            console.log('🌍 Non-EEA user - Cookie banner not required');
            // Activer tous les cookies par défaut pour les non-EEE
            this.cookieSettings = {
                essential: true,
                analytics: true,
                marketing: true
            };
            this.applyCookieSettings();
            return;
        }
        */
        
        const consent = localStorage.getItem('cookie-consent');
        const consentDate = localStorage.getItem('cookie-consent-date');
        
        // Check if consent is older than 1 year
        if (consent && consentDate) {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            
            if (new Date(consentDate) < oneYearAgo) {
                // Consent expired, show banner again
                this.showCookieBanner();
                return;
            }
            
            // Load saved preferences
            try {
                this.cookieSettings = JSON.parse(consent);
                this.applyCookieSettings();
            } catch (e) {
                console.error('Error parsing cookie consent:', e);
                this.showCookieBanner();
            }
        } else {
            // No consent found, show banner (EEE users only)
            console.log('🇪🇺 EEA user - Cookie consent required');
            this.showCookieBanner();
        }
    }
    
    showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('hidden');
            // Add to body to ensure it's in the DOM
            document.body.appendChild(banner);
        }
    }
    
    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.add('hidden');
        }
    }
    
    showCookieModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Update checkboxes with current settings
            const analyticsCheckbox = document.getElementById('analytics-cookies');
            const marketingCheckbox = document.getElementById('marketing-cookies');
            
            if (analyticsCheckbox) {
                analyticsCheckbox.checked = this.cookieSettings.analytics;
            }
            if (marketingCheckbox) {
                marketingCheckbox.checked = this.cookieSettings.marketing;
            }
        }
    }
    
    hideCookieModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    acceptAllCookies() {
        this.cookieSettings = {
            essential: true,
            analytics: true,
            marketing: true
        };
        
        this.saveConsent();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hideCookieModal();
        
        // Analytics tracking
        this.trackEvent('cookie_consent', { action: 'accept_all' });
    }
    
    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');
        
        this.cookieSettings = {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false
        };
        
        this.saveConsent();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hideCookieModal();
        
        // Analytics tracking
        this.trackEvent('cookie_consent', { 
            action: 'save_preferences',
            analytics: this.cookieSettings.analytics,
            marketing: this.cookieSettings.marketing
        });
    }
    
    saveConsent() {
        localStorage.setItem('cookie-consent', JSON.stringify(this.cookieSettings));
        localStorage.setItem('cookie-consent-date', new Date().toISOString());
    }
    
    applyCookieSettings() {
        // Apply analytics cookies
        if (this.cookieSettings.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        // Apply marketing cookies
        if (this.cookieSettings.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        console.log('Cookie settings applied:', this.cookieSettings);
    }
    
    enableAnalytics() {
        // Google Consent Mode v2 - Enable analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied', // Keep ads denied unless marketing is also enabled
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        console.log('Analytics cookies enabled');
    }
    
    disableAnalytics() {
        // Google Consent Mode v2 - Disable analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        console.log('Analytics cookies disabled');
    }
    
    enableMarketing() {
        // Google Consent Mode v2 - Enable marketing/ads
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
        console.log('Marketing cookies enabled');
    }
    
    disableMarketing() {
        // Google Consent Mode v2 - Disable marketing/ads
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied', 
                'ad_personalization': 'denied'
            });
        }
        console.log('Marketing cookies disabled');
    }
    
    trackEvent(eventName, parameters = {}) {
        // Only track if analytics are enabled
        if (this.cookieSettings.analytics) {
            console.log('Event tracked:', eventName, parameters);
            
            // Google Analytics 4 event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    ...parameters,
                    // Add source information
                    event_source: 'mynco_landing',
                    timestamp: Date.now()
                });
            }
        }
    }
    
    // Public method to check if specific cookies are allowed
    isAllowed(cookieType) {
        return this.cookieSettings[cookieType] || false;
    }
    
    // Public method to get all settings
    getSettings() {
        return { ...this.cookieSettings };
    }
}

// Initialize cookie manager
window.cookieManager = new CookieManager();

// Make it available globally for other scripts
window.myncoUtils = window.myncoUtils || {};
window.myncoUtils.cookieManager = window.cookieManager;