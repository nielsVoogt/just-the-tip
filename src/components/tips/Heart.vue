<template>
  <div
    :class="[
      'heart',
      {
        'heart--has-likes': likes.length !== 0,
        'heart--blocked': allowInteraction,
      },
    ]"
  >
    <div class="heart-counter">
      <div class="heart-counter-current">
        {{ likes.length }}
      </div>
      <div class="heart-counter-hover">
        {{ likes.length + 1 }}
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
  },
};
</script>

<style scoped lang="scss">
.heart {
  display: flex;
  align-items: center;
  color: #dbdbdb;
  font-weight: 500;

  .heart-counter {
    overflow: hidden;
    height: 24px;

    .heart-counter-current,
    .heart-counter-hover {
      transition: transform 0.3s ease-out;
    }
  }

  &:hover {
    color: #9a9a9a;

    .heart-counter-current,
    .heart-counter-hover {
      transform: translateY(-100%);
    }

    svg {
      transform: scale(1.15);
      fill: #ff3c3c;
      stroke: #ff3c3c;
    }
  }

  svg {
    transition: transform 0.3s ease-out;
    margin-left: 0.5em;
    cursor: pointer;
  }

  &--has-likes {
    color: #9a9a9a;

    svg {
      fill: #ff3c3c;
      stroke: #ff3c3c;
    }
  }

  &--blocked {
    pointer-events: none;
  }
}
</style>
