import { createRouter, createWebHistory } from "vue-router";
import Index from "./views/index/index.vue";
import Home from "./views/home/index.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});
