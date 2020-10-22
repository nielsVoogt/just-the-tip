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
import reAuthenticateUser from "@/firebaseUtils/reAuthenticateUser";
import { required, minLength } from "vuelidate/lib/validators";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
    },
    validate() {
      if (!this.$v.password.$required || this.$v.password.minLength) {
        if (!this.$v.password.$required) {
          this.fieldErrors.password = true;
          return false;
        }
        if (!this.$v.password.minLength) {
          this.fieldErrors.password =
            "The password is not long enough, a minimum of 6 characters is required.";
          return false;
        }
      } else {
        this.deleteAccount();
      }
    },

    deleteAccount() {
      reAuthenticateUser(this.password)
        .then((user) => this.deleteUser(user))
        .catch((error) => {
          error.code === "auth/wrong-password"
            ? this.passwordIncorrect()
            : console.error(error);
        });
    },
  },
};
</script>
