import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_JOBS,
  GET_JOB,
  GET_ORG_JOBS,
  ADD_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_ERROR,
  GET_ORG_APPLICATIONS,
  GET_MY_APPLICATIONS,
  APPLY_JOB,
  UPDATE_APPLICATION_STATUS,
  APPLICATION_ERROR
} from './types';

// ─── Get all public jobs ──────────────────────────────────────────────────────
export const getJobs = (filters = {}) => async (dispatch) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/jobs${params ? '?' + params : ''}`);
    dispatch({ type: GET_JOBS, payload: res.data });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Get single job ───────────────────────────────────────────────────────────
export const getJob = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/jobs/${id}`);
    dispatch({ type: GET_JOB, payload: res.data });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Get org's own jobs ───────────────────────────────────────────────────────
export const getOrgJobs = () => async (dispatch) => {
  try {
    const res = await api.get('/jobs/org');
    dispatch({ type: GET_ORG_JOBS, payload: res.data });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Post a new job ───────────────────────────────────────────────────────────
export const postJob = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/jobs', formData);
    dispatch({ type: ADD_JOB, payload: res.data });
    dispatch(setAlert('Job posted successfully!', 'success'));
    if (navigate) navigate('/org/dashboard');
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Update a job ─────────────────────────────────────────────────────────────
export const updateJob = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/jobs/${id}`, formData);
    dispatch({ type: UPDATE_JOB, payload: res.data });
    dispatch(setAlert('Job updated', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Delete a job ─────────────────────────────────────────────────────────────
export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.delete(`/jobs/${id}`);
    dispatch({ type: DELETE_JOB, payload: id });
    dispatch(setAlert('Job deleted', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
};

// ─── Apply to a job (developer) ───────────────────────────────────────────────
export const applyToJob = (jobId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/jobs/${jobId}/apply`, formData);
    dispatch({ type: APPLY_JOB, payload: res.data });
    dispatch(setAlert('Application submitted!', 'success'));
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    } else if (err.response?.data?.msg) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
    dispatch({ type: APPLICATION_ERROR });
  }
};

// ─── Get all applications for the org ─────────────────────────────────────────
export const getOrgApplications = () => async (dispatch) => {
  try {
    const res = await api.get('/jobs/applications/org');
    dispatch({ type: GET_ORG_APPLICATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: APPLICATION_ERROR });
  }
};

// ─── Get my applications (developer) ─────────────────────────────────────────
export const getMyApplications = () => async (dispatch) => {
  try {
    const res = await api.get('/jobs/applications/me');
    dispatch({ type: GET_MY_APPLICATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: APPLICATION_ERROR });
  }
};

// ─── Update application status (org) ──────────────────────────────────────────
export const updateApplicationStatus =
  (appId, status, orgNotes = '') =>
  async (dispatch) => {
    try {
      const res = await api.put(`/jobs/applications/${appId}/status`, {
        status,
        orgNotes
      });
      dispatch({ type: UPDATE_APPLICATION_STATUS, payload: res.data });
      dispatch(setAlert(`Status updated to ${status}`, 'success'));
    } catch (err) {
      dispatch({ type: APPLICATION_ERROR });
    }
  };
