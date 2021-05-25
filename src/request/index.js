import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { pluginify, AxiosCacheAdapter } from "axios-pluginify";

export default pluginify(axios)
  .use(new AxiosCacheAdapter(setupCache()))
  .generate(true);
