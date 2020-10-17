<template>
  <AuthPanel>
    <ResetPasswordForm />
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
