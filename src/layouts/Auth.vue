<template>
  <div class="auth-view">
    <router-view />
  </div>
</template>

<script>
import AuthPanel from "@/components/ui/AuthPanel";
export default {
  name: "Auth",
};
</script>

<style lang="scss">
.auth-view {
  height: 100%;
  background: #ededed;
  overflow: auto;
}
</style>
