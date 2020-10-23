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
    <div>
      <button @click="selectedCategory = false">All</button>
      <button
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
    <Tip
      v-for="tip in filteredTips"
      :key="tip.id"
      :tip="tip.content"
      showOptions
      v-on:delete="deleteTip(tip)"
      v-on:edit="editTip(tip)"
      v-show="
        selectedCategory === false || tip.content.category === selectedCategory
      "
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
      return this.getUserTips.filter((tip) => {
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
      categories: [],
      selectedCategory: false,
    };
  },
  watch: {
    filteredTips: {
      immediate: true,
      handler(val) {
        if (val) {
          let categories = [];
          val.forEach((element) => {
            categories.push(element.content.category);
          });
          this.categories = Array.from(new Set(categories));
        }

        this.noResults = !val.length;
      },
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
