<template>
  <div>
    <h1>
      These are my Tips.
    </h1>
    <Input
      type="search"
      placeholder="Search tips by title"
      v-model="searchQuery"
    />
    <Tip
      v-for="tip in filteredTips"
      :key="tip.id"
      :tip="tip.content"
      showOptions
      v-on:delete="deleteTip(tip)"
      v-on:edit="editTip(tip)"
    />
    <div v-if="noResults">
      No results
    </div>
    <EditTip
      :is-modal-visible="showEditModal"
      :tip="selectedTip"
      v-on:close="closeEditModal()"
      hasForm
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
import Input from "@/components/ui/Input";

export default {
  name: "MyTips",
  components: {
    DeleteTip,
    EditTip,
    Input,
    Tip,
  },
  computed: {
    ...mapGetters(["getUserProfile", "getUserTips"]),
    filteredTips() {
      const self = this;
      return this.getUserTips.filter(function(tip) {
        return tip.content.title.indexOf(self.searchQuery) !== -1;
      });
    },
  },
  data() {
    return {
      noResults: false,
      searchQuery: "",
      selectedTip: {},
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  watch: {
    filteredTips(val) {
      this.noResults = !val.length;
    },
  },
  methods: {
    closeEditModal() {
      this.selectedTip = {};
      this.showEditModal = false;
    },
    closeDeleteModal() {
      this.selectedTip = {};
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
