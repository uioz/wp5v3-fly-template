import { RouterView } from "vue-router";
import { createApp, h } from "vue";
import router from "./router";

createApp({
  render: () => h(RouterView),
})
  .use(router)
  .mount("body");

async function IAMTEST() {
  console.log("IAMTEST");
}

IAMTEST();
