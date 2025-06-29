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
        // AJOUT: Alert pour debug
        console.log('🚀 DEBUG: Auth Guard starting...');
        alert('🚀 DEBUG AUTH-GUARD: Démarrage de la vérification auth...');
        
        // First, check if we have local auth data to avoid immediate redirect
        const hasLocalAuth = hasLocalAuthData();
        console.log('🔍 DEBUG: Has local auth data:', hasLocalAuth);
        alert('🔍 DEBUG: Données auth locales trouvées: ' + hasLocalAuth);
        
        const auth = await waitForAuth();
        console.log('🔥 DEBUG: Firebase auth obtained');
        
        // Give more time for auth state to be determined if we have local data
        let authCheckTimeout;
        let authStateResolved = false;
        
        if (hasLocalAuth) {
            console.log('⏳ Auth Guard: Waiting for auth state (user likely authenticated)...');
            // Wait up to 20 seconds if we have local auth data (ÉNORME délai pour debug!)
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('⚠️ DEBUG: Auth check timeout with local data - ALLOWING ACCESS');
                    alert('⚠️ DEBUG: Auth timeout mais données locales trouvées - Accès autorisé');
                    authStateResolved = true;
                    
                    // Show dashboard content
                    const dashboardContent = document.querySelector('.dashboard-content');
                    if (dashboardContent) {
                        dashboardContent.classList.add('auth-verified');
                    }
                    
                    // Hide loading screen using the CORRECT method (fade-out)
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        setTimeout(() => {
                            console.log('🎯 DEBUG: Hiding loading screen with fade-out...');
                            loadingScreen.classList.add('fade-out');
                            setTimeout(() => {
                                console.log('✅ DEBUG: Loading screen completely hidden');
                                loadingScreen.style.display = 'none';
                            }, 500);
                        }, 500);
                    }
                }
            }, 20000); // ÉNORME délai pour debug !
        } else {
            console.log('⏳ Auth Guard: No local auth data, quick check...');
            // Only wait 15 seconds if no local auth data (énorme délai aussi!)
            authCheckTimeout = setTimeout(() => {
                if (!authStateResolved) {
                    console.log('❌ DEBUG: No auth data and timeout reached - BUT NOT REDIRECTING FOR DEBUG');
                    alert('❌ DEBUG: Pas de données auth + timeout - MAIS PAS DE REDIRECTION pour debug');
                    authStateResolved = true;
                    // Pas de redirection pour debug
                }
            }, 15000); // Énorme délai pour debug !
        }
        
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            if (authStateResolved) {
                console.log('⚠️ DEBUG: Auth state change IGNORED (already resolved)');
                return; // Prevent multiple calls
            }
            
            console.log('👤 DEBUG: Auth state changed. User exists:', !!user);
            
            // DETAIL CHECK: Log all localStorage and sessionStorage keys
            console.log('🔍 DEBUG: LocalStorage keys:', Object.keys(localStorage));
            console.log('🔍 DEBUG: SessionStorage keys:', Object.keys(sessionStorage));
            
            if (user) {
                console.log('✅ DEBUG: User email:', user.email);
                console.log('✅ DEBUG: User UID:', user.uid);
                console.log('✅ DEBUG: User verified:', user.emailVerified);
                alert('✅ DEBUG: Utilisateur connecté - ' + user.email + ' (UID: ' + user.uid + ')');
            } else {
                console.log('❌ DEBUG: No user found');
                console.log('❌ DEBUG: Auth currentUser:', auth.currentUser);
                
                // Check if there's any auth data in storage
                const authKeys = Object.keys(localStorage).filter(key => key.includes('firebase') || key.includes('auth'));
                console.log('❌ DEBUG: Firebase keys in localStorage:', authKeys);
                
                const sessionAuthKeys = Object.keys(sessionStorage).filter(key => key.includes('firebase') || key.includes('auth'));
                console.log('❌ DEBUG: Firebase keys in sessionStorage:', sessionAuthKeys);
                
                alert('❌ DEBUG: Aucun utilisateur trouvé - MAIS ON NE REDIRIGE PAS pour voir les logs !');
                
                // TEMPORAIREMENT DÉSACTIVÉ : Pas de redirection pour déboguer
                console.log('🚫 DEBUG: Redirection DÉSACTIVÉE temporairement pour debug');
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
                
                // Show dashboard content and hide loading screen
                const dashboardContent = document.querySelector('.dashboard-content');
                if (dashboardContent) {
                    dashboardContent.classList.add('auth-verified');
                }
                
                // Hide loading screen using the CORRECT method (fade-out)
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    setTimeout(() => {
                        console.log('🎯 DEBUG: Hiding loading screen with fade-out...');
                        loadingScreen.classList.add('fade-out');
                        setTimeout(() => {
                            console.log('✅ DEBUG: Loading screen completely hidden');
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 500); // Small delay for smooth transition
                }
            }
        });
        
    } catch (error) {
        console.error('❌ Auth Guard: Error checking authentication:', error);
        alert('❌ DEBUG: Erreur Auth Guard - ' + error.message);
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