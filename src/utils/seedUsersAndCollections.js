const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
});

const db = admin.firestore();

const userAmount = 5;
const categories = ["movie", "documentary", "recipe", "music"];
const userUidCollection = [];

const addUsername = (user) => {
  return new Promise((resolve, _reject) => {
    db.collection("usernames")
      .doc(user.username)
      .set({ uid: user.uid })
      .then(() => resolve())
      .catch((error) => seedError(error));
  });
};

const fetchLastTips = (user) => {
  return new Promise((resolve, _reject) => {
    db.collection(`tips/${user.uid}/content`)
      .orderBy("timestamp", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        var data = querySnapshot.docs.map(function(documentSnapshot) {
          return documentSnapshot.data();
        });
        resolve(data);
      });
  });
};

const addUser = async (user) => {
  const lastTips = await fetchLastTips(user);
  const followers = userUidCollection.filter((id) => id !== user.uid);

  let newFollower = followers.pop();
  const rand = Math.random() >= 0.5;
  rand === true ? (newFollower = []) : [newFollower];

  return new Promise((resolve, _reject) => {
    db.collection("users")
      .doc(user.uid)
      .set({
        username: user.username,
        newFollowers: newFollower,
        followers: followers,
        firstLogin: true,
        public: true,
        tipCount: 5,
        lastTips: lastTips,
      })
      .then(() => resolve())
      .catch((error) => seedError(error));
  });
};

const likes = () => {
  const rand = Math.random() >= 0.5;
  if (!rand) {
    return userUidCollection
      .sort(() => Math.random() - Math.random())
      .slice(0, Math.floor(Math.random() * (userAmount - 1)));
  } else {
    return [];
  }
};

const addTip = (user) => {
  const lorem = new LoremIpsum();
  return new Promise((resolve, _reject) => {
    db.collection("tips")
      .doc(user.uid)
      .collection("content")
      .add({
        title: lorem.generateWords(4),
        description: lorem.generateWords(Math.floor(Math.random() * 10) + 3),
        url: Math.random() >= 0.5 ? "www.google.com" : "",
        likes: likes(),
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

    for (let i = 0; i < 5; ++i) {
      promises.push(addTip(user));
    }

    Promise.all(promises).then(() => resolve());
  });
};

const createCollections = (users) => {
  async function createCollection(user) {
    await addUsername(user);
    await addTips(user);
    await addUser(user);
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
        userUidCollection.push(userRecord.uid);
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
