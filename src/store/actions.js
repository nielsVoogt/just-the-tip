const fb = require("@/firebaseConfig.js");

import getTips from "@/utils/getTips";

const actions = {
  deleteAccountAction({ commit }, payload) {
    const user = payload.user;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addNewTip({ commit }, tip) {
    commit("addNewTip", tip);
  },

  async fetchUserData({ commit }, uid) {
    const userProfile = fb.usersCollection.doc(uid);
    userProfile.get().then((doc) => commit("setUserProfile", doc.data()));
    const tips = await getTips(uid);
    commit("setUserTips", tips);
  },

  logOutAction({ commit }) {
    return new Promise((resolve, reject) => {
      fb.auth
        .signOut()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          commit("setError", error);
          reject();
        });
    });
  },

  loginAction({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          if (!response.user.emailVerified) {
            reject();
          } else {
            dispatch("fetchUserData", response.user.uid);
            commit("setUser", response.user);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;
