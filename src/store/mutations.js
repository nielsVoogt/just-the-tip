import {
  ADD_NEW_FOLLOWING_ID,
  ADD_NEW_TIP,
  SET_ERROR,
  SET_FRIENDS,
  SET_INITIAL_STATE,
  SET_USER,
  SET_USER_PROFILE,
  SET_USER_TIPS,
} from "./mutation-types.js";

const mutations = {
  [ADD_NEW_TIP](state, payload) {
    state.userTips.unshift(payload);
  },
  [SET_USER_TIPS](state, payload) {
    state.userTips = payload;
  },
  [SET_USER_PROFILE](state, payload) {
    state.userProfile = payload;
  },
  [SET_USER](state, payload) {
    state.user = payload;
  },
  [SET_ERROR](state, payload) {
    state.error = payload;
  },
  [SET_FRIENDS](state, payload) {
    state.friends = payload;
  },
  [SET_INITIAL_STATE](state, newState) {
    Object.assign(state, newState);
  },
};

export default mutations;
