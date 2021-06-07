const { rm } = require("fs/promises");
const path = require("path");
const { CACHE_DIR, OUTPUT_DIR, CONTEXT } = require("./constants");

async function command() {
  await Promise.all([
    rm(path.join(CONTEXT, CACHE_DIR), {
      force: true,
      recursive: true,
    }),
    rm(path.join(CONTEXT, OUTPUT_DIR), {
      force: true,
      recursive: true,
    }),
  ]);
}

module.exports = command;
