import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getOrgJobs, deleteJob } from '../../actions/job';
import { logoutOrg } from '../../actions/org';

const statusColors = {
  Open: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  Closed: 'bg-red-500/15 text-red-400 border border-red-500/20',
  'On Hold': 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
};

const OrgDashboard = ({ getOrgJobs, deleteJob, logoutOrg, org: { org }, job: { orgJobs, loading } }) => {
  useEffect(() => {
    getOrgJobs();
  }, [getOrgJobs]);

  if (!org) return <Spinner />;

  const totalJobs = orgJobs.length;
  const openJobs = orgJobs.filter((j) => j.status === 'Open').length;

  return (
    <section className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Org header */}
        <div className="glass rounded-3xl p-6 border border-white/10 mb-8 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-5">
            {org.logo ? (
              <img src={org.logo} alt={org.name} className="w-16 h-16 rounded-2xl object-contain bg-white/5 p-1" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                {org.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-white">{org.name}</h1>
              <p className="text-white/50 text-sm">{org.industry} · {org.location}</p>
              <p className="text-white/30 text-xs mt-0.5">{org.employeesCount} employees · Est. {org.establishedYear}</p>
            </div>
          </div>
          <button
            onClick={logoutOrg}
            className="px-4 py-2 rounded-xl glass border border-white/10 text-white/60 hover:text-white text-sm transition-all"
          >
            Sign out
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { label: 'Total Jobs', value: totalJobs },
            { label: 'Open Positions', value: openJobs },
            { label: 'Industry', value: org.industry },
            { label: 'Team Size', value: org.employeesCount }
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-white/40 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/org/post-job"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post a Job
          </Link>
          <Link
            to="/org/applications"
            className="px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Applications
          </Link>
        </div>

        {/* Jobs list */}
        <div className="animate-slide-up">
          <h2 className="text-white font-semibold text-lg mb-4">Your Job Postings</h2>

          {loading ? (
            <Spinner />
          ) : orgJobs.length === 0 ? (
            <div className="glass rounded-2xl p-10 border border-white/10 text-center">
              <p className="text-white/40">No jobs posted yet.</p>
              <Link to="/org/post-job" className="mt-3 inline-block text-indigo-400 text-sm hover:text-indigo-300">
                Post your first job →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orgJobs.map((job) => (
                <div key={job._id} className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-white font-medium truncate">{job.title}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">
                      {job.jobType} · {job.workMode} · {job.location}
                      {job.openings > 1 && ` · ${job.openings} openings`}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">
                      Posted {new Date(job.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/org/applications?job=${job._id}`}
                      className="px-3 py-1.5 rounded-lg glass text-white/60 hover:text-white text-xs border border-white/10 transition-all"
                    >
                      View Apps
                    </Link>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="px-3 py-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

OrgDashboard.propTypes = {
  getOrgJobs: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  logoutOrg: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ org: state.org, job: state.job });

export default connect(mapStateToProps, { getOrgJobs, deleteJob, logoutOrg })(OrgDashboard);
