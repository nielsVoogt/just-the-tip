<template>
  <div id="main">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: 'Main',
  components: { Navigation },
};

</script>

<style lang="scss" scoped>
  #main {
    background:lightblue;
  }
</style>