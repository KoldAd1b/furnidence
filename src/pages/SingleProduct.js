import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../store/productActions";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ReviewSection from "../components/Product/ReviewSection";
import { getReviewsByProduct } from "../store/reviewActions";
import { uiActions } from "../store/uiSlice";

const SingleProductPage = () => {
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.UI);
  const { productInView } = useSelector((state) => state.products);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getReviewsByProduct(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error === false) return;
    let timeout;
    timeout = setTimeout(() => {
      navigate("/");
      dispatch(uiActions.setError(false));
    }, 3000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [error]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const {
    name,
    price,
    description,
    stock,
    averageRating,
    _id,
    brand,
    images,
    totalReviews,
  } = productInView;

  return (
    <Wrapper>
      <PageHero title={name} />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <div className="content">
            <h2>{name}</h2>
            <Stars
              rating={averageRating}
              reviews={Math.trunc(Math.random() * 5) + totalReviews}
            />
            <h5 className="price"> {formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "Yes" : "No"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {_id}
            </p>
            <p className="info">
              <span>Company : </span>
              {brand}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={productInView} />}
          </div>
        </div>
      </div>
      <ReviewSection />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
