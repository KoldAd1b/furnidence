import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    productInView: {},
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setFeaturedProducts(state, action) {
      state.featuredProducts = action.payload.filter(
        (product) => product.featured === true
      );
    },
    setProductInView(state, action) {
      state.productInView = action.payload;
    },
  },
});

export const productActions = productsSlice.actions;
export default productsSlice.reducer;
