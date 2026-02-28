import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const fields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Appleseed'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com'
  },
  { name: 'password', label: 'Password', type: 'password', placeholder: '' },
  {
    name: 'password2',
    label: 'Confirm Password',
    type: 'password',
    placeholder: ''
  }
];

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [focused, setFocused] = useState('');

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-32 right-1/4 w-[440px] h-[440px] bg-blue-700 rounded-full blur-[130px] opacity-22 animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-700 rounded-full blur-[120px] opacity-20 animate-pulse-glow-slow" />
        <div
          className="absolute top-1/2 -left-20 w-[280px] h-[280px] bg-cyan-700 rounded-full blur-[100px] opacity-15 animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-sm opacity-0 animate-slide-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-600/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <div className="p-8 rounded-3xl glass shadow-2xl">
          <h2 className="text-[22px] font-semibold text-white mb-1 tracking-tight">
            Create account
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Join thousands of developers today
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {fields.map(({ name, label, type, placeholder }, i) => (
              <div
                key={name}
                className="opacity-0 animate-slide-up"
                style={{
                  animationFillMode: 'forwards',
                  animationDelay: `${0.1 * (i + 1)}s`
                }}
              >
                <label className="block text-xs font-medium text-white/50 mb-1.5 tracking-wide uppercase">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={onChange}
                  onFocus={() => setFocused(name)}
                  onBlur={() => setFocused('')}
                  required
                  placeholder={placeholder}
                  className={`glass-input w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 transition-all duration-200 ${focused === name ? 'ring-1 ring-white/20' : ''}`}
                />
              </div>
            ))}

            <p className="text-white/25 text-xs leading-relaxed pt-1">
              Use a Gravatar email to automatically show a profile picture.
            </p>

            <button
              type="submit"
              className="opacity-0 animate-slide-up w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-200"
              style={{ animationFillMode: 'forwards', animationDelay: '0.55s' }}
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/30">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-150"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/20 leading-relaxed px-4">
          By creating an account you agree to our{' '}
          <button
            type="button"
            className="text-white/35 hover:text-white/55 transition-colors underline underline-offset-2"
          >
            Terms
          </button>{' '}
          &amp;{' '}
          <button
            type="button"
            className="text-white/35 hover:text-white/55 transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </button>
          .
        </p>

        <div className="mt-4 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors duration-150"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
