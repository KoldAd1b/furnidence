import React from "react";
import styled from "styled-components";
import logo from "../../assets/loqo.svg";

import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../../utils/constants";

import { uiActions } from "../../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import NavButtons from "./NavButtons";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => dispatch(uiActions.openSidebar())}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map(({ id, url, text }) => (
            <li key={id}>
              <Link to={url}>{text} </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link to="/checkout">Checkout </Link>
            </li>
          )}
        </ul>
        <NavButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;

  .logo {
    margin-top: 1rem;
  }
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-links {
      display: flex;
      align-items: center;
      margin: 0 1rem;

      height: 5rem;
      background-color: white;
    }
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: black;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
