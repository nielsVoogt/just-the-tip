<template>
  <div>
    <AddNewFriend
      :is-modal-visible="showAddNewFriendModal"
      v-on:close="closeAddNewFriendModal()"
    />
    <button @click="addNewFriend">Add a friend yo</button>
  </div>
</template>

<script>
import AddNewFriend from "@/components/friends/AddNewFriend";
export default {
  name: "FriendsOverview",
  components: {
    AddNewFriend,
  },
  data() {
    return {
      showAddNewFriendModal: false,
    };
  },
  methods: {
    closeAddNewFriendModal() {
      this.showAddNewFriendModal = false;
    },
    addNewFriend() {
      this.showAddNewFriendModal = true;
    },
  },
};
</script>
