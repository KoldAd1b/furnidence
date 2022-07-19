import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../../assets/hero-bcg.jpeg";

const Hero = () => {
  return (
    <Wrapper
      className="section-center"
      style={{
        backgroundImage: "url(" + require("../../assets/hero-bcg.jpg") + ")",
      }}
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="info">
          <h1>Design your humble abode</h1>
          <h3>Premium quality furniture</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            optio deserunt impedit vero illo rerum voluptates, atque dolor
            aliquam voluptatum.
          </p>
          <Link to="/products" className="btn">
            Start shopping now
          </Link>
        </div>
        <div className="image">
          <img src={heroBcg} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;

  max-width: 100vw;
  position: relative;
  background: no-repeat center / cover;

  display: grid;
  place-items: center;
  .overlay {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.2)
    );
    z-index: 0;
    position: absolute;
  }
  .container {
    margin: 4rem;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;

    .image {
      width: 100%;

      padding: 1rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (min-width: 540px) {
        width: 50%;
      }
    }
  }

  .info {
    text-align: center;
    position: relative;
  }

  h1 {
    color: white;
  }
  h3 {
    color: var(--clr-silver);
  }
  p {
    color: var(--clr-silver);
    font-weight: 300;
    font-size: 1.15rem;
  }
  .btn {
    background-color: var(--clr-golden);
    font-size: 1.25rem;
    padding: 0.25rem 1.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: white;
      color: var(--clr-golden);
    }
  }
  @media (min-width: 992px) {
    & {
      height: 100vh;
    }
    .btn {
      width: 50%;
    }
    .container {
      flex-direction: row;
      margin: none;

      .image {
        width: 60%;
        text-align: right;
        img {
          width: 100%;

          max-width: 500px;
        }
      }
    }
    .info {
      text-align: initial;
    }
  }
`;

export default Hero;
