import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import Alert from "../layout/Alert";

const Register = lazy(() => import("../auth/Register"));
const Login = lazy(() => import("../auth/Login"));
const Home = lazy(() => import("../dashboard/Dashboard"));
const CreateProfile = lazy(() => import("../profile-froms/CreateProfile"));
const EditProfile = lazy(() => import("../profile-froms/EditProfile"));
const Profiles = lazy(() => import("../profiles/Profiles"));
const AddExperience = lazy(() => import("../profile-froms/AddExperience"));
const AddEducation = lazy(() => import("../profile-froms/AddEducation"));
const PrivateRoute = lazy(() => import("../routing/PrivateRoute"));
const Profile = lazy(() => import("../profile/Profile"));
const Posts = lazy(() => import("../posts/Posts"));
const Post = lazy(() => import("../post/Post"));
const EmployersDashboard = lazy(() => import('../../modules/employers/Employers'))
const NotFound = lazy(() => import("../layout/NotFound"));

export const Routes = () => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Suspense fallback={<div>...Loading</div>}>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/employers" component={EmployersDashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />

          <Route component={NotFound} />
        </Suspense>
      </Switch>
    </section>
  );
};

export default Routes;
