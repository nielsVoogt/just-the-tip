<template>
  <div>
    <h1>This is Landingpage. This is the logged in user {{ userProfile }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LandingPage",
  computed: mapState(["userProfile"]),
};
</script>
