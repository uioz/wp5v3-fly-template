const { rm } = require("fs/promises");
const path = require("path");
const { CACHE_DIR, CONTEXT } = require("./constant");

async function command() {
  await rm(path.join(CONTEXT, CACHE_DIR), {
    force: true,
    recursive: true,
  });
}

module.exports = command;
