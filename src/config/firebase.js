// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyB-OGrAiI2T9fxNNLLiB7RyIfydfeBqyM4",
//     authDomain: "vite-myfi.firebaseapp.com",
//     projectId: "vite-myfi",
//     storageBucket: "vite-myfi.appspot.com",
//     messagingSenderId: "863614229324",
//     appId: "1:863614229324:web:af56ce8769b89d3dd48de9",
//     measurementId: "G-H8TZSCRM8Z"
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASURMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();

console.log(analytics)