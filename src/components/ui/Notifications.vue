<template>
  <div class="notification-container">
    <div
      v-for="(notification, i) in notifications"
      :key="i"
      :class="['notification', `notification--${notification.type}`]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  data() {
    return {
      notifications: [],
    };
  },
  watch: {
    notifications() {
      setTimeout(() => {
        this.notifications.shift();
      }, 5000);
    },
  },
  created() {
    this.$notificationHub.$on("add-notification", (payload) => {
      this.notifications.push(payload);
    });
  },
};
</script>

<style>
.notification-container {
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  right: 1em;
  bottom: 1em;
}
</style>
