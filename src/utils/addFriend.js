import { db, fb } from "@/firebaseConfig.js";

export default function addFriend(newFriendUid) {
  const followerRef = db.collection("followers").doc(newFriendUid);

  const uid = fb.auth().currentUser.uid;
  const name = fb.auth().currentUser.displayName;

  return new Promise((resolve, reject) => {
    followerRef
      .update({
        pending: fb.firestore.FieldValue.arrayUnion({
          uid,
          name,
        }),
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
