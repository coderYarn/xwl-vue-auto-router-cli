import fs from 'fs'
// 复制
// 读入数据到变量  
// 变量输出到文件
const rs = fs.createReadStream('./1.png')
const ws = fs.createWriteStream('./2.png')
rs.pipe(ws)