import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {/* Header */}
            <div className="mb-10 animate-fade-in">
              <h1 className="text-4xl font-bold text-gradient mb-2">Developers</h1>
              <p className="text-white/50 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Browse and connect with developers
              </p>
            </div>

            {/* Grid */}
            {profiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="glass rounded-3xl p-12 text-center border border-white/10">
                <p className="text-white/40 text-lg">No developers found yet.</p>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

