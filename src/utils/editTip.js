import { db, fb } from "@/firebaseConfig.js";

export default function addTip(tip, tipId) {
  const uid = fb.auth().currentUser.uid;
  return new Promise((resolve, _reject) => {
    db.collection(`tips/${uid}/content/`)
      .doc(tipId)
      .update(tip)
      .then(resolve)
      .catch((error) => reject(error));
  });
}
