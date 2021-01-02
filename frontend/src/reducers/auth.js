import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST
} from '../constants/userConstants';




// export default function (state = [], action) {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_LOADED:
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: payload,
//       };
//     case LOGIN_SUCCESS:
//       console.log("payload" + payload)
//       localStorage.setItem("token", payload.token);
//       return {
//         ...state,
//         ...payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case REGISTER_SUCCESS:
//       localStorage.setItem("token", payload.token);
//       return {
//         ...state,
//         ...payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case REGISTER_FAIL:
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case LOGOUT:
//     case ACCOUNT_DELETED:
//       localStorage.removeItem("token");
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }

//  Reducer Function for user registration
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

