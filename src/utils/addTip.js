import { db, fb } from "@/firebaseConfig.js";

export default function addTip(tip) {
  const uid = fb.auth().currentUser.uid;
  tip.timestamp = fb.firestore.FieldValue.serverTimestamp();
  return new Promise((resolve, _reject) => {
    db.collection(`tips/${uid}/content`)
      .add(tip)
      .then((response) => {
        resolve(response.id);
      })
      .catch((error) => reject(error));
  });
}
