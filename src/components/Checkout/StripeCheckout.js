import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { uiActions } from "../../store/uiSlice";
import { useNavigate } from "react-router-dom";

const getOrderId = () => {
  const orderId = localStorage.getItem("orderId");
  return JSON.parse(orderId);
};

const removeOrderId = () => {
  localStorage.removeItem("orderId");
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const updateOrder = async (orderId) => {
      dispatch(uiActions.setLoading(true));
      try {
        const { data } = await axios.patch(`/api/v1/orders/${orderId}`, {
          paymentIntentId: searchParams.get("payment_intent"),
        });
        dispatch(
          uiActions.setModal({
            open: true,
            message: data.message,
          })
        );
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
      removeOrderId();
    };

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          updateOrder(getOrderId());
          dispatch(cartActions.clearCart());
          navigate("/");
          break;
        case "processing":
          dispatch(
            uiActions.setModal({
              open: true,
              message: "Your payment is processing.",
            })
          );
          break;
        case "requires_payment_method":
          dispatch(uiActions.setError(true));
          dispatch(
            uiActions.setModal({
              open: true,
              message: "Your payment was not successful, please try again.",
            })
          );
          break;
        default:
          dispatch(uiActions.setError(true));
          dispatch(
            uiActions.setModal({ open: true, message: "Something went wrong" })
          );

          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setSubmitted(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://furnidence.netlify.app/checkout",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setLoading(false);
  };

  const { totalPrice } = useSelector((state) => state.cart);

  return (
    <>
      {!submitted && (
        <article>
          <p>Your total is {formatPrice(totalPrice)}</p>
          <p>Test Card Number: 4242 4242 4242 4242</p>
          <p>Enter a valid expiry date such as : 34/12</p>
          <p>Enter any valid three digit CVC</p>
          <p style={{ textAlign: "center" }}>
            (Note this will not work with adblock on)
          </p>
        </article>
      )}

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: hsl(22, 28%, 29%);
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;

export default StripeCheckout;
