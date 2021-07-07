/**
 * postcss 相关文档
 * https://github.com/postcss/postcss#readme
 * https://github.com/csstools/postcss-preset-env/blob/master/INSTALL.md#webpack
 * https://github.com/webpack-contrib/postcss-loader#config
 * autoprefixer 文档
 * https://github.com/postcss/autoprefixer#options
 */
const { DEV } = require("./build/constants");

switch (process.env.NODE_ENV) {
  case DEV:
    module.exports = {
      plugins: [require("tailwindcss")],
    };
    break;
  default:
    // production mode and other
    module.exports = {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    };
    break;
}
