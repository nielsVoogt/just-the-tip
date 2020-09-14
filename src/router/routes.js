import { store } from "@/store";

const routes = [
  {
    path: "/login",
    component: () => import("../views/EmptyRouterView.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    beforeEnter: (to, from, next) => {
      !store.getters.isAuthenticated ? next({ name: "Login" }) : next();
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/dashboard/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/registration",
    component: () => import("../views/EmptyRouterView.vue"),
    children: [
      {
        path: "",
        name: "Registration",
        component: () => import("../views/registration/Registration.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
