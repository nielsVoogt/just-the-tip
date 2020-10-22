<template>
  <div>
    <h1>
      These are my Tips.
    </h1>
    <Tip
      v-for="tip in getUserTips"
      :key="tip.id"
      :tip="tip.content"
      showOptions
      v-on:delete="deleteTip(tip)"
      v-on:edit="editTip(tip)"
    />
    <EditTip
      :is-modal-visible="showEditModal"
      :tip="selectedTip"
      v-on:close="closeEditModal()"
    />
    <DeleteTip
      :is-modal-visible="showDeleteModal"
      :tip="selectedTip"
      v-on:close="closeDeleteModal()"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tip from "@/components/tips/Tip";
import EditTip from "@/components/tips/EditTip";
import DeleteTip from "@/components/tips/DeleteTip";

export default {
  name: "MyTips",
  components: {
    DeleteTip,
    EditTip,
    Tip,
  },
  computed: {
    ...mapGetters(["getUserProfile", "getUserTips"]),
  },
  data() {
    return {
      selectedTip: null,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  methods: {
    closeEditModal() {
      this.selectedTip = null;
      this.showEditModal = false;
    },
    closeDeleteModal() {
      this.selectedTip = null;
      this.showDeleteModal = false;
    },
    deleteTip(tip) {
      this.selectedTip = tip;
      this.showDeleteModal = true;
    },
    editTip(tip) {
      this.selectedTip = tip;
      this.showEditModal = true;
    },
  },
};
</script>
