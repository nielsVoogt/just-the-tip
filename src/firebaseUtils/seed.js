const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL
});

const randomUser = () => {
  const rand = Math.floor(Math.random()*1000)
  return {
    email: `user${rand}@example.com`,
    emailVerified: true,
    password: 'secretPassword',
    displayName: `John Doe ${rand}`,
  }
}

const createNewFirebaseUser = () => {
  return new Promise((resolve) => {
    admin.auth().createUser(randomUser())
      .then(userRecord => {
        resolve(userRecord.uid)
    })
    .catch(error => console.log('error', error));
  });
}

const firebaseSeed = (userAmount) => {
  const promises = [];

  for (let i = 0; i < userAmount; ++i) {
    promises.push(createNewFirebaseUser());
  }

  Promise.all(promises)
    .then(results => {
      console.log("All done", results);
      process.exit()
    })
    .catch(error => {
      console.log('A error occured', error)
      process.exit()
    });
}

firebaseSeed(3)