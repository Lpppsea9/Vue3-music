const path = require("path");
const registerRouter = require("../backend/router");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcPath = path.join(__dirname, "..", "src");
console.log("\n");
console.log("srcPath->", srcPath);

module.exports = {
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
    host: "localhost", // 启动服务器域名
    port: "8080", // 启动服务器端口号
    // open: true, // 是否打开浏览器
    hot: true, // hmr热模块替换 style-loader默认实现了热模块替换 vue-loader自动实现热模块替换
    static: {
      publicPath: "/",
    },
    onBeforeSetupMiddleware(app) {
      registerRouter(app.app);
    },
  },
};
