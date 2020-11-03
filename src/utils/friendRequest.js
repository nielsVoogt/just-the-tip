import { db, fb } from "@/firebaseConfig.js";

export default function friendRequest(action, follower) {
  const uid = fb.auth().currentUser.uid;

  // Add the follower to following collection when accepted
  const addFollowerToFollowingCollection = db
    .collection(`followers`)
    .doc(uid)
    .collection("following")
    .doc(follower.uid)
    .set({});

  // Remove pending request
  const removePendingRequest = db
    .collection(`followers`)
    .doc(uid)
    .update({
      pending: fb.firestore.FieldValue.arrayRemove({
        uid: follower.uid,
        username: follower.username,
      }),
    });

  let promises = [removePendingRequest];

  if (action === "accept") {
    console.log("pushing addFollowerToFollowingCollection");
    promises.push(addFollowerToFollowingCollection);
  }

  return Promise.all(promises);
}
