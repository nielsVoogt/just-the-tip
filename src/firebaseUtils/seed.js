const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
});

const db = admin.firestore();

const categories = ["movie", "documentary", "recipe", "music"];

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
        followers: [],
        firstLogin: true,
        public: true,
        tipCount: 0,
      })
      .then(() => resolve())
      .catch((error) => seedError(error));
  });
};

function addTips(user) {
  const addTip = (user) => {
    const randomTip = () => {
      const lorem = new LoremIpsum();
      const descriptionLength = Math.floor(Math.random() * 10) + 3;
      return {
        title: lorem.generateWords(4),
        description: lorem.generateWords(descriptionLength),
        url: Math.random() >= 0.5 ? "www.google.com" : "",
        likes: Math.random() >= 0.5 ? Math.round(Math.random() * 100) : 0,
        category: categories[Math.floor(Math.random() * categories.length)],
      };
    };

    return new Promise((resolve, _reject) => {
      db.collection("tips")
        .doc(user.uid)
        .collection("content")
        .add(randomTip())
        .then(() => {
          resolve();
        })
        .catch((error) => seedError(error));
    });
  };

  return new Promise((resolve, _reject) => {
    const promises = [];

    for (let i = 0; i < 5; ++i) {
      promises.push(addTip(user));
    }

    Promise.all(promises).then(() => resolve());
  });
}

async function createCollection(user) {
  await addUsername(user);
  await addUser(user);
  await addTips(user);
}

const createNewFirebaseUser = () => {
  const randomUser = () => {
    const rand = Math.floor(Math.random() * 10000);
    return {
      email: `user${rand}@example.com`,
      emailVerified: true,
      password: "secretPassword",
      displayName: `JohnDoe${rand}`,
    };
  };

  return new Promise((resolve, _reject) => {
    admin
      .auth()
      .createUser(randomUser())
      .then((userRecord) => {
        resolve({
          uid: userRecord.uid,
          username: userRecord.displayName,
        });
      })
      .catch((error) => seedError(error));
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
    .catch((error) => seedError(error));
};

const seedError = (error) => {
  console.log("A error occured", error);
  process.exit();
};

firebaseSeed(1);
