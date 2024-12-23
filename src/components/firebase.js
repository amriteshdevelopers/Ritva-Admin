// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfZ2fmbjcMuolpqcwpdJdTpYpi6xmh1gg",
  authDomain: "ritvabuild.firebaseapp.com",
  projectId: "ritvabuild",
  storageBucket: "ritvabuild.firebasestorage.app",
  messagingSenderId: "141966840552",
  appId: "1:141966840552:web:493aab88f9d9b768b0af5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;