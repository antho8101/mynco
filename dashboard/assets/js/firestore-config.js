// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxi77BKXC7A9WQdVVQygNtGYz1Pi9WMwc",
    authDomain: "mynco-b9502.firebaseapp.com",
    projectId: "mynco-b9502",
    storageBucket: "mynco-b9502.firebasestorage.app",
    messagingSenderId: "108095370255",
    appId: "1:108095370255:web:c618d0ddf3ed6106dd5f7a",
    measurementId: "G-CN00G7DGMK"
};

// Initialize Firebase
console.log('🔥 Initializing Firebase...');
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
console.log('🔐 Initializing Firebase Auth...');
const auth = getAuth(app);

// Initialize Analytics
console.log('📊 Initializing Firebase Analytics...');
const analytics = getAnalytics(app);

// Global sign out function
window.signOutUser = async function() {
    try {
        console.log('🚪 Signing out user...');
        await signOut(auth);
        console.log('✅ User signed out successfully');
        
        // Redirect to landing page
        window.location.href = '/';
    } catch (error) {
        console.error('❌ Error signing out:', error);
        alert('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
};

// Make auth available globally
window.firebaseAuth = auth;
window.firebaseApp = app;
window.firebaseAnalytics = analytics;

console.log('✅ Firebase initialized successfully');
console.log('✅ Firebase Auth available globally as window.firebaseAuth');
console.log('✅ Sign out function available as window.signOutUser');

// Export for module usage
export { auth, app, analytics, signOut };
