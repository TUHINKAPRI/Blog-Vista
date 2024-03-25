// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyC0DzlxaGzINzwBgOxyGFNKrOcyw4lLsPg" ,
  authDomain: "blogvista-a2dfa.firebaseapp.com",
  projectId: "blogvista-a2dfa",
  storageBucket: "blogvista-a2dfa.appspot.com",
  messagingSenderId: "876599135370",
  appId: "1:876599135370:web:c10ae5d97f7c19f26c7173"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);