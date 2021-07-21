#!/usr/bin/env node
"use strict";
const program = require("commander");

/**
 * serve
 * build
 * clean
 */

program
  .version(
    `${require("../package.json").name} ${require("../package.json").version}`
  )
  .usage("<command> [options]");

program
  .command("build")
  .option("-c, --compress", "compressing files after build", false)
  .option("-C, --no-cache", "Don't use filesystem cache while bundling")
  .option("-D, --no-dll", "Don't use dllPlugin while bundling")
  .option("--cdn", "Using webpack-cdn-plugin", false)
  .action(require("../build/build"));

program
  .command("serve")
  .option("-C, --no-cache", "Don't use filesystem cache while bundling")
  .option("-D, --no-dll", "Don't use dllPlugin while bundling")
  .option("--cdn", "Using webpack-cdn-plugin", false)
  .action(require("../build/serve"));

program.command("gen-dll").action(require("../build/dll"));

program.command("clean").action(require("../build/clean"));

program.parse(process.argv);
