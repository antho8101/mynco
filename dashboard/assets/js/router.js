// Simple SPA Router for Mynco Dashboard
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.contentContainer = null;
        this.initialized = false;
        
        // Bind methods
        this.navigate = this.navigate.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        
        // Listen for browser navigation
        window.addEventListener('popstate', this.handlePopState);
        
        // DON'T auto-initialize - let the SPA control this
    }
    
    init() {
        if (this.initialized) {
            return;
        }
        
        // Find content container
        this.contentContainer = document.querySelector('.dashboard-content') || document.querySelector('main');
        
        if (!this.contentContainer) {
            console.error('Router: No content container found');
            return;
        }
        
        this.initialized = true;
        
        // Load initial route
        this.loadCurrentRoute();
    }
    
    // Register a route
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    // Navigate to a route
    navigate(path, pushState = true) {
        console.log('🧭 Router: Navigating to path:', path);
        console.log('📋 Router: Available routes:', Object.keys(this.routes));
        
        // Update URL if needed
        if (pushState && window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }
        
        // Find and execute route handler
        const handler = this.routes[path];
        
        if (handler) {
            console.log('✅ Router: Found handler for path:', path);
            this.currentRoute = path;
            try {
                // Execute handler and update content
                const content = handler();
                if (content) {
                    this.updateContent(content);
                }
                
                // Update active navigation
                this.updateActiveNavigation(path);
                
                // Update page title
                this.updatePageTitle(path);
                
            } catch (error) {
                console.error('Router: Error executing route handler:', error);
                this.showError('Failed to load page');
            }
        } else {
            console.error('❌ Router: No handler found for path:', path);
            this.show404();
        }
    }
    
    // Handle browser back/forward
    handlePopState(event) {
        this.loadCurrentRoute();
    }
    
    // Load route based on current URL
    loadCurrentRoute() {
        let originalPath = window.location.pathname;
        let path = originalPath;
        
        // Default route handling
        if (path === '/' || path === '/dashboard.html' || path === '/index.html' || path === '/dashboard/' || path === '/dashboard/index.html') {
            path = '/dashboard';
        }
        
        this.navigate(path, false);
    }
    
    // Update main content
    updateContent(content) {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = content;
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Trigger content loaded event
            console.log('🚀 Router: Dispatching routeContentLoaded event for route:', this.currentRoute);
            window.dispatchEvent(new CustomEvent('routeContentLoaded', {
                detail: { route: this.currentRoute }
            }));
            console.log('✅ Router: Event dispatched successfully');
        }
    }
    
    // Update active navigation links
    updateActiveNavigation(currentPath) {
        console.log('🧭 Router: Updating active navigation for path:', currentPath);
        
        // Let the sidebar handle its own navigation highlighting
        // Don't interfere with it here - just trigger the event
        
        // The sidebar will update itself via the routeContentLoaded event
        // so we don't need to do anything here
    }
    
    // Update page title
    updatePageTitle(path) {
        const titles = {
            '/dashboard': 'Dashboard - Mynco',
            '/dashboard/': 'Dashboard - Mynco',
            '/dashboard/team': 'Team - Mynco',
            '/dashboard/projects': 'Projects - Mynco',
            '/dashboard/clients': 'Clients - Mynco',
            '/dashboard/analytics': 'Analytics - Mynco',
            '/dashboard/settings': 'Settings - Mynco'
        };
        
        document.title = titles[path] || 'Dashboard - Mynco';
    }
    
    // Show 404 error
    show404() {
        const errorContent = `
            <div class="container">
                <div class="error-page">
                    <div class="error-icon">
                        <i data-lucide="alert-circle"></i>
                    </div>
                    <h1>Page not found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <p><strong>Debug info:</strong> Current URL: ${window.location.pathname}</p>
                    <button class="btn btn-primary" onclick="router.navigate('/dashboard')">
                        <i data-lucide="home"></i>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        `;
        this.updateContent(errorContent);
    }
    
    // Show generic error
    showError(message) {
        const errorContent = `
            <div class="container">
                <div class="error-page">
                    <div class="error-icon">
                        <i data-lucide="x-circle"></i>
                    </div>
                    <h1>Something went wrong</h1>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i data-lucide="refresh-cw"></i>
                        Refresh Page
                    </button>
                </div>
            </div>
        `;
        this.updateContent(errorContent);
    }
}

// Global router instance
let router = null;

// Initialize router when script loads
if (typeof window !== 'undefined') {
    router = new Router();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
} 