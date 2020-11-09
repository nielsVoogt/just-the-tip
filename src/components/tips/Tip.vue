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
    tip: {
      type: Object,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: false,
    },
    tipId: {
      type: String,
      required: true,
    },
    tipOwnerUid: {
      type: String,
      required: false,
    },
    isFollower: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["user"]),
    allowInteraction() {
      if (this.isOwner) return false;
      if (this.isFollower) return true;
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

<style scoped lang="scss">
.tip {
  background: white;
  margin: 1em;
  width: 350px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    .options-menu {
      opacity: 1;
    }
  }
}

.tip-content {
  padding: 1.5em;
}

.tip-link {
  color: #413eb9;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1em;

  svg {
    position: relative;
    margin-right: 0.35em;
  }
}

.tip-footer {
  background: #f3f3f3;
  padding: 1.5em;
  margin-top: auto;
  display: flex;
  align-items: center;

  .heart {
    margin-left: auto;
  }
}

h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5em;
}
</style>
