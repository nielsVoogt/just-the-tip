<template>
  <div>
    <span
      class="navigation-overlay"
      @click="toggleNavigationState()"
      :style="{ pointerEvents: isOpen ? 'all' : 'none' }"
    />
    <div class="navigation" id="navigation">
      <template v-if="isUserAuth">
        <div class="navigation-top">
          <svg
            width="142"
            height="33"
            viewBox="0 0 142 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="navigation-logo"
          >
            <path
              d="M44.1668 26.104C43.6468 26.104 43.2048 26.0693 42.8408 26V23.4C43.1181 23.4693 43.4301 23.504 43.7768 23.504C44.3488 23.504 44.7735 23.3653 45.0508 23.088C45.3281 22.7933 45.4668 22.3513 45.4668 21.762V7.8H48.3268V21.684C48.3268 23.1747 47.9801 24.284 47.2868 25.012C46.6108 25.74 45.5708 26.104 44.1668 26.104ZM54.5317 26.26C53.145 26.26 52.0877 25.87 51.3597 25.09C50.6317 24.2927 50.2677 23.1573 50.2677 21.684V7.8H53.1277V21.892C53.1277 22.516 53.249 22.9667 53.4917 23.244C53.7517 23.5213 54.1157 23.66 54.5837 23.66C55.0517 23.66 55.407 23.5213 55.6497 23.244C55.9097 22.9667 56.0397 22.516 56.0397 21.892V7.8H58.7957V21.684C58.7957 23.1573 58.4317 24.2927 57.7037 25.09C56.9757 25.87 55.9183 26.26 54.5317 26.26ZM64.5506 26.26C63.1639 26.26 62.1153 25.87 61.4046 25.09C60.6939 24.2927 60.3386 23.1573 60.3386 21.684V20.644H63.0426V21.892C63.0426 23.0707 63.5366 23.66 64.5246 23.66C65.0099 23.66 65.3739 23.5213 65.6166 23.244C65.8766 22.9493 66.0066 22.4813 66.0066 21.84C66.0066 21.0773 65.8333 20.41 65.4866 19.838C65.1399 19.2487 64.4986 18.5467 63.5626 17.732C62.3839 16.692 61.5606 15.756 61.0926 14.924C60.6246 14.0747 60.3906 13.1213 60.3906 12.064C60.3906 10.6253 60.7546 9.516 61.4826 8.736C62.2106 7.93867 63.2679 7.54 64.6546 7.54C66.0239 7.54 67.0553 7.93867 67.7486 8.736C68.4593 9.516 68.8146 10.6427 68.8146 12.116V12.87H66.1106V11.934C66.1106 11.31 65.9893 10.8593 65.7466 10.582C65.5039 10.2873 65.1486 10.14 64.6806 10.14C63.7273 10.14 63.2506 10.7207 63.2506 11.882C63.2506 12.5407 63.4239 13.156 63.7706 13.728C64.1346 14.3 64.7846 14.9933 65.7206 15.808C66.9166 16.848 67.7399 17.7927 68.1906 18.642C68.6413 19.4913 68.8666 20.488 68.8666 21.632C68.8666 23.1227 68.4939 24.2667 67.7486 25.064C67.0206 25.8613 65.9546 26.26 64.5506 26.26ZM72.7424 10.4L69.7524 10.4V7.8L78.5924 7.8V10.4H75.6024V26L72.7424 26V10.4ZM86.3772 10.4H83.3872V7.8L92.2272 7.8V10.4H89.2372V26H86.3772V10.4ZM93.6119 7.8L96.4719 7.8V15.21H99.5399V7.8L102.4 7.8V26H99.5399V17.81H96.4719V26H93.6119V7.8ZM104.53 7.8L112.33 7.8V10.4H107.39V15.21H111.316V17.81H107.39V23.4H112.33V26H104.53V7.8ZM120.375 10.4H117.385V7.8L126.225 7.8V10.4L123.235 10.4V26H120.375V10.4ZM127.61 7.8H130.47V26H127.61V7.8ZM132.612 7.8L136.824 7.8C138.245 7.8 139.311 8.18133 140.022 8.944C140.733 9.70667 141.088 10.8247 141.088 12.298V14.092C141.088 15.5653 140.733 16.6833 140.022 17.446C139.311 18.2087 138.245 18.59 136.824 18.59H135.472V26H132.612V7.8ZM136.824 15.99C137.292 15.99 137.639 15.86 137.864 15.6C138.107 15.34 138.228 14.898 138.228 14.274V12.116C138.228 11.492 138.107 11.05 137.864 10.79C137.639 10.53 137.292 10.4 136.824 10.4H135.472V15.99H136.824Z"
              fill="#2C5282"
            />
            <circle cx="16.5" cy="16.5" r="16.5" fill="#2C5282" />
            <path
              d="M24.8667 16.2083L17.2083 23.8667C16.2701 24.8049 14.9976 25.332 13.6708 25.332C12.344 25.332 11.0715 24.8049 10.1333 23.8667C9.19512 22.9285 8.66805 21.656 8.66805 20.3292C8.66805 19.0024 9.19512 17.7299 10.1333 16.7917L17.7917 9.13335C18.4171 8.50788 19.2654 8.15649 20.15 8.15649C21.0345 8.15649 21.8829 8.50788 22.5083 9.13335C23.1338 9.75882 23.4852 10.6071 23.4852 11.4917C23.4852 12.3762 23.1338 13.2245 22.5083 13.85L14.8417 21.5083C14.5289 21.8211 14.1048 21.9968 13.6625 21.9968C13.2202 21.9968 12.7961 21.8211 12.4833 21.5083C12.1706 21.1956 11.9949 20.7715 11.9949 20.3292C11.9949 19.8869 12.1706 19.4627 12.4833 19.15L19.5583 12.0833"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <button @click="logOut()" class="navigation-logout-mobile">
            <LogInIcon />
          </button>
        </div>
        <hr class="navigation-divider" />

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
              <SettingsIcon size="13" />
              Profile settings
            </router-link>
          </div>
        </div>
        <nav class="navigation-links">
          <NavLink label="Your feed" target="Feed">
            <RssIcon />
          </NavLink>

          <NavLink
            label="Your friends"
            target="Friends"
            :show-notification="pendingFollowers && pendingFollowers.length > 0"
            :amount="followers ? followers.length : 0"
          >
            <UsersIcon />
          </NavLink>
          <NavLink label="Your Favorites" target="Favorites" :amount="9">
            <HeartIcon />
          </NavLink>

          <NavLink
            label="Your tips"
            target="MyTips"
            :amount="userProfile ? userProfile.tipCount : 0"
          >
            <PaperclipIcon />
          </NavLink>

          <hr class="navigation-divider" />

          <button class="navigation-link navigation-link--action" type="button">
            <div class="navigation-link-icon">
              <PlusIcon />
            </div>
            <span class="navigation-link-name">
              Add a new tip
            </span>
          </button>

          <hr class="navigation-divider hide-on-desktop" />
        </nav>

        <div class="navigation-toggle">
          <button
            class="navigation-link"
            type="button"
            @click="toggleNavigationState()"
          >
            <div class="navigation-link-icon">
              <MenuIcon />
            </div>
            <span class="navigation-link-name">
              Close menu
            </span>
          </button>
        </div>

        <div class="navigation-logout">
          <hr class="navigation-divider" />
          <button class="navigation-link" type="button" @click="logOut()">
            <div class="navigation-link-icon">
              <LogInIcon />
            </div>
            <span class="navigation-link-name">
              Log out
            </span>
          </button>
        </div>
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
import NavLink from "@/components/ui/NavLink";

import {
  LogInIcon,
  RssIcon,
  MenuIcon,
  PlusIcon,
  HeartIcon,
  UsersIcon,
  PaperclipIcon,
  SettingsIcon,
} from "vue-feather-icons";

export default {
  name: "Navigation",
  components: {
    RssIcon,
    PlusIcon,
    HeartIcon,
    UsersIcon,
    PaperclipIcon,
    NavLink,
    MenuIcon,
    LogInIcon,
    SettingsIcon,
  },
  computed: {
    ...mapGetters([
      "isUserAuth",
      "userProfile",
      "followers",
      "pendingFollowers",
      "friendTips",
    ]),
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
        translateX: this.isOpen ? [0, 190] : [190, 0],
      };

      const changeButtonWidth = {
        targets: ".navigation-link",
        width: this.isOpen ? [235, 45] : [45, 235],
      };

      const fadeInButtonName = {
        targets: ".navigation-link-name",
        opacity: this.isOpen ? [1, 0] : [0, 1],
      };

      const scaleAmounts = {
        targets: ".navigation-link-amount",
        scale: this.isOpen ? [1, 0] : [0, 1],
        opacity: this.isOpen ? [1, 0] : [0, 1],
        delay: anime.stagger(75),
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
        .add(fadeInButtonName, `-=${duration}`)
        .add(scaleAmounts, `-=${duration}`);
    },
  },
};
</script>

<style lang="scss">
$navigation-width: 255px;
$navigation-padding: 10px;
$navigation-button-size: 45px;
$user-image-size: $navigation-button-size;

.navigation-top {
  position: relative;
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
}

.navigation-user-section {
  display: flex;

  @media (min-width: 600px) {
    order: 1;
    margin-top: auto;
  }

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
    margin-top: 2px;
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

.navigation-logout {
  margin-top: 5px;
  order: 1;

  @media (max-width: 600px) {
    display: none;
  }

  svg {
    transform: rotate(180deg);
  }
}

.navigation-toggle {
  @media (min-width: 600px) {
    display: none;
  }
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
  position: relative;

  @media (max-width: 600px) {
    width: $navigation-button-size;
  }

  @media (min-width: 600px) {
    width: 100% !important;
  }

  .navigation-link-amount {
    margin-left: auto;
    margin-right: 15px;
    font-weight: normal;

    @media (min-width: 600px) {
      transform: scale(1) !important;
      opacity: 1 !important;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.65);
    }
  }

  .notification-orb {
    $notification-orb-size: 8px;
    animation: pulse 0.75s infinite alternate;
    width: $notification-orb-size;
    height: $notification-orb-size;
    background: #00ca35;
    border-radius: $notification-orb-size;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .navigation-link-icon {
    align-items: center;
    display: flex;
    height: $navigation-button-size;
    justify-content: center;
    position: relative;
    width: $navigation-button-size;
    z-index: 1;
  }

  .navigation-link-name {
    display: flex;
    font-weight: 500;
    left: 55px;
    white-space: nowrap;
    width: calc(100% - 45px);
    z-index: 1;

    @media (min-width: 600px) {
      position: relative;
      left: 5px;
      opacity: 1 !important;
    }
  }

  /* THIS IS UGLY :( */

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

/* ---------------------- OVERLAY ---------------------- */

.navigation-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
}

/* ---------------------- USER SECTION ---------------------- */

.navigation-divider {
  background: #e8e8e8;
  height: 1px;
  margin-left: -$navigation-padding;
  margin-right: -$navigation-padding;
  border: 0;
}

/* ---------------------- NAVIGATION LINK ---------------------- */

.navigation-logout-mobile {
  align-items: center;
  display: flex;
  height: $navigation-button-size;
  justify-content: flex-end;
  width: $navigation-button-size;
  margin-left: auto;
  color: #718096;

  @media (min-width: 600px) {
    display: none;
  }
}

.navigation-logo {
  width: auto;
  height: $navigation-button-size;
}

/* ---------------------- NAVIGATION ---------------------- */

.navigation {
  width: $navigation-width;
  z-index: 1;
  padding: $navigation-padding;
  position: fixed;
  min-height: 100vh;
  background: white;
  box-shadow: 0 2.9px 7.5px rgba(0, 0, 0, 0.041),
    0 7px 13.6px rgba(0, 0, 0, 0.049), 0 13.1px 18.6px rgba(0, 0, 0, 0.051),
    0 23.5px 23px rgba(0, 0, 0, 0.052), 0 43.9px 28.1px rgba(0, 0, 0, 0.055),
    0 105px 48px rgba(0, 0, 0, 0.07);

  transform: translateX(190px);
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    left: 0;
    right: auto;
    transform: none !important;
  }

  .navigation-links {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;

    @media (min-width: 600px) {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 0;
    }
  }
}

.hide-on-desktop {
  @media (min-width: 600px) {
    display: none;
  }
}

.hide-on-mobile {
  @media (max-width: 600px) {
    display: none;
  }
}
</style>
