<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/layout/Navigation";

export default {
  components: { Navigation },
};
</script>


