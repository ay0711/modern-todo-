// Select elements
const form = document.querySelector('.form');
const usernameInput = document.querySelector('input[placeholder="Username"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const forgotPasswordLink = document.querySelector('.page-link-label');
const signUpLink = document.querySelector('.sign-up-link a');
const appleLoginButton = document.querySelector('.apple-login-button');
const googleLoginButton = document.querySelector('.google-login-button');
const githubLoginButton = document.querySelector('.github-login-button'); 

// Form submission handler
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate login process
    alert(`Welcome back, ${username}!`);
});

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Forgot password link handler
forgotPasswordLink.addEventListener('click', () => {
    alert('Redirecting to the password recovery page...');
    // Simulate redirection
    window.location.href = 'forgot-password.html'; // Replace with your actual URL
});

// Sign-up link handler
signUpLink.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Redirecting to the sign-up page...');
    window.location.href = 'index.html'; // Replace with your actual URL
});

// Apple login button handler
appleLoginButton.addEventListener('click', () => {
    alert('Logging in with Apple...');
    // Simulate Apple login process
});

// Google login button handler
googleLoginButton.addEventListener('click', () => {
    alert('Logging in with Google...');
    // Simulate Google login process
});

// GitHub login button handler
githubLoginButton.addEventListener('click', () => {
    alert('Logging in with GitHub...');
    // Simulate GitHub login process
});