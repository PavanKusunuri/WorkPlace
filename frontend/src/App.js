import React, { lazy, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
const LandingPage = lazy(() => import("./components/layout/Landing.jsx"));

const Register = lazy(() => import("./modules/Authorization/Registration"));
const Login = lazy(() => import("./modules/Authorization/Login"));
const Home = lazy(() => import("./components/dashboard/Dashboard"));
const CreateProfile = lazy(() => import("./components/profile-froms/CreateProfile"));
const EditProfile = lazy(() => import("./components/profile-froms/EditProfile"));
const Profiles = lazy(() => import("./components/profiles/Profiles"));
const AddExperience = lazy(() => import("./components/profile-froms/AddExperience"));
const AddEducation = lazy(() => import("./components/profile-froms/AddEducation"));
// const PrivateRoute = lazy(() => import("../routing/PrivateRoute"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Posts = lazy(() => import("./components/posts/Posts"));
const Post = lazy(() => import("./components/post/Post"));
const EmployersDashboard = lazy(() => import('./modules/employers/Employers'))
// const Routes = lazy(() => import("./components/routing/Routes"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<div>...Loading</div>}>
                <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/employers" component={EmployersDashboard} />
          <Route
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <Route exact path="/add-education" component={AddEducation} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Post} />

                {/* <Route exact component={Routes} /> */}
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
