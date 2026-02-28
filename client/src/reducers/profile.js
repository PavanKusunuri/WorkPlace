import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SEND_FOLLOW_REQUEST,
  CANCEL_FOLLOW_REQUEST,
  GET_FOLLOW_REQUESTS,
  ACCEPT_FOLLOW_REQUEST,
  REJECT_FOLLOW_REQUEST
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  followRequests: [],
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: []
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state,
        repos: []
      };
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        // Update the single profile view
        profile:
          state.profile && state.profile.user._id === action.payload.userId
            ? {
                ...state.profile,
                user: {
                  ...state.profile.user,
                  followers: action.payload.followers
                }
              }
            : state.profile,
        // Update the profiles list card
        profiles: state.profiles.map((p) =>
          p.user._id === action.payload.userId
            ? { ...p, user: { ...p.user, followers: action.payload.followers } }
            : p
        )
      };
    case SEND_FOLLOW_REQUEST:
      // Mark the profile's user as having a pending request from current user
      return {
        ...state,
        profile:
          state.profile && state.profile.user._id === action.payload.userId
            ? {
                ...state.profile,
                user: {
                  ...state.profile.user,
                  followRequests: action.payload.followRequests
                }
              }
            : state.profile
      };
    case CANCEL_FOLLOW_REQUEST:
      // Remove pending request indicator
      return {
        ...state,
        profile:
          state.profile && state.profile.user._id === action.payload.userId
            ? {
                ...state.profile,
                user: {
                  ...state.profile.user,
                  followRequests: state.profile.user.followRequests
                    ? state.profile.user.followRequests.filter(
                        (r) =>
                          r.user && r.user.toString() !== action.payload.userId
                      )
                    : []
                }
              }
            : state.profile
      };
    case GET_FOLLOW_REQUESTS:
      return {
        ...state,
        followRequests: action.payload,
        loading: false
      };
    case ACCEPT_FOLLOW_REQUEST:
    case REJECT_FOLLOW_REQUEST:
      return {
        ...state,
        followRequests: state.followRequests.filter(
          (r) => r.user && r.user._id !== action.payload.userId
        )
      };
    default:
      return state;
  }
}

export default profileReducer;
