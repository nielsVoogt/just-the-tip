const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
});

const db = admin.firestore();

const tipCount = 5;
const userAmount = 5;
const categories = ["movie", "documentary", "recipe", "book"];
const userCollection = [];

const addUsername = (user) => {
  return new Promise((resolve, _reject) => {
    db.collection("usernames")
      .doc(user.username)
      .set({ uid: user.uid })
      .then(() => resolve())
      .catch((error) => seedError(error));
  });
};

const addUser = (user) => {
  return new Promise((resolve, _reject) => {
    db.collection("users")
      .doc(user.uid)
      .set({
        username: user.username,
        firstLogin: true,
        public: true,
        tipCount: tipCount,
      })
      .then(() => resolve())
      .catch((error) => seedError(error));
  });
};

const addFollowers = (user) => {
  const following = userCollection.filter((i) => i.uid !== user.uid);
  let pendingFollower = following.pop();
  const rand = Math.random() >= 0.5;

  const promises = [];

  if (rand === false) {
    promises.push(
      db
        .collection("followers")
        .doc(user.uid)
        .set({
          pending: admin.firestore.FieldValue.arrayUnion(pendingFollower),
        })
        .catch((error) => seedError(error))
    );
  }

  for (let i = 0; i < following.length; ++i) {
    promises.push(
      db
        .collection("followers")
        .doc(user.uid)
        .collection("following")
        .doc(following[i].uid)
        .set({})
    );
  }

  return new Promise((resolve, _reject) => {
    Promise.all(promises).then(() => resolve());
  });
};

const addTip = (user) => {
  const lorem = new LoremIpsum();

  let likes = userCollection;
  const itemToRemoveIndex = likes.findIndex((i) => i.uid === user.uid);
  if (itemToRemoveIndex !== -1) likes.splice(itemToRemoveIndex, 1);

  return new Promise((resolve, _reject) => {
    const likesArray =
      Math.random() >= 0.5
        ? likes
            .sort(() => Math.random() - Math.random())
            .slice(0, Math.floor(Math.random() * (userAmount - 1)))
        : [];
    db.collection("tips")
      .doc(user.uid)
      .collection("content")
      .add({
        title: lorem.generateWords(4),
        description: lorem.generateWords(Math.floor(Math.random() * 10) + 3),
        url: Math.random() >= 0.5 ? "www.google.com" : "",
        likes: likesArray,
        category: categories[Math.floor(Math.random() * categories.length)],
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        resolve();
      })
      .catch((error) => seedError(error));
  });
};

const addTips = (user) => {
  return new Promise((resolve, _reject) => {
    const promises = [];

    for (let i = 0; i < tipCount; ++i) {
      promises.push(addTip(user));
    }

    Promise.all(promises).then(() => resolve());
  });
};

const createCollections = (users) => {
  async function createCollection(user) {
    await addUsername(user);
    await addUser(user);
    await addFollowers(user);
    await addTips(user);
  }

  const promises = [];
  users.forEach((user) => promises.push(createCollection(user)));
  Promise.all(promises).then(() => seedSuccess());
};

const createNewFirebaseUser = () => {
  return new Promise((resolve, _reject) => {
    let rand = Math.floor(Math.random() * 10000);
    admin
      .auth()
      .createUser({
        email: `user${rand}@example.com`,
        emailVerified: true,
        password: "secretPassword",
        displayName: `johndoe${rand}`,
      })
      .then((userRecord) => {
        userCollection.push({
          uid: userRecord.uid,
          username: userRecord.displayName,
        });
        resolve({
          uid: userRecord.uid,
          username: userRecord.displayName,
        });
      })
      .catch((error) => seedError(error));
  });
};

const seed = (userAmount) => {
  const promises = [];

  for (let i = 0; i < userAmount; ++i) {
    promises.push(createNewFirebaseUser());
  }

  Promise.all(promises)
    .then((users) => createCollections(users))
    .catch((error) => seedError(error));
};

const seedSuccess = () => {
  console.log("Finished seeding");
  process.exit();
};

const seedError = (error) => {
  console.log("A error occured:", error);
  process.exit();
};

seed(userAmount);
