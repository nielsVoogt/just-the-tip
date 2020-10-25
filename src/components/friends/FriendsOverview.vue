<template>
  <div>
    <Input
      type="search"
      placeholder="Search by username"
      v-model="searchQuery"
      @change="searchUsernames"
    />
  </div>
</template>

<script>
import Input from "@/components/ui/Input";

export default {
  name: "FriendsOverview",
  components: {
    Input,
  },
  data() {
    return {
      searchQuery: "",
      searchResultOptions: [],
      usernameSearchLoading: false,
    };
  },
  methods: {
    searchUsernames() {
      console.log("I'm searching yo");
    },
  },
};
</script>
