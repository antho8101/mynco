// Global app functions and component injection

// Header HTML
const headerHTML = `
<header class="header">
    <nav class="container nav">
        <a href="/" class="logo">
            <div class="logo-icon">
                <svg width="50" height="50" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                    <g transform="matrix(-1.34657,0,0,1.34657,1201.44,-177.905)">
                        <path d="M703.677,440.186C720.246,446.523 760.396,470.572 829.384,453.075C825.293,464.324 818.646,480.685 796.149,496.025C773.651,496.536 705.709,498.07 677.812,479.151C677.015,484.776 682.128,487.844 670.879,493.468C682.128,499.092 711.784,523.124 764.448,520.567C759.846,535.906 749.109,550.223 732.236,560.449C716.897,557.892 648.893,546.644 628.441,522.612C628.952,533.35 657.585,565.562 697.467,576.811C682.128,585.503 667.3,589.082 646.848,590.616C626.396,581.412 602.876,575.788 573.731,546.132C568.618,557.381 569.641,562.494 557.881,559.938C570.152,572.72 584.98,596.752 609.523,603.399C599.296,608.512 565.653,612.602 542.337,597.774C519.022,582.946 481.185,514.192 485.787,491.559C485.787,491.559 521.067,442.985 573.22,413.84C625.373,384.696 665.766,339.19 667.3,276.299C705.136,266.585 770.584,227.861 848.302,142.337C854.949,154.473 864.663,179.527 865.686,202.536C842.166,219.92 827.338,243.44 750.131,274.63C759.335,279.231 764.959,284.856 761.891,293.037C784.9,286.39 841.144,262.358 871.822,223.499C875.912,237.816 874.378,254.177 871.822,275.141C856.483,286.901 816.09,312.466 749.62,326.271C755.244,329.851 757.801,340.394 752.688,345.604C770.584,342.633 814.556,335.986 871.822,302.24C869.265,314.511 872.333,339.054 866.709,353.371C851.37,357.461 799.728,374.923 743.484,377.952C743.484,379.447 747.575,387.117 740.928,397.854C766.493,398.877 824.782,396.909 860.573,377.952C860.062,391.207 851.881,415.75 842.166,425.976C830.406,429.555 778.764,446.428 719.453,430.578C716.897,432.623 720.476,439.781 711.783,440.292C707.125,440.566 704.816,440.4 703.677,440.186C703.299,440.042 702.933,439.906 702.58,439.781C702.58,439.781 702.69,440.001 703.677,440.186ZM375.322,259.619C375.322,259.619 473.127,247.526 477.818,460.357C478.193,467.182 461.912,475.604 465.209,492.191C467.622,499.127 473.727,592.201 551.133,628.659C553.353,636.424 559.217,679.589 590.422,729.935C575.552,731.484 499.319,732.112 431.255,691.482C425.809,692.948 418.06,695.88 415.338,705.305C420.155,707.608 442.145,720.803 434.815,749.285C419.108,725.201 387.274,709.905 355.65,768.553C338.267,763.952 346.645,726.674 361.095,721.228C355.65,719.762 338.899,724.998 326.751,735.26C328.215,721.857 336.592,690.442 389.368,695.05C401.096,686.044 394.814,668.976 383.504,661.279C372.195,653.582 278.984,596.99 297.391,482.05C346.988,579.302 426.24,486.453 420.105,377.952C416.208,261.513 363.141,272.425 363.141,272.425C363.141,272.425 358.047,272.827 358.047,268.136C358.047,263.444 361.501,260.218 375.322,259.619ZM373.251,685.468C319.061,682.013 317.49,720.81 314.506,737.616C288.903,723.166 309.165,693.165 309.165,693.165C309.165,693.165 293.772,695.05 284.505,719.396C268.311,689.935 301.468,661.279 331.469,661.279C361.47,661.279 373.251,685.468 373.251,685.468ZM492.85,444.695C492.85,444.695 492.543,395.916 477.818,341.615C494.077,311.551 519.233,250.501 505.428,145.581C536.274,163.973 558.502,185.463 558.502,185.463L560.07,203.906L576.877,205.163C576.877,205.163 594.312,223.384 605.778,245.06C605.621,255.741 603.108,265.95 603.108,265.95L618.658,272.155C618.658,272.155 627.14,290.611 632.638,316.214C631.067,319.826 622.271,343.701 622.271,343.701C622.271,343.701 546.853,383.7 492.85,444.695ZM149.647,377.868C149.647,377.868 164.154,263.224 298.473,259.671C335.582,258.689 352.86,272.04 352.86,272.04C352.86,272.04 344.345,296.692 340.098,338.993C336.283,337.524 252.057,309.57 149.647,377.868ZM189.78,367.041C189.78,367.041 241.025,333.467 337.428,350.352C337.429,370.379 326.041,376.326 326.041,377.868C326.041,379.411 242.988,358.991 189.78,367.041ZM375.322,291.352C385.888,291.352 394.466,299.929 394.466,310.495C394.466,321.06 385.888,329.638 375.322,329.638C364.757,329.638 356.179,321.06 356.179,310.495C356.179,299.929 364.757,291.352 375.322,291.352ZM373.181,297.733C368.25,297.733 364.247,301.736 364.247,306.666C364.247,311.597 368.25,315.6 373.181,315.6C378.111,315.6 382.114,311.597 382.114,306.666C382.114,301.736 378.111,297.733 373.181,297.733ZM457.596,730.503C457.596,730.503 525.321,763.318 599.276,751.538C627.418,800.623 677.812,884.232 677.812,884.232C677.812,884.232 598.949,891.431 571.788,781.807C575.061,809.949 579.315,834.165 615.965,883.904C569.498,884.886 533.174,858.707 516.485,779.189C512.559,792.279 512.231,845.618 534.156,883.577C486.38,884.232 406.862,883.577 406.862,883.577C406.862,883.577 472.963,833.838 472.963,791.951C472.963,750.065 457.596,730.503 457.596,730.503Z" style="fill:currentColor;"/>
                    </g>
                </svg>
            </div>
            <span class="logo-text">mynco</span>
        </a>
        <ul class="nav-links">
            <li><a href="index.html#features">Features</a></li>
            <li><a href="index.html#how-it-works">How it works</a></li>
            <li><a href="index.html#pricing">Pricing</a></li>
        </ul>
        <div class="nav-actions">
            <a href="auth/signin.html" class="btn btn-secondary">Sign In</a>
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
                <a href="/" class="logo">
                    <div class="logo-icon">
                        <svg width="34" height="34" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                            <g transform="matrix(-1.34657,0,0,1.34657,1201.44,-177.905)">
                                <path d="M703.677,440.186C720.246,446.523 760.396,470.572 829.384,453.075C825.293,464.324 818.646,480.685 796.149,496.025C773.651,496.536 705.709,498.07 677.812,479.151C677.015,484.776 682.128,487.844 670.879,493.468C682.128,499.092 711.784,523.124 764.448,520.567C759.846,535.906 749.109,550.223 732.236,560.449C716.897,557.892 648.893,546.644 628.441,522.612C628.952,533.35 657.585,565.562 697.467,576.811C682.128,585.503 667.3,589.082 646.848,590.616C626.396,581.412 602.876,575.788 573.731,546.132C568.618,557.381 569.641,562.494 557.881,559.938C570.152,572.72 584.98,596.752 609.523,603.399C599.296,608.512 565.653,612.602 542.337,597.774C519.022,582.946 481.185,514.192 485.787,491.559C485.787,491.559 521.067,442.985 573.22,413.84C625.373,384.696 665.766,339.19 667.3,276.299C705.136,266.585 770.584,227.861 848.302,142.337C854.949,154.473 864.663,179.527 865.686,202.536C842.166,219.92 827.338,243.44 750.131,274.63C759.335,279.231 764.959,284.856 761.891,293.037C784.9,286.39 841.144,262.358 871.822,223.499C875.912,237.816 874.378,254.177 871.822,275.141C856.483,286.901 816.09,312.466 749.62,326.271C755.244,329.851 757.801,340.394 752.688,345.604C770.584,342.633 814.556,335.986 871.822,302.24C869.265,314.511 872.333,339.054 866.709,353.371C851.37,357.461 799.728,374.923 743.484,377.952C743.484,379.447 747.575,387.117 740.928,397.854C766.493,398.877 824.782,396.909 860.573,377.952C860.062,391.207 851.881,415.75 842.166,425.976C830.406,429.555 778.764,446.428 719.453,430.578C716.897,432.623 720.476,439.781 711.783,440.292C707.125,440.566 704.816,440.4 703.677,440.186C703.299,440.042 702.933,439.906 702.58,439.781C702.58,439.781 702.69,440.001 703.677,440.186ZM375.322,259.619C375.322,259.619 473.127,247.526 477.818,460.357C478.193,467.182 461.912,475.604 465.209,492.191C467.622,499.127 473.727,592.201 551.133,628.659C553.353,636.424 559.217,679.589 590.422,729.935C575.552,731.484 499.319,732.112 431.255,691.482C425.809,692.948 418.06,695.88 415.338,705.305C420.155,707.608 442.145,720.803 434.815,749.285C419.108,725.201 387.274,709.905 355.65,768.553C338.267,763.952 346.645,726.674 361.095,721.228C355.65,719.762 338.899,724.998 326.751,735.26C328.215,721.857 336.592,690.442 389.368,695.05C401.096,686.044 394.814,668.976 383.504,661.279C372.195,653.582 278.984,596.99 297.391,482.05C346.988,579.302 426.24,486.453 420.105,377.952C416.208,261.513 363.141,272.425 363.141,272.425C363.141,272.425 358.047,272.827 358.047,268.136C358.047,263.444 361.501,260.218 375.322,259.619ZM373.251,685.468C319.061,682.013 317.49,720.81 314.506,737.616C288.903,723.166 309.165,693.165 309.165,693.165C309.165,693.165 293.772,695.05 284.505,719.396C268.311,689.935 301.468,661.279 331.469,661.279C361.47,661.279 373.251,685.468 373.251,685.468ZM492.85,444.695C492.85,444.695 492.543,395.916 477.818,341.615C494.077,311.551 519.233,250.501 505.428,145.581C536.274,163.973 558.502,185.463 558.502,185.463L560.07,203.906L576.877,205.163C576.877,205.163 594.312,223.384 605.778,245.06C605.621,255.741 603.108,265.95 603.108,265.95L618.658,272.155C618.658,272.155 627.14,290.611 632.638,316.214C631.067,319.826 622.271,343.701 622.271,343.701C622.271,343.701 546.853,383.7 492.85,444.695ZM149.647,377.868C149.647,377.868 164.154,263.224 298.473,259.671C335.582,258.689 352.86,272.04 352.86,272.04C352.86,272.04 344.345,296.692 340.098,338.993C336.283,337.524 252.057,309.57 149.647,377.868ZM189.78,367.041C189.78,367.041 241.025,333.467 337.428,350.352C337.429,370.379 326.041,376.326 326.041,377.868C326.041,379.411 242.988,358.991 189.78,367.041ZM375.322,291.352C385.888,291.352 394.466,299.929 394.466,310.495C394.466,321.06 385.888,329.638 375.322,329.638C364.757,329.638 356.179,321.06 356.179,310.495C356.179,299.929 364.757,291.352 375.322,291.352ZM373.181,297.733C368.25,297.733 364.247,301.736 364.247,306.666C364.247,311.597 368.25,315.6 373.181,315.6C378.111,315.6 382.114,311.597 382.114,306.666C382.114,301.736 378.111,297.733 373.181,297.733ZM457.596,730.503C457.596,730.503 525.321,763.318 599.276,751.538C627.418,800.623 677.812,884.232 677.812,884.232C677.812,884.232 598.949,891.431 571.788,781.807C575.061,809.949 579.315,834.165 615.965,883.904C569.498,884.886 533.174,858.707 516.485,779.189C512.559,792.279 512.231,845.618 534.156,883.577C486.38,884.232 406.862,883.577 406.862,883.577C406.862,883.577 472.963,833.838 472.963,791.951C472.963,750.065 457.596,730.503 457.596,730.503Z" style="fill:currentColor;"/>
                            </g>
                        </svg>
                    </div>
                    <span class="logo-text">mynco</span>
                </a>
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
                    <li><a href="about.html">About</a></li>
                    <li><a href="https://blog.mynco.app">Blog</a></li>
                    <li><a href="#careers">Careers</a></li>
                    <li><a href="press.html">Press Kit</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Support</h4>
                <ul>
                    <li><a href="https://help.mynco.app" target="_blank">Help Center</a></li>
                    <li><a href="https://doc.mynco.app" target="_blank">Documentation</a></li>
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
    
    // Initialize back to top button
    initBackToTop();
    
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
        // Detect current page depth to adjust relative paths
        const pathDepth = window.location.pathname.split('/').length - 2; // -2 for root and filename
        const basePath = pathDepth > 0 ? '../'.repeat(pathDepth) : '';
        
        // Replace relative paths in footer with correct depth
        let adjustedFooterHTML = footerHTML
            .replace(/href="([^"#]+\.html)"/g, `href="${basePath}$1"`)
            .replace(/href="index\.html#/g, `href="${basePath}index.html#`);
        
        footerContainer.innerHTML = adjustedFooterHTML;
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

    // Dashboard doesn't need landing page navigation - this section removed

    // Header hide/show on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const topbar = document.querySelector('.topbar');
    const scrollThreshold = 100; // Minimum scroll before hiding header
    
    // Handle regular header (for non-dashboard pages)
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
    
    // Handle dashboard topbar
    if (topbar) {
        console.log('🎯 Topbar found, initializing scroll behavior');
        let topbarLastScrollTop = 0;
        window.addEventListener('scroll', utils.debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only hide/show if we've scrolled enough
            if (Math.abs(scrollTop - topbarLastScrollTop) > 10) {
                if (scrollTop > topbarLastScrollTop && scrollTop > scrollThreshold) {
                    // Scrolling down - hide topbar
                    console.log('📉 Hiding topbar');
                    topbar.classList.add('topbar-hidden');
                } else if (scrollTop < topbarLastScrollTop) {
                    // Scrolling up - show topbar
                    console.log('📈 Showing topbar');
                    topbar.classList.remove('topbar-hidden');
                }
                topbarLastScrollTop = scrollTop;
            }
        }, 10)); // Small debounce for smooth performance
    } else {
        console.log('❌ Topbar not found');
    }
}

// Fonction dédiée pour initialiser le scroll du topbar du dashboard
function initTopbarScroll() {
    const topbar = document.querySelector('.topbar');
    if (topbar) {
        console.log('🎯 Topbar found, initializing scroll behavior');
        let topbarLastScrollTop = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', utils.debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only hide/show if we've scrolled enough
            if (Math.abs(scrollTop - topbarLastScrollTop) > 10) {
                if (scrollTop > topbarLastScrollTop && scrollTop > scrollThreshold) {
                    // Scrolling down - hide topbar
                    console.log('📉 Hiding topbar');
                    topbar.classList.add('topbar-hidden');
                } else if (scrollTop < topbarLastScrollTop) {
                    // Scrolling up - show topbar
                    console.log('📈 Showing topbar');
                    topbar.classList.remove('topbar-hidden');
                }
                topbarLastScrollTop = scrollTop;
            }
        }, 10)); // Small debounce for smooth performance
    } else {
        console.log('❌ Topbar not found');
    }
}

// Rendre la fonction disponible globalement
window.initTopbarScroll = initTopbarScroll;

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

// ===================================
// GLOBAL BACK TO TOP FUNCTIONALITY
// ===================================

// Initialize back to top button on all pages
function initBackToTop() {
    // Check if button already exists
    let backToTopButton = document.querySelector('.back-to-top');
    
    // If no button exists, create one
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        backToTopButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;
        document.body.appendChild(backToTopButton);
    }
    
    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top with custom animation
    function scrollToTop() {
        const startPosition = window.pageYOffset;
        const targetPosition = 0;
        const distance = startPosition - targetPosition;
        const duration = 800; // 800ms pour l'animation
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, -distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Fonction d'easing pour une animation plus fluide
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Event listeners
    window.addEventListener('scroll', utils.debounce(toggleBackToTopButton, 10));
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Check initial scroll position
    toggleBackToTopButton();
    
    console.log('🔝 Back to top button initialized');
}