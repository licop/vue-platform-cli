/**
 * 项目克隆
 */
let { promisify } = require('util')
const ora = require("ora")
const download = promisify(require("download-git-repo"))
let chalk = require('chalk')
const shell = require("shelljs")

// 日志打印函数
const log = content => {
  console.log(chalk.blue(content))
}

module.exports = async (appName) => {
  console.log(`🚀 创建项目${appName}`)
  shell.rm("-rf", appName)
  const spinner = ora("下载中。。。").start()
  
  try {
    await download("direct:https://git.imooc.com/coding-502/manager-fe.git", appName, {clone: true})
    spinner.succeed("下载完成")
    log(`
下载完成，请执行下面命令启动项目
==========================
cd ${appName}
npm init 或者 yarn
npm run dev 或者 yarn dev
    `)
  } catch (error) {
    console.log("下载失败", error)
    spinner.stop()
  }
}