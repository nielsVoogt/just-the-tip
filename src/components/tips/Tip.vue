<template>
  <div class="tip">
    <div class="tip-content">
      <h2>{{ tip.title }}</h2>
      <p>{{ tip.description }}</p>

      <a
        v-if="tip.url"
        :href="tip.url"
        rel="noreferrer noopener"
        target="_blank"
        class="tip-link"
      >
        <ExternalLinkIcon size="1x" />
        {{ tip.url }}
      </a>
    </div>
    <OptionsMenu v-if="isOwner">
      <button @click="editTip()" class="options-menu-item">
        <EditIcon size="1x" />
        Edit tip
      </button>
      <button @click="deleteTip()" class="options-menu-item">
        <Trash2Icon size="1x" />
        Delete tip
      </button>
    </OptionsMenu>

    <div class="tip-footer">
      <Label :name="tip.category" />
      <Heart
        :likes="tip.likes"
        :allow-interaction="allowInteraction"
        :liked-by-user="this.tip.likes.some((e) => e.uid === this.user.uid)"
        :tip-id="tipId"
        :tip-owner-uid="tipOwnerUid"
      />
    </div>
  </div>
</template>

<script>
import { ExternalLinkIcon, EditIcon, Trash2Icon } from "vue-feather-icons";

import OptionsMenu from "@/components/ui/OptionsMenu";
import Heart from "@/components/tips/Heart";
import Label from "@/components/ui/Label";
import { mapGetters } from "vuex";

export default {
  name: "Tip",
  components: {
    Heart,
    OptionsMenu,
    ExternalLinkIcon,
    Label,
    EditIcon,
    Trash2Icon,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: false,
    },
    isFollower: {
      type: Boolean,
      required: false,
    },
    isFavorite: {
      Boolean,
      required: false,
    },
    tip: {
      type: Object,
      required: true,
    },
    tipId: {
      type: String,
      required: true,
    },
    tipOwnerUid: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["user"]),
    allowInteraction() {
      if (this.isOwner) return false;
      if (this.isFollower) return true;
      if (this.isFavorite) return true;
      return false;
    },
  },
  methods: {
    editTip() {
      this.$emit("edit");
    },
    deleteTip() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss">
$tip-border-color: #e1e7ef;

.tip {
  background: white;
  width: 100%;
  border-radius: 8px;
  border: 1px solid $tip-border-color;
  border-bottom-width: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  .tip-content {
    padding: 1em;
  }

  .tip-link {
    color: #413eb9;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1em;
    font-size: 0.875rem;

    svg {
      position: relative;
      margin-right: 0.35em;
    }
  }

  .tip-footer {
    border-top: 1px solid $tip-border-color;
    padding: 1em;
    margin-top: auto;
    display: flex;
    align-items: center;

    .heart {
      margin-left: auto;
    }
  }
}

h2 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5em;
  color: #393939;
}

p {
  font-size: 0.875rem;
  color: #6b6b6b;
}
</style>
