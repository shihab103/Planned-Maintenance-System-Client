// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhwo3EoJb1EF90EIkvJJZCJQ58uCm_6xU",
  authDomain: "module-50-3515e.firebaseapp.com",
  projectId: "module-50-3515e",
  storageBucket: "module-50-3515e.firebasestorage.app",
  messagingSenderId: "78080792064",
  appId: "1:78080792064:web:95d72ae9c3a24091a46ae5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);