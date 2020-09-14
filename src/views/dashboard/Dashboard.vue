<template>
  <div>
    <h1>This is Dashboard {{currentUser }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["currentUser"]),
};
</script>
