<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Add new friend">
    <template v-slot:body>
      <SearchFriends v-on:selected-friend="selectNewFriend" />

      <div style="border: 2px solid orange">
        <div v-for="friend in selectedFriends" :key="friend.uid">
          {{ friend.userName }}
        </div>
      </div>
    </template>
    <template v-slot:footer-buttons>
      <Button type="button" @click.prevent="validate()">Add tip</Button>
    </template>
  </Modal>
</template>

<script>
import SearchFriends from "@/components/friends/SearchFriends";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default {
  name: "AddNewFriend",
  components: {
    SearchFriends,
    Modal,
    Button,
  },
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedFriends: [],
    };
  },
  methods: {
    selectNewFriend(user) {
      this.selectedFriends.push({
        uid: user.objectId,
        userName: user.userName,
      });
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
