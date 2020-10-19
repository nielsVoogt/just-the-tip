const fb = require("@/firebaseConfig.js");

export default function createUserCollections(uid, username) {
  return new Promise((resolve, _reject) => {
    const addName = fb.userNamesCollection.doc(username).set({ uid });
    const addTips = fb.tipsCollection.doc(uid).set({ tips: [] });
    const addUser = fb.usersCollection.doc(uid).set({
      username: username,
      followers: [],
      firstLogin: true,
      public: true,
    });

    Promise.all([addUser, addName, addTips]).then(() => {
      resolve();
    });
  });
}
