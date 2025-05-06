// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRIRxO7Pe8Z3kyp8ndzI2jaRdNo2giWhc",
  authDomain: "blog-app-82aa4.firebaseapp.com",
  projectId: "blog-app-82aa4",
  storageBucket: "blog-app-82aa4.firebasestorage.app",
  messagingSenderId: "734831352910",
  appId: "1:734831352910:web:97d458710e630a2e66b71f",
  measurementId: "G-39LLE7N68F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth
const provider = new GoogleAuthProvider()

const auth = getAuth()
export const authWithGoogle = async() => {

    let user = null
    
    await signInWithPopup(auth,provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => console.log(err)
)

    return user
}
