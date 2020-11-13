const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.createTip = functions.firestore
  .document("tips/{uid}/content/{tipId}")
  .onCreate((_snap, context) => {
    const user = context.params.uid;
    const userRef = db.collection("users").doc(user);
    userRef.update({ tipCount: increment }).then(() => {
      return true;
    });
  });

exports.deleteTip = functions.firestore
  .document("tips/{uid}/content/{tipId}")
  .onDelete((_snap, context) => {
    const user = context.params.uid;
    const userRef = db.collection("users").doc(user);
    userRef.update({ tipCount: decrement }).then(() => {
      return true;
    });
  });
