import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLogIn: boolean;
  name: string;
  email: string;
  googleAccessToken: string;
  firebaseAccessToken: string;
}

const initialState: LoginState = {
  isLogIn: false,
  name: "",
  email: "",
  googleAccessToken: "",
  firebaseAccessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginState>) => {
      const { isLogIn, name, email, googleAccessToken, firebaseAccessToken } = action.payload;

      state.isLogIn = isLogIn;
      state.name = name;
      state.email = email;
      state.googleAccessToken = googleAccessToken;
      state.firebaseAccessToken = firebaseAccessToken;
    },
    logOut: (state) => {
      state.isLogIn = false;
      state.name = "";
      state.email = "";
      state.googleAccessToken = "";
      state.firebaseAccessToken = "";
    },
    setGoogleAccessToken: (state, action: PayloadAction<string>) => {
      state.googleAccessToken = action.payload;
    },
  },
});

export const { logIn, logOut, setGoogleAccessToken } = authSlice.actions;

export default authSlice.reducer;
