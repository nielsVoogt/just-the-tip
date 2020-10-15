<template>
  <div>
    <h1>This is Settings</h1>
    <input type="password" v-model="confirmUserDeletePassword" />
    <button type="button" @click="validateUserDelete()">
      Confirm
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { fb, auth } from "@/firebaseConfig.js";

export default {
  name: "Settings",
  components: {},
  computed: {
    ...mapGetters(["getUser"]),
  },
  data() {
    return {
      showDeleteUserModal: false,
      deleteUserModalEmail: "",
      confirmUserDeletePassword: "",
    };
  },
  methods: {
    validateUserDelete() {
      let user = auth.currentUser;
      const credentials = fb.auth.EmailAuthProvider.credential(
        user.email,
        this.confirmUserDeletePassword
      );
      user.reauthenticateAndRetrieveDataWithCredential(credentials).then(() => {
        user
          .delete()
          .then(function() {
            console.log("User deleted!");
          })
          .catch(function(error) {
            // An error happened.
          });
      });
    },
  },
};
</script>
