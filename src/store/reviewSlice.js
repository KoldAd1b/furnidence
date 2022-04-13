import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    editing: false,
    reviewToEdit: {},
    reviews: [],
    reviewModify: false,
  },
  reducers: {
    setEditing(state, action) {
      state.editing = action.payload;
    },
    setCurrentReview(state, action) {
      state.reviewToEdit = action.payload;
      state.editing = true;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setModify(state, action) {
      state.reviewModify = !state.reviewModify;
    },
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
