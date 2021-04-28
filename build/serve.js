const path = require("path");
const webpack = require("webpack");
const Server = require("webpack-dev-server");

const {
  DEV,
  CONTEXT,
  OUTPUT_PUBLIC_PATH,
  DEVSERVER_BASE_PUBLIC_PATH,
  DEVSERVER_PUBLIC_PATH,
  DEVSERVER_BASE,
  DEVSERVER_PORT,
  DEVSERVER_HOST,
} = require("./constant");

const { BaseConfig } = require("./base");

class Config extends BaseConfig {
  /**
   *
   * @param {any} options
   * @param {string} context
   * @param {string} outputPublicPath
   */
  constructor({ context, outputPublicPath, mode, port, host }) {
    super(context, outputPublicPath);
    this.config.mode = mode;
    this.port = port;
    this.host = host;
  }

  devtool() {
    this.config.devtool = "eval";

    return this;
  }

  generate() {
    super.generate();

    this.devtool();
    return this;
  }

  runServer() {
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

  new Config(
    {
      context: CONTEXT,
      outputPublicPath: OUTPUT_PUBLIC_PATH,
      mode: DEV,
      port: options?.port ?? DEVSERVER_PORT,
      host: options?.host ?? DEVSERVER_HOST,
    },
    CONTEXT,
    OUTPUT_PUBLIC_PATH
  )
    .generate()
    .runServer();
};
