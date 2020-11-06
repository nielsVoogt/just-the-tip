import { db, fb } from "@/firebaseConfig.js";

export default function getPendingFollowers() {
  return new Promise((resolve, reject) => {
    const uid = fb.auth().currentUser.uid;

    db.collection(`followers`)
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) resolve(doc.data().pending);
      })
      .catch((error) => reject(error));
  });
}
