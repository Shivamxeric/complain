import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZr96SaikVkHbIFD2IaHoIwulckhaUl5w",
  authDomain: "project-9d2e0.firebaseapp.com",
  projectId: "project-9d2e0",
  storageBucket: "project-9d2e0.firebasestorage.app",
  messagingSenderId: "855543473382",
  appId: "1:855543473382:web:99f6601a9375b821f70727",
  measurementId: "G-W311QFXP4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   