import { db, fb } from "@/firebaseConfig.js";

export default async function getLikedTips(followersUids) {
  const uid = fb.auth().currentUser.uid;
  const username = fb.auth().currentUser.displayName;
  const tips = [];

  return new Promise((resolve, reject) => {
    followersUids.forEach((followerUid) => {
      const tipsRef = db.collection(`tips/${followerUid}/content`);
      tipsRef
        .where("likes", "array-contains-any", [{ uid, username }])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tips.push({ id: doc.id, content: doc.data() });
          });
        })
        .then(resolve(tips))
        .catch((error) => console.log("Error getting documents: ", error));
    });
  });
}
