import React from "react";
import styled from "styled-components";
import { services } from "../utils/constants";

const Services = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Elegantly crafted Furniture</h1>

        {services.map(({ icon, text, title }, index) => (
          <div className="serviceBox" key={index}>
            <div className="icon">{icon}</div>
            <div className="content">
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;

  padding: 5rem 0;

  min-height: 60vh;

  .container {
    padding: 20px;
    position: relative;
    width: 1220px;
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 20px;
    flex-wrap: wrap;
    overflow: hidden;

    h1 {
      margin-bottom: 2rem;
      flex-basis: 100%;
      text-align: center;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        width: 12.5%;
        height: 5px;
        background-color: #806c00;
        bottom: -20%;
        transform: translateX(-50%);
        left: 50%;
        background-color: brown;
      }
    }

    .serviceBox {
      position: relative;
      width: 380px;
      height: 320px;
      background-color: slategray;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0px 0px 6px 6px #e2e2e2;
      .content {
        position: relative;
        padding: 20px;
        color: #fff;
        text-align: center;
        margin-top: 100px;
        z-index: 1;
        transform: scale(0);
        transition: 0.5s;
        transition-delay: 0s;

        h2 {
          margin-top: 10px;
          margin-bottom: 5px;
        }
        p {
          font-weight: 300;
          line-height: 1.5em;
          color: whitesmoke;
        }
      }

      &:hover {
        .icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          top: 30px;
          left: calc(50% - 40px);
          font-size: 2em;
          transition-delay: 0.25s;
          transition-delay: 0s;
        }
        .content {
          transform: scale(1);
        }
      }

      .icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--clr-white);
        color: var(--clr-golden);

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 5em;
        transition-delay: 0.25s;
        transition: 0.5s;
        z-index: 2;
      }
    }
  }
`;
export default Services;
