// Import Firebase Auth functions
import { 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Wait for Firebase to be initialized
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Firebase to load
    setTimeout(initDashboard, 100);
});

function initDashboard() {
    const auth = window.firebaseAuth;
    
    // Check if we're in development mode (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('192.168.') ||
                         window.location.hostname.includes('10.0.') ||
                         window.location.hostname.includes('172.');

    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.querySelector('.user-menu');
    const signOutBtn = document.getElementById('signOutBtn');
    const createProjectBtn = document.getElementById('createProjectBtn');

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    });

    // User menu dropdown
    userMenuBtn.addEventListener('click', function() {
        userMenu.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove('open');
        }
    });

    // Sign out functionality
    signOutBtn.addEventListener('click', async function() {
        if (isDevelopment) {
            // In development, just show a message
            alert('Sign out disabled in development mode');
            return;
        }
        
        try {
            await signOut(auth);
            console.log('User signed out');
            window.location.href = '/auth/login.html';
        } catch (error) {
            console.error('Sign out error:', error);
        }
    });

    // Create project button
    createProjectBtn.addEventListener('click', function() {
        // TODO: Open create project modal or navigate to create project page
        console.log('Create project clicked');
        alert('Create project functionality coming soon!');
    });

    // Check authentication state
    if (auth && !isDevelopment) {
        // Only check auth in production
        onAuthStateChanged(auth, function(user) {
            if (user) {
                console.log('User is signed in:', user);
                updateUserInfo(user);
            } else {
                console.log('User is signed out');
                // Redirect to login if not authenticated
                window.location.href = '/auth/login.html';
            }
        });
    } else if (isDevelopment) {
        // In development mode, use mock user data
        console.log('🔧 Development mode: Using mock user data');
        const mockUser = {
            displayName: 'Anthony Carayon',
            email: 'anthony@mynco.app'
        };
        updateUserInfo(mockUser);
    }

    // Update user information in the UI
    function updateUserInfo(user) {
        const userNameElements = document.querySelectorAll('.user-name');
        const userEmailElements = document.querySelectorAll('.user-email');
        const avatarElements = document.querySelectorAll('.avatar');

        // Get user display name or email
        const displayName = user.displayName || user.email.split('@')[0];
        const email = user.email;

        // Update all user name elements
        userNameElements.forEach(element => {
            element.textContent = displayName;
        });

        // Update all user email elements
        userEmailElements.forEach(element => {
            element.textContent = email;
        });

        // Update avatar initials
        avatarElements.forEach(element => {
            element.textContent = displayName.charAt(0).toUpperCase();
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // TODO: Implement search functionality
            console.log('Searching for:', query);
        });
    }

    // Notification functionality
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // TODO: Show notifications dropdown
            console.log('Notifications clicked');
            alert('Notifications coming soon!');
        });
    }

    // Active navigation highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Responsive sidebar behavior
    function handleResize() {
        if (window.innerWidth <= 1024) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
        }
    }

    // Handle initial resize
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }

        // Escape to close dropdowns
        if (e.key === 'Escape') {
            userMenu.classList.remove('open');
        }
    });

    console.log('🎛️ Dashboard initialized' + (isDevelopment ? ' (DEV MODE)' : ''));
}
