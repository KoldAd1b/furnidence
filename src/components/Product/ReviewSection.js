import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { reviewActions } from "../../store/reviewSlice";

import Review from "./Review";
import ReviewForm from "./ReviewForm";

const ReviewSection = () => {
  const [displayReview, setDisplayReview] = useState(false);
  const buttonRef = useRef(null);

  const dispatch = useDispatch();

  const { editing, reviews } = useSelector((state) => state.review);

  useEffect(() => {
    if (!editing) {
      setDisplayReview(false);
    } else {
      setDisplayReview(true);
    }
  }, [editing]);

  const handleClick = () => {
    if (displayReview) {
      if (editing) {
        dispatch(
          reviewActions.setCurrentReview({
            rating: "",
            name: "",
            title: "",
            comment: "",
            id: "",
            prodId: "",
          })
        );
      }
      setDisplayReview(false);
    } else setDisplayReview(true);
  };

  return (
    <Wrapper displayReview={displayReview}>
      <div className="button">
        <button
          type="button"
          ref={buttonRef}
          className="btn"
          onClick={handleClick}
        >
          {!displayReview ? "Post a review" : "Close review Panel"}
        </button>
      </div>
      {displayReview && <ReviewForm />}
      {reviews.length > 0 ? (
        <div className="review-heading">
          <span>Customers</span>
          <h1>What they say</h1>
        </div>
      ) : (
        <div className="review-heading">
          <h1>No reviews yet, Be the First one!</h1>
        </div>
      )}
      <div className="review-container">
        {reviews &&
          reviews.map((review) => {
            return (
              <Review
                buttonToClick={buttonRef}
                setDisplayReview={setDisplayReview}
                key={review._id}
                {...review}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  .button {
    display: block;
    text-align: left;

    button {
      padding: 0.5rem 1.5rem;
      outline: none;
      border: none;
      margin-top: 1.3rem;

      font-size: 1.2rem;
      border-radius: 50px;
      color: #fff;
      transition: all 0.5s ease-in-out;

      background-color: ${({ displayReview }) =>
        displayReview ? "#800020" : "var(--clr-golden)"};
      outline: 1px solid transparent;

      &:hover {
        color: var(--clr-golden);
        background-color: #fff;
        outline-color: var(--clr-silver);
      }
    }
  }

  .review-heading {
    letter-spacing: 1px;
    margin: 30px 0px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: var(--clr-golden);
      font-size: 2.2rem;
      font-weight: 500;
      padding: 10px 20px;
    }

    span {
      font-size: 1.3rem;
      color: #252525;
      margin-bottom: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
  .review-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
`;

export default ReviewSection;
