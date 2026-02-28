import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import org from './org';
import job from './job';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  org,
  job
});
