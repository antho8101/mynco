// Authentication Guard for Dashboard
// This script checks if user is authenticated before allowing access to dashboard

console.log('🛡️ Auth Guard: Checking authentication...');

// Immediately hide the main content until authentication is verified
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.visibility = 'hidden';
    }
});

// Wait for Firebase to initialize
function waitForAuth() {
    return new Promise((resolve) => {
        const checkAuth = () => {
            if (window.firebaseAuth) {
                console.log('🔐 Auth Guard: Firebase Auth available');
                resolve(window.firebaseAuth);
            } else {
                console.log('⏳ Auth Guard: Waiting for Firebase Auth...');
                setTimeout(checkAuth, 100);
            }
        };
        checkAuth();
    });
}

// Main auth check function
async function checkAuthentication() {
    try {
        const auth = await waitForAuth();
        
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            console.log('👤 Auth Guard: Auth state changed:', !!user);
            
            if (user) {
                console.log('✅ Auth Guard: User is authenticated:', user.email);
                // User is signed in, allow access to dashboard
                
                // Show the main content
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.style.visibility = 'visible';
                }
                
                // Hide loading screen if it exists
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            } else {
                console.log('❌ Auth Guard: User not authenticated, redirecting to signin');
                // User is not signed in, redirect to signin page
                window.location.replace('https://mynco.app/auth/signin.html');
            }
        });
        
    } catch (error) {
        console.error('❌ Auth Guard: Error checking authentication:', error);
        // On error, redirect to signin for safety
        window.location.replace('https://mynco.app/auth/signin.html');
    }
}

// Update sign out function to redirect to signin instead
window.signOutUser = async function() {
    try {
        console.log('🚪 Signing out user...');
        
        if (window.firebaseAuth) {
            await window.firebaseAuth.signOut();
            console.log('✅ User signed out successfully');
        }
        
        // Redirect to signin page
        window.location.replace('https://mynco.app/auth/signin.html');
    } catch (error) {
        console.error('❌ Error signing out:', error);
        // Even if signout fails, redirect to signin
        window.location.replace('https://mynco.app/auth/signin.html');
    }
};

// Start authentication check
console.log('🚀 Auth Guard: Starting authentication check...');
checkAuthentication(); 