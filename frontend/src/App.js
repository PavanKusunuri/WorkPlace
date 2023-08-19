import React, { lazy, Suspense, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import setAuthToken from "./utils/setAuthToken";
// import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import LandingPage from "./components/layout/Landing.jsx";
const Routess = lazy(() => import("./components/routing/Routes"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      {/* <Router> */}
          {/* <Navbar /> */}
          <Routes>
          <Fragment>

            {/* <ErrorBoundary> */}
              <Suspense fallback={<div>...Loading</div>}>
                <Route exact path="/" component={LandingPage} />
                {/* <Route component={Routess} /> */}
              </Suspense>
            {/* </ErrorBoundary> */}
            </Fragment>

          </Routes>
      {/* </Router> */}
    </Provider>
  );
};
export default App;
