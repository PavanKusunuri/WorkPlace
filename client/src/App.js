import React, { lazy, Suspense, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Lazy Imports

const LandingPage = lazy(() => import("./components/layout/Landing"));
const Routes = lazy(() => import("./components/routing/Routes"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Suspense fallback={<div>...Loading</div>}>
              <Route exact path="/" component={LandingPage} />
              <Route component={Routes} />
            </Suspense>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
