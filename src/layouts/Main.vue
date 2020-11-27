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

body {
  background: #edf2f7;
}

.content {
  max-width: calc(100vw - 65px);
  overflow: auto;
  max-height: 100vh;

  @media (min-width: 500px) {
    max-width: calc(100vw - 230px);
    padding-left: 230px;
  }
}
</style>
