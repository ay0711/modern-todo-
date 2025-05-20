  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { firebaseConfig } from "./config.js";


  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const signUpBut = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "" || username === "") {
        alert("Please fill in all fields");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 3000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}


const signInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
            window.location.href = "dashboard.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

        });

}
const signInWithGithub = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            console.log(result);
            window.location.href = "dashboard.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

window.signUpBut = signUpBut;
window.signInWithGoogle = signInWithGoogle;
window.signInWithGithub = signInWithGithub; 