// Import the functions you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1lauk3CPIEl-M0ckTOujlopkEsFlXnEs",
  authDomain: "greenhouse-90ba3.firebaseapp.com",
  databaseURL: "https://greenhouse-90ba3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "greenhouse-90ba3",
  storageBucket: "greenhouse-90ba3.appspot.com",
  messagingSenderId: "228669378679",
  appId: "1:228669378679:web:19d5b2cf958dde9e55f672",
  measurementId: "G-1SQVNQTBC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database & Authentication
export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;