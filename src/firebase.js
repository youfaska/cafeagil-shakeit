import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import "firebase/auth";
import "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCisSF_Sb5cQZ0rG0PxXK5z_z5pmmZY0Bc",
    authDomain: "my-cafeagil-shakeit-app.firebaseapp.com",
    projectId: "my-cafeagil-shakeit-app",
    storageBucket: "my-cafeagil-shakeit-app.appspot.com",
    messagingSenderId: "71906563341",
    appId: "1:71906563341:web:3f5d7a0cb55ac79d9a0c44",
    measurementId: "G-PFG7ZT2D78"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //initilize our varibles
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth ,storage};
