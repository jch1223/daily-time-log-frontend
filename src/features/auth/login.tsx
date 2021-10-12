import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useQuery } from "react-query";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { logIn, logOut, setGoogleAccessToken } from "./authSlice";
import { getSchedules } from "../../utils/api/schedules";

export default function Login() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const dispatch = useAppDispatch();
  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>(
    ["schedules", googleAccessToken],
    () => getSchedules(googleAccessToken),
    {
      enabled: !!googleAccessToken,
      retry: false,
    },
  );
  console.log(data);

  if (isError) {
    firebase.auth().signOut();
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return user.getIdToken().then((accessToken) => {
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

      return dispatch(logOut());
    });

    return () => unregisterAuthObserver();
  }, []);

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
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
      {!isLogIn && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
      {isLogIn && (
        <button type="button" onClick={() => firebase.auth().signOut()}>
          Sign-out
        </button>
      )}
    </div>
  );
}
