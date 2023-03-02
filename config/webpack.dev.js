const path = require("path");
const registerRouter = require("../backend/router");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackCommonConf = require("./webpack.common");
const { merge } = require("webpack-merge");
const srcPath = path.join(__dirname, "..", "src");
const distPath = path.join(__dirname, "..", "dist");

console.log("__dirname ->", __dirname);
console.log("srcPath ->", srcPath);
console.log("distPath ->", distPath);
// 当前路径\Code\vue3-music\config
console.log("1---->", path.resolve("a", "b", "..", "d"));
console.log("2---->", path.resolve());

module.exports = merge(webpackCommonConf, {
  entry: {
    path: "./src/main.js",
  },
  mode: "development",
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 处理vue文件
        use: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext]",
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource", // 原封不动的输出
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
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    // 开发服务器：不会输出资源，在内存中编译打包的
    port: 8080, // 启动服务器端口号
    host: "localhost", // 启动服务器域名
    // open: true, // 是否打开浏览器
    client: {
      progress: true,
    },
    hot: true, // hmr热模块替换 style-loader默认实现了热模块替换 vue-loader自动实现热模块替换
    static: {
      publicPath: "/",
    },
    // 设置代理
    proxy: {},
    onBeforeSetupMiddleware(app) {
      registerRouter(app.app);
    },
  },
});
