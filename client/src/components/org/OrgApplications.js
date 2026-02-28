import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getOrgApplications, updateApplicationStatus } from '../../actions/job';

const STATUS_OPTIONS = ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Accepted'];

const statusStyle = {
  Pending: 'bg-zinc-500/15 text-zinc-400 border border-zinc-500/20',
  'Under Review': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  Shortlisted: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  Rejected: 'bg-red-500/15 text-red-400 border border-red-500/20',
  Accepted: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
};

const OrgApplications = ({
  getOrgApplications,
  updateApplicationStatus,
  job: { orgApplications, loading }
}) => {
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get('job');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getOrgApplications();
  }, [getOrgApplications]);

  const filtered = jobFilter
    ? orgApplications.filter((a) => a.job?._id === jobFilter)
    : orgApplications;

  const grouped = filtered.reduce((acc, app) => {
    const key = app.job?._id || 'unknown';
    const label = app.job?.title || 'Unknown Job';
    if (!acc[key]) acc[key] = { label, apps: [] };
    acc[key].apps.push(app);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <Link to="/org/dashboard" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Applications</h1>
            <p className="text-white/40 text-sm mt-0.5">{filtered.length} application{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 border border-white/10 text-center">
            <p className="text-white/40 text-lg">No applications yet.</p>
            <p className="text-white/25 text-sm mt-2">Applications will appear here once candidates apply to your job postings.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {Object.entries(grouped).map(([jobId, { label, apps }]) => (
              <div key={jobId}>
                <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3 px-1">{label} · {apps.length}</h2>
                <div className="space-y-3">
                  {apps.map((app) => (
                    <div key={app._id} className="glass rounded-2xl border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                      {/* Header row */}
                      <div
                        className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                        onClick={() => setSelected(selected === app._id ? null : app._id)}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <img
                            src={app.applicant?.avatar || `https://ui-avatars.com/api/?name=${app.applicant?.name}&background=random`}
                            alt={app.applicant?.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate">{app.applicant?.name}</p>
                            <p className="text-white/40 text-xs">{app.applicant?.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[app.status]}`}>
                            {app.status}
                          </span>
                          <p className="text-white/30 text-xs hidden sm:block">
                            {new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <svg
                            className={`w-4 h-4 text-white/30 transition-transform ${selected === app._id ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {selected === app._id && (
                        <div className="border-t border-white/10 px-5 py-5 space-y-4">
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Cover Letter</p>
                            <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                              {app.coverLetter || 'Not provided.'}
                            </p>
                          </div>

                          {app.resumeUrl && (
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-2 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              View Resume
                            </a>
                          )}

                          {/* Status control */}
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Update Status</p>
                            <div className="flex flex-wrap gap-2">
                              {STATUS_OPTIONS.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateApplicationStatus(app._id, s)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    app.status === s
                                      ? statusStyle[s] + ' ring-1 ring-white/20'
                                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

OrgApplications.propTypes = {
  getOrgApplications: PropTypes.func.isRequired,
  updateApplicationStatus: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ job: state.job });

export default connect(mapStateToProps, { getOrgApplications, updateApplicationStatus })(OrgApplications);
