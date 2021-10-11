import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import { useAppSelector, useAppDispatch } from "../../app/store";
// import { uiConfig } from "../../config/initFirebase";
import { logIn } from "./authSlice";

export default function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then(function (accessToken) {
          console.log(accessToken);
        });
      }
      setIsSignedIn(!!user);
    });

    console.log("useEffect", firebase.auth);
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // custom hooks으로 만들면 될듯?
  const uiConfig: firebaseui.auth.Config = {
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
        dispatch(logIn({ isLogIn: false, user: authResult.credential.accessToken }));
        console.log(authResult.credential.accessToken);
        return false;
      },
    },
  };

  const history = useHistory();

  const { isLogIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logIn({ isLogIn: false, user: "user" }));
  }, []);

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <button
        type="button"
        onClick={() => {
          fetch("https://www.googleapis.com/calendar/v3/calendars/primary", {
            headers: {
              Authorization:
                "Bearer ya29.a0ARrdaM-GpCYFioY5ZBmtH-BsouEsGFPIrVjJK37abwwray2UaUgyXmWJi6mg4QGCBg20FkCbeGW3BgHH7mVQqvs1VJ6B9_4Gt9k4mNov8B-RESj-K5tU6DpLRfBeTCsFhNKtysgixkmU5aGPHCymhFSERgrxKA",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
            });
        }}
      >
        calendar
      </button>
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sign-out
      </button>
    </div>
  );
}
