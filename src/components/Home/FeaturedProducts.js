import React from "react";
import styled from "styled-components";
import Error from "../Misc/Error";
import Loading from "../Misc/Loading";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const { loading, error } = useSelector((state) => state.UI);
  const { featuredProducts } = useSelector((state) => state.products);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <Wrapper className="section">
      <h1>Featured Products</h1>
      <div className="container">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} imgWidth={"310px"} {...product} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-grey-10);
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

  .container {
    display: grid;
    max-width: 1200px;
    width: 100%;

    padding: 30px 20px;

    position: relative;

    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    grid-gap: 20px;

    @media (min-width: 576px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
`;

export default FeaturedProducts;
