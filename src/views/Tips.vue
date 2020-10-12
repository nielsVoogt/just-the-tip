<template>
  <div>
    <h1>This is Tips. This is the logged in user {{ userProfile }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tips",
  computed: mapState(["userProfile"]),
};
</script>
