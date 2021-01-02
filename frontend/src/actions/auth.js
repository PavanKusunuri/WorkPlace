import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
// import setAuthToken from "../utils/setAuthToken";
import { backendUrl } from '../config/apiconfig';


console.log(backendUrl)
//  Load User
// export const loadUser = () => async (dispatch) => {
//   console.log("load User is called...")
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get(`${backendUrl}/api/auth`);
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

//  Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(`${backendUrl}/api/users`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem('userInfo', JSON.stringify(res))

    // dispatch(loadUser());
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//  Login user
export const login = (email, password) => async (dispatch) => {
  console.log("email", email);
  console.log("password", password);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${backendUrl}/api/auth/`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(res))

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//  Logout / Clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
