import { db, fb } from "@/firebaseConfig.js";

export default function likeTip(options) {
  const { tipId, owner, likedByUser, user } = options;
  const tipRef = db.collection(`tips/${owner}/content/`);

  return new Promise((resolve, reject) => {
    if (likedByUser === true) {
      // When the tip is liked by the user we remove them from the likes array
      tipRef
        .doc(tipId)
        .update({ likes: fb.firestore.FieldValue.arrayRemove(user) })
        .then(resolve)
        .catch((error) => reject(error));
    } else {
      // When the tip is not liked by the user we add them to the likes array
      tipRef
        .doc(tipId)
        .update({ likes: fb.firestore.FieldValue.arrayUnion(user) })
        .then(resolve)
        .catch((error) => reject(error));
    }
  });
}
