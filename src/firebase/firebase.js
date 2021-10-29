import firebase from 'firebase/app';
import 'firebase/storage';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2DnoV_saui1dx6CQBHKoobohpm5CMfDw",
  authDomain: "image-compressor-d69c7.firebaseapp.com",
  databaseURL: "https://image-compressor-d69c7-default-rtdb.firebaseio.com",
  projectId: "image-compressor-d69c7",
  storageBucket: "image-compressor-d69c7.appspot.com",
  messagingSenderId: "855347403679",
  appId: "1:855347403679:web:a89dbd8cb50deadb1b7baa"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


export  {
    storage, firebase as default
  }
 
  