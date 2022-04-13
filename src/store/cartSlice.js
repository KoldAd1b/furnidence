import { createSlice } from "@reduxjs/toolkit";

const getCart = () => {
  let cart = localStorage.getItem("cart");

  if (cart) return JSON.parse(cart);
  return [];
};

// NOTE - initializing a state by local storage should always be done here
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: getCart(),
    totalItems: 0,
    totalPrice: 0,
    shippingFee: 420,
    tax: 0,
  },
  reducers: {
    addToCart(state, action) {
      const { _id, variant, amount, product } = action.payload;
      const item = state.cart.find(
        (item) => item._id === _id && item.variant === variant
      );
      if (item) {
        const itemIndex = state.cart.findIndex(
          (item) => item._id === _id && item.variant === variant
        );
        let newAmount = amount + item.amount;
        if (newAmount > item.stock) {
          newAmount = item.limitTo;
        }
        item.amount = newAmount;
        state.cart[itemIndex] = item;
      } else {
        const newCartItem = {
          _id,
          name: product.name,
          variant,
          amount,
          image: product.images[0].url,
          price: product.price,
          limitTo: product.stock,
        };
        state.cart.push(newCartItem);
      }
    },
    removeItem(state, action) {
      const { _id, variant } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item._id === _id && item.variant === variant
      );
      state.cart.splice(itemIndex, 1);
    },
    changeAmount(state, action) {
      const { _id, variant, type } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item._id === _id && item.variant === variant
      );
      const item = state.cart[itemIndex];

      if (type === "increase") {
        if (item.amount + 1 > item.stock) return;
        item.amount += 1;
      } else if (type === "decrease") {
        if (item.amount - 1 < 0) return;
        state.cart.filter((_, i) => i === itemIndex);
        item.amount -= 1;
        state.cart[itemIndex] = item;
      }
    },
    clearCart(state, action) {
      state.cart = [];
    },
    calcCartTotals(state, action) {
      const { totalItems, totalPrice } = state.cart.reduce(
        (acc, item) => {
          const { price, amount } = item;

          acc.totalItems += amount;
          acc.totalPrice += price * amount;
          return acc;
        },
        { totalItems: 0, totalPrice: 0 }
      );
      state.totalPrice = totalPrice;
      state.totalItems = totalItems;
      state.tax = Math.round(0.025 * totalPrice);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
