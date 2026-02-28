import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postJob } from '../../actions/job';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const WORK_MODES = ['On-site', 'Remote', 'Hybrid'];
const NOTICE_PERIODS = ['Immediate', '15 days', '30 days', '45 days', '60 days', '90 days'];
const EXPERIENCE_OPTIONS = [
  'Fresher (0 years)', '0–1 years', '1–2 years', '2–4 years',
  '4–6 years', '6–8 years', '8–10 years', '10+ years'
];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AED', 'SGD'];

const PostJob = ({ postJob }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobType: '',
    workMode: '',
    location: '',
    noticePeriod: '',
    experienceRequired: '',
    openings: 1,
    applicationDeadline: '',
    skillInput: '',
    salary: { min: '', max: '', currency: 'USD', period: 'year' }
  });

  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});

  const {
    title, description, jobType, workMode, location,
    noticePeriod, experienceRequired, openings,
    applicationDeadline, skillInput, salary
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSalaryChange = (e) =>
    setFormData({ ...formData, salary: { ...salary, [e.target.name]: e.target.value } });

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setFormData({ ...formData, skillInput: '' });
    }
  };

  const removeSkill = (s) => setSkills(skills.filter((sk) => sk !== s));

  const onSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const validate = () => {
    const errs = {};
    if (!title) errs.title = 'Required';
    if (!description) errs.description = 'Required';
    if (!jobType) errs.jobType = 'Required';
    if (!workMode) errs.workMode = 'Required';
    if (!location) errs.location = 'Required';
    if (!noticePeriod) errs.noticePeriod = 'Required';
    if (!experienceRequired) errs.experienceRequired = 'Required';
    if (skills.length === 0) errs.skills = 'Add at least one skill';
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    postJob(
      {
        title, description, jobType, workMode, location, noticePeriod,
        experienceRequired, skills, openings: +openings,
        applicationDeadline: applicationDeadline || undefined,
        salary: {
          min: +salary.min || 0,
          max: +salary.max || 0,
          currency: salary.currency,
          period: salary.period
        }
      },
      navigate
    );
  };

  // ── Reusable sub-components ─────────────────────────────────────────────────
  const FieldLabel = ({ text }) => (
    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">{text}</label>
  );

  const inputCls = (field) =>
    `glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none w-full transition-all
    ${errors[field] ? 'border border-red-500/50' : 'focus:border-indigo-500/50'}`;

  const selectCls = (field) =>
    `glass-input rounded-xl px-4 py-3 text-sm text-white outline-none w-full transition-all bg-transparent appearance-none
    ${errors[field] ? 'border border-red-500/50' : 'focus:border-indigo-500/50'}`;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto animate-fade-in">
        {/* Back */}
        <Link to="/org/dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Post a Job</h1>
          <p className="text-white/40 text-sm mt-1">Fill in the details to attract the right candidates</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* ── Section 1: Basic Info ─────────────────────────────────────── */}
          <div className="glass rounded-3xl p-6 border border-white/10 space-y-5">
            <h2 className="text-white font-semibold text-base">Job Details</h2>

            <div className="flex flex-col gap-1.5">
              <FieldLabel text="Job Title" />
              <input name="title" value={title} onChange={onChange} placeholder="e.g. Senior React Developer"
                className={inputCls('title')} />
              {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel text="Job Description" />
              <textarea
                name="description" value={description} onChange={onChange} rows={6}
                placeholder="Describe the role, responsibilities, what success looks like…"
                className={`glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none transition-all ${
                  errors.description ? 'border border-red-500/50' : 'focus:border-indigo-500/50'
                }`}
              />
              {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Job Type" />
                <select name="jobType" value={jobType} onChange={onChange} className={selectCls('jobType')}>
                  <option value="" className="bg-zinc-900">Select…</option>
                  {JOB_TYPES.map((t) => <option key={t} value={t} className="bg-zinc-900">{t}</option>)}
                </select>
                {errors.jobType && <p className="text-red-400 text-xs">{errors.jobType}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Work Mode" />
                <select name="workMode" value={workMode} onChange={onChange} className={selectCls('workMode')}>
                  <option value="" className="bg-zinc-900">Select…</option>
                  {WORK_MODES.map((m) => <option key={m} value={m} className="bg-zinc-900">{m}</option>)}
                </select>
                {errors.workMode && <p className="text-red-400 text-xs">{errors.workMode}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Location" />
                <input name="location" value={location} onChange={onChange} placeholder="City, Country or Remote"
                  className={inputCls('location')} />
                {errors.location && <p className="text-red-400 text-xs">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* ── Section 2: Requirements ───────────────────────────────────── */}
          <div className="glass rounded-3xl p-6 border border-white/10 space-y-5">
            <h2 className="text-white font-semibold text-base">Requirements</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Experience Required" />
                <select name="experienceRequired" value={experienceRequired} onChange={onChange} className={selectCls('experienceRequired')}>
                  <option value="" className="bg-zinc-900">Select…</option>
                  {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-zinc-900">{o}</option>)}
                </select>
                {errors.experienceRequired && <p className="text-red-400 text-xs">{errors.experienceRequired}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Notice Period" />
                <select name="noticePeriod" value={noticePeriod} onChange={onChange} className={selectCls('noticePeriod')}>
                  <option value="" className="bg-zinc-900">Select…</option>
                  {NOTICE_PERIODS.map((n) => <option key={n} value={n} className="bg-zinc-900">{n}</option>)}
                </select>
                {errors.noticePeriod && <p className="text-red-400 text-xs">{errors.noticePeriod}</p>}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2">
              <FieldLabel text="Required Skills" />
              <div className="flex gap-2">
                <input
                  name="skillInput" value={skillInput} onChange={onChange} onKeyDown={onSkillKeyDown}
                  placeholder="Type a skill and press Enter…"
                  className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none flex-1 focus:border-indigo-500/50 transition-all"
                />
                <button type="button" onClick={addSkill}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all">
                  Add
                </button>
              </div>
              {errors.skills && <p className="text-red-400 text-xs">{errors.skills}</p>}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 text-xs font-medium">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-400 transition-colors">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Section 3: Compensation ───────────────────────────────────── */}
          <div className="glass rounded-3xl p-6 border border-white/10 space-y-5">
            <h2 className="text-white font-semibold text-base">Compensation & Openings</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Min Salary" />
                <input type="number" name="min" value={salary.min} onChange={onSalaryChange}
                  placeholder="e.g. 80000" className={inputCls('salaryMin')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Max Salary" />
                <input type="number" name="max" value={salary.max} onChange={onSalaryChange}
                  placeholder="e.g. 120000" className={inputCls('salaryMax')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Currency" />
                <select name="currency" value={salary.currency} onChange={onSalaryChange} className="glass-input rounded-xl px-4 py-3 text-sm text-white outline-none bg-transparent appearance-none focus:border-indigo-500/50">
                  {CURRENCIES.map((c) => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Per" />
                <select name="period" value={salary.period} onChange={onSalaryChange} className="glass-input rounded-xl px-4 py-3 text-sm text-white outline-none bg-transparent appearance-none focus:border-indigo-500/50">
                  <option value="year" className="bg-zinc-900">Year</option>
                  <option value="month" className="bg-zinc-900">Month</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Number of Openings" />
                <input type="number" name="openings" value={openings} onChange={onChange} min={1}
                  className={inputCls('openings')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel text="Application Deadline (optional)" />
                <input type="date" name="applicationDeadline" value={applicationDeadline} onChange={onChange}
                  className={inputCls('applicationDeadline')} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button type="submit"
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]">
              Publish Job
            </button>
            <Link to="/org/dashboard"
              className="px-6 py-4 rounded-2xl glass border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

PostJob.propTypes = {
  postJob: PropTypes.func.isRequired
};

export default connect(null, { postJob })(PostJob);
