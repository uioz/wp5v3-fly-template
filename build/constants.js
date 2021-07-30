const path = require("path");

exports.CONTEXT = path.join(__dirname, "..");

exports.OUTPUT_DIR = "./dist";
exports.OUTPUT_PUBLIC_PATH = "/";
exports.DEVSERVER_PUBLIC_PATH = "/";
exports.DEVSERVER_PORT = 8080;
exports.DEVSERVER_HOST = "localhost";
exports.DEVSERVER_CONTENT_BASE = "static";
exports.DEVSERVER_CONTENT_BASE_PUBLIC_PATH = "/static";

exports.DEV = "development";
exports.PROD = "production";

exports.DLL_OUTPUT_PATH = "./.cache";
exports.DLL_MANIFEST_NAME = "vender-manifest.json";

exports.CACHE_DIR = "./.cache";

exports.NAME = require(path.join(exports.CONTEXT, "package.json")).name;
exports.VERSION = require(path.join(exports.CONTEXT, "package.json")).version;