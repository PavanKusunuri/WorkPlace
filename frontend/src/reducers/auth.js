import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/userConstants';

const initialState = {
  userInfo: null,
  loading: false,
  error: {},
  status: null
};

export const userLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { 
        ...state,
        loading: true, 
        status: 'pending',
        error: null 
      }
    case USER_LOGIN_SUCCESS:
      return { 
        ...state,
        loading: false,
        status: 'success',
        error: null,
        userInfo: payload 
      }
    case USER_LOGIN_FAIL:
      return { 
        ...state,
        loading: false,
        status: 'fail',
        error: payload 
      }
    case USER_LOGOUT:
      return { ...state, userInfo: null}
    default:
      return state
  }
}

//  Reducer Function for user registration
export const userRegisterReducer = (state = { initialState }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { 
        ...state,
        loading: true,
        status: 'pending'
      }
    case USER_REGISTER_SUCCESS:
      return { 
        ...state,
        loading: false,
        userInfo: payload,
        status: 'success'
      }
    case USER_REGISTER_FAIL:
      return { 
        ...state,
        loading: false,
        error: action.payload,
        status: 'fail'
      }
    default:
      return state
  }
}

