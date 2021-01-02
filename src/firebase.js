import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import "firebase/auth";
import "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAca_qLN7A-x3XSTFkjucgIMshnfj73GLM",
    authDomain: "metricasagile.firebaseapp.com",
    databaseURL: "https://metricasagile.firebaseio.com",
    projectId: "metricasagile",
    storageBucket: "metricasagile.appspot.com",
    messagingSenderId: "1040646503081",
    appId: "1:1040646503081:web:9f2884481e4b3e763f87b8",
    measurementId: "G-Q0K4MCHFQD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //initilize our varibles
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth ,storage};
