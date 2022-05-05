import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsEnvelopeFill, BsFillKeyFill } from "react-icons/bs";
import LoginSVG from "../../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validateName,
  validatePassword,
  confirmPassword,
} from "../../utils/validators";
import RegisterSVG from "../../assets/register.svg";
import styled from "styled-components";
import { login, register } from "../../store/authActions";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialErrors = {
  name: "",
  password: [],
  confirmPassword: "",
  email: "",
};

const RegisterLogin = () => {
  const [signup, setSignup] = useState(false);

  const [form, setForm] = useState(initialValue);

  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const [formError, setFormError] = useState({
    error: false,
    errors: initialErrors,
  });

  useEffect(() => {
    setForm(initialValue);
    setFormError({ error: false, errors: initialErrors });
  }, [signup]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidEmail = validateEmail(form.email);
    const invalidPassword = validatePassword(form.password);

    if (!signup) {
      if (!invalidEmail && !invalidPassword) {
        return dispatch(login({ email: form.email, password: form.password }));
      }
      setFormError({
        error: true,
        errors: { email: invalidEmail, password: invalidPassword },
      });
    } else {
      const passwordDontMatch = confirmPassword(
        form.password,
        form.confirmPassword
      );
      const invalidName = validateName(form.name);

      if (
        !passwordDontMatch &&
        !invalidEmail &&
        !invalidPassword &&
        !invalidName
      ) {
        return dispatch(
          register({
            name: form.name,
            email: form.email,
            password: form.password,
          })
        );
      }
      setFormError({
        error: true,
        errors: {
          email: invalidEmail,
          password: invalidPassword,
          name: invalidName,
          confirmPassword: passwordDontMatch,
        },
      });
    }
  };

  if (loading) return <Loading />;

  if (user) return <Navigate to={`/`} />;

  return (
    <Container className={`${signup && "signUp-mode"}`}>
      <div className="forms-container">
        <div className="login-register">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <BsEnvelopeFill />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <p className="error-text">{formError.errors?.email}</p>
            <div className="input-field">
              <RiLockPasswordFill />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <p className="error-text ">
              {formError.errors?.password?.map((err) => {
                return (
                  <>
                    *{err}
                    <br />
                  </>
                );
              })}
            </p>
            <Link
              to={"/user/forgot-password"}
              className="error-text forgot-password"
            >
              Forgot your password?
            </Link>
            <input type="submit" value="login" className="btn solid" />
          </form>

          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign Up</h2>

            <div className="input-field">
              <FaUserAlt />
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <p className="error-text">{formError.errors.name}</p>
            <div className="input-field">
              <BsEnvelopeFill />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <p className="error-text">{formError.errors.email}</p>
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
              {formError.errors?.password?.map((err) => {
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
            <p className="error-text">{formError.errors.confirmPassword}</p>
            <input type="submit" value="Register" className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Sign up to check out a world of state-of-the-art furniture
              customized to your needs
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => {
                setSignup(true);
              }}
            >
              Sign up
            </button>
          </div>
          <img src={RegisterSVG} alt="" className="image" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already Signed up?</h3>
            <p>Welcome back. Login to continue shopping</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => {
                setSignup(false);
              }}
            >
              Sign in
            </button>
          </div>
          <img src={LoginSVG} alt="" className="image" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;

  .error-text {
    text-align: left;
    font-size: 1rem;
    color: orangered;
  }
  .forgot-password {
    margin-top: -1rem;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: darkred;
      transform: scaleX(1.01);
    }
    &:active {
      transform: translateY(-2px);
    }
  }
  @media (max-width: 870px) {
    min-height: 800px;
    height: 100vh;
  }

  .btn.transparent {
    color: white;
  }

  &:before {
    content: "";
    position: absolute;
    width: 2000px;
    height: 2000px;
    border-radius: 50%;
    background: linear-gradient(
      -45deg,
      var(--clr-primary-2),
      var(--clr-primary-4)
    );
    top: -10%;
    right: 50%;
    transform: translateY(-50%);
    z-index: 6;
    transition: 1.8s ease-in-out;
    @media (max-width: 870px) {
      width: 1500px;
      height: 1500px;
      left: 30%;
      bottom: 68%;
      transform: translateX(-50%);
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }
    @media (max-width: 580px) {
      bottom: 72%;
      left: 50%;
    }
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    @media (max-width: 870px) {
      z-index: 12;
    }
  }
  .login-register {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    transition: 1s 0.7s ease-in-out;

    @media (max-width: 870px) {
      width: 100%;
      left: 50%;
      top: 95%;
      transform: translate(-50%, -100%);
    }
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-column: 1/2;
    grid-row: 1/2;
    padding: 0 5rem;
    transition: 0.2s 0.7s ease-in-out;

    @media (max-width: 580px) {
      padding: 0 1.5rem;
    }

    &.login-form {
      z-index: 2;
    }
    &.register-form {
      z-index: 1;
      opacity: 0;
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
  .panels-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media (max-width: 870px) {
      grid-template-columns: 1fr;
      grid-template-columns: 1fr 2fr 1fr;
    }

    .panel {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-around;
      z-index: 7;
      @media (max-width: 870px) {
        z-index: 20;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 2.5rem 8%;
      }

      &.left-panel {
        padding: 3rem 17% 2rem 12%;
        pointer-events: all;

        @media (max-width: 870px) {
          grid-row: 1/2;
        }
      }
      &.right-panel {
        pointer-events: none;
        padding: 3rem 12% 2rem 17%;

        @media (max-width: 870px) {
          grid-row: 3/4;
        }

        .content,
        .image {
          transform: translate(800px);
          @media (max-width: 870px) {
            h3 {
              color: black;
            }
            transform: translateY(300px);
          }
        }
      }

      .content {
        color: #fff;
        transition: 0.9s 0.6s ease-in-out;
        @media (max-width: 870px) {
          padding-right: 15%;
        }
        @media (max-width: 580px) {
          padding: 0.5rem 1rem;
        }
      }
      h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;
        @media (max-width: 870px) {
          font-size: 1.2rem;
        }
      }
      p {
        color: #fff;
        font-size: 0.95rem;
        padding: 0.7rem 0;
        @media (max-width: 870px) {
          font-size: 0.7rem;
          padding: 0.5rem 0;
        }
      }
    }
    .btn.transparent {
      margin: 0;
      background: none;
      border: 2px solid #fff;
      width: 130px;
      height: 41px;
      font-weight: 600;
      font-size: 0.8rem;
      @media (max-width: 870px) {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
        background-color: black;
      }
    }
  }

  .image {
    width: 100%;
    transition: 1.1s 0.4s ease-in-out;

    @media (max-width: 870px) {
      width: 200px;
      transition: 0.9s 0.8s ease-in-out;
    }
    @media (max-width: 580px) {
      display: none;
    }
  }
  &.signUp-mode:before {
    transform: translate(100%, -50%);
    @media (max-width: 870px) {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }
    @media (max-width: 580px) {
      bottom: 28%;
      left: 50%;
    }
  }
  &.signUp-mode {
    .login-register {
      left: 25%;
      @media (max-width: 870px) {
        top: 5%;
        transform: translate(-50%, 0);
        left: 50%;
      }
    }

    .left-panel {
      pointer-events: none !important;
      .image,
      .content {
        transform: translateX(-800px);

        @media (max-width: 870px) {
          transform: translateY(-300px);
        }
      }
    }
    .right-panel {
      pointer-events: all !important;
      .image,
      .content {
        transform: translateX(0px) !important;
      }
    }
    form.register-form {
      z-index: 2;
      opacity: 1;
    }
    form.login-form {
      z-index: 1;
      opacity: 0;
    }
  }
`;

export default RegisterLogin;
