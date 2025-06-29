// Mynco Dashboard SPA - Main Application
class MyncoDashboardApp {
    constructor() {
        this.router = null;
        this.currentPage = null;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.registerRoutes = this.registerRoutes.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }
    
    init() {
        // Initialize router (but don't auto-start it)
        this.router = new Router();
        
        // Register all routes FIRST
        this.registerRoutes();
        
        // NOW initialize the router (this will load the current route)
        this.router.init();
        
        // Initialize navigation
        this.initNavigation();
        
        // Listen for route changes
        window.addEventListener('routeContentLoaded', (e) => {
            this.onRouteChange(e.detail.route);
        });
    }
    
    registerRoutes() {
        // Default route (root)
        this.router.addRoute('/', () => {
            this.currentPage = 'overview';
            if (window.OverviewPage) {
                const content = OverviewPage.render();
                setTimeout(() => OverviewPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Overview', 'dashboard');
        });
        
        // Overview page (default)
        this.router.addRoute('/dashboard', () => {
            this.currentPage = 'overview';
            if (window.OverviewPage) {
                const content = OverviewPage.render();
                setTimeout(() => OverviewPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Overview', 'dashboard');
        });
        
        this.router.addRoute('/dashboard/', () => {
            this.currentPage = 'overview';
            if (window.OverviewPage) {
                const content = OverviewPage.render();
                setTimeout(() => OverviewPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Overview', 'dashboard');
        });
        
        // Team page
        this.router.addRoute('/dashboard/team', () => {
            this.currentPage = 'team';
            if (window.TeamPage) {
                const content = TeamPage.render();
                setTimeout(() => TeamPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Team Management', 'users');
        });
        
        // Projects page
        this.router.addRoute('/dashboard/projects', () => {
            this.currentPage = 'projects';
            if (window.ProjectsPage) {
                const content = ProjectsPage.render();
                setTimeout(() => ProjectsPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Projects', 'folder');
        });
        
        // Clients page
        this.router.addRoute('/dashboard/clients', () => {
            this.currentPage = 'clients';
            if (window.ClientsPage) {
                const content = ClientsPage.render();
                setTimeout(() => ClientsPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Clients', 'users');
        });
        
        // Analytics page
        this.router.addRoute('/dashboard/analytics', () => {
            this.currentPage = 'analytics';
            if (window.AnalyticsPage) {
                const content = AnalyticsPage.render();
                setTimeout(() => AnalyticsPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Analytics', 'bar-chart-3');
        });
        
        // Settings page
        this.router.addRoute('/dashboard/settings', () => {
            this.currentPage = 'settings';
            if (window.SettingsPage) {
                const content = SettingsPage.render();
                setTimeout(() => SettingsPage.init(), 100);
                return content;
            }
            return this.getPlaceholderContent('Settings', 'settings');
        });
    }
    
    initNavigation() {
        // Convert all nav links to SPA navigation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link) {
                const href = link.getAttribute('href');
                
                // Check if it's an internal dashboard link
                if (href.startsWith('/dashboard') || href.startsWith('index.html') || href.startsWith('team.html')) {
                    e.preventDefault();
                    
                    // Convert old-style links to new routes
                    let route = href;
                    if (href === 'index.html' || href === '/dashboard/index.html') {
                        route = '/dashboard';
                    } else if (href === 'team.html' || href === '/dashboard/team.html') {
                        route = '/dashboard/team';
                    } else if (href === 'projects.html' || href === '/dashboard/projects.html') {
                        route = '/dashboard/projects';
                    }
                    
                    this.router.navigate(route);
                }
            }
        });
    }
    
    onRouteChange(route) {
        // Update active navigation state
        this.updateActiveNavigation(route);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    updateActiveNavigation(route) {
        console.log('📱 App: Route changed to:', route);
        
        // Let the sidebar component handle navigation highlighting
        // The sidebar listens to the routeContentLoaded event and will update itself
        // No need to duplicate this logic here
    }
    
    getPlaceholderContent(title, icon) {
        return `
            <div class="container">
                <div class="page-header">
                    <div class="page-title">
                        <h1>${title}</h1>
                        <p>This page is under construction.</p>
                    </div>
                </div>
                
                <div class="placeholder-content">
                    <div class="placeholder-icon">
                        <i data-lucide="${icon}"></i>
                    </div>
                    <h2>Coming Soon</h2>
                    <p>The ${title} page is currently being developed. Check back soon!</p>
                    <button class="btn btn-primary" onclick="router.navigate('/dashboard')">
                        <i data-lucide="arrow-left"></i>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize the SPA
let dashboardApp = null;

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    dashboardApp = new MyncoDashboardApp();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyncoDashboardApp;
} 