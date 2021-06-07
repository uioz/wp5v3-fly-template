const path = require("path");

exports.CONTEXT = path.join(__dirname, "..");

exports.OUTPUT_DIR = "./dist";
exports.OUTPUT_PUBLIC_PATH = "/";
exports.DEVSERVER_PUBLIC_PATH = "/";
exports.DEVSERVER_PORT = 8080;
exports.DEVSERVER_HOST = "localhost";
exports.DEVSERVER_BASE = "static";
exports.DEVSERVER_BASE_PUBLIC_PATH = "/";

exports.DEV = "development";
exports.PROD = "production";

exports.DLL_OUTPUT_PATH = "./.cache";
exports.DLL_MANIFEST_NAME = "vender-manifest.json";

exports.CACHE_DIR = "./.cache";