// Overview Page Module
class OverviewPage {
    static render() {
        return `
            <div class="container">
                <!-- Welcome Section -->
                <div class="welcome-section">
                    <h1>Welcome back, Anthony! <i data-lucide="hand"></i></h1>
                    <p>Here's what's happening with your projects today.</p>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="folder"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Active Projects</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="euro"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€24,500</h3>
                            <p>Revenue This Month</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>8</h3>
                            <p>Happy Clients</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="message-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>5</h3>
                            <p>Messages Awaiting Response</p>
                        </div>
                    </div>
                </div>

                <!-- Recent Projects -->
                <div class="recent-projects">
                    <div class="section-header">
                        <h2>Recent Projects</h2>
                        <a href="#" onclick="router.navigate('/dashboard/projects')" class="view-all">View all</a>
                    </div>

                    <div class="projects-grid">
                        <div class="project-card has-pending-message">
                            <div class="project-header">
                                <h3>Bakery Website Redesign</h3>
                                <span class="project-status active">Active</span>
                                <span class="message-indicator" title="Client sent files for review">
                                    <i data-lucide="message-circle"></i>
                                </span>
                            </div>
                            <p class="project-client">Martin's Bakery</p>
                            <div class="project-meta">
                                <span class="project-price">€2,500</span>
                                <span class="project-progress">Files sent 2 days ago</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 75%"></div>
                            </div>
                        </div>

                        <div class="project-card has-pending-message">
                            <div class="project-header">
                                <h3>Logo Design Package</h3>
                                <span class="project-status pending">Pending Response</span>
                                <span class="message-indicator" title="Client awaiting response">
                                    <i data-lucide="message-circle"></i>
                                </span>
                            </div>
                            <p class="project-client">TechStart Inc.</p>
                            <div class="project-meta">
                                <span class="project-price">€800</span>
                                <span class="project-progress">Client message 3h ago</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 90%"></div>
                            </div>
                        </div>

                        <div class="project-card">
                            <div class="project-header">
                                <h3>Mobile App Mockups</h3>
                                <span class="project-status completed">Completed</span>
                            </div>
                            <p class="project-client">FitnessTracker</p>
                            <div class="project-meta">
                                <span class="project-price">€1,200</span>
                                <span class="project-progress">Paid</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize page-specific functionality
    static init() {
        // Any overview-specific initialization can go here
        console.log('Overview page initialized');
    }
}

// Export for use in router
if (typeof window !== 'undefined') {
    window.OverviewPage = OverviewPage;
} 