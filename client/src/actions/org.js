import api from '../utils/api';
import setOrgAuthToken from '../utils/setOrgAuthToken';
import { setAlert } from './alert';
import {
  ORG_LOADED,
  ORG_AUTH_ERROR,
  ORG_LOGIN_SUCCESS,
  ORG_LOGIN_FAIL,
  ORG_REGISTER_SUCCESS,
  ORG_REGISTER_FAIL,
  ORG_LOGOUT
} from './types';

// ─── Load the authenticated organization ─────────────────────────────────────
export const loadOrg = () => async (dispatch) => {
  const token = localStorage.getItem('org_token');
  if (token) setOrgAuthToken(token);

  try {
    const res = await api.get('/organizations/me');
    dispatch({ type: ORG_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: ORG_AUTH_ERROR });
  }
};

// ─── Register organization
export const registerOrg = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/organizations/register', formData);
    dispatch({ type: ORG_REGISTER_SUCCESS, payload: res.data });

    // Store token & set header
    localStorage.setItem('org_token', res.data.token);
    setOrgAuthToken(res.data.token);

    dispatch(loadOrg());
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({ type: ORG_REGISTER_FAIL });
  }
};

// ─── Login organization
export const loginOrg = (email, password) => async (dispatch) => {
  try {
    const res = await api.post('/organizations/login', { email, password });
    dispatch({ type: ORG_LOGIN_SUCCESS, payload: res.data });

    localStorage.setItem('org_token', res.data.token);
    setOrgAuthToken(res.data.token);

    dispatch(loadOrg());
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({ type: ORG_LOGIN_FAIL });
  }
};

// ─── Logout organization
export const logoutOrg = () => (dispatch) => {
  localStorage.removeItem('org_token');
  setOrgAuthToken(null);
  dispatch({ type: ORG_LOGOUT });
};
