const fb = require("@/firebaseConfig.js");

import * as types from "./mutation-types.js";

import getTips from "@/utils/getTips";
import getUserProfile from "@/utils/getUserProfile";

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
  },

  async fetchUserTipsAction({ commit }, uid) {
    const tips = await getTips(uid);
    commit(types.SET_USER_TIPS, tips);
  },

  fetchFriends({ commit, state }) {
    let promises = [];
    const following = state.userProfile.following;

    if (following.length) {
      following.forEach((followerUid) =>
        promises.push(getUserProfile(followerUid, true))
      );

      Promise.all(promises).then((followersData) => {
        commit(types.SET_FRIENDS, followersData);
      });
    }
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
