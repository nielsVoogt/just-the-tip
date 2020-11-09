import { db, fb } from "@/firebaseConfig.js";

export default function likeTip(options) {
  const { tip, owner, likedByUser } = options;
  const tipRef = db.collection(`tips/${owner}/content/`);

  const like = {
    uid: fb.auth().currentUser.uid,
    username: fb.auth().currentUser.displayName,
  };

  return new Promise((resolve, reject) => {
    if (likedByUser === true) {
      // When the tip is liked by the user we remove them from the likes array
      tipRef
        .doc(tip)
        .update({ likes: fb.firestore.FieldValue.arrayRemove(like) })
        .then(resolve)
        .catch((error) => reject(error));
    } else {
      // When the tip is not liked by the user we add them to the likes array
      tipRef
        .doc(tip)
        .update({ likes: fb.firestore.FieldValue.arrayUnion(like) })
        .then(resolve)
        .catch((error) => reject(error));
    }
  });
}
