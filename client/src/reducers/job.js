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
} from '../actions/types';

const initialState = {
  jobs: [],          // public jobs list
  job: null,         // single job detail
  orgJobs: [],       // org's own posted jobs
  orgApplications: [], // all applications received by org
  myApplications: [], // applications made by the developer
  loading: true,
  error: {}
};

function jobReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return { ...state, jobs: payload, loading: false };

    case GET_JOB:
      return { ...state, job: payload, loading: false };

    case GET_ORG_JOBS:
      return { ...state, orgJobs: payload, loading: false };

    case ADD_JOB:
      return { ...state, orgJobs: [payload, ...state.orgJobs], loading: false };

    case UPDATE_JOB:
      return {
        ...state,
        orgJobs: state.orgJobs.map((j) => (j._id === payload._id ? payload : j)),
        job: state.job?._id === payload._id ? payload : state.job,
        loading: false
      };

    case DELETE_JOB:
      return {
        ...state,
        orgJobs: state.orgJobs.filter((j) => j._id !== payload),
        jobs: state.jobs.filter((j) => j._id !== payload)
      };

    case GET_ORG_APPLICATIONS:
      return { ...state, orgApplications: payload, loading: false };

    case GET_MY_APPLICATIONS:
      return { ...state, myApplications: payload, loading: false };

    case APPLY_JOB:
      return { ...state, myApplications: [payload, ...state.myApplications] };

    case UPDATE_APPLICATION_STATUS:
      return {
        ...state,
        orgApplications: state.orgApplications.map((a) =>
          a._id === payload._id ? payload : a
        )
      };

    case JOB_ERROR:
    case APPLICATION_ERROR:
      return { ...state, error: payload || {}, loading: false };

    default:
      return state;
  }
}

export default jobReducer;
