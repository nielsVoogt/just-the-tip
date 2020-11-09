const fb = require("@/firebaseConfig.js");

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const initialState = () => {
  return {
    user: null,
    error: null,
    userProfile: null,
    userTips: [],
    followers: null,
    pendingFollowers: null,
  };
};

let x = 0;

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchUserDataAction", user.uid);
    console.log("onAuthChanged fired", x++, x);
  } else {
    store.commit("SET_INITIAL_STATE", initialState());
  }
});

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters,
});
