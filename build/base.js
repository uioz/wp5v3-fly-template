const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackTomlenvPlugin } = require("webpack-tomlenv-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const {
  CACHE_DIR,
  OUTPUT_DIR,
  CONTEXT,
  DLL_OUTPUT_PATH,
  DLL_MANIFEST_NAME,
} = require("./constants");
const webpack = require("webpack");
const DllGenerator = require("./dll");

exports.BaseConfig = class BaseConfig {
  constructor({ context, outputPublicPath, mode, cache, dll }) {
    this.context = context;
    this.outputPublicPath = outputPublicPath;
    this.usingLocalCache = cache;
    this.usingDllPlugin = dll;
    this.config = {
      context,
      mode,
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
          exclude: [/node_modules/i, /static/i],
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
          exclude: /static/i,
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

  externals() {
    this.config.externals = {};

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

  async dllPlugin() {
    if (!(await DllGenerator.hasDll())) {
      await DllGenerator();
      Object.assign(this.config.externals, {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
      });

      this.config.plugins.push(
        new webpack.DllReferencePlugin({
          context: path.join(CONTEXT, DLL_OUTPUT_PATH),
          manifest: path.join(CONTEXT, DLL_OUTPUT_PATH, DLL_MANIFEST_NAME),
          name: "vendor_lib",
        })
      );
    }
  }

  async generate() {
    this.output().module().resolve().plugins().optimization().externals();

    if (this.usingLocalCache) {
      this.cache();
    }

    if (this.usingDllPlugin) {
      await this.dllPlugin();
    }

    return this;
  }
};
