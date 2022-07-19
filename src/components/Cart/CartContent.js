import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const CartContent = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart?.map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          Shop some more!
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => dispatch(cartActions.clearCart())}
        >
          Clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.3rem 0.6rem;
    background: var(--clr-golden);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
    border-radius: 12px;

    transition: 0.25s ease-in-out all;

    &:hover {
      opacity: 0.8;
    }
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
