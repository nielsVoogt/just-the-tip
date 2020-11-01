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
    if (state.userProfile) {
      return state.userProfile.followers;
    }
  },
  newFollowers(state) {
    if (state.userProfile) {
      return state.userProfile.newFollowers;
    }
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};

export default getters;
