import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

    // !userInfo ? (
        //   <Redirect to="/login" />
        // ) : (
        //     <Component {...props} />
        //   )

  return (
    <Route
      {...rest}
      render={(props) =>
        <Component {...props} />
      }
    />
  )

};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default PrivateRoute;
