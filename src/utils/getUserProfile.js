import { db } from "@/firebaseConfig.js";

export default function getUserProfile(uid) {
  return new Promise((resolve, reject) => {
    const userRef = db.collection("users").doc(uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        resolve(doc.data());
      } else {
        reject("NO SUCH DOCUMENT");
      }
    });
  });
}
