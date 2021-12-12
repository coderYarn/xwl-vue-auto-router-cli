import figlet from "figlet";
import clear from "clear";
import chalk from "chalk";
import download from "./download.js";
import inquirer from "inquirer";
import { execa } from "execa";
import handlebars from "handlebars";
import fs from "fs";

const log = (content) => console.log(chalk.green(content));

export default async (name) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "author",
        message: "请输入作者",
      },

      {
        type: "input",
        name: "description",
        message: "请输入描述信息",
      },
    ])
    .then(async (answer) => {
      // 打印欢迎界面
      clear();
      log(figlet.textSync("Welcome to Vue"));
      // 下载空项目模板
      log("🚀 创建项目 " + name);
      await download("github:coderYarn/vue-auto-router-cli#main", name);
      const meta = {
        author: answer.author,
        description: answer.description,
        name,
      };
      const str = fs.readFileSync(`${name}/package.json`).toString();
      const str2 = handlebars.compile(str)(meta);
      fs.writeFileSync(`${name}/package.json`, str2);
      console.log(chalk.green("项目初始化成功"));
      // 安装依赖
      // npm install
      // 子进程
      // await spawn
      log("🚴🏻 安装依赖....");
      await execa("npm", ["install"], { cwd: `./${name}` });

      log(`
        👌安装完成:
        To get Start:
        ===========================
            cd ${name}
            npm run start
        ===========================
              `);

      // 自动打开浏览器
      // open("http://localhost:8080");

      // 自动运行调试环境
      // await execa("npm", ["run", "serve"], { cwd: `./${name}` });
    });
};
