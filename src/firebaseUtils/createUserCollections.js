const fb = require("@/firebaseConfig.js");

export default function createUserCollections(uid, username) {
  // Create user in Users collection
  fb.usersCollection.doc(uid).set({
    username,
    followers: [],
  });

  // Store chosen username in usernames collection
  fb.userNamesCollection.doc(username).set({ uid });

  // Create tip collection
  fb.tipsCollection.doc(uid).set({ tips: [] });
}
