import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Feed from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import OrgPrivateRoute from './components/routing/OrgPrivateRoute';

// Organization
import OrgLogin from './components/org-auth/OrgLogin';
import OrgRegister from './components/org-auth/OrgRegister';
import OrgDashboard from './components/org/OrgDashboard';
import PostJob from './components/org/PostJob';
import OrgApplications from './components/org/OrgApplications';

// Jobs
import Jobs from './components/jobs/Jobs';
import JobDetail from './components/jobs/JobDetail';

import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { loadOrg } from './actions/org';
import setAuthToken from './utils/setAuthToken';
import setOrgAuthToken from './utils/setOrgAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (localStorage.org_token) {
      setOrgAuthToken(localStorage.org_token);
    }
    store.dispatch(loadUser());
    store.dispatch(loadOrg());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profile/:id" element={<Profile />} />

          {/* Jobs (public browsing, private applying) */}
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />

          {/* Developer private */}
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route path="feed" element={<PrivateRoute component={Feed} />} />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} />

          {/* Organization auth */}
          <Route path="org/login" element={<OrgLogin />} />
          <Route path="org/register" element={<OrgRegister />} />

          {/* Organization private */}
          <Route
            path="org/dashboard"
            element={<OrgPrivateRoute component={OrgDashboard} />}
          />
          <Route
            path="org/post-job"
            element={<OrgPrivateRoute component={PostJob} />}
          />
          <Route
            path="org/applications"
            element={<OrgPrivateRoute component={OrgApplications} />}
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
