import * as types from "./mutation-types.js";

import getFollowers from "@/utils/getFollowers";
import getPendingFollowers from "@/utils/getPendingFollowers";
import getTips from "@/utils/getTips";
import getUserProfile from "@/utils/getUserProfile";

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

  addNewLocalTipAction: ({ commit }, tip) => {
    commit(types.ADD_NEW_TIP, tip);
  },

  deleteLocalTipAction: ({ commit }, id) => {
    commit(types.DELETE_TIP, id);
  },

  editLocalTipAction: ({ commit }, tip) => {
    commit(types.EDIT_TIP, tip);
  },

  fetchUserDataAction({ commit, dispatch }, uid) {
    const userProfile = fb.usersCollection.doc(uid);
    userProfile.get().then((doc) => {
      commit(types.SET_USER_PROFILE, doc.data());
    });

    dispatch("fetchUserTipsAction", uid);
    dispatch("fetchPendingFollowersAction");
    dispatch("fetchFollowersAction");
  },

  fetchUserTipsAction({ commit }, uid) {
    getTips(uid)
      .then((tips) => {
        commit(types.SET_USER_TIPS, tips);
      })
      .catch((error) => console.error(error));
  },

  fetchPendingFollowersAction({ commit }) {
    getPendingFollowers()
      .then((pendingFollowers) => {
        commit(types.SET_PENDING_FOLLOWERS, pendingFollowers);
      })
      .catch((error) => console.error(error));
  },

  fetchFollowersAction({ commit }) {
    getFollowers().then((followers) => {
      commit(types.SET_FOLLOWERS, followers);
    });
  },

  updateLocalFollowersAction({ commit }, newFollowerUid) {
    getUserProfile(newFollowerUid).then((newFollower) => {
      commit(types.SET_NEW_FOLLOWER, newFollower);
    });
  },

  editFriendTipsAction({ commit }, tips) {
    commit(types.SET_FRIEND_TIPS, tips);
  },

  updateLocalFriendTipsLikesAction({ commit }, like) {
    commit(types.UPDATE_FRIENDS_TIPS_LIKES, like);
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
