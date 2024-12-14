// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logins(state) {
      state.isLoggedIn = true;
      localStorage.setItem("token", "dummy-token");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { logins, logout } = authSlice.actions;
export default authSlice.reducer;
