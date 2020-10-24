import { db } from "@/firebaseConfig.js";

export default function getTips(uid) {
  return new Promise((resolve, _reject) => {
    let tips = [];
    db.collection(`tips/${uid}/content`)
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          tips.push({
            id: doc.id,
            content: doc.data(),
          });
        })
      )
      .then(() => resolve(tips));
  });
}
