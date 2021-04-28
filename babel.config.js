// https://github.com/babel/babel-loader
// https://babeljs.io/docs/en/config-files#config-function-api

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
  // api.env();
  // in dev mode use high target 
  api.cache(true);
  return baseConfig;
};
