// Import Firebase functions
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Wait for Firebase to be initialized
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSignIn, 100);
});

function initSignIn() {
    const auth = window.firebaseAuth;
    if (!auth) {
        console.error('Firebase Auth not initialized');
        showError('Authentication service not available. Please refresh the page.');
        return;
    }

    // Check if already authenticated (avoid showing signin page to authenticated users)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('✅ User already authenticated, redirecting to dashboard');
            window.location.replace('https://dashboard.mynco.app/');
            return;
        }
    });

    // DOM Elements
    const authForm = document.getElementById('authForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const googleSignIn = document.getElementById('googleSignIn');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');

    if (!authForm) {
        console.error('Auth form not found');
        return;
    }

    // Initialize Google Provider
    const googleProvider = new GoogleAuthProvider();

    // Password visibility toggle
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Update icon
        const eyeIcon = passwordToggle.querySelector('svg');
        if (type === 'text') {
            eyeIcon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
        } else {
            eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        }
    });

    // Helper function to handle successful authentication
    function handleSuccessfulAuth(user) {
        console.log('✅ Authentication successful:', user.email);
        
        // Wait for Firebase to persist the auth state, then redirect
        // Use onAuthStateChanged to ensure auth state is fully persisted
        const unsubscribe = onAuthStateChanged(auth, (persistedUser) => {
            if (persistedUser && persistedUser.uid === user.uid) {
                console.log('✅ Auth state persisted, redirecting to dashboard');
                unsubscribe(); // Stop listening
                window.location.replace('https://dashboard.mynco.app/');
            }
        });
        
        // Fallback timeout in case onAuthStateChanged doesn't fire quickly
        setTimeout(() => {
            console.log('⏰ Fallback redirect after timeout');
            unsubscribe();
            window.location.replace('https://dashboard.mynco.app/');
        }, 2000); // Reduced to 2 seconds maximum
    }

    // Form submission
    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            console.log('🚀 Starting sign in process...');
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            handleSuccessfulAuth(userCredential.user);
        } catch (error) {
            console.error('❌ Auth error:', error);
            handleAuthError(error);
            setLoading(false);
        }
    });

    // Google Sign In
    googleSignIn.addEventListener('click', async function() {
        setLoading(true);
        
        try {
            console.log('🚀 Starting Google sign in...');
            const result = await signInWithPopup(auth, googleProvider);
            handleSuccessfulAuth(result.user);
        } catch (error) {
            console.error('❌ Google auth error:', error);
            handleAuthError(error);
            setLoading(false);
        }
    });

    // Error handling
    function handleAuthError(error) {
        let message = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'Please enter a valid email address.';
                break;
            case 'auth/user-not-found':
                message = 'No account found with this email address.';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password. Please try again.';
                break;
            case 'auth/too-many-requests':
                message = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/popup-closed-by-user':
                message = 'Sign in was cancelled.';
                break;
        }
        
        showError(message);
    }

    // UI helpers
    function setLoading(loading) {
        if (loading) {
            btnText.classList.add('hidden');
            document.querySelector('.btn-loading').classList.remove('hidden');
            submitBtn.disabled = true;
            googleSignIn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            document.querySelector('.btn-loading').classList.add('hidden');
            submitBtn.disabled = false;
            googleSignIn.disabled = false;
        }
    }

    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert after form header
        const formHeader = document.querySelector('.form-header');
        formHeader.parentNode.insertBefore(errorDiv, formHeader.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
} 