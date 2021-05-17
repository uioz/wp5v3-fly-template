import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export class cache {
  config = {};

  /**
   *
   * @param {import("axios-cache-adapter").IAxiosCacheAdapterOptions} [config]
   */
  constructor(config) {
    if (config) {
      this.config = config;
    }
  }

  apply({ beforeCreate }) {
    beforeCreate(
      (/**@type {import("axios").AxiosRequestConfig} */ axiosConfig) => {
        axiosConfig.adapter = setupCache(this.config);
      }
    );
  }
}

class AxiosGenerator {
  beforeCreate = [];
  created = [];

  /**
   *
   * @param {import("axios").AxiosRequestConfig} axiosConfig
   * @param {import("axios").AxiosStatic} axios
   */
  constructor(axiosConfig, axios) {
    this.axiosConfig = axiosConfig;
    this.axios = axios;
  }

  /**
   *
   * @param  {...any} plugins
   * @returns
   */
  use(...plugins) {
    for (const plugin of plugins) {
      const hook = {
        beforeCreated: () => {
          this.beforeCreated.push(callback);
        },
        created: (callback) => {
          this.created.push(callback);
        },
      };

      plugin.apply(hook);
    }

    return this;
  }

  generate() {
    for (const hook of this.beforeCreate) {
      hook(this.axiosConfig);
    }

    const axios = this.axios.create(this.axiosConfig);

    for (const hook of this.created) {
      hook(axios);
    }

    this.axios = this.axiosConfig = this.beforeCreate = this.created = null;

    return axios;
  }
}

/**
 *
 * @param {import("axios").AxiosRequestConfig} axiosConfig
 * @param {import("axios").AxiosStatic} axiosStatic
 * @returns
 */
export function CreateRequest(axiosConfig = {}, axiosStatic = axios) {
  return new AxiosGenerator(axiosConfig, axiosStatic);
}
