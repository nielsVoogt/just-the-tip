const fb = require("@/firebaseConfig.js");

export default function createUserCollections(uid, username) {
  const addName = fb.userNamesCollection.doc(username).set({ uid });
  const addUser = fb.usersCollection.doc(uid).set({
    username: username,
    firstLogin: true,
    public: true,
    tipCount: 0,
  });

  return Promise.all([addUser, addName, addTips]);
}
