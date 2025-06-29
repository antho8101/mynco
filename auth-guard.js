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
        // First, check if we have local auth data to avoid immediate redirect
        const hasLocalAuth = hasLocalAuthData();
        
        const auth = await waitForAuth();
        
        // Give more time for auth state to be determined if we have local data
        let authCheckTimeout;
        let authStateResolved = false;
        
        if (hasLocalAuth) {
            console.log('⏳ Auth Guard: Waiting for auth state (user likely authenticated)...');
            // Wait up to 3 seconds if we have local auth data
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('⚠️ Auth Guard: Auth check timeout, but local data exists. Allowing access.');
                    authStateResolved = true;
                    // Hide loading screen if it exists
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                }
            }, 3000);
        } else {
            console.log('⏳ Auth Guard: No local auth data, quick check...');
            // Only wait 1 second if no local auth data
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('❌ Auth Guard: No auth data and timeout reached, redirecting');
                    authStateResolved = true;
                    window.location.replace('https://mynco.app/auth/signin.html');
                }
            }, 1000);
        }
        
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            if (authStateResolved) return; // Prevent multiple calls
            
            console.log('👤 Auth Guard: Auth state changed:', !!user);
            authStateResolved = true;
            
            // Clear timeout since we got a definitive answer
            if (authCheckTimeout) {
                clearTimeout(authCheckTimeout);
            }
            
            if (user) {
                console.log('✅ Auth Guard: User is authenticated:', user.email);
                // User is signed in, dashboard access confirmed
                
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