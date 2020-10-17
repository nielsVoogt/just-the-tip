d<template>
  <AuthPanel>
    <RegistrationForm
      @confirmation-email-sent="showConfirmationEmailSent()"
      v-if="!confirmationEmailSent"
    />
    <ConfirmationEmailSent v-else />
  </AuthPanel>
</template>

<script>
import AuthPanel from "@/components/ui/AuthPanel";
import RegistrationForm from "@/components/auth/RegistrationForm";
import ConfirmationEmailSent from "@/components/auth/ConfirmationEmailSent";

export default {
  name: "UserRegistration",
  components: {
    AuthPanel,
    RegistrationForm,
    ConfirmationEmailSent,
  },
  data() {
    return {
      confirmationEmailSent: false,
    };
  },
  methods: {
    showConfirmationEmailSent() {
      this.confirmationEmailSent = true;
    },
  },
};
</script>
