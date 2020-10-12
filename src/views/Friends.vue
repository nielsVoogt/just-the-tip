<template>
  <div>
    <h1>This is Friends. This is the logged in user {{ userProfile }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Friends",
  computed: mapState(["userProfile"]),
};
</script>
