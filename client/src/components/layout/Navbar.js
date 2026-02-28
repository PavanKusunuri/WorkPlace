import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { logoutOrg } from '../../actions/org';

const navLink =
  'text-white/60 hover:text-white text-sm transition-colors duration-150';

const Navbar = ({
  auth: { isAuthenticated: userAuth },
  org: { isAuthenticated: orgAuth },
  logout,
  logoutOrg
}) => {
  // ── Organization logged-in links ─────────────────────────────────────────
  const orgLinks = (
    <Fragment>
      <Link to="/org/dashboard" className={navLink}>
        Dashboard
      </Link>
      <Link to="/org/post-job" className={navLink}>
        Post a Job
      </Link>
      <Link to="/org/applications" className={navLink}>
        Applications
      </Link>
      <Link to="/jobs" className={navLink}>
        Browse Jobs
      </Link>
      <button
        onClick={logoutOrg}
        className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200"
      >
        Sign out
      </button>
    </Fragment>
  );

  // ── Developer logged-in links ─────────────────────────────────────────────
  const authLinks = (
    <Fragment>
      <Link to="/feed" className={navLink}>
        Feed
      </Link>
      <Link to="/profiles" className={navLink}>
        Developers
      </Link>
      <Link to="/jobs" className={navLink}>
        Jobs
      </Link>
      <Link to="/dashboard" className={navLink}>
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

  // ── Guest links ───────────────────────────────────────────────────────────
  const guestLinks = (
    <Fragment>
      <Link to="/profiles" className={navLink}>
        Developers
      </Link>
      <Link to="/jobs" className={navLink}>
        Jobs
      </Link>
      <Link to="/login" className={navLink}>
        Sign in
      </Link>
      <Link to="/org/login" className={navLink + ' hidden sm:inline'}>
        For Organizations
      </Link>
      <Link
        to="/register"
        className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-95 transition-all duration-150"
      >
        Get started
      </Link>
    </Fragment>
  );

  const links = orgAuth ? orgLinks : userAuth ? authLinks : guestLinks;

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl opacity-0 animate-slide-down"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
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

        <div className="flex items-center gap-5">{links}</div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  logoutOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  org: state.org
});

export default connect(mapStateToProps, { logout, logoutOrg })(Navbar);
