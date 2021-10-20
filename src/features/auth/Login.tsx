import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useQuery } from "react-query";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { logIn, logOut, setGoogleAccessToken, setUserId } from "./authSlice";
import { addGoogleSchedules } from "../schedules/schedulesSlice";
import { getSchedules } from "../../utils/api/schedules";
import { createUser } from "../../utils/api/user";

export default function Login() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const email = useAppSelector((state) => state.auth.email);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const dispatch = useAppDispatch();

  const { data: signUpData, isSuccess: signUpIsSuccess } = useQuery<any, Error>(
    ["user", googleAccessToken, email],
    () => createUser(googleAccessToken, email),
    {
      enabled: isLogIn && !!googleAccessToken,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  const {
    data: googleSchedulesData,
    isError: googleSchedulesIsError,
    isSuccess: googleSchedulesIsSuccess,
  } = useQuery<any, Error>(
    ["schedules", googleAccessToken],
    () => getSchedules(googleAccessToken),
    {
      enabled: !!googleAccessToken,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return dispatch(logOut());
      }

      const accessToken = await user.getIdToken();

      return dispatch(
        logIn({
          isLogIn: !!user,
          name: user.displayName || "",
          email: user.email || "",
          googleAccessToken: localStorage.getItem("googleAccessToken") || "",
          firebaseAccessToken: accessToken,
        }),
      );
    });

    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (signUpIsSuccess) {
      const { userId } = signUpData.data;

      localStorage.setItem("userId", userId);
      dispatch(setUserId(userId));
    }
  }, [signUpIsSuccess]);

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
        const googleAccessToken = authResult.credential.accessToken;

        localStorage.setItem("googleAccessToken", googleAccessToken);
        dispatch(setGoogleAccessToken(googleAccessToken));

        return false;
      },
    },
  };

  if (googleSchedulesIsError) {
    firebase.auth().signOut();
  }

  if (googleSchedulesIsSuccess) {
    dispatch(addGoogleSchedules(googleSchedulesData.items));
  }

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
