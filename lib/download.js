import { promisify } from "util";
import download from "download-git-repo";
import ora from "ora";
export default async function (repo, desc) {
  const down = promisify(download);
  const process = ora(`🚘 下载.... ${repo}`);
  // 显示进度条
  process.start();
  await down(repo, desc);
  process.succeed();
}
