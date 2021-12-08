import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requireAuth: true,
    },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Block the request to go to the dashboard from the url if the user is not logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the home
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
