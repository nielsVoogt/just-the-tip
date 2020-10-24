<template>
  <div class="main">
    <Notifications />
    <Navigation />
    <SelectLocale />
    <router-view />
  </div>
</template>

<script>
import SelectLocale from "@/components/ui/SelectLocale";
import Navigation from "@/components/ui/Navigation";
import Notifications from "@/components/ui/Notifications";

export default {
  name: "Main",
  components: { Navigation, Notifications, SelectLocale },
};
</script>

<style lang="scss">
body {
  background: #ededed;
}
</style>
