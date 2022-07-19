import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading, PageHero, StripeCheckout } from "../components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";

const setOrderId = (orderId) => {
  localStorage.setItem("orderId", JSON.stringify(orderId));
};
const getOrderId = () => {
  const orderId = localStorage.getItem("orderId");
  return JSON.parse(orderId);
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const cartState = useSelector((state) => state.cart);
  const { cart, tax, shippingFee } = cartState;
  const [clientSecret, setClientSecret] = useState("");
  const [hasRedirected, setHasRedirected] = useState(false);
  const { loading } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const cartIsEmpty = cart?.length < 1;

  useEffect(() => {
    const redirectSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (redirectSecret) setHasRedirected(true);
  }, []);

  useEffect(() => {
    if (hasRedirected) {
      const getOrder = async (orderId) => {
        dispatch(uiActions.setLoading(true));
        try {
          const { data } = await axios.get(`/api/v1/orders/${orderId}`);
          console.log(data);
          setClientSecret(data.order.clientSecret);
        } catch (err) {
          dispatch(uiActions.setError(true));
          dispatch(
            uiActions.setModal({
              open: true,
              message: err.response.data.message,
            })
          );
        }
        dispatch(uiActions.setLoading(false));
      };
      getOrder(getOrderId());
    }
    // eslint-disable-next-line
  }, [hasRedirected]);

  // Store orderId in localStorage as sooon as the page renders
  // After that, if the user redirects then check hasRedirected===true and then send an update order request with the id on success in the checkout form
  // Using that client secret will load the checkout form,
  // After completion of the action, remove orderId from localStorage
  // Manage state on the checkoutform to not render the form if the payment is succesfull since we only want to render the modal
  useEffect(() => {
    if (cartIsEmpty) return;
    if (hasRedirected) return;
    const createOrder = async () => {
      dispatch(uiActions.setLoading(true));
      try {
        const { data } = await axios.post("/api/v1/orders", {
          items: cart,
          tax,
          shippingFee,
        });
        setClientSecret(data.clientSecret);
        setOrderId(data.order._id);
      } catch (err) {
        console.log(err);
        dispatch(uiActions.setError(true));
        dispatch(
          uiActions.setModal({ open: true, message: err.response.data.message })
        );
      }
      dispatch(uiActions.setLoading(false));
    };
    if (!tax || !shippingFee) return;
    createOrder();
    // eslint-disable-next-line
  }, [cartState]);

  const appearance = {
    theme: "flat",
    variables: {
      colorPrimary: "#ab7a5f",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#FAA0A0",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (loading) return <Loading />;

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cartIsEmpty && !hasRedirected ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              Shop
            </Link>
          </div>
        ) : (
          clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <StripeCheckout />
            </Elements>
          )
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
