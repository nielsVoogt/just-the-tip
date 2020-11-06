import { db, fb } from "@/firebaseConfig.js";

export default function addTip(tip, tipId) {
  const { title, category, description } = tip;
  const uid = fb.auth().currentUser.uid;
  return new Promise((resolve, _reject) => {
    db.collection(`tips/${uid}/content/`)
      .doc(tipId)
      .update({
        title: title,
        category: category,
        description: description,
        // url,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
