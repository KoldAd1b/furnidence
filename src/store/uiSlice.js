import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    sidebarOpen: false,
    loading: false,
    error: false,
    modalInfo: { open: false, message: "" },
  },
  reducers: {
    openSidebar(state, action) {
      state.sidebarOpen = true;
    },
    closeSidebar(state, action) {
      state.sidebarOpen = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setModal(state, action) {
      state.modalInfo = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
