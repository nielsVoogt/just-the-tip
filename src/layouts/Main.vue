<template>
  <div id="main">
    <Notifications />
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Notifications from "@/components/Notifications";

export default {
  name: "Main",
  components: { Navigation, Notifications },
  data() {
    return {
      notification: "",
    };
  },
};
</script>

<style lang="scss" scoped>
#main {
  background: lightblue;
}
</style>
