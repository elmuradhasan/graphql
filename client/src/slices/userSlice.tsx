import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveInfo(
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { saveInfo } = userSlice.actions;
export default userSlice.reducer;
