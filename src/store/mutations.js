import {
  ADD_NEW_TIP,
  DELETE_TIP,
  SET_FOLLOWERS,
  SET_INITIAL_STATE,
  SET_NEW_FOLLOWER,
  SET_PENDING_FOLLOWERS,
  SET_USER,
  SET_USER_PROFILE,
  SET_USER_TIPS,
} from "./mutation-types.js";

const mutations = {
  [ADD_NEW_TIP](state, payload) {
    state.userTips.unshift(payload);
  },
  [DELETE_TIP](state, payload) {
    const itemToRemoveIndex = state.userTips.findIndex((i) => i.id === payload);
    if (itemToRemoveIndex !== -1) state.userTips.splice(itemToRemoveIndex, 1);
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
  [SET_FOLLOWERS](state, payload) {
    state.followers = payload;
  },
  [SET_NEW_FOLLOWER](state, payload) {
    state.followers.unshift(payload);
  },
  [SET_PENDING_FOLLOWERS](state, payload) {
    state.pendingFollowers = payload;
  },
  [SET_INITIAL_STATE](state, newState) {
    Object.assign(state, newState);
  },
};

export default mutations;
