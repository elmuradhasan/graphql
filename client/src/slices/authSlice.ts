// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  userInfo: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logins(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    saveInfo(state) {
      return {
        ...state,
      };
    },
  },
});

export const { logins, logout } = authSlice.actions;
export default authSlice.reducer;
