import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getJob, applyToJob } from '../../actions/job';

const JobDetail = ({
  getJob,
  applyToJob,
  job: { job, loading, myApplications },
  auth
}) => {
  const { id } = useParams();
  const [showApply, setShowApply] = useState(false);
  const [form, setForm] = useState({ coverLetter: '', resumeUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getJob(id);
  }, [getJob, id]);

  const hasApplied = myApplications?.some((a) => a.job?._id === id);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.coverLetter.trim()) return;
    await applyToJob(id, form);
    setSubmitted(true);
    setShowApply(false);
  };

  if (loading || !job) return <Spinner />;

  const org = job.organization;
  const salary = job.salary;
  const salaryStr =
    salary && (salary.min || salary.max)
      ? `${salary.currency} ${salary.min ? salary.min.toLocaleString() : ''}${salary.max ? '–' + salary.max.toLocaleString() : ''} / ${salary.period}`
      : null;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            {/* Header card */}
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                {org?.logo ? (
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-16 h-16 rounded-2xl object-contain bg-white/5 p-1 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
                    {org?.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                  <p className="text-white/60 text-sm mt-0.5">
                    {org?.name} · {org?.industry}
                  </p>
                  {org?.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors"
                    >
                      {org.website}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {job.jobType}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                  {job.workMode}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                  📍 {job.location}
                </span>
                {salaryStr && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    💰 {salaryStr}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">About the Role</h2>
              <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h2 className="text-white font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply form */}
            {showApply && (
              <div className="glass rounded-3xl p-6 border border-white/10 animate-slide-up">
                <h2 className="text-white font-semibold mb-4">
                  Your Application
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                      Cover Letter *
                    </label>
                    <textarea
                      value={form.coverLetter}
                      onChange={(e) =>
                        setForm({ ...form, coverLetter: e.target.value })
                      }
                      rows={6}
                      required
                      placeholder="Tell us why you're a great fit for this role…"
                      className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                      Resume URL (optional)
                    </label>
                    <input
                      type="url"
                      value={form.resumeUrl}
                      onChange={(e) =>
                        setForm({ ...form, resumeUrl: e.target.value })
                      }
                      placeholder="https://drive.google.com/..."
                      className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm transition-all"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApply(false)}
                      className="px-5 py-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white text-sm transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {submitted && (
              <div className="glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm animate-fade-in flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Application submitted! Good luck.
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4 animate-fade-in">
            {/* Apply CTA */}
            <div className="glass rounded-3xl p-5 border border-white/10 sticky top-24">
              {!auth.isAuthenticated ? (
                <div className="text-center space-y-3">
                  <p className="text-white/50 text-sm">Sign in to apply</p>
                  <Link
                    to="/login"
                    className="block w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-sm text-center transition-all"
                  >
                    Sign in
                  </Link>
                </div>
              ) : hasApplied || submitted ? (
                <div className="text-center py-3">
                  <div className="text-emerald-400 font-medium text-sm">
                    ✓ Applied
                  </div>
                  <p className="text-white/30 text-xs mt-1">
                    You've applied to this job
                  </p>
                </div>
              ) : job.status !== 'Open' ? (
                <div className="text-center py-3">
                  <div className="text-red-400 font-medium text-sm">
                    Applications Closed
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowApply(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20"
                >
                  Apply Now
                </button>
              )}
            </div>

            {/* Job info */}
            <div className="glass rounded-3xl p-5 border border-white/10 space-y-3">
              <h3 className="text-white font-semibold text-sm">Job Overview</h3>
              {[
                { label: 'Experience', value: job.experienceRequired },
                { label: 'Notice Period', value: job.noticePeriod },
                { label: 'Openings', value: job.openings },
                {
                  label: 'Deadline',
                  value: job.applicationDeadline
                    ? new Date(job.applicationDeadline).toLocaleDateString()
                    : 'Not specified'
                },
                {
                  label: 'Posted',
                  value: new Date(job.datePosted).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/70 text-right max-w-[60%]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* About org */}
            {org && (
              <div className="glass rounded-3xl p-5 border border-white/10 space-y-2">
                <h3 className="text-white font-semibold text-sm">
                  About {org.name}
                </h3>
                {org.description && (
                  <p className="text-white/50 text-xs leading-relaxed">
                    {org.description}
                  </p>
                )}
                <div className="space-y-1.5 pt-1">
                  {[
                    { label: 'Industry', value: org.industry },
                    {
                      label: 'Size',
                      value:
                        org.employeesCount && `${org.employeesCount} employees`
                    },
                    { label: 'Founded', value: org.establishedYear },
                    { label: 'HQ', value: org.location }
                  ]
                    .filter(({ value }) => value)
                    .map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-white/30">{label}</span>
                        <span className="text-white/60">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

JobDetail.propTypes = {
  getJob: PropTypes.func.isRequired,
  applyToJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ job: state.job, auth: state.auth });

export default connect(mapStateToProps, { getJob, applyToJob })(JobDetail);
