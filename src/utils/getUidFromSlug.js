import { db } from "@/firebaseConfig.js";

export default function getUidFromSlug(slug) {
  return new Promise((resolve, reject) => {
    const userNamesRef = db.collection("usernames").doc(slug);
    userNamesRef.get().then((doc) => {
      doc.exists ? resolve(doc.data().uid) : reject();
    });
  });
}
