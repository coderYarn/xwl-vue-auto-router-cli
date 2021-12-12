import fs from "fs";
import handlebars from "handlebars";
import chalk from "chalk";

export default async () => {
  //读取页面列表
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));
  // 渲染路由定义
  compile({ list }, "./src/router.js", "./template/router.js.hbs");
  //渲染菜单
  compile({ list }, "./src/App.vue", "./template/App.vue.hbs");
  /**
   * 模板编译
   * @param {*} meta
   * @param {*} filePath
   * @param {*} temptalePath
   */
  function compile(meta, filePath, temptalePath) {
    if (fs.existsSync(temptalePath)) {
      const content = fs.readFileSync(temptalePath).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(filePath, result);
      console.log(chalk.green(`🚀 ${filePath} 创建成功 !`));
    }
  }
};
