import { createSlice } from "@reduxjs/toolkit";

const filterState = {
  text: "",
  brand: "all",
  category: "all",
  color: "all",
  minPrice: 0,
  maxPrice: 0,
  price: 0,
  shipping: false,
};
const filterSlice = createSlice({
  name: "filters",
  initialState: {
    modifiedProducts: [],
    allProducts: [],
    view: "grid",
    filters: filterState,
  },
  reducers: {
    setAllProducts(state, action) {
      const prices = action.payload.map((el) => el.price);
      let maxPrice = Math.max(...prices);
      let minPrice = Math.min(...prices);

      state.filters.maxPrice = maxPrice;
      state.filters.minPrice = minPrice;
      state.filters.price = maxPrice;

      state.allProducts = action.payload;
      state.modifiedProducts = action.payload;
    },
    setFilters(state, action) {
      const { name, value } = action.payload;

      state.filters[name] = value;
    },
    executeFilters(state, action) {
      const { text, brand, category, color, price, shipping } = state.filters;

      state.modifiedProducts = state.allProducts
        .filter((product) => {
          if (text)
            return product.name.toLowerCase().startsWith(text.toLowerCase());
          return true;
        })
        .filter((product) => {
          if (brand === "all") return true;
          return product.brand === brand;
        })
        .filter((product) => {
          if (category === "all") return true;
          return product.category === category;
        })
        .filter((product) => {
          if (color === "all") return true;
          return product.variants.includes(color);
        })
        .filter((product) => {
          if (price === 0) return true;
          return product.price <= price;
        })
        .filter((product) => {
          if (shipping === false) return true;
          return product.shipping === shipping;
        });
    },
    clearFilters(state, action) {
      state.filters = {
        ...filterState,
        price: state.filters.maxPrice,
        maxPrice: state.filters.maxPrice,
        minPrice: state.filters.minPrice,
      };
    },
    changeView(state, action) {
      if (state.view === action.payload) return;
      else state.view = action.payload;
    },
    sortProducts(state, action) {
      const { payload } = action;

      if (payload === "Low to high (price)") {
        state.modifiedProducts.sort((a, b) => a.price - b.price);
      }
      if (payload === "High to low (price)") {
        state.modifiedProducts.sort((a, b) => b.price - a.price);
      }
      if (payload === "Name A-Z") {
        state.modifiedProducts.sort(({ name: a }, { name: b }) => {
          let x = a.toUpperCase(),
            y = b.toUpperCase();
          return x === y ? 0 : x > y ? 1 : -1;
        });
      }
      if (payload === "Name Z-A") {
        state.modifiedProducts.sort(({ name: a }, { name: b }) => {
          let x = a.toUpperCase(),
            y = b.toUpperCase();
          return x === y ? 0 : x > y ? -1 : 1;
          //   Can use .localeCompare()
        });
      }
    },
  },
});

// <option value="Low to high (price)">Low to high (price)</option>
// <option value="High to low (price)">High to Low (price)</option>
// <option value="Name A-Z">Name A-Z</option>
// <option value="Name Z-A">Name Z-A</option>

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
