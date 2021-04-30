const path = require("path");
const webpack = require("webpack");
const Server = require("webpack-dev-server");
const DllGenerator = require("./dll");

const {
  DEV,
  CONTEXT,
  OUTPUT_PUBLIC_PATH,
  DEVSERVER_BASE_PUBLIC_PATH,
  DEVSERVER_PUBLIC_PATH,
  DEVSERVER_BASE,
  DEVSERVER_PORT,
  DEVSERVER_HOST,
  DLL_OUTPUT_PATH,
  DLL_MANIFEST_NAME,
} = require("./constant");

const { BaseConfig } = require("./base");

class Config extends BaseConfig {
  /**
   *
   * @param {any} param0
   */
  constructor({ context, outputPublicPath, mode, port, host }) {
    super(context, outputPublicPath);
    this.config.mode = mode;
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

    this.config.plugins.push(
      new webpack.DllReferencePlugin({
        context: path.join(CONTEXT, DLL_OUTPUT_PATH),
        manifest: path.join(CONTEXT, DLL_OUTPUT_PATH, DLL_MANIFEST_NAME),
        name: "vendor_lib",
      })
    );

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

  generate() {
    super.generate();

    this.devtool().target();
    return this;
  }

  async runServer() {
    if (!(await DllGenerator.hasDll())) {
      await DllGenerator();
    }

    new Server(webpack(this.config), {
      contentBase: path.join(this.context, DEVSERVER_BASE),
      contentBasePublicPath: DEVSERVER_BASE_PUBLIC_PATH,
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

module.exports = function (options) {
  process.env.NODE_ENV = DEV;

  new Config({
    context: CONTEXT,
    outputPublicPath: OUTPUT_PUBLIC_PATH,
    mode: DEV,
    port: options?.port ?? DEVSERVER_PORT,
    host: options?.host ?? DEVSERVER_HOST,
  })
    .generate()
    .runServer();
};
