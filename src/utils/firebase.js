// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxXJ0HfWc3x7UWpkl7Ed7hCXErlR2IkrE",
  authDomain: "tastebite-845af.firebaseapp.com",
  projectId: "tastebite-845af",
  storageBucket: "tastebite-845af.appspot.com",
  messagingSenderId: "432883088965",
  appId: "1:432883088965:web:f383c073c75bb9f7cf6d2c",
  measurementId: "G-P5LWCQ6859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)
export const auth = getAuth(app)
//export const db = getFirestore(app)
const firestore = getFirestore(app)
export { firestore }
