const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.onTipCreated = functions.firestore
  .document("/tips/{uid}/content/{tip}")
  .onCreate((_snapshot, context) => {
    const uid = context.params.uid;
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ tipCount: admin.database.FieldValue.increment(1) });
  });

exports.onTipDelete = functions.firestore
  .document("/tips/{uid}/content/{tip}")
  .onDelete((_snapshot, context) => {
    const uid = context.params.uid;
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ tipCount: admin.database.FieldValue.increment(-1) });
  });
