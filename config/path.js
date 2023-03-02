/**
 * @description 常用文件夹路径
 * @author Sea9
 */
const path = require("path");

// join是把各个路径片段拼接在一起，resolve把'/'当成根目录
path.join("/a", "/b"); // 输出 /a/b
path.resolve("/a", "/b"); // 输出 /b

// resolve在传非/路径时会自动加上当前路径形成一个绝对路径
path.join("a", "b", "..", "d"); // 输出 a/d
path.resolve("a", "b", "..", "d"); // 输出

const srcPath = path.join(__dirname, "..", "src");
const distPath = path.join(__dirname, "..", "dist");

module.exports = {
  srcPath,
  distPath,
};
