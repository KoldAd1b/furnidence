import React from "react";
import styled from "styled-components";
import logo from "../../assets/loqo.svg";
import { Link } from "react-router-dom";
import {
  BsEnvelopeFill,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

const Footer = () => {
  return (
    <Wrapper>
      <div className="row">
        <div className="col">
          <img src={logo} className="logo" alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magni
            voluptates dolorum quod, recusandae quisquam delectus fuga. Magni,
            recusandae culpa?
          </p>
        </div>
        <div className="col">
          <h3 style={{ color: "black" }}>
            Office{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>Dhaka</p>
          <p>ShabujBag</p>

          <p className="email">ahnafadib7546@gmail.com</p>
          <h4 className="mobile">+880-0123456789</h4>
        </div>
        <div className="col">
          <h3>
            Links{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout"></Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Newsletter{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <form
            action="
          "
          >
            <BsEnvelopeFill style={{ marginRight: "10px", fontSize: `2rem` }} />
            <input
              type="email"
              className="form-input"
              placeholder="Your Email"
              name="email"
            />
            <button type="submit" className="submit-btn">
              <AiOutlineArrowRight
                style={{ fontSize: `1.5rem`, color: "#fff" }}
              />
            </button>
          </form>
          <div className="socials">
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsPinterest />
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">
        Furnidence &copy; {new Date().getFullYear()} - All Rights Reserved
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background: rgb(255, 255, 255);
  color: white;

  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 50%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  width: 100vw;
  margin-bottom: 0;
  border-top-left-radius: 125px;
  font-size: 13px;
  line-height: 20px;

  .row {
    width: 85%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  .col {
    flex-basis: 25%;
    padding: 10px;

    &:nth-child(2),
    &:nth-child(3) {
      flex-basis: 15%;
    }
  }
  .mobile {
    color: var(--clr-golden);
    font-size: 1rem;
  }

  .logo {
    width: 80px;
    margin-bottom: 30px;
  }
  .col h3 {
    width: fit-content;
    margin-bottom: 40px;
    position: relative;
  }
  .email {
    width: fit-content;
    border-bottom: 1px solid #ccc;
  }
  form {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 50px;

    input {
      width: 100%;
      background: transparent;
      color: var(--clr-grey);
      border: 0;
      outline: none;
    }
    button {
      background: transparent;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  }
  .socials {
    & > * {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;

      margin-right: 15px;
    }
  }
  hr {
    width: 90%;
    border: 0;
    border-bottom: 1px solid #ccc;
    margin: 20px auto;
  }
  .copyright {
    text-align: center;
    color: var(--clr-golden);
  }

  .underline {
    width: 100%;
    height: 5px;
    background: #767676;
    border-radius: 3px;
    position: absolute;
    top: 35px;
    left: 0;
    overflow: hidden;
    span {
      width: 15px;
      height: 100%;
      background: white;
      border-radius: 3px;
      position: absolute;
      top: 0;
      left: 10px;
      animation: indigo 2s linear infinite;
    }
  }

  ul li a {
    color: var(--clr-grey);
  }
  p {
    margin: 0;
  }

  @media (max-width: 700px) {
    & {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 35%,
        rgba(0, 0, 0, 1) 35%,
        rgba(0, 0, 0, 1) 100%
      );
    }
    .col {
      flex-basis: 100%;

      &:nth-child(2),
      &:nth-child(3) {
        flex-basis: 100%;
      }
    }
  }
  @keyframes indigo {
    0% {
      left: -20px;
    }
    100% {
      left: 100%;
    }
  }
`;

export default Footer;
