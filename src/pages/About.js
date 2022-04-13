import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="about" />
        <article>
          <div className="title">
            <h1>Our story</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
              et, alias nihil atque nemo aliquid ad est sunt. Non, sequi
              voluptas? Doloribus perspiciatis dolorem, placeat omnis assumenda
              voluptatum autem incidunt.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

  h1 {
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
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
    border-radius: 12px;
  }
  p {
    text-align: center;
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
