const fb = require("@/firebaseConfig.js");

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("setUser", user);
    store.dispatch("fetchUserData", user.uid);
  }
});

const initialState = () => {
  return {
    user: null,
    error: null,
    userProfile: null,
    userTips: null,
  };
};

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters,
});
