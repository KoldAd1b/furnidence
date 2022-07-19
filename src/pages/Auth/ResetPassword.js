import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillKeyFill } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import WaveSvg from "../../components/Misc/WaveSvg";
import { validatePassword, confirmPassword } from "../../utils/validators";
import { useDispatch } from "react-redux";
import { getUser, resetPassword } from "../../store/authActions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [errors, setErrors] = useState({ password: [], confirmPassword });
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invalidPassword = validatePassword(form.password);
    const doesntMatch = confirmPassword(form.password, form.confirmPassword);

    if (!invalidPassword && !doesntMatch) {
      // Do the action
      const token = params.get("token");
      const email = params.get("email");

      dispatch(resetPassword(form.password, token, email));

      dispatch(getUser());
      navigate("/login-register");
    }
    setErrors({ password: invalidPassword, confirmPassword: doesntMatch });
  };
  return (
    <Container>
      <div className="waves">
        <WaveSvg />
      </div>
      <form className="email-form" onSubmit={handleSubmit}>
        <h2 className="title">Enter your new password</h2>
        <div className="input-field">
          <RiLockPasswordFill />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <p className="error-text">
          {errors.password.map((err) => {
            return (
              <>
                *{err}
                <br />
              </>
            );
          })}
        </p>
        <div className="input-field">
          <BsFillKeyFill />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={form.confirmPassword}
          />
        </div>
        <p className="error-text">{errors.confirmPassword}</p>
        <input type="submit" value="Continue" className="btn solid" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: flex-start; */

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

export default ResetPassword;
