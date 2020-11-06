import { db, fb } from "@/firebaseConfig.js";

export default function friendRequest(action, follower) {
  const uid = fb.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const removePendingRequest = () => {
      db.collection(`followers`)
        .doc(uid)
        .update({
          pending: fb.firestore.FieldValue.arrayRemove({
            uid: follower.uid,
            username: follower.username,
          }),
        })
        .then(resolve)
        .catch((error) => reject(error));
    };

    if (action === "accept") {
      db.collection(`followers`)
        .doc(uid)
        .collection("following")
        .doc(follower.uid)
        .set({})
        .then(removePendingRequest);
    } else {
      removePendingRequest;
    }
  });
}
