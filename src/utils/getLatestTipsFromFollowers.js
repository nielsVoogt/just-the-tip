import { db } from "@/firebaseConfig.js";

const getLatestTipsFromFollower = (uid) => {
  return new Promise((resolve, _reject) => {
    db.collection(`tips/${uid}/content`)
      .orderBy("timestamp", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        var data = querySnapshot.docs.map(function(documentSnapshot) {
          return documentSnapshot.data();
        });
        resolve(data);
      });
  });
};
