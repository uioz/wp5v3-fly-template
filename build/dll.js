const { readFile } = require("fs/promises");
const path = require("path");
const { webpack, DllPlugin } = require("webpack");
const {
  CONTEXT,
  DEV,
  DLL_OUTPUT_PATH,
  DLL_MANIFEST_NAME,
} = require("./constants");

const config = {
  mode: "development",
  devtool: "source-map",
  context: CONTEXT,
  entry: ["vue", "vuex", "vue-router", "element-plus", "axios"],
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.join(CONTEXT, DLL_OUTPUT_PATH),
    filename: "dll.[name].js",
    library: "[name]_[fullhash]",
  },
  plugins: [
    new DllPlugin({
      name: "vendor_lib",
      path: path.join(CONTEXT, DLL_OUTPUT_PATH, DLL_MANIFEST_NAME),
    }),
  ],
};

function command(options) {
  process.env.NODE_ENV = DEV;

  return new Promise((resolve, reject) => {
    webpack(config).run((error, stats) => {
      if (error) {
        return reject(error);
      }

      console.log(
        stats.toString({
          colors: true, // Shows colors in the console
        })
      );

      resolve();
    });
  });
}

command.hasDll = async function hasDll() {
  try {
    await readFile(path.join(CONTEXT, DLL_OUTPUT_PATH, DLL_MANIFEST_NAME));

    return true;
  } catch {
    return false;
  }
};

module.exports = command;
