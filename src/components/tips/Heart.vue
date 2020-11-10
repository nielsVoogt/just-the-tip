<template>
  <div
    :class="[
      'heart',
      {
        'heart--has-likes': likes.length !== 0,
        'heart--blocked': allowInteraction === false,
        'heart--liked': likedByUser === true,
      },
    ]"
    @click="addOrRemoveLike()"
  >
    <div class="heart-counter">
      <div class="heart-counter-numbers">
        <div class="heart-counter-decrement">
          {{ likes.length - 1 }}
        </div>
        <div class="heart-counter-current">
          {{ likes.length }}
        </div>
        <div class="heart-counter-increment">
          {{ likes.length + 1 }}
        </div>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-heart"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
    </svg>
  </div>
</template>
<script>
import likeTip from "@/utils/likeTip";
import { mapActions } from "vuex";
import { fb } from "@/firebaseConfig.js";

export default {
  name: "Heart",
  props: {
    likes: {
      type: Array,
      required: true,
    },
    allowInteraction: {
      type: Boolean,
      required: true,
    },
    likedByUser: {
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
  },
  methods: {
    ...mapActions(["updateLocalFriendTipsLikesAction"]),

    addOrRemoveLike() {
      const like = {
        tipId: this.tipId,
        owner: this.tipOwnerUid,
        likedByUser: this.likedByUser,
        user: {
          uid: fb.auth().currentUser.uid,
          username: fb.auth().currentUser.displayName,
        },
      };

      likeTip(like)
        .then(this.updateLocalFriendTipsLikesAction(like))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style scoped lang="scss">
$heart-color: #9a9a9a;
$liked-heart-color: #ff3c3c;

.heart {
  display: flex;
  align-items: center;
  color: #dbdbdb;
  font-weight: 500;
  cursor: pointer;

  /* HEART COUNTER */

  .heart-counter {
    height: 24px;
    line-height: 24px;
    overflow: hidden;

    .heart-counter-numbers {
      transition: transform 0.15s ease-out;
      transform: translateY(-24px);
    }
  }

  /* HEART */

  svg {
    transition: all 0.15s ease-out;
    margin-left: 0.5em;
  }

  /* HOVER WHEN NOT LIKED YET */

  &:hover {
    color: $heart-color;

    .heart-counter-numbers {
      transform: translateY(calc(24px - 100%));
    }

    svg {
      transform: scale(1.15);
      fill: $liked-heart-color;
      stroke: $liked-heart-color;
    }
  }

  /* HAS LIKES */

  &--has-likes {
    color: $heart-color;

    svg {
      fill: $liked-heart-color;
      stroke: $liked-heart-color;
    }
  }

  &--liked:hover {
    color: $heart-color;

    .heart-counter-numbers {
      transform: translateY(0px);
    }

    svg {
      transform: scale(0.95);
      fill: $heart-color;
      stroke: $heart-color;
    }
  }

  &--blocked {
    pointer-events: none;
  }
}
</style>
