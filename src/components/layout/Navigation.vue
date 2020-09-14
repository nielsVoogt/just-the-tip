<template>
  <div id="menu">
    <header>
      <button @click="menuShown = true">
        <menu-icon />
      </button>
    </header>
    <transition name="slide-fade">
      <nav v-if="menuShown">
        <x-icon @click="menuShown = false" />
        <ul v-show="currentUser">
          <li>
            <a href="#" @click.prevent="signOut">Log out</a>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
import { MenuIcon, XIcon } from "vue-feather-icons";
import { mapState } from "vuex";

const fb = require("@/firebaseConfig.js");

export default {
  name: "Navigation",
  data() {
    return {
      menuShown: false,
    };
  },
  computed: mapState(["currentUser"]),
  components: {
    "menu-icon": MenuIcon,
    "x-icon": XIcon,
  },
  watch: {
    $route() {
      this.menuShown = false;
    },
  },
  methods: {
    signOut() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: none;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
