const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL
});

function listAllUsers(nextPageToken) {
  return new Promise((resolve, reject) => {
    let userUids = []
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(userRecord => userUids.push(userRecord.uid))
        listUsersResult.pageToken ? listAllUsers(listUsersResult.pageToken) : resolve(userUids)
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
        reject()
      });
    })
}

listAllUsers().then(list => console.log('It actually worked! lol...', list));

