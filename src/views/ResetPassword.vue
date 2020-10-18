<template>
  <AuthPanel>
    <ResetPasswordForm />
    <template v-slot:link>
      <router-link :to="{ name: 'Login' }">
        Back to Login page
      </router-link>
    </template>
  </AuthPanel>
</template>

<script>
import AuthPanel from "@/components/ui/AuthPanel";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default {
  name: "ResetPassword",
  components: {
    ResetPasswordForm,
    AuthPanel,
  },
};
</script>
