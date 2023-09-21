// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbBd95xeAiArq4sVCi5Zb9dUnKchycarg",
  authDomain: "viewz-745c4.firebaseapp.com",
  projectId: "viewz-745c4",
  storageBucket: "viewz-745c4.appspot.com",
  messagingSenderId: "345583287869",
  appId: "1:345583287869:web:1fc34764b6c841c4e07454",
  measurementId: "G-C7Z445PPLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
