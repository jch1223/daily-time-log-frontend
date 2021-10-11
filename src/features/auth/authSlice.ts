import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export default authSlice.reducer;
