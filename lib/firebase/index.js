// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMCAoOreuw3R0CA-jfZs_A9hevsb6kUpg",
  authDomain: "finance-tracker-7bb86.firebaseapp.com",
  projectId: "finance-tracker-7bb86",
  storageBucket: "finance-tracker-7bb86.firebasestorage.app",
  messagingSenderId: "1045375780793",
  appId: "1:1045375780793:web:0e1ea591886a4510775868",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, app, auth };
