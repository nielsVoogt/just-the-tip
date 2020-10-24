const mutations = {
  addNewTip(state, payload) {
    state.userTips.unshift(payload);
  },
  setUserTips(state, payload) {
    state.userTips = payload;
  },
  setUserProfile(state, payload) {
    state.userProfile = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export default mutations;
