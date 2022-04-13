import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar, BsFillEyeFill } from "react-icons/bs";

const ProductCard = ({
  image,
  name,
  price,
  id,
  imgWidth,
  averageRating: rating,
}) => {
  return (
    <Wrapper imgWidth={imgWidth}>
      <div className="card">
        <div className="img-Box">
          <div className="overlay"></div>
          <img src={image} alt={name} />
          <ul className="action">
            <li>
              <Link to={`/products/${id}`}>
                <BsFillEyeFill />
              </Link>
              <span>See more</span>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="name">
            <h3>{name}</h3>
          </div>
          <div className="price_rating">
            <h2>{formatPrice(price)}</h2>
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .card {
    width: 100%;
    background: #fff;
    transition: transform 0.5s;

    border-radius: 12px;
    box-shadow: -1px 3px 13px 2px rgba(0, 0, 0, 0.35);

    &:hover {
      transform: scaleY(1.05);

      .img-Box .overlay {
        opacity: 1;
      }

      .action li {
        transform: translateX(0px);
      }
    }
  }
  .img-Box {
    position: relative;
    width: 100%;
    height: ${({ imgWidth }) => imgWidth};
    overflow: hidden;

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.2)
      );
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s ease-in-out;
      transform-origin: center;
    }

    .action {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;

      li {
        list-style: none;
        transition: transform 0.5s;
        font-size: 2rem;
        background: transparent;
        justify-content: center;
        align-items: center;
        margin: 4px;
        cursor: pointer;
        transform: translateY(1200px);

        position: relative;

        a,
        a:visited {
          color: var(--clr-golden);
        }

        &:hover {
          span {
            opacity: 1;
            transform: translateY(-50%) translateX(0px);
          }
        }

        span {
          position: absolute;
          right: 40px;
          top: 45%;
          transform: translateY(-50%) translateX(-20px);
          background: #318ce7;
          white-space: nowrap;
          padding: 4px 60px;
          color: #fff;
          font-weight: 500;
          font-size: 12px;
          border-radius: 4px;
          pointer-events: none;
          opacity: 0;
          transition: 0.5s;

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            right: -4px;
            width: 8px;
            height: 8px;
            background: #fff;
            transform: translateY(-50%) rotate(45deg);
          }
        }
      }
    }
  }
  .content {
    padding: 10px;
    .name {
      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--clr-golden);
        margin: 5px 0;
      }
    }
    .price_rating {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        font-size: 20px;
        font-weight: 500;
        margin-top: 5px;
        color: #000;
      }
      .rating {
        color: #ffb900;
      }
      .rating > *:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;
export default ProductCard;
