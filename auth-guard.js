// Authentication Guard for Dashboard
// This script checks if user is authenticated before allowing access to dashboard

console.log('🛡️ Auth Guard: Final authentication verification...');

// Check if we already have auth data stored locally (for faster verification)
function hasLocalAuthData() {
    try {
        // Check Firebase persistence storage
        const firebaseKeys = Object.keys(localStorage).find(key => 
            key.startsWith('firebase:authUser:') || 
            key.includes('firebase') || 
            key.includes('auth')
        );
        
        if (firebaseKeys) {
            console.log('🔐 Auth Guard: Found local auth data');
            return true;
        }
        
        // Also check sessionStorage
        const sessionKeys = Object.keys(sessionStorage).find(key => 
            key.startsWith('firebase:authUser:') || 
            key.includes('firebase') || 
            key.includes('auth')
        );
        
        if (sessionKeys) {
            console.log('🔐 Auth Guard: Found session auth data');
            return true;
        }
        
        console.log('⚠️ Auth Guard: No local auth data found');
        return false;
    } catch (error) {
        console.error('❌ Auth Guard: Error checking local auth data:', error);
        return false;
    }
}

// Wait for Firebase to initialize
function waitForAuth() {
    return new Promise((resolve, reject) => {
        const maxWaitTime = 10000; // 10 seconds max
        const startTime = Date.now();
        
        const checkAuth = () => {
            if (window.firebaseAuth) {
                console.log('🔐 Auth Guard: Firebase Auth available');
                resolve(window.firebaseAuth);
            } else if (Date.now() - startTime > maxWaitTime) {
                console.error('❌ Auth Guard: Firebase Auth timeout');
                reject(new Error('Firebase Auth failed to load'));
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
        // First, check if we have local auth data to avoid immediate redirect
        const hasLocalAuth = hasLocalAuthData();
        
        const auth = await waitForAuth();
        
        // Set up a more reliable auth state check
        let authStateResolved = false;
        let authCheckTimeout;
        
        // If we have local auth data, wait longer for verification
        const timeoutDuration = hasLocalAuth ? 3000 : 1000;
        
        console.log(`⏳ Auth Guard: Checking auth state (timeout: ${timeoutDuration}ms)...`);
        
        // Set timeout for fallback behavior
        authCheckTimeout = setTimeout(() => {
            if (!authStateResolved) {
                authStateResolved = true;
                
                if (hasLocalAuth) {
                    console.log('⚠️ Auth Guard: Timeout with local data, allowing access');
                    showDashboard();
                } else {
                    console.log('❌ Auth Guard: No auth data, redirecting to signin');
                    redirectToSignin();
                }
            }
        }, timeoutDuration);
        
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (authStateResolved) return; // Prevent multiple calls
            
            console.log('👤 Auth Guard: Auth state determined:', !!user);
            authStateResolved = true;
            
            // Clear timeout since we got a definitive answer
            if (authCheckTimeout) {
                clearTimeout(authCheckTimeout);
            }
            
            // Stop listening
            unsubscribe();
            
            if (user) {
                console.log('✅ Auth Guard: User authenticated:', user.email);
                showDashboard();
            } else {
                console.log('❌ Auth Guard: User not authenticated');
                redirectToSignin();
            }
        });
        
    } catch (error) {
        console.error('❌ Auth Guard: Error checking authentication:', error);
        // On error, redirect to signin for safety
        redirectToSignin();
    }
}

// Show dashboard content
function showDashboard() {
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        dashboardContent.classList.add('auth-verified');
    }
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Redirect to signin page
function redirectToSignin() {
    console.log('🚪 Redirecting to signin page');
    window.location.replace('auth/signin.html');
}

// Update sign out function to redirect to signin instead
window.signOutUser = async function() {
    try {
        console.log('🚪 Signing out user...');
        
        if (window.firebaseAuth) {
            await window.firebaseAuth.signOut();
            console.log('✅ User signed out successfully');
        }
        
        // Clear any local storage auth data
        Object.keys(localStorage).forEach(key => {
            if (key.includes('firebase') || key.includes('auth')) {
                localStorage.removeItem(key);
            }
        });
        
        Object.keys(sessionStorage).forEach(key => {
            if (key.includes('firebase') || key.includes('auth')) {
                sessionStorage.removeItem(key);
            }
        });
        
        // Redirect to signin page
        redirectToSignin();
    } catch (error) {
        console.error('❌ Error signing out:', error);
        // Even if signout fails, redirect to signin
        redirectToSignin();
    }
};

// Start authentication check
console.log('🚀 Auth Guard: Starting authentication check...');
checkAuthentication(); 