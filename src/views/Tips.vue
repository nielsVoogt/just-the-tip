<template>
  <div>
    <h1>This is Tips.{{ getUser.uid }}</h1>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import { mapGetters } from "vuex";

export default {
  name: "Tips",
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    var docRef = fb.usersCollection.doc(this.getUser.uid);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    // fb.usersCollection
    //   .doc(this.getUser.uid)
    //   .get()
    //   .then((response) => console.log(response));
  },
};
</script>
