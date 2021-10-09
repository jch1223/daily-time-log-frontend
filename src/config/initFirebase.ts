import firebase from "firebase/app";
import "firebase/auth";
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

export const uiConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInSuccessUrl: "/signedIn",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
      requireDisplayName: true,
      customParameters: {
        prompt: "select_account",
        auth_type: "reauthenticate",
      },
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      console.log(authResult.credential.accessToken);
      return false;
    },
  },
};
