<template>
  <div>
    <h1>This is Settings {{ user ? user.displayName : "" }}</h1>
    <DeleteAccount />
    <EmailAdress />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "@/components/settings/DeleteAccount";
import EmailAdress from "@/components/settings/EmailAdress";

export default {
  name: "Settings",
  components: {
    DeleteAccount,
    EmailAdress,
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
