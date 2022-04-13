import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isVerified: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
    setVerifiedUser(state, action) {
      state.isVerified = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
