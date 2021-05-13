import { RouterView } from "vue-router";
import { createApp, h } from "vue";
import router from "./router";
import store from "./store";

// axios is builtin
// import axios from "axios";

createApp({
  render: () => h(RouterView),
})
  .use(store)
  .use(router)
  .mount("body");
