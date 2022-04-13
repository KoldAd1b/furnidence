import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import userImage from "../assets/user-img.jpg";
import { reviewActions } from "../store/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../store/reviewActions";

const Review = (props) => {
  const {
    rating,
    name,
    title,
    comment,
    _id: id,
    product,
    user: { name: username, userId },
  } = props;

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const userCanModify = currentUser._id === userId;

  const deleteHandler = () => {
    dispatch(deleteReview(id, product));
  };

  const editHandler = () => {
    dispatch(
      reviewActions.setCurrentReview({
        rating,
        name,
        title,
        comment,
        id,
        prodId: product,
      })
    );
    props.setDisplayReview(true);
  };

  return (
    <ReviewContainer>
      <div className="header">
        <div className="profile">
          <div className="profile-img">
            <img src={userImage} alt="user-default" srcSet="" />
          </div>
          <div className="username">
            <strong>{username}</strong>
          </div>
        </div>

        <div className="stars">
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
      <div className="title">
        <p>{title}</p>
      </div>

      <div className="comment">
        <p>{comment}</p>
      </div>

      {userCanModify && (
        <div className="actions">
          <button className="btn delete" type="button" onClick={deleteHandler}>
            Delete
          </button>
          <button className="btn edit" type="button" onClick={editHandler}>
            Edit
          </button>
        </div>
      )}
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  width: 500px;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
  margin: 15px;
  cursor: pointer;
  .title {
    p {
      text-align: left;
      font-size: 1.2rem;
    }
  }

  .actions {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .edit,
  .delete {
    &:hover {
      border: none;
    }
  }
  .edit {
    &:hover {
      background-color: rgb(0, 150, 255);
    }
  }
  .delete {
    &:hover {
      background-color: rgb(220, 20, 60);
    }
  }
  .profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .profile {
    display: flex;
    align-items: center;
  }
  .username {
    display: flex;
    flex-direction: column;
    strong {
      color: #3d3d3d;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }
  }
  .stars {
    color: #f9d17c;
  }

  .comment {
    p {
      font-size: 0.9rem;
      color: #4b4b4b;
    }
  }
`;

export default Review;
