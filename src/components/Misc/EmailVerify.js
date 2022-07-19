import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EmailVerify = () => {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <Container>
        <Link to="/user/verify-email" onClick={() => setOpen(false)}>
          Click here to verify your email
        </Link>
        <p>(Please refresh the page if you have already done so)</p>
        <button className="btn" type="button" onClick={() => setOpen(false)}>
          &times;
        </button>
      </Container>
    )
  );
};
const Container = styled.div`
  z-index: 2;
  position: absolute;
  text-align: center;

  background: rgb(241, 241, 241);
  background: linear-gradient(
    90deg,
    rgba(241, 241, 241, 1) 0%,
    rgba(208, 206, 197, 1) 100%
  );
  padding: 1rem 2rem;

  top: 7.5rem;
  left: 50%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  border-radius: 20px;
  animation: reveal 0.75s ease-in-out forwards;

  p {
    opacity: 0.5;
  }

  button {
    margin-top: 1rem;
    font-size: 1.5rem;
    padding: 1rem;
    color: crimson;
  }

  a {
    color: var(--clr-golden);
    font-size: 1.2rem;
    letter-spacing: 1.5px;
    transition: all 0.3s ease-in;
    &:hover {
      color: black;
      transform: skew(20deg);
    }
  }
  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(-200px);
    }
    100% {
      opacity: 1;
    }
  }
`;

export default EmailVerify;
