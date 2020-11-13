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
        path: "/tips/:slug",
        name: "Tips",
        component: () => import("../views/Tips.vue"),
      },
      {
        path: "/tips",
        name: "MyTips",
        component: () => import("../views/MyTips.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/friends",
        name: "Friends",
        component: () => import("../views/Friends.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/favorites",
        name: "Favorites",
        component: () => import("../views/Favorites.vue"),
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
