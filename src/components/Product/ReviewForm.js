import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addReview, updateReview } from "../../store/reviewActions";
import { Link, useParams } from "react-router-dom";
import { reviewActions } from "../../store/reviewSlice";

const ReviewForm = () => {
  const { editing, reviewToEdit } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id: productId } = useParams();
  const [review, setReview] = useState({
    rating: 1,
    title: "",
    comment: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (reviewToEdit && editing) {
      const { rating, title, comment } = reviewToEdit;
      setReview({ rating, title, comment });
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { rating, title, comment } = review;

    if (!rating || !title || !comment) {
      return setError("Must fill out all the fields");
    }

    if (title.length > 120) {
      return setError("The title must not be more than 120 characters");
    }

    if (editing && reviewToEdit) {
      dispatch(
        updateReview(reviewToEdit.id, {
          rating,
          title,
          comment,
          product: reviewToEdit.prodId,
        })
      );
      dispatch(reviewActions.setEditing(false));
    }
    if (!editing) {
      dispatch(addReview({ rating, title, comment, product: productId }));
    }
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div className="title-rating">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={onChange}
              value={review.title}
            />
          </div>
          <div className="form-control">
            <label htmlFor="title">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              step={0.1}
              min={1}
              max={5}
              onChange={onChange}
              value={review.rating}
            />
          </div>
        </div>
        <div className="comment">
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            id="comment"
            value={review.comment}
            onChange={onChange}
          />
        </div>
        {error && <p className="error">*{error}</p>}
        {!user && (
          <p className="error">
            <Link to="/login-register">You must be logged in to post</Link>
          </p>
        )}
        <button type="submit" className="btn" disabled={!user}>
          {editing ? "Confirm Edits" : "Post"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60%;
  text-align: center;
  .title-rating {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  label {
    text-align: left;
    font-size: 1rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    height: 2rem;
    font-size: 1rem;
    color: grey;
    outline: none;
    border: none;
    box-shadow: 0 0 5pt 0.5pt #d3d3d3;
    border-radius: 12px;
    padding: 1rem 0.75rem;

    background-color: #f4f0ec;
    &:focus {
      box-shadow: 0 0 5pt 2pt #d3d3d3;
      outline-width: 0px;
    }
  }

  .error a {
    color: red;
    margin-bottom: 0.5rem;
  }
  .comment {
    margin-top: 1.5rem;

    textarea {
      height: 100px;

      transition: background-color 0.5s ease-out;
      &:focus {
        background-color: white;
      }
    }
  }
  button {
    outline: none;
    border: none;
    margin-top: 1.3rem;

    font-size: 1.2rem;
    border-radius: 50px;
    color: #fff;
    transition: all 0.5s ease-in-out;
    width: 30%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background-color: var(--clr-golden);
    outline: 1px solid transparent;

    &:hover {
      color: var(--clr-golden);
      background-color: #fff;
      outline-color: var(--clr-silver);
    }
  }
  @media (min-width: 768px) {
    .title-rating {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 1.2rem;
    }
    .form-control {
      width: 350px;
    }
  }
`;
export default ReviewForm;
