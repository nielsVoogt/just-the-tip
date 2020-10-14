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
      .then((listUsersResult) => {
        listUsersResult.users.forEach(userRecord => userUids.push(userRecord.uid))
        listUsersResult.pageToken ? listAllUsers(listUsersResult.pageToken) : resolve(userUids)
      })
      .catch((error) => {
        console.log('listAllUsers Error:', error);
        reject()
      });
    })
}

function deleteUsers(userUids) {
  return new Promise((resolve, reject) => {
    admin.auth().deleteUsers(userUids)
      .then((response) => {
        console.log(`${response.successCount} users deleted`)
        resolve()
        process.exit()
      })
      .catch((error) => {
        console.log('deleteUsers error:', error)
        reject()
        process.exit()
      })  
  })
}

listAllUsers().then(userUids => deleteUsers(userUids));

