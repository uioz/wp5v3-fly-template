const path = require("path");
const webpack = require("webpack");
const Server = require("webpack-dev-server");
// const webpackCdnPlugin = require("webpack-cdn-plugin");

const {
  DEV,
  CONTEXT,
  OUTPUT_PUBLIC_PATH,
  DEVSERVER_CONTENT_BASE_PUBLIC_PATH,
  DEVSERVER_PUBLIC_PATH,
  DEVSERVER_CONTENT_BASE,
  DEVSERVER_PORT,
  DEVSERVER_HOST,
} = require("./constants");

const { BaseConfig } = require("./base");

class Config extends BaseConfig {
  /**
   *
   * @param {any} param0
   */
  constructor(superOptions, { port, host }) {
    super(superOptions);
    this.port = port;
    this.host = host;
  }

  target() {
    // see https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    this.config.target = "web";
    return this;
  }

  output() {
    super.output();

    const output = this.config.output;

    output.chunkFilename = "[name].[id].js";
    output.filename = "[name].js";
    output.assetModuleFilename = "[path][base]";
    output.hotUpdateChunkFilename = "[name].[id].hot-update.js";
    output.pathinfo = false;

    return this;
  }

  plugins() {
    super.plugins();

    this.config.plugins
      .push
      // new webpack.DllReferencePlugin({
      //   context: path.join(CONTEXT, DLL_OUTPUT_PATH),
      //   manifest: path.join(CONTEXT, DLL_OUTPUT_PATH, DLL_MANIFEST_NAME),
      //   name: "vendor_lib",
      // }),
      // new webpackCdnPlugin({
      //   // 因为 DevServer 没有托管 node_modules
      //   // 所以使用默认的生产环境配置从 CDN 上加载
      //   // 替换为 jsdelivr
      //   prodUrl: "https://cdn.jsdelivr.net/npm/:name@:version/:path",
      //   modules: [
      //     {
      //       name: "vue",
      //       var: "Vue",
      //       path: "dist/vue.runtime.global.js",
      //     },
      //     {
      //       name: "vue-router",
      //       var: "VueRouter",
      //       path: "dist/vue-router.global.js",
      //     },
      //     {
      //       name: "vuex",
      //       var: "Vuex",
      //       path: "dist/vuex.global.js",
      //     },
      //     {
      //       name: "axios",
      //       var: "axios",
      //       path: "dist/axios.min.js",
      //     },
      //   ],
      //   publicPath: "/node_modules",
      // })
      ();

    return this;
  }

  optimization() {
    this.config.optimization = {
      // down below is webpack recommendation
      runtimeChunk: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      // not webpack recommendation may cuz issue probably
      innerGraph: false,
      sideEffects: false,
      mergeDuplicateChunks: false,
      mangleWasmImports: false,
    };

    return this;
  }

  devtool() {
    this.config.devtool = "eval-cheap-module-source-map";

    return this;
  }

  async generate() {
    await super.generate();

    this.devtool().target();
    return this;
  }

  runServer() {
    new Server(webpack(this.config), {
      contentBase: path.join(this.context, DEVSERVER_CONTENT_BASE),
      contentBasePublicPath: DEVSERVER_CONTENT_BASE_PUBLIC_PATH,
      publicPath: DEVSERVER_PUBLIC_PATH,
      historyApiFallback: true,
      hot: true,
      hotOnly: false,
      port: this.port,
      compress: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    }).listen(this.port, this.host);
  }
}

module.exports = async function ({ cache, dll, port, host }) {
  process.env.NODE_ENV = DEV;

  (
    await new Config(
      {
        context: CONTEXT,
        outputPublicPath: OUTPUT_PUBLIC_PATH,
        mode: DEV,
        cache,
        dll,
      },
      {
        port: port ?? DEVSERVER_PORT,
        host: host ?? DEVSERVER_HOST,
      }
    ).generate()
  ).runServer();
};
