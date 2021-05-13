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

program.command("build").action(require("../build/build"));

program.command("serve").action(require("../build/serve"));

program.command("gen-dll").action(require("../build/dll"));

program.command("clean").action(require("../build/clean"));

program.parse(process.argv);
