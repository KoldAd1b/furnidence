import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map(
        ({ _id, image, name, price, description, averageRating: rating }) => (
          <div className="product_card" key={_id}>
            <div className="image">
              <img src={image} alt={name} />
            </div>
            <div className="content">
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 120)}....</p>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => {
                  return (
                    <span key={i}>
                      {rating >= i + 1 ? (
                        <BsStarFill />
                      ) : rating >= i + 0.5 ? (
                        <BsStarHalf />
                      ) : (
                        <BsStar />
                      )}
                    </span>
                  );
                })}
              </div>
              <Link to={`/products/${_id}`} className="btn">
                See more
              </Link>
            </div>
            <hr />
          </div>
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  .product_card {
    display: flex;
    flex-direction: column;

    align-items: center;

    .image {
      width: 300px;
      height: 250px;
      border-radius: 10px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .content {
      text-align: center;
    }
    .rating {
      display: flex;
      margin-bottom: 1.25rem;
      justify-content: center;

      gap: 1rem;
    }
    .btn {
      background-color: #318ce7;
      outline: 1px solid transparent;
      width: 40%;
      height: 20px;

      &:hover {
        color: #318ce7;
        background-color: #fff;
        outline-color: var(--clr-silver);
      }
    }

    @media (min-width: 712px) {
      flex-direction: row;

      .btn {
        height: 40px;
      }
      .image {
        width: 400px;
      }
      .content {
        text-align: initial;
        margin-left: 2rem;
      }
      .rating {
        justify-content: flex-start;
      }
    }
  }
`;

export default ListView;
