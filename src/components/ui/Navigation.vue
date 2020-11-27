<template>
  <div>
    <span class="navigation-overlay" />
    <div class="navigation" id="navigation">
      <template v-if="isUserAuth">
        <button @click="logOut()">Log out</button>

        <!-- DIVIDER -->
        <hr class="navigation-divider" />

        <!-- NAVIGATION USER SECTION -->
        <div class="navigation-user-section">
          <div
            class="navigation-user-image"
            style="background:url(https://www.placecage.com/300/300) no-repeat center center/contain;"
          ></div>
          <div class="navigation-user-details">
            <div class="navigation-user-details-name" v-if="userProfile">
              {{ userProfile.username }}
            </div>
            <router-link :to="{ name: 'Settings' }">
              <SettingsIcon size="15" />
              Profile settings
            </router-link>
          </div>
        </div>

        <!-- NAVIGATION LINKS -->

        <nav class="navigation-links">
          <router-link :to="{ name: 'Friends' }" class="navigation-link">
            <div class="navigation-link-icon">
              <RssIcon />
            </div>
            <span class="navigation-link-name">Your friends</span>
          </router-link>

          <router-link :to="{ name: 'Favorites' }" class="navigation-link">
            <div class="navigation-link-icon">
              <RssIcon />
            </div>
            <span class="navigation-link-name">Your Favorites</span>
          </router-link>

          <router-link :to="{ name: 'MyTips' }" class="navigation-link">
            <div class="navigation-link-icon">
              <RssIcon />
            </div>
            <span class="navigation-link-name">
              Your tips
            </span>
          </router-link>

          <!-- DIVIDER -->
          <hr class="navigation-divider" />

          <!-- ADD NEW -->
          <button class="navigation-link navigation-link--action" type="button">
            <div class="navigation-link-icon">
              <PlusIcon />
            </div>
            <span class="navigation-link-name">
              Add a new tip
            </span>
          </button>

          <!-- DIVIDER -->
          <hr class="navigation-divider" />

          <button
            class="navigation-link"
            type="button"
            @click="toggleNavigationState()"
          >
            <div class="navigation-link-icon">
              <MenuIcon v-if="!isOpen" />
              <ChevronLeftIcon v-else />
            </div>
            <span class="navigation-link-name">
              Close menu
            </span>
          </button>
        </nav>
      </template>
      <template v-else>
        <router-link :to="{ name: 'Registration' }">Register</router-link> |
        <router-link :to="{ name: 'Login' }">Log in</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import anime from "animejs";

import {
  SettingsIcon,
  RssIcon,
  MenuIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "vue-feather-icons";

export default {
  name: "Navigation",
  components: {
    SettingsIcon,
    RssIcon,
    MenuIcon,
    ChevronLeftIcon,
    PlusIcon,
  },
  computed: {
    ...mapGetters(["isUserAuth", "userProfile"]),
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    $route: function() {
      if (this.isOpen) {
        this.toggleNavigationState();
      }
    },
  },
  methods: {
    ...mapActions(["logOutAction"]),

    logOut() {
      this.logOutAction().then(
        // why do we do this here..? And not in the onAuthChanged method..?
        () => this.$router.push({ name: "LandingPage" }).catch(() => {})
      );
    },

    toggleNavigationState() {
      const fadeInOverlay = {
        targets: ".navigation-overlay",
        opacity: this.isOpen ? [1, 0] : [0, 1],
      };

      const collapseNavigation = {
        targets: ".navigation",
        translateX: this.isOpen ? [0, 165] : [165, 0],
      };

      const changeButtonWidth = {
        targets: ".navigation-link",
        width: this.isOpen ? ["210px", "45px"] : ["45px", "210px"],
      };

      const fadeInButtonName = {
        targets: ".navigation-link-name",
        translateX: this.isOpen ? ["-15px", 0] : [0, "-15px"],
        opacity: this.isOpen ? [1, 0] : [0, 1],
      };

      const duration = 250;
      const animation = anime.timeline({
        complete: () => (this.isOpen = !this.isOpen),
        easing: "easeOutCirc",
        duration,
      });

      animation
        .add(fadeInOverlay)
        .add(collapseNavigation, `-=${duration}`)
        .add(changeButtonWidth, `-=${duration}`)
        .add(fadeInButtonName, `-=${duration}`);
    },
  },
};
</script>

<style lang="scss">
$navigation-padding: 10px;
$navigation-button-size: 45px;
$user-image-size: $navigation-button-size;

.navigation-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
}

.navigation-user-section {
  display: flex;

  .navigation-user-image {
    width: $user-image-size;
    height: $user-image-size;
    border-radius: $user-image-size;
  }

  .navigation-user-details {
    padding-left: 10px;
  }

  .navigation-user-details-name {
    font-weight: bold;
    color: #4a5568;
    text-transform: capitalize;
  }

  a {
    color: #a0aec0;
    font-size: 0.875rem;
    text-decoration: none;
    font-weight: normal;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.25em;
    }
  }
}

#ghostery-purple-box {
  display: none;
}

.navigation-divider {
  background: #e8e8e8;
  height: 1px;
  margin-left: -$navigation-padding;
  margin-right: -$navigation-padding;
  border: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

.navigation-link {
  display: flex;
  align-items: center;
  position: relative;
  color: #718096;
  text-decoration: none;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  font-weight: normal;

  /* WHEN ON MOBILE */
  width: 45px;

  .navigation-link-icon {
    width: $navigation-button-size;
    height: $navigation-button-size;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-right: $navigation-padding; */
    position: relative;
    z-index: 1;
  }

  .navigation-link-name {
    /* position: relative;
    z-index: 1; */
    position: absolute;
    z-index: 1;
    left: 60px;
    white-space: nowrap;
  }

  &--action {
    background: #2c5282;
    color: white;
  }

  &.router-link-active {
    color: #2c5282;
    background: #edf2f7;
  }

  svg {
    display: block;
  }
}

.navigation {
  width: 230px;
  border-radius: 20px 0 0 20px;
  z-index: 1;
  padding: $navigation-padding;
  position: fixed;
  min-height: 100vh;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateX(165px);
  right: 0;
  top: 0;
  bottom: 0;
  /* transition: all 0.2s ease-out; */

  display: flex;
  flex-direction: column;

  .navigation-links {
    margin-top: auto;
  }
  /*
  &--isOpen {
    transform: none;
  } */
}
</style>
