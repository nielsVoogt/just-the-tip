<template>
  <div>
    <h1>{{ userProfile.alias }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["userProfile"]),
};
</script>
