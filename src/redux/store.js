import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./slices/AppSlice.js";

export default configureStore({
  reducer: {
    AppData: AppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
