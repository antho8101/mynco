// Team Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Firebase to load
    setTimeout(initTeam, 100);
});

function initTeam() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.dashboard-footer');
    const inviteMemberBtn = document.getElementById('inviteMemberBtn');
    const inviteModal = document.getElementById('inviteModal');
    const closeInviteModal = document.getElementById('closeInviteModal');
    const cancelInvite = document.getElementById('cancelInvite');
    const inviteForm = document.getElementById('inviteForm');
    const exportTeamBtn = document.getElementById('exportTeamBtn');

    // Sidebar toggle functionality
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
            if (footer) {
                footer.classList.toggle('sidebar-collapsed');
            }
        });
    }

    // Responsive sidebar behavior
    function handleResize() {
        if (window.innerWidth <= 1024) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
            if (footer) {
                footer.classList.add('sidebar-collapsed');
            }
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
            if (footer) {
                footer.classList.remove('sidebar-collapsed');
            }
        }
    }

    // Handle initial resize
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Modal functionality
    inviteMemberBtn.addEventListener('click', function() {
        inviteModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    function closeModal() {
        inviteModal.classList.remove('show');
        document.body.style.overflow = '';
        inviteForm.reset();
    }

    closeInviteModal.addEventListener('click', closeModal);
    cancelInvite.addEventListener('click', closeModal);

    // Close modal when clicking outside
    inviteModal.addEventListener('click', function(e) {
        if (e.target === inviteModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && inviteModal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle invite form submission
    inviteForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(inviteForm);
        const email = formData.get('email');
        const role = formData.get('role');
        const message = formData.get('message');

        try {
            // Show loading state
            const submitBtn = inviteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // TODO: Send invitation via Firebase/API
            await sendInvitation(email, role, message);

            // Show success message
            showNotification('Invitation sent successfully!', 'success');
            
            // Close modal
            closeModal();

            // Refresh the page or add the invite to the list
            setTimeout(() => {
                location.reload();
            }, 1000);

        } catch (error) {
            console.error('Error sending invitation:', error);
            showNotification('Failed to send invitation. Please try again.', 'error');
        } finally {
            // Reset button
            const submitBtn = inviteForm.querySelector('button[type="submit"]');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Export team functionality
    exportTeamBtn.addEventListener('click', function() {
        exportTeamData();
    });

    // Member menu functionality
    const memberMenus = document.querySelectorAll('.menu-btn');
    memberMenus.forEach(menuBtn => {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close any other open menus first
            closeAllMemberMenus();
            
            // Toggle current menu
            const memberCard = this.closest('.member-card');
            const memberName = memberCard.querySelector('h3').textContent;
            const memberRole = memberCard.querySelector('.role-badge').textContent;
            
            // Create or show dropdown menu
            showMemberMenu(this, memberName, memberRole);
        });
    });

    // Close all member menus
    function closeAllMemberMenus() {
        const existingMenus = document.querySelectorAll('.member-dropdown');
        existingMenus.forEach(menu => menu.remove());
    }

    // Show member dropdown menu
    function showMemberMenu(button, memberName, memberRole) {
        const memberCard = button.closest('.member-card');
        const isOwner = memberCard.classList.contains('owner');
        
        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'member-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <strong>${memberName}</strong>
                <span class="member-role">${memberRole}</span>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" data-action="view-profile">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                View Profile
            </button>
            <button class="dropdown-item" data-action="view-projects">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                View Projects
            </button>
            <button class="dropdown-item" data-action="send-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                Send Message
            </button>
            ${!isOwner ? `
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" data-action="change-role">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Change Role
            </button>
            <button class="dropdown-item danger" data-action="remove-member">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Remove Member
            </button>
            ` : ''}
        `;
        
        // Position the dropdown relative to the button
        const buttonRect = button.getBoundingClientRect();
        const cardRect = memberCard.getBoundingClientRect();
        
        dropdown.style.position = 'absolute';
        dropdown.style.top = `${button.offsetTop + button.offsetHeight + 5}px`;
        dropdown.style.right = '0';
        dropdown.style.zIndex = '1000';
        
        // Add to member card
        memberCard.style.position = 'relative';
        memberCard.appendChild(dropdown);
        
        // Add event listeners to dropdown items
        dropdown.addEventListener('click', function(e) {
            const action = e.target.closest('.dropdown-item')?.dataset.action;
            if (action) {
                handleMemberAction(action, memberName, memberRole);
                closeAllMemberMenus();
            }
        });
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                    closeAllMemberMenus();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 0);
    }

    // Handle member actions
    function handleMemberAction(action, memberName, memberRole) {
        switch (action) {
            case 'view-profile':
                showNotification(`Viewing ${memberName}'s profile...`, 'info');
                // TODO: Navigate to member profile page
                break;
                
            case 'view-projects':
                showNotification(`Viewing ${memberName}'s projects...`, 'info');
                // TODO: Navigate to projects page filtered by member
                break;
                
            case 'send-message':
                showNotification(`Opening chat with ${memberName}...`, 'info');
                // TODO: Open chat/message modal
                break;
                
            case 'change-role':
                showChangeRoleModal(memberName, memberRole);
                break;
                
            case 'remove-member':
                if (confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
                    showNotification(`${memberName} has been removed from the team.`, 'success');
                    // TODO: Remove member via API
                }
                break;
        }
    }

    // Show change role modal
    function showChangeRoleModal(memberName, currentRole) {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Change Role</h2>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <p>Change ${memberName}'s role from <strong>${currentRole}</strong> to:</p>
                    <div class="role-options">
                        <label class="role-option">
                            <input type="radio" name="newRole" value="admin" ${currentRole === 'Admin' ? 'checked' : ''}>
                            <span class="role-label">Admin</span>
                            <span class="role-description">Can manage team members and projects</span>
                        </label>
                        <label class="role-option">
                            <input type="radio" name="newRole" value="member" ${currentRole === 'Member' ? 'checked' : ''}>
                            <span class="role-label">Member</span>
                            <span class="role-description">Can create and manage their own projects</span>
                        </label>
                        <label class="role-option">
                            <input type="radio" name="newRole" value="viewer" ${currentRole === 'Viewer' ? 'checked' : ''}>
                            <span class="role-label">Viewer</span>
                            <span class="role-description">Read-only access to all projects</span>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelRoleChange">Cancel</button>
                    <button class="btn btn-primary" id="confirmRoleChange">Change Role</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('#cancelRoleChange').addEventListener('click', () => modal.remove());
        modal.querySelector('#confirmRoleChange').addEventListener('click', () => {
            const newRole = modal.querySelector('input[name="newRole"]:checked').value;
            showNotification(`${memberName}'s role changed to ${newRole}.`, 'success');
            modal.remove();
            // TODO: Update role via API
        });
    }

    // Invite actions
    const resendButtons = document.querySelectorAll('.action-buttons .btn-secondary');
    const cancelButtons = document.querySelectorAll('.action-buttons .btn-danger');

    resendButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const inviteItem = btn.closest('.invite-item');
            const email = inviteItem.querySelector('.invite-details p').textContent;
            
            // TODO: Resend invitation
            console.log('Resending invitation to:', email);
            showNotification('Invitation resent!', 'success');
        });
    });

    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const inviteItem = btn.closest('.invite-item');
            const email = inviteItem.querySelector('.invite-details p').textContent;
            
            if (confirm(`Are you sure you want to cancel the invitation to ${email}?`)) {
                // TODO: Cancel invitation
                console.log('Canceling invitation to:', email);
                inviteItem.remove();
                showNotification('Invitation canceled', 'success');
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            filterMembers(query);
        });
    }

    // Support button functionality
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            // Open support page or modal
            window.open('mailto:support@mynco.app?subject=Dashboard Support Request', '_blank');
        });
    }

    console.log('👥 Team management initialized');
}

// Send invitation function
async function sendInvitation(email, role, message) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) { // 90% success rate
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 1000);
    });
}

// Export team data
function exportTeamData() {
    const teamData = {
        members: [
            {
                name: 'Anthony Carayon',
                email: 'anthony@mynco.app',
                role: 'Owner',
                projects: 8,
                clients: 12,
                status: 'Online'
            },
            {
                name: 'Sarah Johnson',
                email: 'sarah@mynco.app',
                role: 'Admin',
                projects: 5,
                clients: 8,
                status: 'Online'
            },
            {
                name: 'Mike Chen',
                email: 'mike@mynco.app',
                role: 'Member',
                projects: 3,
                clients: 6,
                status: 'Away'
            },
            {
                name: 'Emma Davis',
                email: 'emma@mynco.app',
                role: 'Member',
                projects: 2,
                clients: 4,
                status: 'Offline'
            }
        ],
        pendingInvites: [
            {
                name: 'John Smith',
                email: 'john.smith@example.com',
                role: 'Member',
                invited: '2 days ago'
            },
            {
                name: 'Lisa Wang',
                email: 'lisa.wang@example.com',
                role: 'Admin',
                invited: '1 day ago'
            }
        ],
        exportDate: new Date().toISOString()
    };

    // Create and download CSV
    const csv = convertToCSV(teamData);
    downloadCSV(csv, 'team-data.csv');
    
    showNotification('Team data exported successfully!', 'success');
}

// Convert data to CSV
function convertToCSV(data) {
    let csv = 'Name,Email,Role,Projects,Clients,Status\n';
    
    data.members.forEach(member => {
        csv += `${member.name},${member.email},${member.role},${member.projects},${member.clients},${member.status}\n`;
    });
    
    return csv;
}

// Download CSV file
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Filter members based on search query
function filterMembers(query) {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const email = card.querySelector('.member-email').textContent.toLowerCase();
        const role = card.querySelector('.role-badge').textContent.toLowerCase();
        
        const matches = name.includes(query) || 
                       email.includes(query) || 
                       role.includes(query);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
} 