<template>
  <div>
    <h1>This is Dashboard {{ userProfile }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["userProfile"]),
};
</script>
