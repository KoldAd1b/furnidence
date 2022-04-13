import { authActions } from "./authSlice";
import { uiActions } from "./uiSlice";
import axios from "axios";

const LOGIN_URL = "/api/v1/auth/login";
const LOGOUT_URL = "/api/v1/auth/logout";
const USER_URL = "/api/v1/users/user/me";
const REGISTER_URL = "/api/v1/auth/register";
const FORGOT_PASSWORD_URL = "/api/v1/auth/forgot-password";
const RESET_PASSWORD_URL = "/api/v1/auth/reset-password";
const SEND_VERIFY_URL = "/api/v1/auth/send-verify-email";
const VERIFY_URL = "/api/v1/auth/verify-email";

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data } = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      dispatch(authActions.setUser(data.user));
    } catch (err) {
      dispatch(uiActions.setError(true));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      await axios.delete(LOGOUT_URL);
      dispatch(authActions.removeUser());
    } catch (err) {
      dispatch(uiActions.setError(true));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data } = await axios.post(REGISTER_URL, {
        email,
        password,
        name,
      });
      dispatch(authActions.setUser(data.user));
    } catch (err) {
      dispatch(uiActions.setError(true));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const { data } = await axios.get(USER_URL);
      dispatch(authActions.setUser(data.user));
      dispatch(authActions.setVerifiedUser(data.user.isVerified));
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(authActions.setUser(null));
        return null;
      }
      dispatch(uiActions.setError(err.response.data.message));
      dispatch(
        uiActions.setModal({ open: true, message: err.response.data.message })
      );
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(uiActions.setLoading(true));
  try {
    const { data } = await axios.post(FORGOT_PASSWORD_URL, { email });
    dispatch(uiActions.setModal({ open: true, message: data.message }));
  } catch (err) {
    dispatch(uiActions.setError(err.response.data.message));
    dispatch(
      uiActions.setModal({ open: true, message: err.response.data.message })
    );
  }
  dispatch(uiActions.setLoading(false));
};
export const resetPassword = (password, token, email) => async (dispatch) => {
  dispatch(uiActions.setLoading(true));
  try {
    const { data } = await axios.post(RESET_PASSWORD_URL, {
      email,
      password,
      token,
    });
    dispatch(uiActions.setModal({ open: true, message: data.message }));
  } catch (err) {
    dispatch(uiActions.setError(err.response.data.message));
    dispatch(
      uiActions.setModal({ open: true, message: err.response.data.message })
    );
  }
  dispatch(uiActions.setLoading(false));
};
export const sendVerifyEmail = (email) => async (dispatch) => {
  dispatch(uiActions.setLoading(true));
  try {
    const { data } = await axios.post(SEND_VERIFY_URL, {
      email,
    });
    dispatch(uiActions.setModal({ open: true, message: data.message }));
  } catch (err) {
    dispatch(uiActions.setError(err.response.data.message));
    dispatch(
      uiActions.setModal({ open: true, message: err.response.data.message })
    );
  }
  dispatch(uiActions.setLoading(false));
};

export const verifyEmail = (email, token) => async (dispatch) => {
  dispatch(uiActions.setLoading(true));
  try {
    const { data } = await axios.post(VERIFY_URL, {
      email,
      token,
    });
    dispatch(uiActions.setModal({ open: true, message: data.message }));
  } catch (err) {
    dispatch(uiActions.setError(err.response.data.message));
    dispatch(
      uiActions.setModal({ open: true, message: err.response.data.message })
    );
  }
  dispatch(uiActions.setLoading(false));
};
