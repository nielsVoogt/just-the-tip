import { db, fb } from "@/firebaseConfig.js";

export default function addFriend(newFriendUid) {
  const followerRef = db.collection("followers").doc(newFriendUid);

  const newPendingFollower = {
    uid: fb.auth().currentUser.uid,
    name: fb.auth().currentUser.displayName,
  };

  return new Promise((resolve, reject) => {
    followerRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().pending.find((o) => o.uid === newFriendUid)) {
          // Duplicate of newFollower found, abort mission
          reject("duplicate");
        } else {
          // Doc found, but no duplicate, so we use update() to add pending array
          followerRef
            .update({
              pending: fb.firestore.FieldValue.arrayUnion(newPendingFollower),
            })
            .then(() => resolve())
            .catch((error) => reject(error));
        }
      } else {
        // No doc found, so we use set() to add pending array
        followerRef
          .set({
            pending: fb.firestore.FieldValue.arrayUnion(newPendingFollower),
          })
          .then(() => resolve())
          .catch((error) => reject(error));
      }
    });
  });
}
