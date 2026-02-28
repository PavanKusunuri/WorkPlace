import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerOrg } from '../../actions/org';

const EMPLOYEE_OPTIONS = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'];
const YEAR = new Date().getFullYear();

const OrgRegister = ({ registerOrg, org: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    establishedYear: '',
    employeesCount: '',
    location: '',
    website: '',
    description: '',
    logo: ''
  });

  const [errors, setErrors] = useState({});

  const {
    name, email, password, confirmPassword,
    industry, establishedYear, employeesCount,
    location, website, description, logo
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!name) errs.name = 'Required';
    if (!email) errs.email = 'Required';
    if (!password || password.length < 6) errs.password = 'Min 6 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!industry) errs.industry = 'Required';
    if (!establishedYear || +establishedYear < 1800 || +establishedYear > YEAR)
      errs.establishedYear = `Enter a year between 1800 and ${YEAR}`;
    if (!employeesCount) errs.employeesCount = 'Required';
    if (!location) errs.location = 'Required';
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    registerOrg({
      name, email, password, industry,
      establishedYear: +establishedYear,
      employeesCount, location, website, description, logo
    });
  };

  if (isAuthenticated) return <Navigate to="/org/dashboard" />;

  const InputField = ({ label, name: n, type = 'text', placeholder }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        name={n}
        value={formData[n]}
        onChange={onChange}
        placeholder={placeholder}
        className={`glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all
          ${errors[n] ? 'border border-red-500/50 focus:border-red-400' : 'focus:border-purple-500/50'}`}
      />
      {errors[n] && <p className="text-red-400 text-xs">{errors[n]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Register Your Organization</h1>
          <p className="text-white/40 text-sm mt-1">Post jobs and find great talent</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Organization Name" name="name" placeholder="Google, Apple…" />
              <InputField label="Email" name="email" type="email" placeholder="hr@company.com" />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Password" name="password" type="password" placeholder="Min 6 characters" />
              <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat password" />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <InputField label="Industry" name="industry" placeholder="Technology, Finance…" />
              <InputField label="Established Year" name="establishedYear" type="number" placeholder={`e.g. 2010`} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Team Size</label>
                <select
                  name="employeesCount"
                  value={employeesCount}
                  onChange={onChange}
                  className={`glass-input rounded-xl px-4 py-3 text-sm text-white outline-none transition-all bg-transparent appearance-none
                    ${errors.employeesCount ? 'border border-red-500/50' : 'focus:border-purple-500/50'}`}
                >
                  <option value="" className="bg-zinc-900">Select…</option>
                  {EMPLOYEE_OPTIONS.map((o) => (
                    <option key={o} value={o} className="bg-zinc-900">{o}</option>
                  ))}
                </select>
                {errors.employeesCount && <p className="text-red-400 text-xs">{errors.employeesCount}</p>}
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Headquarters Location" name="location" placeholder="San Francisco, CA" />
              <InputField label="Website (optional)" name="website" placeholder="https://company.com" />
            </div>

            {/* Row 5 */}
            <InputField label="Logo URL (optional)" name="logo" placeholder="https://cdn.example.com/logo.png" />

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">About (optional)</label>
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                rows={3}
                placeholder="Brief description of your organization…"
                className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              Create Organization Account
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Already registered?{' '}
            <Link to="/org/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
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

OrgRegister.propTypes = {
  registerOrg: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ org: state.org });

export default connect(mapStateToProps, { registerOrg })(OrgRegister);
