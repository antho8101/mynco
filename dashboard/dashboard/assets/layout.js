// Layout Component - Orchestrates all dashboard components
class Layout {
    constructor() {
        this.sidebar = null;
        this.footer = null;
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.mobileSearchOpen = false;
        this.init();
    }

    init() {
        // Initialize components in order
        this.sidebar = new Sidebar();
        this.footer = new Footer();
        
        // Setup main content structure
        this.setupMainContent();
        
        // Add mobile elements
        this.addMobileElements();
        
        // Attach global event listeners
        this.attachEventListeners();
        
        // Setup responsive behavior
        this.setupResponsiveBehavior();
        
        // Setup dynamic sidebar width calculation
        this.setupDynamicSidebarWidth();
        
        // Initialize sidebar toggle icons
        if (this.isMobile) {
            this.updateMobileSidebarIcons(false); // Mobile starts closed
        } else {
            this.updateSidebarToggleIcons(this.sidebar.isCollapsed);
        }
        
        // Dashboard layout initialized
    }

    setupMainContent() {
        // Wrap existing content in main-content structure
        const body = document.body;
        const existingContent = Array.from(body.children).filter(child => 
            !child.classList.contains('sidebar') && 
            !child.classList.contains('dashboard-footer') &&
            !child.classList.contains('sidebar-overlay')
        );

        // Create main content wrapper
        const mainContent = document.createElement('div');
        mainContent.className = `main-content ${this.sidebar.isCollapsed ? 'sidebar-collapsed' : ''}`;
        
        // Move existing content into main wrapper
        existingContent.forEach(child => {
            mainContent.appendChild(child);
        });

        // Insert main content after sidebar
        const sidebar = document.getElementById('sidebar');
        sidebar.insertAdjacentElement('afterend', mainContent);
    }

    addMobileElements() {
        // Add sidebar overlay for mobile
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);

        // Add mobile search toggle button to topbar
        const topbarLeft = document.querySelector('.topbar-left');
        if (topbarLeft && this.isMobile) {
            const searchToggle = document.createElement('button');
            searchToggle.className = 'mobile-search-toggle';
            searchToggle.id = 'mobileSearchToggle';
            searchToggle.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            `;
            
            // Insert after sidebar toggle
            const sidebarToggle = document.getElementById('sidebarToggle');
            sidebarToggle.insertAdjacentElement('afterend', searchToggle);
        }

        // Add mobile search modal
        const searchModal = document.createElement('div');
        searchModal.className = 'mobile-search-modal';
        searchModal.id = 'mobileSearchModal';
        searchModal.innerHTML = `
            <div class="mobile-search-header">
                <input type="text" class="mobile-search-input" placeholder="Search projects, clients..." id="mobileSearchInput">
                <button class="mobile-search-close" id="mobileSearchClose">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(searchModal);
    }

    attachEventListeners() {
        // Sidebar toggle button
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Mobile search toggle
        const mobileSearchToggle = document.getElementById('mobileSearchToggle');
        if (mobileSearchToggle) {
            mobileSearchToggle.addEventListener('click', () => {
                this.toggleMobileSearch();
            });
        }

        // Mobile search close
        const mobileSearchClose = document.getElementById('mobileSearchClose');
        if (mobileSearchClose) {
            mobileSearchClose.addEventListener('click', () => {
                this.closeMobileSearch();
            });
        }

        // Sidebar overlay close
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                this.closeMobileSidebar();
            });
        }

        // Listen for sidebar toggle events (from resize)
        window.addEventListener('sidebarToggle', (e) => {
            this.updateMainContent(e.detail.isCollapsed);
        });

        // User menu functionality
        this.setupUserMenu();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (this.isMobile) {
            // Mobile: toggle overlay sidebar
            const isOpen = sidebar.classList.contains('mobile-open');
            
            if (isOpen) {
                this.closeMobileSidebar();
            } else {
                this.openMobileSidebar();
            }
            
            // Update icons for mobile state
            this.updateMobileSidebarIcons(isOpen);
        } else {
            // Desktop: regular sidebar toggle
            this.sidebar.toggle();
            this.updateMainContent(this.sidebar.isCollapsed);
        }
    }

    updateMobileSidebarIcons(isOpen) {
        const collapseIcon = document.querySelector('.sidebar-icon-collapse');
        const expandIcon = document.querySelector('.sidebar-icon-expand');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (collapseIcon && expandIcon) {
            if (isOpen) {
                // Sidebar is open, show close icon (X or back arrow)
                collapseIcon.classList.remove('hidden');
                expandIcon.classList.add('hidden');
                if (sidebarToggle) {
                    sidebarToggle.setAttribute('aria-label', 'Close sidebar');
                }
            } else {
                // Sidebar is closed, show menu icon
                collapseIcon.classList.add('hidden');
                expandIcon.classList.remove('hidden');
                if (sidebarToggle) {
                    sidebarToggle.setAttribute('aria-label', 'Open sidebar');
                }
            }
        }
    }

    openMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleMobileSearch() {
        const modal = document.getElementById('mobileSearchModal');
        const input = document.getElementById('mobileSearchInput');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus input after animation
        setTimeout(() => {
            input.focus();
        }, 300);
    }

    closeMobileSearch() {
        const modal = document.getElementById('mobileSearchModal');
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateMainContent(isCollapsed) {
        if (!this.isMobile) {
            // Mettre à jour la variable CSS pour tous les éléments automatiquement
            this.updateSidebarWidth();
            
            // Update sidebar toggle icons
            this.updateSidebarToggleIcons(isCollapsed);
            
            // Force une mise à jour après transition
            setTimeout(() => {
                this.updateSidebarWidth();
            }, 100);
        }
    }

    updateSidebarToggleIcons(isCollapsed) {
        const collapseIcon = document.querySelector('.sidebar-icon-collapse');
        const expandIcon = document.querySelector('.sidebar-icon-expand');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (collapseIcon && expandIcon) {
            if (isCollapsed) {
                // Sidebar is collapsed, show expand icon
                collapseIcon.classList.add('hidden');
                expandIcon.classList.remove('hidden');
                if (sidebarToggle) {
                    sidebarToggle.setAttribute('aria-label', 'Expand sidebar');
                }
            } else {
                // Sidebar is expanded, show collapse icon
                collapseIcon.classList.remove('hidden');
                expandIcon.classList.add('hidden');
                if (sidebarToggle) {
                    sidebarToggle.setAttribute('aria-label', 'Collapse sidebar');
                }
            }
        }
    }

    setupUserMenu() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userMenu = document.querySelector('.user-menu');
        const signOutBtn = document.getElementById('signOutBtn');

        if (userMenuBtn && userMenu) {
            // Toggle user menu
            userMenuBtn.addEventListener('click', function() {
                userMenu.classList.toggle('open');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userMenu.contains(e.target)) {
                    userMenu.classList.remove('open');
                }
            });
        }

        // Sign out functionality
        if (signOutBtn) {
            signOutBtn.addEventListener('click', async function() {
                // Check if we're in development mode
                const isDevelopment = window.location.hostname === 'localhost' || 
                                     window.location.hostname === '127.0.0.1' ||
                                     window.location.hostname.includes('192.168.') ||
                                     window.location.hostname.includes('10.0.') ||
                                     window.location.hostname.includes('172.');

                if (isDevelopment) {
                    alert('Sign out disabled in development mode');
                    return;
                }
                
                try {
                    if (window.firebaseAuth) {
                        await window.firebaseAuth.signOut();
                        console.log('User signed out');
                        window.location.href = '/auth/signin.html';
                    }
                } catch (error) {
                    console.error('Sign out error:', error);
                }
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.isMobile) {
                    this.toggleMobileSearch();
                } else {
                    const searchInput = document.querySelector('.search-input');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            }

            // Escape to close dropdowns and modals
            if (e.key === 'Escape') {
                const userMenu = document.querySelector('.user-menu');
                if (userMenu) {
                    userMenu.classList.remove('open');
                }
                
                if (this.mobileSearchOpen) {
                    this.closeMobileSearch();
                }
                
                if (this.isMobile) {
                    this.closeMobileSidebar();
                }
            }

            // Ctrl/Cmd + B to toggle sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleSidebar();
            }
        });
    }

    setupResponsiveBehavior() {
        // Handle responsive breakpoint changes
        this.handleResize();
    }

    handleResize() {
        const wasMobile = this.isMobile;
        const wasTablet = this.isTablet;
        
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // If switching from mobile to desktop, clean up mobile states
        if (wasMobile && !this.isMobile) {
            this.closeMobileSidebar();
            this.closeMobileSearch();
            
            // Re-enable desktop sidebar behavior
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('mobile-open');
            
            // Update icons for desktop
            this.updateSidebarToggleIcons(this.sidebar.isCollapsed);
        }
        
        // If switching to mobile, ensure proper mobile setup
        if (!wasMobile && this.isMobile) {
            this.closeMobileSidebar();
            
            // Add mobile search toggle if not exists
            const existingToggle = document.getElementById('mobileSearchToggle');
            if (!existingToggle) {
                this.addMobileElements();
            }
            
            // Update icons for mobile
            this.updateMobileSidebarIcons(false);
        }
        
        // Update layout and sidebar width
        this.updateMainContent(this.sidebar.isCollapsed);
        this.updateSidebarWidth();
    }

    setupDynamicSidebarWidth() {
        // Calculer et appliquer la largeur réelle de la sidebar
        this.updateSidebarWidth();
        
        // Recalculer seulement au resize de la fenêtre (pas de ResizeObserver sur la sidebar)
        window.addEventListener('resize', () => {
            this.updateSidebarWidth();
        });
    }

    updateSidebarWidth() {
        if (!this.isMobile) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                // Vérifier l'état réel de la sidebar dans le DOM
                const hasCollapsedClass = sidebar.classList.contains('collapsed');
                const actualState = this.sidebar ? this.sidebar.isCollapsed : false;
                
                // Utiliser des valeurs fixes fiables plutôt que de mesurer pendant les transitions
                let safeSimple, safeCalculated;
                
                if (hasCollapsedClass) {
                    // Sidebar collapsed : largeur fixe de 70px
                    safeSimple = 70;
                    safeCalculated = 70;
                } else {
                    // Sidebar expandée : largeur fixe de 240px (plus fiable que mesurer)
                    safeSimple = 240;
                    safeCalculated = 240;
                }
                
                // Appliquer immédiatement les variables CSS
                document.documentElement.style.setProperty('--sidebar-width-simple', `${safeSimple}px`);
                document.documentElement.style.setProperty('--sidebar-width-calculated', `${safeCalculated}px`);
                
                // Force le repaint
                document.documentElement.offsetHeight;
                
            } else {
                document.documentElement.style.setProperty('--sidebar-width-simple', '0px');
                document.documentElement.style.setProperty('--sidebar-width-calculated', '0px');
            }
        }
    }
}

// Auto-initialize layout when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.dashboardLayout = new Layout();
    }, 100);
});

// Export for manual initialization if needed
window.Layout = Layout; 