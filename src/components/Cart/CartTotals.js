import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartTotals = () => {
  const { totalPrice, shippingFee, tax } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal : <span>{formatPrice(totalPrice)}</span>
          </h5>
          <p>
            Shipping fee: <span>{formatPrice(shippingFee)}</span>
          </p>
          <p>
            Tax : <span>{formatPrice(tax)}</span>
          </p>
          <hr />
          <h4>
            Order total:{" "}
            <span>{formatPrice(totalPrice + shippingFee + tax)}</span>
          </h4>
        </article>
        {user ? (
          <Link to={`/checkout`} className="btn">
            Checkout
          </Link>
        ) : (
          <button className="btn" onClick={() => navigate("/user/login")}>
            Login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
