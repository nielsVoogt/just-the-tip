import { db } from "@/firebaseConfig.js";

export default function getUserProfile(uid, follower = false) {
  return new Promise((resolve, reject) => {
    const userRef = db.collection("users").doc(uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        if (follower) {
          const follower = {
            uid,
            tipCount: doc.data().tipCount,
            username: doc.data().username,
          };
          resolve(follower);
        } else {
          resolve(doc.data());
        }
      } else {
        reject("NO SUCH DOCUMENT");
      }
    });
  });
}
