<template>
  <div>
    <h1>This is Settings. This is the logged in user {{ userProfile }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Settings",
  computed: mapState(["userProfile"]),
};
</script>
