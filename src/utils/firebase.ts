import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMwp10OaSqLTMVzCRRIdcGQPjjykpyyF0",
  authDomain: "trivify-b06c7.firebaseapp.com",
  projectId: "trivify-b06c7",
  storageBucket: "trivify-b06c7.appspot.com",
  messagingSenderId: "365689447775",
  appId: "1:365689447775:web:aef27cab27066609fa42ea",
  measurementId: "G-XV3S43BQZW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
