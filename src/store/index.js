import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import productReducer from "./productSlice";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import reviewReducer from "./reviewSlice";

const store = configureStore({
  reducer: {
    review: reviewReducer,
    UI: uiReducer,
    products: productReducer,
    filters: filterReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
