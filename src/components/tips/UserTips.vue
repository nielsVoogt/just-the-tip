<template>
  <div>
    <Input
      type="search"
      placeholder="Search tips by title"
      v-model="searchQuery"
    />

    <Button @click="addTip()">Add new tip</Button>

    <div v-if="tips.length">
      <Filters
        v-on:category-selected="selectCategory"
        :categories="categories"
        :selected="selectedCategory"
      />
      <div class="tip-container">
        <Tip
          v-for="tip in filteredTips"
          :key="tip.id"
          :tip="tip.content"
          :show-options="showOptions"
          v-on:delete="deleteTip(tip)"
          v-on:edit="editTip(tip)"
          v-show="
            selectedCategory === 'ALL' ||
              tip.content.category === selectedCategory
          "
        />
      </div>
      <div v-if="noResults">
        No results
      </div>
    </div>

    <div v-else>
      ...Loading
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

    <AddTip :is-modal-visible="showAddModal" v-on:close="closeAddModal()" />
  </div>
</template>

<script>
import Input from "@/components/ui/Input";
import Tip from "@/components/tips/Tip";
import Filters from "@/components/tips/Filters";
import EditTip from "@/components/tips/EditTip";
import DeleteTip from "@/components/tips/DeleteTip";
import AddTip from "@/components/tips/AddTip";
import Button from "@/components/ui/Button";

export default {
  name: "UserTips",
  components: {
    DeleteTip,
    EditTip,
    Filters,
    Button,
    AddTip,
    Input,
    Tip,
  },
  data() {
    return {
      noResults: false,
      searchQuery: "",
      selectedTip: {},
      categories: [],
      selectedCategory: "ALL",
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
    };
  },
  props: {
    tips: {
      type: Array,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    filteredTips() {
      const self = this;
      return this.tips.filter((tip) => {
        return tip.content.title.indexOf(self.searchQuery) !== -1;
      });
    },
  },
  watch: {
    filteredTips: {
      immediate: true,
      handler(val) {
        if (val) {
          this.categories = Array.from(
            new Set(val.map((element) => element.content.category))
          );
        }

        this.noResults = !val.length;
      },
    },
  },
  methods: {
    selectCategory(payload) {
      this.selectedCategory = payload;
    },
    closeEditModal() {
      this.selectedTip = {};
      this.showEditModal = false;
    },
    closeDeleteModal() {
      this.selectedTip = {};
      this.showDeleteModal = false;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    deleteTip(tip) {
      this.selectedTip = tip;
      this.showDeleteModal = true;
    },
    editTip(tip) {
      this.selectedTip = tip;
      this.showEditModal = true;
    },
    addTip() {
      this.showAddModal = true;
    },
  },
};
</script>

<style scoped>
.tip-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
