// Team Page Module
class TeamPage {
    static render() {
        return `
            <div class="container">
                <div class="page-header">
                    <div class="page-title">
                        <h1>Team Management</h1>
                        <p>Manage your team members, roles, and permissions</p>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Team Members</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="shield"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Admin Roles</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="activity"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Active Sessions</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i data-lucide="user-plus"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1</h3>
                            <p>Pending Invites</p>
                        </div>
                    </div>
                </div>

                <div class="team-section">
                    <div class="section-header">
                        <div class="section-title">
                            <h2>Team Members</h2>
                            <div class="section-actions">
                                <div class="filter-tabs">
                                    <button class="filter-tab active" data-filter="all">All Members</button>
                                    <button class="filter-tab" data-filter="admin">Admins</button>
                                    <button class="filter-tab" data-filter="member">Members</button>
                                </div>
                                <button class="btn btn-primary" id="managePermissionsBtn">
                                    <i data-lucide="shield"></i>
                                    <span>Manage Permissions</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="team-grid">
                        <div class="team-card" data-role="admin">
                            <div class="member-avatar">
                                <div class="avatar large">A</div>
                                <span class="status-indicator online"></span>
                            </div>
                            <div class="member-info">
                                <h3>Anthony Carayon</h3>
                                <p class="member-email">anthony@mynco.app</p>
                                <div class="member-role">
                                    <span class="role-badge owner">Owner</span>
                                    <span class="member-joined">Joined 2 years ago</span>
                                </div>
                            </div>
                                                    <div class="member-actions">
                            <button class="action-btn" title="Edit permissions">
                                <i data-lucide="edit"></i>
                            </button>
                        </div>
                        </div>

                        <div class="team-card" data-role="admin">
                            <div class="member-avatar">
                                <div class="avatar large">M</div>
                                <span class="status-indicator online"></span>
                            </div>
                            <div class="member-info">
                                <h3>Marie Dubois</h3>
                                <p class="member-email">marie@mynco.app</p>
                                <div class="member-role">
                                    <span class="role-badge admin">Admin</span>
                                    <span class="member-joined">Joined 1 year ago</span>
                                </div>
                            </div>
                            <div class="member-actions">
                                <button class="action-btn" title="Edit permissions">
                                    <i data-lucide="edit"></i>
                                </button>
                                <button class="action-btn danger" title="Remove member">
                                    <i data-lucide="user-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="team-card" data-role="member">
                            <div class="member-avatar">
                                <div class="avatar large">J</div>
                                <span class="status-indicator away"></span>
                            </div>
                            <div class="member-info">
                                <h3>Jean Martin</h3>
                                <p class="member-email">jean@example.com</p>
                                <div class="member-role">
                                    <span class="role-badge member">Member</span>
                                    <span class="member-joined">Joined 6 months ago</span>
                                </div>
                            </div>
                            <div class="member-actions">
                                <button class="action-btn" title="Edit permissions">
                                    <i data-lucide="edit"></i>
                                </button>
                                <button class="action-btn danger" title="Remove member">
                                    <i data-lucide="user-minus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="team-card pending">
                            <div class="member-avatar">
                                <div class="avatar large pending">?</div>
                                <span class="status-indicator pending"></span>
                            </div>
                            <div class="member-info">
                                <h3>sarah@designstudio.com</h3>
                                <p class="member-email">Invitation pending</p>
                                <div class="member-role">
                                    <span class="role-badge pending">Invited</span>
                                    <span class="member-joined">Invited 2 days ago</span>
                                </div>
                            </div>
                            <div class="member-actions">
                                <button class="action-btn" title="Resend invitation">
                                    <i data-lucide="refresh-cw"></i>
                                </button>
                                <button class="action-btn danger" title="Cancel invitation">
                                    <i data-lucide="x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="inviteModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Invite Team Member</h2>
                            <button class="modal-close" id="closeInviteModal" aria-label="Close modal">
                                <i data-lucide="x"></i>
                            </button>
                        </div>
                        
                        <form id="inviteForm" class="modal-body">
                            <div class="form-group">
                                <label for="memberEmail">Email Address</label>
                                <input type="email" id="memberEmail" name="email" required 
                                       placeholder="Enter team member's email">
                                <small class="form-help">They'll receive an invitation via email</small>
                            </div>

                            <div class="form-group">
                                <label for="memberRole">Role</label>
                                <select id="memberRole" name="role" required>
                                    <option value="">Select a role</option>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <small class="form-help">
                                    <strong>Member:</strong> Can view and manage assigned projects<br>
                                    <strong>Admin:</strong> Full access including team management
                                </small>
                            </div>

                            <div class="form-group">
                                <label for="inviteMessage">Personal Message (Optional)</label>
                                <textarea id="inviteMessage" name="message" rows="3" 
                                          placeholder="Add a personal welcome message..."></textarea>
                            </div>

                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" id="cancelInvite">Cancel</button>
                                <button type="submit" class="btn btn-primary">
                                    <i data-lucide="send"></i>
                                    Send Invitation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
    
    static init() {
        // Initialize team-specific functionality
        this.initTeamFeatures();
        
        console.log('Team page initialized');
    }
    
    static initTeamFeatures() {
        // Manage Permissions button
        const managePermissionsBtn = document.getElementById('managePermissionsBtn');
        if (managePermissionsBtn) {
            managePermissionsBtn.addEventListener('click', function() {
                alert('Manage Permissions feature coming soon!');
            });
        }
        
        // Filter tabs functionality
        const filterTabs = document.querySelectorAll('.filter-tab');
        const teamCards = document.querySelectorAll('.team-card');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                teamCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const role = card.getAttribute('data-role');
                        card.style.display = role === filter ? 'block' : 'none';
                    }
                });
            });
        });
        
        // Initialize modal
        this.initModal();
    }
    
    static initModal() {
        const inviteModal = document.getElementById('inviteModal');
        const closeBtn = document.getElementById('closeInviteModal');
        const cancelBtn = document.getElementById('cancelInvite');
        
        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    if (inviteModal) {
                        inviteModal.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
        
        if (inviteModal) {
            inviteModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        }
        
        const inviteForm = document.getElementById('inviteForm');
        if (inviteForm) {
            inviteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const email = formData.get('email');
                const role = formData.get('role');
                
                alert(`Invitation would be sent to ${email} with role: ${role}`);
                
                inviteModal.classList.remove('show');
                document.body.style.overflow = '';
                this.reset();
            });
        }
    }
}

if (typeof window !== 'undefined') {
    window.TeamPage = TeamPage;
}
