const path = require("path");
const { merge } = require("webpack-merge");

module.exports = {
  // entry: {
  //   path: "./src/main.js",
  // },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash:8].js", // 打包代码时，加上hash戳
  },
};
