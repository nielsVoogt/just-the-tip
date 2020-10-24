const fb = require("@/firebaseConfig.js");

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchUserDataAction", user.uid);
  }
});

const initialState = () => {
  return {
    user: null,
    error: null,
    userProfile: null,
    userTips: [],
  };
};

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters,
});
