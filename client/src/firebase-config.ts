import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyALMViDbvGFp6tlU9JaF3H2QnEs0_tqnng",
   authDomain: "school-9c7f7.firebaseapp.com",
   projectId: "school-9c7f7",
   storageBucket: "school-9c7f7.appspot.com",
   messagingSenderId: "741293022698",
   appId: "1:741293022698:web:fffb59b65e86af47b16693",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
