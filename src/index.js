import { RouterView } from "vue-router";
import { createApp, h } from "vue";
import router from "./router";
import store from "./store";
import singleSpaVue from "single-spa-vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(RouterView),
  },
  handleInstance: (rootVueInstance) => {
    rootVueInstance.use(store).use(router);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

if (process.env.NODE_ENV === "development") {
  if (globalThis.SERVICE_NAME_RUNTIME === SERVICE_NAME) {
    createApp({
      render: () => {
        return h(RouterView);
      },
    })
      .use(router)
      .use(store)
      .mount("body");
  }
}
