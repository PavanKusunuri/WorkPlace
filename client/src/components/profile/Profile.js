import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import {
  getProfileById,
  followUser,
  unfollowUser,
  cancelFollowRequest
} from '../../actions/profile';

const Profile = ({
  getProfileById,
  followUser,
  unfollowUser,
  cancelFollowRequest,
  profile: { profile },
  auth
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (profile === null) return <Spinner />;

  const isOwnProfile =
    auth.isAuthenticated &&
    auth.loading === false &&
    auth.user._id === profile.user._id;

  const isFollowing =
    auth.isAuthenticated &&
    profile.user.followers &&
    profile.user.followers.some(
      (f) => f.user && f.user.toString() === auth.user._id
    );

  // Check if current user has a pending follow request to this profile
  const hasRequestedFollow =
    auth.isAuthenticated &&
    profile.user.followRequests &&
    profile.user.followRequests.some(
      (r) => r.user && r.user.toString() === auth.user._id
    );

  const isPrivate = profile.isPrivate;

  // Can view private content if own profile or following
  const canViewPrivateContent = isOwnProfile || isFollowing;

  const followerCount = profile.user.followers
    ? profile.user.followers.length
    : 0;
  const followingCount = profile.user.following
    ? profile.user.following.length
    : 0;

  const renderFollowButton = () => {
    if (isOwnProfile || !auth.isAuthenticated || auth.loading !== false)
      return null;

    if (isFollowing) {
      return (
        <button
          onClick={() => unfollowUser(profile.user._id)}
          className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 border border-white/10 hover:border-red-500/30"
        >
          Following ✓
        </button>
      );
    }

    if (hasRequestedFollow) {
      return (
        <button
          onClick={() => cancelFollowRequest(profile.user._id)}
          className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 border border-yellow-500/20"
        >
          Requested ·· Cancel
        </button>
      );
    }

    if (isPrivate) {
      return (
        <button
          onClick={() => followUser(profile.user._id)}
          className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20"
        >
          🔒 Request Follow
        </button>
      );
    }

    return (
      <button
        onClick={() => followUser(profile.user._id)}
        className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20"
      >
        + Follow
      </button>
    );
  };

  return (
    <section className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation row */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <Link
            to="/profiles"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
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
            All Developers
          </Link>

          <div className="flex items-center gap-3">
            {/* Privacy badge */}
            {isPrivate && (
              <span className="flex items-center gap-1 text-xs text-yellow-400/80 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                🔒 Private Profile
              </span>
            )}

            {/* Follower stats */}
            <div className="glass rounded-2xl px-4 py-2 flex items-center gap-4 text-sm">
              <span className="text-white/60">
                <span className="text-white font-semibold">
                  {followerCount}
                </span>{' '}
                followers
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-white/60">
                <span className="text-white font-semibold">
                  {followingCount}
                </span>{' '}
                following
              </span>
            </div>

            {isOwnProfile ? (
              <Link
                to="/edit-profile"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/10"
              >
                Edit Profile
              </Link>
            ) : (
              renderFollowButton()
            )}
          </div>
        </div>

        {/* Profile sections */}
        <div className="space-y-6 animate-slide-up">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <ProfileTop profile={profile} />
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10">
            <ProfileAbout profile={profile} />
          </div>

          {/* Private profile wall */}
          {isPrivate && !canViewPrivateContent ? (
            <div className="glass rounded-3xl p-10 border border-white/10 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                This profile is private
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Follow {profile.user.name} to see their experience, education,
                and activity.
              </p>
              {hasRequestedFollow ? (
                <button
                  onClick={() => cancelFollowRequest(profile.user._id)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 transition-all"
                >
                  Request Sent · Cancel
                </button>
              ) : (
                auth.isAuthenticated &&
                auth.loading === false && (
                  <button
                    onClick={() => followUser(profile.user._id)}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 transition-all"
                  >
                    Request to Follow
                  </button>
                )
              )}
            </div>
          ) : (
            <>
              <div className="glass rounded-3xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Experience
                </h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <p className="text-white/40 text-sm">
                    No experience credentials
                  </p>
                )}
              </div>

              <div className="glass rounded-3xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Education
                </h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <p className="text-white/40 text-sm">
                    No education credentials
                  </p>
                )}
              </div>

              {profile.githubusername && (
                <div className="glass rounded-3xl p-6 border border-white/10">
                  <ProfileGithub username={profile.githubusername} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  cancelFollowRequest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  followUser,
  unfollowUser,
  cancelFollowRequest
})(Profile);

