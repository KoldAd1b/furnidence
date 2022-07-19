import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../Misc/Loading";

const ProductImages = ({ images }) => {
  const [displayImage, setDisplayImage] = useState();

  useEffect(() => {
    if (images) setDisplayImage(images[0]);
  }, [images]);

  if (!images) return <Loading />;
  return (
    <Wrapper>
      <img src={displayImage?.url} className="active-img" alt="Main" />
      <div className="gallery">
        {images?.map((img, index) => {
          return (
            <div className="image" key={index}>
              <img
                src={img.url}
                alt={`${img}--${index}`}
                onClick={() => setDisplayImage(images[index])}
                className={`${img.url === displayImage?.url ? "active" : null}`}
              ></img>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    .image {
      cursor: pointer;
      transition: all 0.5s ease-in;
      opacity: 50;
      &:hover {
        transform: scale(1.05);
        opacity: 1;
      }

      img {
        height: 100px;
      }
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
    opacity: 1;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
