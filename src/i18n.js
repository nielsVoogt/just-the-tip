import Vue from "vue";
import VueI18n from "vue-i18n";
import { en } from "./locales/en";
import { nl } from "./locales/nl";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "en",
  messages: { nl, en },
});
