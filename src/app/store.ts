import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import schedulesReducer from "../features/schedules/schedulesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    schedules: schedulesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return process.env.REACT_APP_NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware();
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
