import axios from "axios";
import { productActions } from "./productSlice";
import { uiActions } from "./uiSlice";

export const api_products_full = "http://localhost:5000/api/v1/products";
export const api_products = "/api/v1/products";

export const api_single_product = "/api/v1/products/";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await axios.get(api_products);
      const products = response.data?.products;
      dispatch(productActions.setProducts(products));
      dispatch(productActions.setFeaturedProducts(products));
    } catch (err) {
      dispatch(uiActions.setError(true));
    }
    dispatch(uiActions.setLoading(false));
  };
};
export const getSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    dispatch(uiActions.setError(false));
    try {
      const response = await axios.get(`${api_single_product}${id}`);
      const product = response.data?.product;
      dispatch(productActions.setProductInView(product));
    } catch (err) {
      dispatch(uiActions.setError(true));
    }
    dispatch(uiActions.setLoading(false));
  };
};
