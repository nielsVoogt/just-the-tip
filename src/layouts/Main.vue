<template>
  <div class="main">
    <Notifications />
    <Navigation />
    <!-- <SelectLocale /> -->
    <router-view class="content" />
  </div>
</template>

<script>
// import SelectLocale from "@/components/ui/SelectLocale";
import Navigation from "@/components/ui/Navigation";
import Notifications from "@/components/ui/Notifications";

export default {
  name: "Main",
  components: {
    Navigation,
    Notifications,
    // SelectLocale
  },
};
</script>

<style lang="scss">
#ghostery-purple-box {
  display: none;
}

.content {
  max-width: calc(100vw - 65px);
  overflow: auto;
  max-height: 100vh;

  @media (min-width: 600px) {
    max-width: 100%;
    padding-left: 255px;
  }
}
</style>
