# Webpack 相关

1. 前端代码为何要进行构建和打包？

2. module chunk bundle 有何区别？

3. loader 和 plugin 的区别？

4. webpack 如何实现懒加载

##### 1. webpack 常见性能优化

1. babel-runtime 和 babel-polyfill 的区别

##### 2.常见

1. 如何代理(跨域) proxy
2. 处理 ES6(babel) -common
   - contenthash 根据内容有没有改变生成哈希，内容没有改变则哈希不变则命中缓存（快）
3. 处理样式 -common
   - postcss-loader autoprefixer 可以加样式浏览器前缀，处理兼容性
4. 处理图片
   - 小于 5kb 的处理成 base64，好处是不用请求

##### 3.优化构建速度

1. IgnorePlugin (只引入 moment 中文包，去除其他语言包), noParse(忽略 min.js，不用重复打包)
2. happyPack(开启多进程打包，有一个 id)
3. 压缩:
   > - webpack 内置 UglifyjsWebpackPlugin(单线程压缩)
   > - ParallelUgifyPlugin(多进程压缩，配置 output {beautify,comments},compress{warnings,drop_console})
   > - TerserWebpackPlugin(可在 optimization 里配置, 配置 include exclude parallel)
4. HMR 热更新(自动开启)
5. DllPlugin 动态链接库(manifest.json 用来映射)
6. 什么是 Tree-Shaking?
7. Module 和 Commonjs 的区别
8. 什么是 Scope Hosting?(作用域提升)
9. babel
   > - babel-polyfill (core-js 和 regenerator(支持 ES6 generate 的语法) 两者的集合)
   > - babel-polyfill 7.4 之后已被弃用，推荐直接使用 core-js 和 regenerator
   > - .babelrc 和 babel.config.js
