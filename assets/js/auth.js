// Import Firebase Auth functions
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Wait for Firebase to be initialized
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Firebase to load
    setTimeout(initAuth, 100);
});

function initAuth() {
    const auth = window.firebaseAuth;
    if (!auth) {
        console.error('Firebase Auth not initialized');
        return;
    }

    // DOM Elements
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const forgotPassword = document.getElementById('forgotPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const toggleMode = document.getElementById('toggleMode');
    const toggleText = document.getElementById('toggleText');
    const googleSignIn = document.getElementById('googleSignIn');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');

    // State
    let isSignUp = true;

    // Check URL parameters for mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'signin') {
        isSignUp = false;
        updateFormMode();
    }

    // Initialize Google Provider
    const googleProvider = new GoogleAuthProvider();

    // Toggle between Sign Up and Sign In
    toggleMode.addEventListener('click', function(e) {
        e.preventDefault();
        isSignUp = !isSignUp;
        updateFormMode();
    });

    function updateFormMode() {
        if (isSignUp) {
            formTitle.textContent = 'Create your account';
            formSubtitle.textContent = 'Start building professional client portals';
            btnText.textContent = 'Create account';
            toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleMode">Sign in</a>';
            forgotPassword.classList.add('hidden');
            termsCheckbox.classList.remove('hidden');
        } else {
            formTitle.textContent = 'Welcome back';
            formSubtitle.textContent = 'Sign in to your Mynco account';
            btnText.textContent = 'Sign in';
            toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleMode">Sign up</a>';
            forgotPassword.classList.remove('hidden');
            termsCheckbox.classList.add('hidden');
        }
        
        // Re-attach event listener
        document.getElementById('toggleMode').addEventListener('click', function(e) {
            e.preventDefault();
            isSignUp = !isSignUp;
            updateFormMode();
        });
    }

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

    // Form submission
    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms');

        // Validation
        if (isSignUp && !terms.checked) {
            showError('Please accept the Terms of Service and Privacy Policy');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            if (isSignUp) {
                // Create account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('Account created:', userCredential.user);
                showSuccess('Account created successfully!');
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard/';
                }, 1500);
            } else {
                // Sign in
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('Signed in:', userCredential.user);
                showSuccess('Welcome back!');
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard/';
                }, 1500);
            }
        } catch (error) {
            console.error('Auth error:', error);
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    });

    // Google Sign In
    googleSignIn.addEventListener('click', async function() {
        setLoading(true);
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google sign in:', result.user);
            showSuccess('Welcome!');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard/';
            }, 1500);
        } catch (error) {
            console.error('Google auth error:', error);
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    });

    // Error handling
    function handleAuthError(error) {
        let message = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'An account with this email already exists.';
                break;
            case 'auth/invalid-email':
                message = 'Please enter a valid email address.';
                break;
            case 'auth/weak-password':
                message = 'Password should be at least 6 characters long.';
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
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        
        if (loading) {
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            googleSignIn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
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
        
        // Insert after the form
        authForm.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showSuccess(message) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            color: var(--mint-primary);
            font-size: 0.875rem;
            margin-top: 1rem;
            text-align: center;
            font-weight: 500;
        `;
        
        // Insert after the form
        authForm.appendChild(successDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    // Check if user is already signed in
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed in:', user);
            // Redirect to dashboard if already signed in
            if (window.location.pathname.includes('/auth/')) {
                window.location.href = '/dashboard/';
            }
        } else {
            console.log('User is signed out');
        }
    });

    console.log('🔐 Auth system initialized');
}
