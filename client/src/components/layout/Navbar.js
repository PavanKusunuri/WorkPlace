import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }}) => {
  const authLinks = (
    <ul className="flex space-x-4">
      <form>
       <input type="text" placeholder="Search.." />
       </form>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/posts">Home</Link>
      </li>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/developers">My Network</Link>
      </li>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/jobs">Jobs</Link>
      </li>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/messages">Messaging</Link>
      </li>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/notifications">Notifications</Link>
      </li>
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/me">Me</Link>
      </li>
      <hr />
      <li className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
        <Link to="/business">
          <span className="hide-sm">Business</span>
        </Link>
      </li>
    </ul>
  );

     const guestLinks = (
    <ul>

<li class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
<Link to="/profiles">Developers</Link>

  </li>
            <li  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
            <Link to="/register">Register</Link> 
            
              </li>
            <li class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
             <Link to="/login">Login</Link> 
            </li>


    </ul>
  );

  return (
    <nav className="bg-white-800 text-black">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex min-height-full items-center justify-between align-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          </div>
        </div>
      </div>

  
   

     

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
