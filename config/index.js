module.exports = {
  // Various Dev Server settings
  dev: {
    assetsSubDirectory: "static", // 静态资源文件夹
    assetsPublicPath: "/", // 发布路径
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {
      "/api": {
        // 这里配置'/api' 就等价于target的内容, 你在链接里访问/api === http://localhost:8080,就是用/api代替那一长串重复的东西,api就是你起的接口服务名，有时候会有好多服务名，而且不都是api这种形式的，我们要注意，意思就是：在写接口路径时不用写那么长，而是用服务名代替，本来完整的接口路径是这一样的：http://127.0.0.100:8080/api/lbjk/saveUserInfoWebservice?userNum=123&depNum=456
        // 但是我们在api.js中，也就是封装的api层，是这样的：url: '/lbjk/saveUserInfo', 简写，然后在加上target中的就是：http://localhost:8080/api/lbjk/saveUserInfo完整的接口路径就是这样的
        target: "http://localhost:8080/api", // 接口的域名
        // target: 'http://127.121.1.110:1000/api', // 如果要访问别人的本地服务则这里改成别人的ip和端口即可
        secure: true, // 如果是 https ,需要开启这个选项
        changeOrigin: true, // 是否是跨域请求?肯定是啊,不跨域就没有必要配置这个proxyTable了.
        pathRewirte: {
          // 路径重写
          // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
          "/api": "",
          // 等价于
          // step 1  /api = http://localhost:54321/
          // step 2 /^api = /api + api == http://localhost:54321/api
        },
      },
    },
    // 本地访问 http://127.0.0.1:8080
    host: "127.0.0.1", // can be overwritten by process.env.HOST
    port: "8080", // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    https: false,
    hotOnly: false,
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
  },
};
