<template>
  <div id="main">
    <Notifications />
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/ui/Navigation";
import Notifications from "@/components/ui/Notifications";

export default {
  name: "Main",
  components: { Navigation, Notifications },
};
</script>

<style lang="scss" scoped>
#main {
  background: lightblue;
}
</style>
