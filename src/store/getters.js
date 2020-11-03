const getters = {
  user(state) {
    return state.user;
  },
  userProfile(state) {
    return state.userProfile;
  },
  userTips(state) {
    return state.userTips;
  },
  friends(state) {
    return state.friends;
  },
  followers(state) {
    return state.followers;
  },
  pendingFollowers(state) {
    return state.pendingFollowers;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};

export default getters;
