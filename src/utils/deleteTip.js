import { db, fb } from "@/firebaseConfig.js";

export default function deleteTip(tipId) {
  const uid = fb.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    db.collection(`tips/${uid}/content`)
      .doc(tipId)
      .delete()
      .then(resolve)
      .catch((error) => reject(error));
  });
}
