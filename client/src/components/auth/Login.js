import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-4 py-16">

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] bg-purple-700 rounded-full blur-[130px] opacity-25 animate-pulse-glow" />
        <div className="absolute -bottom-24 right-1/4 w-[380px] h-[380px] bg-blue-700 rounded-full blur-[110px] opacity-20 animate-pulse-glow-slow" />
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm opacity-0 animate-slide-up"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Logo mark */}
        <div
          className="flex justify-center mb-8 opacity-0 animate-fade-in"
          style={{ animationFillMode: 'forwards', animationDelay: '0.25s' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-600/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Glass card */}
        <div className="p-8 rounded-3xl glass shadow-2xl">
          <h2 className="text-[22px] font-semibold text-white mb-1 tracking-tight">
            Welcome back
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Sign in to your developer account
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 tracking-wide uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
                placeholder="you@example.com"
                className={`glass-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 transition-all duration-200 ${focused === 'email' ? 'ring-1 ring-white/20' : ''}`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-white/50 tracking-wide uppercase">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-150"
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                required
                placeholder=""
                className={`glass-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 transition-all duration-200 ${focused === 'password' ? 'ring-1 ring-white/20' : ''}`}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/30">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-150"
            >
              Get started
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors duration-150"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
