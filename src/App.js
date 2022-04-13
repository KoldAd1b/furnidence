import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import Modal from "./components/Modal";
import {
  Home,
  Checkout,
  PrivateRoute,
  Cart,
  Products,
  SingeProduct,
  Error,
  About,
  RegisterLogin,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { getUser } from "./store/authActions";
import { cartActions } from "./store/cartSlice";
import { getProducts } from "./store/productActions";

// use netlify-cli (this package) during deployment
function App() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(cartActions.calcCartTotals());
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Navbar />
      <Sidebar />

      <Modal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        v
        <Route path="/products/:id" element={<SingeProduct />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="/login-register" element={<RegisterLogin />} />
        <Route
          path="/user/verify-email"
          element={
            <PrivateRoute>
              <VerifyEmail />
            </PrivateRoute>
          }
        />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
