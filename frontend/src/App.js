import React, { lazy, Suspense, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import setAuthToken from "./utils/setAuthToken";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
const LandingPage = lazy(() => import("./components/layout/Landing.jsx"));
const Routess = lazy(() => import("./components/routing/Routes"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Routes>
            <ErrorBoundary>
              <Suspense fallback={<div>...Loading</div>}>
                <Route exact path="/" component={LandingPage} />
                <Route component={Routess} />
              </Suspense>
            </ErrorBoundary>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
