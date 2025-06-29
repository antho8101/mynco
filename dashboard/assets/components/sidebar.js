// Sidebar Component
class Sidebar {
    constructor() {
        this.isCollapsed = false; // Start expanded by default
        this.init();
    }

    init() {
        this.render();
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        
        // Attach event listeners after DOM is ready
        setTimeout(() => {
            this.attachEventListeners();
        }, 100);
    }

    render() {
        // Check if sidebar already exists to avoid duplicates
        const existingSidebar = document.getElementById('sidebar');
        if (existingSidebar) {
            console.log('🔄 Sidebar: Updating existing sidebar instead of creating new one');
            return;
        }

        const sidebarHTML = `
            <aside class="sidebar ${this.isCollapsed ? 'collapsed' : ''}" id="sidebar">
                <div class="sidebar-header">
                    <div class="logo">
                        <a href="/" class="logo-container">

                        
                            <div class="logo-icon">
                                <svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                                    <g transform="matrix(-1.34657,0,0,1.34657,1201.44,-177.905)">
                                        <path d="M703.677,440.186C720.246,446.523 760.396,470.572 829.384,453.075C825.293,464.324 818.646,480.685 796.149,496.025C773.651,496.536 705.709,498.07 677.812,479.151C677.015,484.776 682.128,487.844 670.879,493.468C682.128,499.092 711.784,523.124 764.448,520.567C759.846,535.906 749.109,550.223 732.236,560.449C716.897,557.892 648.893,546.644 628.441,522.612C628.952,533.35 657.585,565.562 697.467,576.811C682.128,585.503 667.3,589.082 646.848,590.616C626.396,581.412 602.876,575.788 573.731,546.132C568.618,557.381 569.641,562.494 557.881,559.938C570.152,572.72 584.98,596.752 609.523,603.399C599.296,608.512 565.653,612.602 542.337,597.774C519.022,582.946 481.185,514.192 485.787,491.559C485.787,491.559 521.067,442.985 573.22,413.84C625.373,384.696 665.766,339.19 667.3,276.299C705.136,266.585 770.584,227.861 848.302,142.337C854.949,154.473 864.663,179.527 865.686,202.536C842.166,219.92 827.338,243.44 750.131,274.63C759.335,279.231 764.959,284.856 761.891,293.037C784.9,286.39 841.144,262.358 871.822,223.499C875.912,237.816 874.378,254.177 871.822,275.141C856.483,286.901 816.09,312.466 749.62,326.271C755.244,329.851 757.801,340.394 752.688,345.604C770.584,342.633 814.556,335.986 871.822,302.24C869.265,314.511 872.333,339.054 866.709,353.371C851.37,357.461 799.728,374.923 743.484,377.952C743.484,379.447 747.575,387.117 740.928,397.854C766.493,398.877 824.782,396.909 860.573,377.952C860.062,391.207 851.881,415.75 842.166,425.976C830.406,429.555 778.764,446.428 719.453,430.578C716.897,432.623 720.476,439.781 711.783,440.292C707.125,440.566 704.816,440.4 703.677,440.186C703.299,440.042 702.933,439.906 702.58,439.781C702.58,439.781 702.69,440.001 703.677,440.186ZM375.322,259.619C375.322,259.619 473.127,247.526 477.818,460.357C478.193,467.182 461.912,475.604 465.209,492.191C467.622,499.127 473.727,592.201 551.133,628.659C553.353,636.424 559.217,679.589 590.422,729.935C575.552,731.484 499.319,732.112 431.255,691.482C425.809,692.948 418.06,695.88 415.338,705.305C420.155,707.608 442.145,720.803 434.815,749.285C419.108,725.201 387.274,709.905 355.65,768.553C338.267,763.952 346.645,726.674 361.095,721.228C355.65,719.762 338.899,724.998 326.751,735.26C328.215,721.857 336.592,690.442 389.368,695.05C401.096,686.044 394.814,668.976 383.504,661.279C372.195,653.582 278.984,596.99 297.391,482.05C346.988,579.302 426.24,486.453 420.105,377.952C416.208,261.513 363.141,272.425 363.141,272.425C363.141,272.425 358.047,272.827 358.047,268.136C358.047,263.444 361.501,260.218 375.322,259.619ZM373.251,685.468C319.061,682.013 317.49,720.81 314.506,737.616C288.903,723.166 309.165,693.165 309.165,693.165C309.165,693.165 293.772,695.05 284.505,719.396C268.311,689.935 301.468,661.279 331.469,661.279C361.47,661.279 373.251,685.468 373.251,685.468ZM492.85,444.695C492.85,444.695 492.543,395.916 477.818,341.615C494.077,311.551 519.233,250.501 505.428,145.581C536.274,163.973 558.502,185.463 558.502,185.463L560.07,203.906L576.877,205.163C576.877,205.163 594.312,223.384 605.778,245.06C605.621,255.741 603.108,265.95 603.108,265.95L618.658,272.155C618.658,272.155 627.14,290.611 632.638,316.214C631.067,319.826 622.271,343.701 622.271,343.701C622.271,343.701 546.853,383.7 492.85,444.695ZM149.647,377.868C149.647,377.868 164.154,263.224 298.473,259.671C335.582,258.689 352.86,272.04 352.86,272.04C352.86,272.04 344.345,296.692 340.098,338.993C336.283,337.524 252.057,309.57 149.647,377.868ZM189.78,367.041C189.78,367.041 241.025,333.467 337.428,350.352C337.429,370.379 326.041,376.326 326.041,377.868C326.041,379.411 242.988,358.991 189.78,367.041ZM375.322,291.352C385.888,291.352 394.466,299.929 394.466,310.495C394.466,321.06 385.888,329.638 375.322,329.638C364.757,329.638 356.179,321.06 356.179,310.495C356.179,299.929 364.757,291.352 375.322,291.352ZM373.181,297.733C368.25,297.733 364.247,301.736 364.247,306.666C364.247,311.597 368.25,315.6 373.181,315.6C378.111,315.6 382.114,311.597 382.114,306.666C382.114,301.736 378.111,297.733 373.181,297.733ZM457.596,730.503C457.596,730.503 525.321,763.318 599.276,751.538C627.418,800.623 677.812,884.232 677.812,884.232C677.812,884.232 598.949,891.431 571.788,781.807C575.061,809.949 579.315,834.165 615.965,883.904C569.498,884.886 533.174,858.707 516.485,779.189C512.559,792.279 512.231,845.618 534.156,883.577C486.38,884.232 406.862,883.577 406.862,883.577C406.862,883.577 472.963,833.838 472.963,791.951C472.963,750.065 457.596,730.503 457.596,730.503Z" style="fill:currentColor;"/>
                                    </g>
                                </svg>
                            </div>
                            <span class="logo-text">mynco</span>
                        </a>
                    </div>
                </div>

                <!-- User Profile Section -->
                <div class="sidebar-profile">
                    <div class="user-menu">
                        <button class="user-avatar" id="userMenuBtn">
                            <div class="avatar">A</div>
                            <span class="user-name">Anthony</span>
                            <i class="dropdown-icon" data-lucide="chevron-down"></i>
                        </button>
                        
                        <div class="user-dropdown" id="userDropdown">
                            <div class="dropdown-header">
                                <div class="avatar">A</div>
                                <div class="user-info">
                                    <div class="user-name">Anthony Carayon</div>
                                    <div class="user-email">anthony@mynco.app</div>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="/dashboard/profile" class="dropdown-item">
                                <i data-lucide="user"></i>
                                Profile
                            </a>
                            <a href="/dashboard/billing" class="dropdown-item">
                                <i data-lucide="credit-card"></i>
                                Billing
                            </a>
                            <a href="/dashboard/account-settings" class="dropdown-item">
                                <i data-lucide="settings"></i>
                                Account Settings
                            </a>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" id="signOutBtn">
                                <i data-lucide="log-out"></i>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <div class="nav-section">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="/dashboard" class="nav-link" data-tooltip="Overview">
                                    <i data-lucide="layout-dashboard"></i>
                                    <span>Overview</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/projects" class="nav-link" data-tooltip="Projects">
                                    <i data-lucide="folder"></i>
                                    <span>Projects</span>
                                    <span class="nav-notification-badge"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/clients" class="nav-link" data-tooltip="Clients">
                                    <i data-lucide="users"></i>
                                    <span>Clients</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/analytics" class="nav-link" data-tooltip="Analytics">
                                    <i data-lucide="bar-chart-3"></i>
                                    <span>Analytics</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/team" class="nav-link" data-tooltip="Team">
                                    <i data-lucide="users"></i>
                                    <span>Team</span>
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div class="nav-section nav-section-bottom">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="/dashboard/settings" class="nav-link" data-tooltip="Organization">
                                    <i data-lucide="building"></i>
                                    <span>Organization</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        `;

        // Insert sidebar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
        
        // Initialize Lucide icons after DOM insertion
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    attachEventListeners() {
        // Toggle functionality will be handled by Layout component
        this.highlightActiveLink();
        
        // Listen for route changes to update active navigation
        window.addEventListener('routeContentLoaded', (e) => {
            console.log('🎯 Sidebar: Route changed to', e.detail.route);
            this.highlightActiveLink(e.detail.route);
        });
        
        // Sign out functionality
        const signOutBtn = document.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Direct sign out without confirmation
                if (window.signOutUser) {
                    window.signOutUser();
                } else {
                    console.error('Sign out function not available');
                    // Fallback: redirect to landing page
                    window.location.href = '/';
                }
            });
        }
        
        // User menu toggle functionality - SIMPLIFIED VERSION
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenuBtn && userDropdown) {
            // Direct approach - just toggle the dropdown visibility
            userMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                if (userDropdown.style.display === 'block') {
                    userDropdown.style.display = 'none';
                    userDropdown.style.opacity = '0';
                } else {
                    // Check if sidebar is collapsed
                    const sidebar = document.getElementById('sidebar');
                    const isCollapsed = sidebar && sidebar.classList.contains('collapsed');
                    
                    userDropdown.style.display = 'block';
                    userDropdown.style.opacity = '1';
                    userDropdown.style.visibility = 'visible';
                    userDropdown.style.transform = 'translateY(0)';
                    userDropdown.style.width = '280px';  // Force larger width
                    userDropdown.style.minWidth = '280px';
                    
                    if (isCollapsed) {
                        // Make it pop out to the right when collapsed
                        userDropdown.style.left = 'calc(100% + 0.5rem)';
                        userDropdown.style.right = 'auto';
                        userDropdown.style.top = '0';
                    } else {
                        // Normal positioning when expanded
                        userDropdown.style.left = '0';
                        userDropdown.style.right = '0';
                        userDropdown.style.top = '100%';
                    }
                }
            });
            
            // Close when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.sidebar-profile')) {
                    userDropdown.style.display = 'none';
                    userDropdown.style.opacity = '0';
                }
            });
        }
    }

    highlightActiveLink(routePath = null) {
        // Use provided route or current URL
        const currentPath = routePath || window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        console.log('🎯 Sidebar: Highlighting active link for path:', currentPath);
        console.log('🔢 Sidebar: Found', navLinks.length, 'nav links');
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the matching link
        let foundMatch = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            console.log('🔍 Checking link:', href, 'against path:', currentPath);
            
            let isActive = false;
            
            // Exact match
            if (href === currentPath) {
                isActive = true;
            }
            // Handle dashboard root variations
            else if ((currentPath === '/dashboard' || currentPath === '/dashboard/' || currentPath === '/') && 
                     (href === '/dashboard' || href === '/dashboard/' || href === 'index.html')) {
                isActive = true;
            }
            // Handle other routes
            else if (currentPath === '/dashboard/team' && (href === '/dashboard/team' || href === 'team.html')) {
                isActive = true;
            }
            else if (currentPath === '/dashboard/projects' && href === '/dashboard/projects') {
                isActive = true;
            }
            else if (currentPath === '/dashboard/clients' && href === '/dashboard/clients') {
                isActive = true;
            }
            else if (currentPath === '/dashboard/analytics' && href === '/dashboard/analytics') {
                isActive = true;
            }
            else if (currentPath === '/dashboard/settings' && href === '/dashboard/settings') {
                isActive = true;
            }
            
            if (isActive) {
                console.log('✅ Sidebar: Setting active for link:', href);
                link.classList.add('active');
                foundMatch = true;
                
                // Double-check that the class was actually added
                setTimeout(() => {
                    const hasActive = link.classList.contains('active');
                    console.log('🔍 Sidebar: Verification - Link has active class:', hasActive);
                    if (!hasActive) {
                        console.error('❌ Sidebar: Failed to set active class! Trying again...');
                        link.classList.add('active');
                    }
                }, 50);
            }
        });
        
        if (!foundMatch) {
            console.warn('⚠️ Sidebar: No matching link found for path:', currentPath);
        }
        
        // Final verification
        setTimeout(() => {
            const activeLinks = document.querySelectorAll('.nav-link.active');
            console.log('🎯 Sidebar: Final verification - Active links count:', activeLinks.length);
        }, 100);
    }

    toggle() {
        this.isCollapsed = !this.isCollapsed;
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed', this.isCollapsed);
    }

    handleResize() {
        // On desktop, maintain the current collapsed state (user preference)
        // On mobile, the Layout component will handle the overlay behavior
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // Desktop: Keep current collapsed state, just update layout
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed', this.isCollapsed);
            
            // Notify layout component of current state
            window.dispatchEvent(new CustomEvent('sidebarToggle', { 
                detail: { isCollapsed: this.isCollapsed } 
            }));
        }
    }
}

// Export for use in layout
window.Sidebar = Sidebar; 