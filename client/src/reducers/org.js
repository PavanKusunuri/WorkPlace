import {
  ORG_LOADED,
  ORG_AUTH_ERROR,
  ORG_LOGIN_SUCCESS,
  ORG_LOGIN_FAIL,
  ORG_REGISTER_SUCCESS,
  ORG_REGISTER_FAIL,
  ORG_LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('org_token'),
  isAuthenticated: false,
  loading: true,
  org: null
};

function orgReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ORG_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        org: payload
      };
    case ORG_LOGIN_SUCCESS:
    case ORG_REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ORG_AUTH_ERROR:
    case ORG_LOGIN_FAIL:
    case ORG_REGISTER_FAIL:
    case ORG_LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        org: null
      };
    default:
      return state;
  }
}

export default orgReducer;
