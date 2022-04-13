import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const AddToCart = ({ product }) => {
  const { _id, stock, variants } = product;

  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState(variants[0]);

  const [amount, setAmount] = useState(1);

  const handleAmount = (type) => {
    if (type === "increase") {
      if (amount === stock) return setAmount((prev) => prev);
      setAmount((prev) => prev + 1);
    } else if (type === "decrease") {
      if (amount === 1) return setAmount(1);
      setAmount((prev) => prev - 1);
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>Variants :</span>
        <div>
          {variants.map((el, i) => (
            <button
              key={i}
              className={`${
                activeColor === el ? "color-btn active" : "color-btn"
              } `}
              style={{ background: el }}
              onClick={() => setActiveColor(el)}
            >
              {" "}
              {activeColor === el ? <FaCheck /> : null}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} handleAmount={handleAmount} />
        <Link
          to="/cart"
          className="btn"
          onClick={() =>
            dispatch(
              cartActions.addToCart({
                _id,
                variant: activeColor,
                amount,
                product,
              })
            )
          }
        >
          Add to Cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
