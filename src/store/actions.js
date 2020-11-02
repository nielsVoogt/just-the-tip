import * as types from "./mutation-types.js";

import getFollowers from "@/utils/getFollowers";
import getPendingFollowers from "@/utils/getPendingFollowers";
import getTips from "@/utils/getTips";

const fb = require("@/firebaseConfig.js");

const actions = {
  deleteAccountAction: ({ commit }, payload) => {
    const user = payload.user;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then(() => {
          commit(types.SET_USER, null);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addNewTipAction: ({ commit }, tip) => {
    commit(types.ADD_NEW_TIP, tip);
  },

  async fetchUserDataAction({ commit, dispatch }, uid) {
    const userProfile = fb.usersCollection.doc(uid);
    userProfile.get().then((doc) => {
      commit(types.SET_USER_PROFILE, doc.data());
    });

    dispatch("fetchUserTipsAction", uid);
    dispatch("fetchPendingFollowersAction");
  },

  fetchUserTipsAction({ commit }, uid) {
    getTips(uid)
      .then((tips) => {
        commit(types.SET_USER_TIPS, tips);
      })
      .catch((error) => console.log(error));
  },

  fetchPendingFollowersAction({ commit }) {
    console.log("fetchPendingFollowersAction fired");
    getPendingFollowers()
      .then((pendingFollowers) => {
        commit(types.SET_PENDING_FOLLOWERS, pendingFollowers);
      })
      .catch((error) => console.log(error));
  },

  fetchFollowersAction({ commit }) {
    console.log("fetchFollowersAction fired");
    getFollowers().then((followers) => {
      commit(types.SET_FOLLOWERS, followers);
    });
  },

  logOutAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signOut()
        .then(() => {
          commit(types.SET_USER, null);
          resolve();
        })
        .catch((error) => {
          commit(types.SET_ERROR, error);
          reject();
        });
    });
  },

  logInAction: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          if (!response.user.emailVerified) {
            reject();
          } else {
            dispatch("fetchUserDataAction", response.user.uid);
            commit(types.SET_USER, response.user);
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
