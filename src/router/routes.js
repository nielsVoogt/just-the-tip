const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/Auth.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "/registration",
        name: "Registration",
        component: () => import("../views/Registration.vue"),
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("../views/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "",
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: "LandingPage",
        component: () => import("../views/LandingPage.vue"),
      },
      {
        path: "/:slug",
        name: "FriendTips",
        component: () => import("../views/Tips.vue"),
      },
      {
        path: "/tips",
        name: "Tips",
        component: () => import("../views/Tips.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/friends",
        name: "Friends",
        component: () => import("../views/Friends.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
