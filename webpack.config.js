const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { join } = require("path");

const publicPath = "/";

module.exports = (env, argv) => {
  return {
    output: {
      publicPath,
      path: join(__dirname, "dist"),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    // make output more clear and easy to read
    devtool: false,
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
      extensions: [".vue", ".js", ".mjs"],
    },
    externals: {
      runtime: "runtime",
    },
    devServer: {
      contentBase: join(__dirname, "static"),
      contentBasePublicPath: publicPath,
      publicPath,
      historyApiFallback: true,
      hot: true,
      hotOnly: false,
      port: 8080,
      compress: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: "./.cache",
              cacheCompression: false,
            },
          },
        },
        {
          test: /\.vue$/i,
          include: /[\\/]src[\\/]/i,
          loader: "vue-loader",
        },
        {
          test: /(\.css|\.scss)$/i,
          include: [/[\\/]src[\\/]/i, /element-plus/i],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  // https://github.com/webpack-contrib/css-loader#localidentname
                  localIdentName: "[path][name]__[local]",
                  auto(resourcePath) {
                    const Pure = /\.pure\.(css|scss)$/i;
                    const FromNodeModules = /node_modules/i;

                    return (
                      !Pure.test(resourcePath) &&
                      !FromNodeModules.test(resourcePath)
                    );
                  },
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                webpackImporter: false,
              },
            },
            // "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 4kb
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: require("./package.json").name,
        template: "./public/index.html",
      }),
      new VueLoaderPlugin(),
      new DefinePlugin({
        TARGET: JSON.stringify("hello world"),
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    cache: {
      type: "filesystem",
      cacheDirectory: path.join(__dirname, ".cache"),
      maxAge: 604800000, // a week
    },
  };
};
