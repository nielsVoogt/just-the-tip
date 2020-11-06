import { db } from "@/firebaseConfig.js";

export default function getTips(uid, limit = false) {
  return new Promise((resolve, _reject) => {
    let tips = [];
    const tipsRef = db.collection(`tips/${uid}/content`);

    if (limit) {
      tipsRef
        .orderBy("timestamp", "desc")
        .limit(limit)
        .get()
        .then((snapshot) =>
          snapshot.forEach((doc) => {
            tips.push({
              id: doc.id,
              content: doc.data(),
            });
          })
        )
        .then(resolve(tips));
    } else {
      tipsRef
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
        .then(resolve(tips));
    }
  });
}
