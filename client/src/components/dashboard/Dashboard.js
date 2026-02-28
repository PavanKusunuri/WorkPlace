import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {
  getCurrentProfile,
  deleteAccount,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest
} from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  auth: { user },
  profile: { profile, followRequests }
}) => {
  const safeFollowRequests = Array.isArray(followRequests)
    ? followRequests
    : [];
  useEffect(() => {
    getCurrentProfile();
    getFollowRequests();
  }, [getCurrentProfile, getFollowRequests]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          {/* Follow Requests Section */}
          {safeFollowRequests.length > 0 && (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '24px'
              }}
            >
              <h2
                style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🔔 Follow Requests
                <span
                  style={{
                    background: 'linear-gradient(to right, #7c3aed, #2563eb)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    padding: '2px 8px'
                  }}
                >
                  {safeFollowRequests.length}
                </span>
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {safeFollowRequests.map((req) => (
                  <div
                    key={req._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      {req.user && req.user.avatar && (
                        <img
                          src={req.user.avatar}
                          alt={req.user.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                      <div>
                        <p
                          style={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '14px',
                            margin: 0
                          }}
                        >
                          {req.user ? req.user.name : 'Unknown User'}
                        </p>
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '12px',
                            margin: 0
                          }}
                        >
                          Wants to follow you
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() =>
                          acceptFollowRequest(req.user ? req.user._id : req._id)
                        }
                        style={{
                          background:
                            'linear-gradient(to right, #7c3aed, #2563eb)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          rejectFollowRequest(req.user ? req.user._id : req._id)
                        }
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getFollowRequests: PropTypes.func.isRequired,
  acceptFollowRequest: PropTypes.func.isRequired,
  rejectFollowRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest
})(Dashboard);

