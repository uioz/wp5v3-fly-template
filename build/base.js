const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackTomlenvPlugin } = require("webpack-tomlenv-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CACHE_DIR, OUTPUT_DIR, CONTEXT } = require("./constant");

exports.BaseConfig = class BaseConfig {
  constructor(context, outputPublicPath) {
    this.context = context;
    this.outputPublicPath = outputPublicPath;
    this.config = {
      context,
    };
  }

  output() {
    this.config.output = {
      publicPath: this.outputPublicPath,
      path: path.join(this.context, OUTPUT_DIR),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    };
    return this;
  }

  module() {
    this.config.module = {
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
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: "asset",
          exclude: /static/,
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 4kb
            },
          },
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
          ],
        },
      ],
    };

    return this;
  }

  resolve() {
    this.config.resolve = {
      alias: {
        "@": path.join(CONTEXT, "src"),
      },
      extensions: [".vue", ".js", ".mjs"],
      symlinks: false,
    };

    return this;
  }

  plugins() {
    this.config.plugins = [
      new WebpackTomlenvPlugin(),
      new HtmlWebpackPlugin({
        title: require("../package.json").name,
        template: "./public/index.html",
      }),
      new VueLoaderPlugin(),
    ];

    return this;
  }

  optimization() {
    this.config.optimization = {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: "single",
    };

    return this;
  }

  cache() {
    this.config.cache = {
      type: "filesystem",
      cacheDirectory: path.join(this.context, CACHE_DIR),
      maxAge: 604800000, // a week
    };

    return this;
  }

  generate() {
    this.output().module().optimization().resolve().plugins().cache();
    return this;
  }
};
