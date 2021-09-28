import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//the env variables will be encrypted after deployment
//process.env doesn't work
const firebaseConfig = {
    apiKey: "AIzaSyD93_HSlgjtu1I5wp5eFqvYG3yq0XPBHcY",
    authDomain: "prova-tackpay.firebaseapp.com",
    projectId: "prova-tackpay",
    storageBucket: "prova-tackpay.appspot.com",
    messagingSenderId: "594098416275",
    appId: "1:594098416275:web:69ecea855d20500eaa7b66",
    measurementId: "G-4QDGGHYHCM"
  };
//initialize firebase app
initializeApp(firebaseConfig);

// initialize firestore database
const db = getFirestore();


export default db;