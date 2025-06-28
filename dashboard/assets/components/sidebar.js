// Sidebar Component
class Sidebar {
    constructor() {
        this.isCollapsed = false; // Start expanded by default
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    render() {
        const sidebarHTML = `
            <aside class="sidebar ${this.isCollapsed ? 'collapsed' : ''}" id="sidebar">
                <div class="sidebar-header">
                    <div class="logo">
                        <h1><span class="logo-full">mynco</span><span class="logo-short hidden">m</span></h1>
                    </div>
                </div>

                <!-- User Profile Section -->
                <div class="sidebar-profile">
                    <div class="user-menu">
                        <button class="user-avatar" id="userMenuBtn">
                            <div class="avatar">A</div>
                            <span class="user-name">Anthony</span>
                            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
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
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                                Profile
                            </a>
                            <a href="/dashboard/billing" class="dropdown-item">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                </svg>
                                Billing
                            </a>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" id="signOutBtn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <div class="nav-section">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="/dashboard/" class="nav-link" data-tooltip="Overview">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                    </svg>
                                    <span>Overview</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/projects" class="nav-link" data-tooltip="Projects">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    </svg>
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/clients" class="nav-link" data-tooltip="Clients">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.5l-1.7-2.26A2.5 2.5 0 0 0 8.54 8H7.46c-.8 0-1.54.37-2.01 1L2.5 16H5v6h15z"/>
                                    </svg>
                                    <span>Clients</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/analytics" class="nav-link" data-tooltip="Analytics">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                    </svg>
                                    <span>Analytics</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="team.html" class="nav-link" data-tooltip="Team">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.5l-1.7-2.26A2.5 2.5 0 0 0 8.54 8H7.46c-.8 0-1.54.37-2.01 1L2.5 16H5v6h15z"/>
                                    </svg>
                                    <span>Team</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/dashboard/permissions" class="nav-link" data-tooltip="Permissions">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                                    </svg>
                                    <span>Permissions</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section nav-section-bottom">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="settings.html" class="nav-link" data-tooltip="Settings">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                                    </svg>
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        `;

        // Insert sidebar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    attachEventListeners() {
        // Toggle functionality will be handled by Layout component
        this.highlightActiveLink();
        
        // Sign out functionality
        const signOutBtn = document.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Confirm before signing out
                if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                    if (window.signOutUser) {
                        window.signOutUser();
                    } else {
                        console.error('Sign out function not available');
                        alert('Fonction de déconnexion non disponible. Veuillez recharger la page.');
                    }
                }
            });
        }
        
        // User menu toggle functionality
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const userMenu = userMenuBtn.closest('.user-menu');
                userMenu.classList.toggle('open');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.user-menu')) {
                    const userMenu = document.querySelector('.user-menu');
                    if (userMenu) {
                        userMenu.classList.remove('open');
                    }
                }
            });
        }
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath.includes('dashboard') && href === '/dashboard/' && currentPath.endsWith('/')) ||
                (currentPath.includes('team') && href === 'team.html')) {
                link.classList.add('active');
            }
        });
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