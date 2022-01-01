import { useEffect, useRef } from "react";
import { apiKey, clientId, scopes } from "../../config/google";
import { useAppDispatch } from "../../app/store";
import { logIn, logOut } from "../../features/auth/authSlice";

function useGoogleAuth() {
  const googleAuth = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initClient = async () => {
      await window.gapi.client.init({
        apiKey,
        clientId,
        scope: scopes,
      });

      googleAuth.current = window.gapi.auth2.getAuthInstance();
      googleAuth.current.isSignedIn.listen(updateSignInStatus);

      updateSignInStatus(googleAuth.current.isSignedIn.get());
    };

    const updateSignInStatus = async (isSignedIn: boolean) => {
      if (isSignedIn) {
        const userData = googleAuth.current.currentUser.get();
        const basicProfile = userData.getBasicProfile();
        const authResponse = userData.getAuthResponse(true);

        dispatch(
          logIn({
            isLogIn: true,
            isLoading: false,
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            googleAccessToken: authResponse.access_token,
          }),
        );
      } else {
        dispatch(logOut());
      }
    };

    window.gapi.load("client:auth2", initClient);
  }, []);

  return { googleAuth };
}

export default useGoogleAuth;
