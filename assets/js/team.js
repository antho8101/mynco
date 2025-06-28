// Team Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Firebase to load
    setTimeout(initTeam, 100);
});

function initTeam() {
    // DOM Elements
    const inviteMemberBtn = document.getElementById('inviteMemberBtn');
    const inviteModal = document.getElementById('inviteModal');
    const closeInviteModal = document.getElementById('closeInviteModal');
    const cancelInvite = document.getElementById('cancelInvite');
    const inviteForm = document.getElementById('inviteForm');
    const exportTeamBtn = document.getElementById('exportTeamBtn');

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
            // TODO: Show member actions dropdown
            console.log('Member menu clicked');
        });
    });

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