import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

export default configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => {
    return process.env.REACT_APP_NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware();
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});
