/**
 * @description webpack公共配置
 * @author 海久
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    path: "./src/main.js",
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // exclude: /node_modules/, // 排除node_modules中的js文件(这些文件不处理)
        include: path.resolve(__dirname, "../src"), // 只处理src下的文件, 其他文件不处理
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"], // 智能预设
              cacheDirectory: true, // 开启babel缓存
              cacheCompression: false, // 关闭缓存文件压缩
              // plugins: ["@babel/plugin-transform-runtime"], //减少代码体积
            },
          },
        ],
      },
      {
        test: /\.vue$/, // 处理vue文件
        use: "vue-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader", // 将sass编译成css文件
          {
            loader: "sass-loader",
            options: {
              // 全局引入变量和 mixin，编译scss时起作用mixin函数
              additionalData: `
                @import "@/assets/scss/variable.scss";
                @import "@/assets/scss/mixin.scss";
              `,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      templateParameters: {
        BASE_URL: "/",
      },
      // filename: './index.html'
    }),
    new VueLoaderPlugin(),
  ],
};
