import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, signInWithPopup,signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { firebaseConfig } from "./config.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


// const signInBut = () => {
//     const email = document.getElementById("email").value; 
//     const password = document.getElementById("password").value;

//     if ( password === "" || email === "") {
//         alert("Please fill in all fields");
//         return;
//     }

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log(user);
//             window.location.href = "dashboard.html";
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             alert("Invalid credentials. Please try again.");
//             console.log(errorCode);
//             console.log(errorMessage);
//         });
// }

const signInBut = () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check for empty fields
    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    // Check for valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check for minimum password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/user-not-found") {
                alert("No account found with this email.");
            } else if (errorCode === "auth/wrong-password") {
                alert("Incorrect password. Please try again.");
            } else if (errorCode === "auth/network-request-failed") {
                alert("Network error. Please check your connection.");
            } else {
                alert("Invalid credentials. Please try again.");
            }
            console.log(errorCode);
            console.log(errorMessage);
        });
}
const signInWithGoogle = () => {
    // alert("Sign Up Button Clicked");
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
            window.location.href = "dashboard.html";
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

        });

}
const signInWithGithub = () => {
    // alert("Sign Up Button Clicked");
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            // const user = result.user;
            console.log(result);
            
            window.location.href = "dashboard.html";

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

window.signInBut = signInBut;
window.signInWithGoogle = signInWithGoogle;
window.signInWithGithub = signInWithGithub; 