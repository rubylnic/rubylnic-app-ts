// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn_kU1N3P2JL9Tkxya3l7LAzMvwhW_br8",
    authDomain: "rubylnic-84cff.firebaseapp.com",
    projectId: "rubylnic-84cff",
    storageBucket: "rubylnic-84cff.appspot.com",
    messagingSenderId: "648033555601",
    appId: "1:648033555601:web:eb034e655ee8152b47db30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);