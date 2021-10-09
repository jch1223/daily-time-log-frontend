import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface LoginState {
  isLogIn: null | boolean;
  user: null | string;
}

const initialState: LoginState = {
  isLogIn: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginState>) => {
      const { isLogIn, user } = action.payload;

      state.isLogIn = isLogIn;
      state.user = user;
    },
  },
});

export const { logIn } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
