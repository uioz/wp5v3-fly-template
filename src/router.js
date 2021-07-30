import { createRouter, createWebHistory } from "vue-router";
import IndexLayout from "./views/index/layout.vue";
import IndexIndex from "./views/index/index.vue";
import IndexAside from "./views/index/aside.vue";
import IndexFooter from "./views/index/footer.vue";
import IndexHeader from "./views/index/header.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: IndexLayout,
      children: [
        {
          path: "",
          components: {
            default: IndexIndex,
            header: IndexHeader,
            aside: IndexAside,
            footer: IndexFooter,
          },
        },
      ],
    },
  ],
});
