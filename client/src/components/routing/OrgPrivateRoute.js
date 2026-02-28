import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const OrgPrivateRoute = ({
  component: Component,
  org: { isAuthenticated, loading }
}) => {
  if (loading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/org/login" />;
  return <Component />;
};

OrgPrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ org: state.org });

export default connect(mapStateToProps)(OrgPrivateRoute);
