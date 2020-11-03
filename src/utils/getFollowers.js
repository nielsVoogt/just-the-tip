import { db, fb } from "@/firebaseConfig.js";

import getUserProfile from "@/utils/getUserProfile";

export default function getFollowers() {
  return new Promise((resolve, reject) => {
    const uid = fb.auth().currentUser.uid;
    let followers = [];

    db.collection(`followers`)
      .doc(uid)
      .collection("following")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getUserProfile(doc.id, true).then((profile) =>
            followers.push(profile)
          );
        });
      })
      .then(resolve(followers))
      .catch((error) => reject(error));
  });
}
