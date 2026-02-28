import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getJobs } from '../../actions/job';

const JOB_TYPE_COLORS = {
  'Full-time': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Part-time': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Contract: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Internship: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Freelance: 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
};

const WORK_MODE_ICONS = {
  Remote: '🏠',
  'On-site': '🏢',
  Hybrid: '🔀'
};

const Jobs = ({ getJobs, job: { jobs, loading } }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      j.title.toLowerCase().includes(q) ||
      j.organization?.name?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q) ||
      j.skills.some((s) => s.toLowerCase().includes(q));
    const matchType = !typeFilter || j.jobType === typeFilter;
    const matchMode = !modeFilter || j.workMode === modeFilter;
    return matchSearch && matchType && matchMode;
  });

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return null;
    const fmt = (n) =>
      n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`;
    const min = salary.min ? fmt(salary.min) : null;
    const max = salary.max ? fmt(salary.max) : null;
    const range = min && max ? `${min}–${max}` : min || max;
    return `${salary.currency} ${range}/${salary.period === 'year' ? 'yr' : 'mo'}`;
  };

  return (
    <section className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient mb-2">Find Jobs</h1>
          <p className="text-white/40 text-sm">{jobs.length} open position{jobs.length !== 1 ? 's' : ''} from top organizations</p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 border border-white/10 mb-8 flex flex-col sm:flex-row gap-3 animate-slide-up">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, skill, location…"
            className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none px-2"
          />
          <div className="flex gap-3 shrink-0">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/5 text-white/70 text-xs rounded-lg px-3 py-2 outline-none border border-white/10"
            >
              <option value="" className="bg-zinc-900">All Types</option>
              {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((t) => (
                <option key={t} value={t} className="bg-zinc-900">{t}</option>
              ))}
            </select>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="bg-white/5 text-white/70 text-xs rounded-lg px-3 py-2 outline-none border border-white/10"
            >
              <option value="" className="bg-zinc-900">All Modes</option>
              {['Remote', 'On-site', 'Hybrid'].map((m) => (
                <option key={m} value={m} className="bg-zinc-900">{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs list */}
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 border border-white/10 text-center">
            <p className="text-white/40 text-lg">No jobs match your search.</p>
          </div>
        ) : (
          <div className="space-y-4 animate-slide-up">
            {filtered.map((job) => {
              const salaryStr = formatSalary(job.salary);
              return (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="block glass rounded-2xl p-5 border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    {job.organization?.logo ? (
                      <img
                        src={job.organization.logo}
                        alt={job.organization.name}
                        className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {job.organization?.name?.charAt(0) || '?'}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h2 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">{job.title}</h2>
                          <p className="text-white/50 text-sm">{job.organization?.name}</p>
                        </div>
                        {salaryStr && (
                          <p className="text-emerald-400 text-sm font-medium shrink-0">{salaryStr}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${JOB_TYPE_COLORS[job.jobType] || ''}`}>
                          {job.jobType}
                        </span>
                        <span className="text-white/40 text-xs">
                          {WORK_MODE_ICONS[job.workMode]} {job.workMode}
                        </span>
                        <span className="text-white/40 text-xs">📍 {job.location}</span>
                        {job.experienceRequired && (
                          <span className="text-white/40 text-xs">🎯 {job.experienceRequired}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.skills.slice(0, 5).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 text-white/50 text-xs border border-white/10">
                            {s}
                          </span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="text-white/30 text-xs">+{job.skills.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <p className="text-white/25 text-xs">
                      Posted {new Date(job.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {job.applicationDeadline && ` · Deadline ${new Date(job.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </p>
                    <span className="text-indigo-400 text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                      View & Apply →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ job: state.job });

export default connect(mapStateToProps, { getJobs })(Jobs);
