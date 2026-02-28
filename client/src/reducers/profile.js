import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
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
    default:
      return state;
  }
}

export default profileReducer;
