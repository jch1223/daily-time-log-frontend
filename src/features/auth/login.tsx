import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useQuery } from "react-query";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { logIn, setGoogleAccessToken } from "./authSlice";
import { getSchedules } from "../../utils/api/schedules";

export default function Login() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const dispatch = useAppDispatch();
  const result = useQuery<any[], Error>("schedules", () => getSchedules(googleAccessToken), {
    enabled: !!googleAccessToken,
  });

  console.log(result);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((accessToken) => {
          dispatch(
            logIn({
              isLogIn: !!user,
              name: user.displayName,
              email: user.email,
              googleAccessToken: localStorage.getItem("googleAccessToken") || "",
              firebaseAccessToken: accessToken,
            }),
          );
        });
      }
    });

    return () => unregisterAuthObserver();
  }, []);

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
          access_type: "offline",
        },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        console.log("✅", authResult);

        const googleAccessToken = authResult.credential.accessToken;

        localStorage.setItem("googleAccessToken", googleAccessToken);
        dispatch(setGoogleAccessToken(googleAccessToken));

        return false;
      },
    },
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sign-out
      </button>
    </div>
  );
}
