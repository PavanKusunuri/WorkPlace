'use client'


import React, { lazy, Suspense, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "../store";
// import "../App.scss";
import setAuthToken from "../utils/setAuthToken";
// import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
// import LandingPage from "./landing/Landing.jsx";
const Routess = lazy(() => import("../components/routing/Routes"));

if (typeof window !== 'undefined') {

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
}

const App = ({ Component, pageProps}) => {
  return (
    <Provider store={store}>
              <Component {...pageProps} />

      {/* <Router> */}
          {/* <Navbar /> */}
          {/* <Routes> */}
          {/* <Fragment> */}

            {/* <ErrorBoundary> */}
              {/* <Suspense fallback={<div>...Loading</div>}> */}
                {/* <Route path="/" element={LandingPage} /> */}
                {/* <Route component={Routess} /> */}
              {/* </Suspense> */}
            {/* </ErrorBoundary> */}
            {/* </Fragment> */}

          {/* </Routes> */}
      {/* </Router> */}
    </Provider>
  );
};
export default App;
