<template>
  <div>
    <h1>This is Settings</h1>
    <DeleteAccount />
    <EmailAdress />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "@/components/DeleteAccount";
import EmailAdress from "@/components/EmailAdress";

export default {
  name: "Settings",
  components: {
    DeleteAccount,
    EmailAdress,
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
