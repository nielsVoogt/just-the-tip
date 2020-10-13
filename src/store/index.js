import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

// fb.auth.onAuthStateChanged((user) => {
//   if (user) {
//     store.commit("setCurrentUser", user);
//     store.dispatch("fetchUserProfile");
//   }
// });

const initialState = () => {
  return { user: null, error: null };
};

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters
});

// export const store = new Vuex.Store({
//   state: {
//     currentUser: null,
//     userProfile: {},
//   },
//   actions: {
//     clearData({ commit }) {
//       commit("setCurrentUser", null);
//       commit("setUserProfile", {});
//     },
//     fetchUserProfile({ commit, state }) {
//       fb.usersCollection
//         .doc(state.currentUser.uid)
//         .get()
//         .then((res) => {
//           commit("setUserProfile", res.data());
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   },
//   mutations: {
//     setCurrentUser(state, val) {
//       state.currentUser = val;
//     },
//     setUserProfile(state, val) {
//       state.userProfile = val;
//     },
//   },
//   getters: {
//     isAuthenticated: (state) => {
//       return state.currentUser;
//     },
//   },
// });
