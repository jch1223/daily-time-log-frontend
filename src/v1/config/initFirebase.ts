import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "daily-time-log-54e12.firebaseapp.com",
  projectId: "daily-time-log-54e12",
  storageBucket: "daily-time-log-54e12.appspot.com",
  messagingSenderId: "154339068142",
  appId: "1:154339068142:web:d03076f8814a392e874bff",
  measurementId: "G-D73ZJV52LX",
};

firebase.initializeApp(firebaseConfig);
