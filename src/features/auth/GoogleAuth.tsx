import React from "react";

import { useAppSelector } from "../../app/store";
import Button from "../../components/Button";

import useGoogleAuth from "../../utils/hooks/useGoogleAuth";

function GoogleAuth() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const { googleAuth } = useGoogleAuth();

  const handleAuthClick = () => {
    googleAuth.current.signIn();
  };

  const handleSignOutClick = () => {
    googleAuth.current.signOut();
  };

  return (
    <>
      {!isLoading && (
        <Button
          color={isLogIn ? "pink" : "blue"}
          size="medium"
          onClick={isLogIn ? handleSignOutClick : handleAuthClick}
        >
          {isLogIn ? "Log Out" : "Log In"}
        </Button>
      )}
    </>
  );
}

export default GoogleAuth;
