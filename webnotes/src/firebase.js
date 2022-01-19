import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4W4wdIQS3S72g7-3tpp2alm6WfDF9y5A",
  authDomain: "webnotes-13034.firebaseapp.com",
  projectId: "webnotes-13034",
  storageBucket: "webnotes-13034.appspot.com",
  messagingSenderId: "349308509647",
  appId: "1:349308509647:web:c0cb74a7528359bdc8c6ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

// sign up
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// sign in

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

//   sign out

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
