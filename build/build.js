const webpack = require("webpack");

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

    const rules = this.config.module.rules;

    const styleIndex = rules.findIndex((item) => item.test.test("test.css"));
    // TODO: use minicssextractloader

    //  TODO: may use webpack chain later
    if (styleIndex >= 0) {
      rules[styleIndex].use.push("postcss-loader");
      // css-loader
      delete rules[styleIndex].use[1].options.modules.localIdentName;
    }

    return this;
  }

  plugins() {
    super.plugins();

    // TODO: use extract css later
    // TODO: use compressor later

    return this;
  }

  generate() {
    super.generate();

    this.module().plugins();

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
