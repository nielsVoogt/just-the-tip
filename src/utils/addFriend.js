import { db, fb } from "@/firebaseConfig.js";

export default function addFriend(newFriendUid) {
  const uid = fb.auth().currentUser.uid;
  const name = fb.auth().currentUser.displayName;
  const friendRef = db.collection("users").doc(newFriendUid);

  return new Promise((resolve, _reject) => {
    friendRef
      .update({
        newFollowers: fb.firestore.FieldValue.arrayUnion({
          uid,
          name,
        }),
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
