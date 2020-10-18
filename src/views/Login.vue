<template>
  <AuthPanel>
    <LoginForm />
    <template v-slot:link>
      <router-link :to="{ name: 'ResetPassword' }">
        Forgot your password?
      </router-link>
    </template>
  </AuthPanel>
</template>

<script>
import AuthPanel from "@/components/ui/AuthPanel";
import LoginForm from "@/components/auth/LoginForm";

export default {
  name: "Login",
  components: { LoginForm, AuthPanel },
};
</script>
