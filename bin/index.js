#!/usr/bin/env node
// 指定脚本解释器类型
import program from "commander";
import init from "../lib/init.js";


program.version("0.0.5");
program.command("init <name>").description("init project").action(init);

program.parse(process.argv);
