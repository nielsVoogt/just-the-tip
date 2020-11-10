import {
  ADD_NEW_TIP,
  DELETE_TIP,
  SET_FOLLOWERS,
  SET_FRIEND_TIPS,
  SET_INITIAL_STATE,
  SET_NEW_FOLLOWER,
  SET_PENDING_FOLLOWERS,
  SET_USER,
  SET_USER_PROFILE,
  SET_USER_TIPS,
  UPDATE_FRIENDS_TIPS_LIKES,
} from "./mutation-types.js";

const mutations = {
  [ADD_NEW_TIP](state, payload) {
    state.userTips.unshift(payload);
  },

  [DELETE_TIP](state, payload) {
    const itr = state.userTips.findIndex((i) => i.id === payload);
    if (itr !== -1) {
      state.userTips.splice(itr, 1);
    }
  },

  [SET_USER_TIPS](state, payload) {
    state.userTips = payload;
  },

  [SET_FRIEND_TIPS](state, payload) {
    state.friendTips = payload;
  },

  [UPDATE_FRIENDS_TIPS_LIKES](state, payload) {
    const tipIndex = state.friendTips.findIndex((i) => i.id === payload.tipId);
    if (payload.likedByUser) {
      const likes = state.friendTips[tipIndex].content.likes;
      const itr = likes.findIndex((i) => i.id === payload.user.uid);
      likes.splice(itr, 1);
    } else {
      state.friendTips[tipIndex].content.likes.push(payload.user);
    }
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
