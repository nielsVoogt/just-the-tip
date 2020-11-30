<template>
  <router-link :to="{ name: target }" class="navigation-link">
    <div class="navigation-link-icon">
      <div class="notification-orb" v-if="showNotification"></div>
      <slot />
    </div>
    <div class="navigation-link-name">
      {{ label }}
      <span class="navigation-link-amount" v-if="amount">
        {{ amount }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    target: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
    },
    showNotification: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
