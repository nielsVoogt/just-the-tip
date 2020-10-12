import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import { store } from '@/store/index.js'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated
    if (!isAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
