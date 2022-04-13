import axios from "axios";
import { reviewActions } from "./reviewSlice";
import { uiActions } from "./uiSlice";

const review_url = "/api/v1/reviews";

export const getReviewsByProduct = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));

    try {
      const response = await axios.get(`${review_url}/product/${id}`);
      const reviews = response.data?.reviews;
      dispatch(reviewActions.setReviews(reviews));
    } catch (err) {
      if (err.response.status === "404") {
        return dispatch(reviewActions.setReviews([]));
      }
      dispatch(uiActions.setError(true));
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const addReview = ({ title, comment, rating, product }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      await axios.post(`${review_url}`, {
        title,
        comment,
        rating,
        product,
      });
      dispatch(
        uiActions.setModal({
          open: true,
          message: "Your review has been successfully added!",
        })
      );
    } catch (err) {
      dispatch(uiActions.setError(err.response.data.message));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
    dispatch(getReviewsByProduct(product));
  };
};
export const updateReview = (id, { title, comment, rating, product }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      await axios.patch(`${review_url}/${id}`, {
        title,
        comment,
        rating,
      });
      dispatch(
        uiActions.setModal({
          open: true,
          message: "Your review has been successfully updated!",
        })
      );
    } catch (err) {
      dispatch(uiActions.setError(err.response.data.message));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
    dispatch(getReviewsByProduct(product));
  };
};

export const deleteReview = (id, product) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));

    try {
      await axios.delete(`${review_url}/${id}`);
      dispatch(
        uiActions.setModal({
          open: true,
          message: "Your review has been successfully deleted",
        })
      );
    } catch (err) {
      dispatch(uiActions.setError(err.response.data.message));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
    dispatch(getReviewsByProduct(product));
  };
};
