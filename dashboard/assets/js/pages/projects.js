// Projects Page Module
class ProjectsPage {
    static render() {
        return `
            <div class="container">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Projects</h1>
                        <p>Manage all your client projects in one place</p>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="folder-open"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Active Projects</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>28</h3>
                            <p>Completed</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Pending Review</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="euro"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€45,200</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div class="projects-section">
                    <div class="section-header">
                        <div class="section-title">
                            <h2>All Projects</h2>
                            <div class="section-actions">
                                <div class="filter-tabs">
                                    <button class="filter-tab active" data-filter="all">All</button>
                                    <button class="filter-tab" data-filter="active">Active</button>
                                    <button class="filter-tab" data-filter="completed">Completed</button>
                                    <button class="filter-tab" data-filter="pending">Pending</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="projects-grid">
                        <div class="project-card active" data-status="active">
                            <div class="project-header">
                                <h3>Bakery Website Redesign</h3>
                                <span class="project-status active">Active</span>
                            </div>
                            <p class="project-client">Martin's Bakery</p>
                            <div class="project-meta">
                                <span class="project-price">€2,500</span>
                                <span class="project-deadline">Due in 5 days</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 75%"></div>
                            </div>
                            <div class="project-actions">
                                <button class="btn btn-sm btn-primary">View Details</button>
                                <button class="btn btn-sm btn-secondary">Send Update</button>
                            </div>
                        </div>

                        <div class="project-card pending" data-status="pending">
                            <div class="project-header">
                                <h3>Logo Design Package</h3>
                                <span class="project-status pending">Pending Review</span>
                            </div>
                            <p class="project-client">TechStart Inc.</p>
                            <div class="project-meta">
                                <span class="project-price">€800</span>
                                <span class="project-deadline">Awaiting feedback</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 90%"></div>
                            </div>
                            <div class="project-actions">
                                <button class="btn btn-sm btn-primary">View Details</button>
                                <button class="btn btn-sm btn-secondary">Follow Up</button>
                            </div>
                        </div>

                        <div class="project-card completed" data-status="completed">
                            <div class="project-header">
                                <h3>Mobile App Mockups</h3>
                                <span class="project-status completed">Completed</span>
                            </div>
                            <p class="project-client">FitnessTracker</p>
                            <div class="project-meta">
                                <span class="project-price">€1,200</span>
                                <span class="project-deadline">Completed</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 100%"></div>
                            </div>
                            <div class="project-actions">
                                <button class="btn btn-sm btn-primary">View Details</button>
                                <button class="btn btn-sm btn-secondary">Archive</button>
                            </div>
                        </div>

                        <div class="project-card active" data-status="active">
                            <div class="project-header">
                                <h3>E-commerce Platform</h3>
                                <span class="project-status active">Active</span>
                            </div>
                            <p class="project-client">Fashion Store</p>
                            <div class="project-meta">
                                <span class="project-price">€4,500</span>
                                <span class="project-deadline">Due in 12 days</span>
                            </div>
                            <div class="project-progress-bar">
                                <div class="progress-fill" style="width: 45%"></div>
                            </div>
                            <div class="project-actions">
                                <button class="btn btn-sm btn-primary">View Details</button>
                                <button class="btn btn-sm btn-secondary">Send Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    static init() {
        // Initialize projects-specific functionality
        this.initProjectsFeatures();
        
        console.log('Projects page initialized');
    }
    
    static initProjectsFeatures() {
        // Filter tabs functionality
        const filterTabs = document.querySelectorAll('.filter-tab');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const status = card.getAttribute('data-status');
                        card.style.display = status === filter ? 'block' : 'none';
                    }
                });
            });
        });
    }
}

if (typeof window !== 'undefined') {
    window.ProjectsPage = ProjectsPage;
}
