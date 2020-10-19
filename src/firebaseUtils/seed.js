const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
});

const db = admin.firestore();

const randomUser = () => {
  const rand = Math.floor(Math.random() * 1000);
  return {
    email: `user${rand}@example.com`,
    emailVerified: true,
    password: "secretPassword",
    displayName: `JohnDoe${rand}`,
  };
};

async function createCollection(user) {
  await db.collection("usernames").doc(user.username).set({ uid: user.uid });
  await db.collection("tips").doc(user.uid).set({ tips: [] });
  await db.collection("users").doc(user.uid).set({
    username: user.username,
    followers: [],
    firstLogin: true,
    public: true,
  });
}

const createNewFirebaseUser = () => {
  return new Promise((resolve) => {
    admin
      .auth()
      .createUser(randomUser())
      .then((userRecord) => {
        resolve({ uid: userRecord.uid, username: userRecord.displayName });
      })
      .catch((error) => console.log("error", error));
  });
};

const createCollections = (users) => {
  const promises = [];
  users.forEach((user) => promises.push(createCollection(user)));
  Promise.all(promises).then(() => {
    console.log("Finished seeding");
    process.exit();
  });
};

const firebaseSeed = (userAmount) => {
  const promises = [];

  for (let i = 0; i < userAmount; ++i) {
    promises.push(createNewFirebaseUser());
  }

  Promise.all(promises)
    .then((users) => createCollections(users))
    .catch((error) => {
      console.log("A error occured", error);
      process.exit();
    });
};

firebaseSeed(1);
