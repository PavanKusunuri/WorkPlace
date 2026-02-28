import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginOrg } from '../../actions/org';

const OrgLogin = ({ loginOrg, org: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginOrg(email, password);
  };

  if (isAuthenticated) return <Navigate to="/org/dashboard" />;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up" style={{ animationFillMode: 'forwards' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Organization Sign In</h1>
          <p className="text-white/40 text-sm mt-1">Manage your jobs and talent pipeline</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="hr@company.com"
                className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Your password"
                className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            New organization?{' '}
            <Link to="/org/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Register here
            </Link>
          </p>
          <p className="text-center text-white/30 text-xs mt-2">
            Are you a developer?{' '}
            <Link to="/login" className="text-white/50 hover:text-white transition-colors">
              Developer sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

OrgLogin.propTypes = {
  loginOrg: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ org: state.org });

export default connect(mapStateToProps, { loginOrg })(OrgLogin);
