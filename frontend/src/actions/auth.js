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

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/userConstants';

// import setAuthToken from "../utils/setAuthToken";
import { backendUrl } from '../config/apiconfig';


console.log(backendUrl)
//  Load User
// export const loadUser = () => async (dispatch) => {
//   console.log("load User is called...")
//   // if (localStorage.token) {
//   //   setAuthToken(localStorage.token);
//   // }
//   try {
//     const res = await axios.get(`${backendUrl}/api/auth`);
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err)
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const { data } = await axios.post(`${backendUrl}/api/auth/`, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT })
  // dispatch({ type: USER_DETAIL_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
}


//  Register user
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data
    // })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

// // Login User
// export const login = (email, password) => async dispatch => {
//   const body = { email, password };

//   try {
//     const res = await axios.post(`${backendUrl}/api/auth/`, body);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });

//     // dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };
// const body = JSON.stringify({ name, email, password });
// try {
//   console.log(res)
//   dispatch({
//     type: REGISTER_SUCCESS,
//     payload: res.data,
//   });
//   console.log(res)
//   localStorage.setItem('userInfo', JSON.stringify(res))

//   dispatch(loadUser());
// } catch (err) {
//   console.log(err)
//   const errors = err.response.data.errors;

//   if (errors) {
//     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//   }
//   dispatch({
//     type: REGISTER_FAIL,
//   });
// }
// }


//  Login user
// export const login = (email, password) => async (dispatch) => {
//   // console.log("email", email);
//   // console.log("password", password);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ email, password });

//   try {
//     const res = await axios.post(`${backendUrl}/api/auth/`, body, config);
//     console.log("res" + res)
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res,
//     });

//     localStorage.setItem('userInfo', JSON.stringify(res))

//     dispatch(loadUser());
//   } catch (err) {
//     console.log(err)
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: LOGIN_FAIL,
//     });
//   }
// };

//  Logout / Clear profile

// export const logout = () => (dispatch) => {
//   dispatch({ type: CLEAR_PROFILE });
//   dispatch({ type: LOGOUT });
// };
