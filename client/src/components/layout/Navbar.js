import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <Fragment>
      <Link
        to="/feed"
        className="text-white/60 hover:text-white text-sm transition-colors duration-150"
      >
        Feed
      </Link>
      <Link
        to="/profiles"
        className="text-white/60 hover:text-white text-sm transition-colors duration-150"
      >
        Developers
      </Link>
      <Link
        to="/dashboard"
        className="text-white/60 hover:text-white text-sm transition-colors duration-150"
      >
        Dashboard
      </Link>
      <button
        onClick={logout}
        className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200"
      >
        Sign out
      </button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link
        to="/profiles"
        className="text-white/60 hover:text-white text-sm transition-colors duration-150"
      >
        Developers
      </Link>
      <Link
        to="/login"
        className="text-white/60 hover:text-white text-sm transition-colors duration-150"
      >
        Sign in
      </Link>
      <Link
        to="/register"
        className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-95 transition-all duration-150"
      >
        Get started
      </Link>
    </Fragment>
  );

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl opacity-0 animate-slide-down"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform duration-150">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            WorkPlace
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
