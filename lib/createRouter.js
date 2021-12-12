import handlebars from "handlebars";
import fs from "fs";
import template from "./template.js";
import chalk from "chalk";
import getFolder from "./getFolder.js";
export default async () => {
  let data = template;
  let routes = getFolder();
  let result = handlebars.compile(data)({ routes });

  result = transformationFormat(result, /\[id\]/g, ":id");

  fs.access("./src/router", (exists) => {
    if (exists) {
      fs.mkdirSync("./src/router");
      fs.writeFileSync("./src/router/index.js", result, {
        encoding: "utf8",
        flag: "w+",
      });
    } else {
      fs.writeFileSync("./src/router/index.js", result, {
        encoding: "utf8",
        flag: "w+",
      });
    }
  });
  function transformationFormat(text, format, toFormat) {
    return text.replace(format, toFormat);
  }
  console.log(chalk.green(`🚀 ./src/router/index.js 创建成功 !`));
};
