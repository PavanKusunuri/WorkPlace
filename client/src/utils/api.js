import axios from 'axios';
import store from '../store';
import { LOGOUT, ORG_LOGOUT } from '../actions/types';

// Create an instance of axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const url = err.config?.url || '';
      // If the request was to an org endpoint, log out the org, not the user
      if (
        url.startsWith('/organizations') ||
        url.startsWith('/jobs/org') ||
        url.startsWith('/jobs/applications/org')
      ) {
        store.dispatch({ type: ORG_LOGOUT });
      } else {
        store.dispatch({ type: LOGOUT });
      }
    }
    return Promise.reject(err);
  }
);

export default api;
