// Topbar Component - Generates header with notifications and user menu
class Topbar {
    constructor(config = {}) {
        this.config = {
            searchPlaceholder: 'Search projects, clients...',
            primaryButtonText: 'Create Project',
            primaryButtonIcon: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
            primaryButtonAction: () => console.log('Primary button clicked'),
            ...config
        };
        
        this.notificationCount = 4;
        this.init();
    }

    init() {
        this.createTopbar();
        this.attachEventListeners();
    }

    createTopbar() {
        const topbar = document.createElement('header');
        topbar.className = 'topbar';
        topbar.innerHTML = this.getTopbarHTML();
        document.body.insertBefore(topbar, document.body.firstChild);
    }

    getTopbarHTML() {
        return `
            <div class="topbar-left">
                <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="sidebar-icon-collapse">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="sidebar-icon-expand hidden">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                </button>
                <div class="search-container">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <input type="text" placeholder="${this.config.searchPlaceholder}" class="search-input">
                </div>
            </div>
            <div class="topbar-right">
                <div class="notifications" style="position: relative;">
                    <button class="notification-btn" id="notificationToggle" aria-label="Notifications">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                        <span class="notification-badge">${this.notificationCount}</span>
                    </button>
                    <div class="notification-dropdown" id="notificationDropdown" style="display: none;">
                        <div class="notification-header">
                            <h3>Notifications</h3>
                            <button class="mark-all-read">Mark all as read</button>
                        </div>
                        <div class="notification-list">${this.getNotificationsHTML()}</div>
                        <div class="notification-footer">
                            <a href="#" class="view-all-notifications">View all notifications</a>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" id="primaryActionBtn">
                    <svg viewBox="0 0 24 24" fill="currentColor">${this.config.primaryButtonIcon}</svg>
                    <span>${this.config.primaryButtonText}</span>
                </button>
            </div>
        `;
    }

    getNotificationsHTML() {
        return `
            <div class="notification-item unread">
                <div class="notification-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="notification-content">
                    <p><strong>Project completed!</strong></p>
                    <p>Mobile App Mockups for FitnessTracker has been marked as completed.</p>
                    <span class="notification-time">2 minutes ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L12.9 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1zm0-3H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1zm0-3H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z"/>
                    </svg>
                </div>
                <div class="notification-content">
                    <p><strong>New message from client</strong></p>
                    <p>TechStart Inc.: "Hi! Could we adjust the logo colors?"</p>
                    <span class="notification-time">3 hours ago</span>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const notificationToggle = document.getElementById('notificationToggle');
        if (notificationToggle) {
            notificationToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotifications();
            });
        }

        const primaryActionBtn = document.getElementById('primaryActionBtn');
        if (primaryActionBtn) {
            primaryActionBtn.addEventListener('click', this.config.primaryButtonAction);
        }

        const markAllRead = document.querySelector('.mark-all-read');
        if (markAllRead) {
            markAllRead.addEventListener('click', () => this.markAllAsRead());
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notifications')) {
                this.closeNotifications();
            }
        });
    }

    toggleNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        const isVisible = dropdown.style.display === 'block';
        
        if (isVisible) {
            this.closeNotifications();
        } else {
            this.openNotifications();
        }
    }

    openNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        dropdown.style.display = 'block';
    }

    closeNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }

    markAllAsRead() {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => item.classList.remove('unread'));
        
        this.notificationCount = 0;
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
    }
}
