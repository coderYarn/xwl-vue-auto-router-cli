import fs from "fs";

export default () => {
  const routes = [];
  function getFolder(path, routes) {
    const data = fs.readdirSync(path);
    data.forEach((filename) => {
      let stat = fs.lstatSync(path + filename);
      if (!stat.isFile()) {
        const file = fs.readdirSync(path + filename);
        if (file.length === 1) {
          routes.push({
            path:
              "/" + (path.replace("./src/views/", "") + filename).toLowerCase(),
            name: filename == "[id]" ? null : filename,
            component: '.'+path.replace(/\/src/, "") + filename + "/index.vue",
          });
          getFolder(path + filename + "/", routes[routes.length - 1]);
        } else {
          routes.push({
            path:
              "/" + (path.replace("./src/views/", "") + filename).toLowerCase(),
            name: filename == "[id]" ? null : filename,
            component: "."+path.replace(/\/src/, "") + filename + "/index.vue",
            children: [],
          });
          getFolder(path + filename + "/", routes[routes.length - 1].children);
        }
      }
    });
  }
  getFolder("./src/views/", routes);
  return routes;
};
