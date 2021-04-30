const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { OUTPUT_PUBLIC_PATH, CONTEXT, PROD } = require("./constant");

const { BaseConfig } = require("./base");

class Config extends BaseConfig {
  /**
   *
   * @param {any} param0
   */
  constructor({ context, outputPublicPath, mode }) {
    super(context, outputPublicPath);

    this.config.mode = mode;
  }

  module() {
    super.module();

    //  TODO: may use webpack chain later

    const rules = this.config.module.rules;

    const styleIndex = rules.findIndex((item) => item.test.test("test.css"));
    // TODO: use minicssextractloader

    if (styleIndex >= 0) {
      rules[styleIndex].use.push("postcss-loader");
      // to replace style-loader to MiniCssExtractPlugin.loader
      rules[styleIndex].use[0] = MiniCssExtractPlugin.loader;
      // this for css-loader
      delete rules[styleIndex].use[1].options.modules.localIdentName;
    }

    return this;
  }

  plugins() {
    super.plugins();

    this.config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      })
    );

    return this;
  }

  optimization() {
    super.optimization();

    Object.assign(this.config.optimization, {
      minimizer: [`...`, new CssMinimizerPlugin()],
    });

    return this;
  }

  build() {
    const compiler = webpack(this.config);

    compiler.run((error, stats) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(
        stats.toString({
          colors: true, // Shows colors in the console
        })
      );
    });
  }
}

module.exports = function (options) {
  process.env.NODE_ENV = PROD;

  new Config({
    context: CONTEXT,
    outputPublicPath: OUTPUT_PUBLIC_PATH,
    mode: PROD,
  })
    .generate()
    .build();
};
