// https://github.com/babel/babel-loader
// https://babeljs.io/docs/en/config-files#config-function-api

const { DEV } = require("./build/constant");

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
        libraryName: "element-plus",
        customStyleName: (name) => {
          name = name.slice(3);
          return `element-plus/lib/theme-chalk/el-${name}.css`;
        },
      },
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
