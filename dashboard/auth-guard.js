// Firebase Authentication Guard for Dashboard
console.log('🛡️ Auth Guard: Final authentication verification...');

// Check if user has local auth data
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
        console.log('🚀 Auth Guard: Starting authentication verification...');
        
        // First, check if we have local auth data to avoid immediate redirect
        const hasLocalAuth = hasLocalAuthData();
        console.log('🔍 Auth Guard: Local auth data found:', hasLocalAuth);
        
        const auth = await waitForAuth();
        console.log('🔥 Auth Guard: Firebase Auth ready');
        
        // Give more time for auth state to be determined if we have local data
        let authCheckTimeout;
        let authStateResolved = false;
        
        if (hasLocalAuth) {
            console.log('⏳ Auth Guard: Waiting for auth state (user likely authenticated)...');
            // Wait up to 10 seconds if we have local auth data
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('⚠️ Auth Guard: Auth check timeout with local data - allowing access');
                    authStateResolved = true;
                    
                    // Show dashboard content
                    const dashboardContent = document.querySelector('.dashboard-content');
                    if (dashboardContent) {
                        dashboardContent.classList.add('auth-verified');
                    }
                    
                    // Hide loading screen
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        setTimeout(() => {
                            loadingScreen.classList.add('fade-out');
                            setTimeout(() => {
                                loadingScreen.style.display = 'none';
                            }, 500);
                        }, 500);
                    }
                }
            }, 10000);
        } else {
            console.log('⏳ Auth Guard: No local auth data, extended check...');
            // Give more time when no local auth data (user might be coming from signin)
            // Wait up to 8 seconds to allow for network latency and Firebase initialization
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('❌ Auth Guard: No auth data after extended wait - redirecting to signin');
                    authStateResolved = true;
                    window.location.replace('auth/signin.html');
                }
            }, 8000);
        }
        
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            if (authStateResolved) {
                return; // Prevent multiple calls
            }
            
            console.log('👤 Auth Guard: Auth state changed. User exists:', !!user);
            
            if (user) {
                console.log('✅ Auth Guard: User authenticated:', user.email);
            } else {
                console.log('❌ Auth Guard: No user found - redirecting to signin');
                authStateResolved = true;
                // Clear timeout since we got a definitive answer
                if (authCheckTimeout) {
                    clearTimeout(authCheckTimeout);
                }
                window.location.replace('auth/signin.html');
                return;
            }
            
            authStateResolved = true;
            
            // Clear timeout since we got a definitive answer
            if (authCheckTimeout) {
                clearTimeout(authCheckTimeout);
            }
            
            if (user) {
                console.log('✅ Auth Guard: User is authenticated:', user.email);
                // User is signed in, dashboard access confirmed
                
                // Show dashboard content
                const dashboardContent = document.querySelector('.dashboard-content');
                if (dashboardContent) {
                    dashboardContent.classList.add('auth-verified');
                }
                
                // Hide loading screen with smooth transition
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    setTimeout(() => {
                        loadingScreen.classList.add('fade-out');
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            console.log('✅ Auth Guard: Loading screen hidden, dashboard ready');
                        }, 500);
                    }, 500);
                }
            }
        });
        
    } catch (error) {
        console.error('❌ Auth Guard: Error checking authentication:', error);
        // On error, redirect to signin for safety
        setTimeout(() => {
            window.location.replace('auth/signin.html');
        }, 2000);
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
        window.location.replace('auth/signin.html');
    } catch (error) {
        console.error('❌ Error signing out:', error);
        // Even if signout fails, redirect to signin
        window.location.replace('auth/signin.html');
    }
};

// Start authentication check
console.log('🚀 Auth Guard: Starting authentication check...');
checkAuthentication(); 