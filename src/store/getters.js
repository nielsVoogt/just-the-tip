const getters = {
  getUser(state) {
    return state.user;
  },
  getUserProfile(state) {
    return state.userProfile;
  },
  getUserTips(state) {
    return state.userTips;
  },
  getFollowing(state) {
    return state.following;
  },
  getFollowers(state) {
    return state.userProfile.followers;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};

export default getters;
