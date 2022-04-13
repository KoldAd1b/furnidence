import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import WaveSvg from "../../components/WaveSvg";
import { BsEnvelopeFill } from "react-icons/bs";
import { getUser, sendVerifyEmail, verifyEmail } from "../../store/authActions";
import { validateEmail } from "../../utils/validators";
import styled from "styled-components";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { user, isVerified } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { loading } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVerified) {
      navigate("/");
    }
    if (!user) return;
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (token && email) {
      dispatch(verifyEmail(email, token));
      dispatch(getUser());
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidEmail = validateEmail(email);

    if (!invalidEmail) {
      dispatch(sendVerifyEmail(email));
    }
    setError(invalidEmail);
  };

  if (loading) return <Loading />;
  return (
    <Container>
      <div className="waves">
        <WaveSvg />
      </div>
      <form className="email-form" onSubmit={handleSubmit}>
        <h2 className="title">Enter your email</h2>
        <div className="input-field">
          <BsEnvelopeFill />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {error && <p className="error-text">*{error}</p>}
        <input type="submit" value="Enter" className="btn solid" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;

  .error-text {
    text-align: left;
    font-size: 1rem;
    color: orangered;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-column: 1/2;
    grid-row: 1/2;
    padding: 0 5rem;

    @media (max-width: 580px) {
      padding: 0 1.5rem;
    }

    &.email-form {
      z-index: 2;

      @media (max-width: 870px) {
        margin-top: 15%;
      }
      @media (max-width: 580px) {
        margin-top: 30%;
      }
    }
  }
  .title {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  .input-field {
    max-width: 380px;
    width: 100%;
    height: 55px;
    background-color: #f0f0f0;
    margin: 10px 0;
    border-radius: 55px;
    display: grid;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    position: relative;
    svg {
      text-align: center;
      margin-right: 1rem;
      color: var(--clr-primary-4);
      font-size: 1.4rem;
    }
    input {
      background: none;
      outline: none;
      border: none;
      line-height: 1;
      font-weight: 400;
      font-size: 1.2rem;

      &::placeholder {
        color: #aaa;
        font-weight: 200;
      }
    }
  }
  .btn {
    width: 150px;
    height: 49px;
    border: none;
    outline: none;
    border-radius: 50px;
    cursor: pointer;
    background-color: var(--clr-primary-3);
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    transition: 0.5s;

    &:hover {
      background-color: var(--clr-primary-6);
    }
  }
`;

export default VerifyEmail;
