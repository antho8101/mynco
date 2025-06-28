// Footer Component
class Footer {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        
        // Listen for sidebar toggle events
        window.addEventListener('sidebarToggle', (e) => {
            this.handleSidebarToggle(e.detail.isCollapsed);
        });
    }

    render() {
        const footerHTML = `
            <footer class="dashboard-footer" id="dashboardFooter">
                <div class="footer-content">
                    <div class="footer-left">
                        <p>&copy; 2024 Mynco. All rights reserved.</p>
                    </div>
                    <div class="footer-right">
                        <a href="#" class="support-link" id="supportLink">Support</a>
                    </div>
                </div>
            </footer>
        `;

        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    attachEventListeners() {
        const supportLink = document.getElementById('supportLink');
        if (supportLink) {
            supportLink.addEventListener('click', function(e) {
                e.preventDefault();
                // Open support email
                window.open('mailto:support@mynco.app?subject=Dashboard Support Request', '_blank');
            });
        }
    }

    handleSidebarToggle(isCollapsed) {
        const footer = document.getElementById('dashboardFooter');
        if (footer) {
            footer.classList.toggle('sidebar-collapsed', isCollapsed);
        }
    }
}

// Export for use in layout
window.Footer = Footer; 