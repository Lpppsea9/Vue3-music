const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommonConf = require("./webpack.common");
module.exports = merge(webpackCommonConf, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "..", "/dist"),
    filename: "bundle.[contenthash:8].js", // 打包代码时，加上hash戳
  },
  module: {
    rules: [
      {
        // 图片 - 考虑 base 64 编码的情况
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的格式
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath: "/img1/",
          },
        },
      },
    ],
  },
});
