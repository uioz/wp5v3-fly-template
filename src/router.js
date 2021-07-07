import { createRouter, createWebHistory } from "vue-router";
import Index from "./views/index/index.vue";
import Home from "./views/home/index.vue";
import TestLayout from "./views/test/layout.vue";
import TestIndex from "./views/test/index.vue";
import TestAside from "./views/test/aside.vue";
import TestFooter from "./views/test/footer.vue";
import TestHeader from "./views/test/header.vue";

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
    {
      path: "/test",
      component: TestLayout,
      children: [
        {
          path: "",
          components: {
            default: TestIndex,
            header: TestHeader,
            aside: TestAside,
            footer: TestFooter,
          },
        },
      ],
    },
  ],
});
