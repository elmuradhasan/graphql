// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import moviesReducer from "../slices/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
