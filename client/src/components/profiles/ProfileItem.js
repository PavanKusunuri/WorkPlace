import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/profile';

const ProfileItem = ({
  auth,
  followUser,
  unfollowUser,
  profile: {
    user: { _id, name, avatar, followers },
    status,
    company,
    location,
    skills
  }
}) => {
  const isOwnProfile = auth.isAuthenticated && auth.user._id === _id;
  const isFollowing =
    auth.isAuthenticated &&
    followers &&
    followers.some((f) => f.user && f.user.toString() === auth.user._id);

  const followerCount = followers ? followers.length : 0;

  return (
    <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-4 animate-fade-in">
      {/* Top row: avatar + info */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-lg truncate">{name}</h2>
          <p className="text-white/60 text-sm truncate">
            {status}
            {company && <span> · {company}</span>}
          </p>
          {location && (
            <p className="text-white/40 text-xs mt-0.5 truncate">{location}</p>
          )}
        </div>
        {/* Follower badge */}
        <div className="text-right shrink-0">
          <span className="text-white/50 text-xs">{followerCount}</span>
          <p className="text-white/30 text-xs">followers</p>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/70 border border-white/10"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <Link
          to={`/profile/${_id}`}
          className="flex-1 text-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/10"
        >
          View Profile
        </Link>

        {!isOwnProfile && auth.isAuthenticated && (
          <button
            onClick={() => (isFollowing ? unfollowUser(_id) : followUser(_id))}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isFollowing
                ? 'bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 border border-white/10 hover:border-red-500/30'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
  ProfileItem
);

