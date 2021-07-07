// https://github.com/babel/babel-loader
// https://babeljs.io/docs/en/config-files#config-function-api

const { DEV } = require("./build/constants");

const baseConfig = {
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
    [
      "import",
      {
        libraryName: "@icon-park/vue-next",
        libraryDirectory: "es/icons",
        camel2DashComponentName: false,
      },
      "babel needs a unique name for separate instances but same plugin",
    ],
  ],
};

module.exports = function (api) {
  if (api.env() === DEV) {
    delete baseConfig.presets;
    baseConfig.plugins.shift();
  }

  api.cache(true);

  return baseConfig;
};
