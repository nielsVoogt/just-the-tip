<template>
  <div>
    <Input
      type="search"
      placeholder="Search tips by title"
      v-model="searchQuery"
    />
    <!-- {{ isFollower }} -->
    <!-- {{ user }} -->
    <!-- CHECK IF THE VISITOR IS A USER -->
    <div v-if="user">
      <Button @click="addTip()" v-if="isOwner">Add new tip</Button>
      <div v-else>
        <Button type="button" @click="addNewFriend()" v-if="!isFollower">
          Add to friends
        </Button>
      </div>
    </div>

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
          :id="tip.id"
          :is-owner="isOwner"
          :is-follower="isFollower"
          v-on:delete="deleteTip(tip)"
          v-on:edit="editTip(tip)"
          v-show="
            selectedCategory === 'ALL' ||
              tip.content.category === selectedCategory
          "
        />

        <div v-if="cta === true">
          hallo..?
          <!--
            @TODO: add Call to action here
            "We limit the tips to ..., register to see all {{username}}'s tips"
          -->
        </div>
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
import addFriend from "@/utils/addFriend";
import Input from "@/components/ui/Input";
import Tip from "@/components/tips/Tip";
import Filters from "@/components/tips/Filters";
import EditTip from "@/components/tips/EditTip";
import DeleteTip from "@/components/tips/DeleteTip";
import AddTip from "@/components/tips/AddTip";
import Button from "@/components/ui/Button";
import { mapGetters } from "vuex";

export default {
  name: "TipOverview",
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
      isFollower: false,
    };
  },
  props: {
    tips: {
      type: Array,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: false,
    },
    uid: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    cta: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["user", "followers"]),
    filteredTips() {
      const self = this;
      return this.tips.filter((tip) => {
        return tip.content.title.indexOf(self.searchQuery) !== -1;
      });
    },
  },
  watch: {
    followers: {
      immediate: true,
      handler(val) {
        if (val) {
          const follower = this.followers.find((o) => o.uid === this.uid);
          if (follower) this.isFollower = true;
        }
      },
    },
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
    addNewFriend() {
      addFriend(this.uid)
        .then(() => {
          this.$notificationHub.$emit(
            "success",
            `Waiting on confirmation by ${this.slug}`
          );
        })
        .catch((error) => {
          if (error === "duplicate") {
            this.$notificationHub.$emit(
              "error",
              `You already invited ${this.slug}`
            );
          }
        });
    },
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
