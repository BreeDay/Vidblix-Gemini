// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//TODO Put keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyCsded2Mg3SoZP4V8TvW9PimccaC2cyrvc",
  authDomain: "vidblix-firebase.firebaseapp.com",
  projectId: "vidblix-firebase",
  storageBucket: "vidblix-firebase.appspot.com",
  messagingSenderId: "579803296387",
  appId: "1:579803296387:web:b2cab37e2e22541d5821b6",
  measurementId: "G-Q4QC86JKW9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, auth, db };
