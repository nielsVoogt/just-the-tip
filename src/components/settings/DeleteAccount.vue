<template>
  <div>
    <Button @click="showModal()">Delete my profile</Button>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      title="Confirm change"
      hasForm
    >
      <template v-slot:body>
        <p>
          We need to be sure you are actually the owner of the account. Please
          type your password below and click
          <strong>Delete my profile</strong> to confirm.
        </p>
        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          v-model="password"
          :error="fieldErrors.password"
          @change="fieldErrors.password = ''"
        />
      </template>
      <template v-slot:footer-buttons>
        <Button
          type="button"
          @click.prevent="validate()"
          :disabled="password.length === 0"
        >
          Delete my account</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script>
import { fb } from "@/firebaseConfig.js";
import reAuthenticateUser from "@/utils/reAuthenticateUser";
import { required, minLength } from "vuelidate/lib/validators";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { mapActions } from "vuex";

export default {
  name: "DeleteAccount",
  components: {
    Button,
    Input,
    Modal,
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
  },
  data() {
    return {
      isModalVisible: false,
      password: "",
      fieldErrors: {
        password: "",
      },
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.fieldErrors.password = "";
      this.password = "";
    },

    validate() {
      // Validate the password field
      if (this.$v.$invalid) {
        if (!this.$v.password.$required) {
          this.fieldErrors.password = true;
          return;
        }
        if (!this.$v.password.minLength) {
          this.fieldErrors.password =
            "The password is not long enough, a minimum of 6 characters is required.";
          return;
        }
      }

      // If valid, reauthenticate user and call deletion function
      reAuthenticateUser(this.password)
        .then(() => this.deleteUser())
        .catch((error) => {
          error.code === "auth/wrong-password"
            ? this.passwordIncorrect()
            : console.error(error);
        });
    },

    passwordIncorrect() {
      this.fieldErrors.password =
        "The password is invalid, please enter your password again.";
      this.password = "";
    },

    deleteUser() {
      const user = fb.auth().currentUser;
      user
        .delete()
        .then(() => {
          console.log("Delete succesful");
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
