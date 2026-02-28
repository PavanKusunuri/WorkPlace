import api from '../utils/api';

const setOrgAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-org-token'] = token;
  } else {
    delete api.defaults.headers.common['x-org-token'];
  }
};

export default setOrgAuthToken;
