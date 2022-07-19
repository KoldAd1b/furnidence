import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authActions";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { useSelector } from "react-redux";

const NavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link
        to="/cart"
        className="cart-btn"
        onClick={() => dispatch(uiActions.closeSidebar())}
      >
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalItems}</span>
        </span>
      </Link>
      {!user ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => navigate("/login-register")}
        >
          Register/Login <FaUserPlus />
        </button>
      ) : (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout <FaUserMinus />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;
  grid-column-gap: 1rem;

  .cart-btn {
    color: #fff;
    font-size: 1.25rem;
    letter-spacing: var(--spacing);
    display: flex;

    align-items: center;
    transition: all 0.25s ease-in;
    &:hover {
      opacity: 0.5;
    }
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--clr-silver);
    letter-spacing: var(--spacing);
    transition: all 0.25s ease-in;
    &:hover {
      color: var(--clr-grey-3);
    }
    svg {
      margin-left: 5px;
    }
  }
`;
export default NavButtons;
