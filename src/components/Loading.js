import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper className="section section-center">
      <div className="ring"></div>
      <span>Loading ...</span>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  text-align: center;
  justify-content: center;
  min-height: 100vh;
  align-items: center;

  .ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: ring 2s linear infinite;
  }

  @keyframes ring {
    0% {
      transform: rotate(0 deg);
      box-shadow: 1px 5px 2px #e65c00;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #18b201;
    }
    100% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #0456c8;
    }
  }
  .ring:before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;

    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  span {
    color: #737373;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 200px;
    animation: textie 3s ease-in-out linear;
  }

  @keyframes textie {
    0% {
      color: black;
    }
  }
`;

export default Loading;
