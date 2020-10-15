<template>
  <div>
    <h1>This is Settings</h1>
    <DeleteAccount />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "@/components/DeleteAccount";

export default {
  name: "Settings",
  components: {
    DeleteAccount,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
