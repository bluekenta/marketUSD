const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV == 'production') {
      // 为生产环境修改配置
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {

        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']
            }
          }
        })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置
      config.mode = 'development'
    }
  },
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://www.oahyuhv.com', //这里填写项目真实的后台接口地址
        changOrigin: true, //设置允许跨域
        pathRewrite: {//这个重写不可省略！因为我们真正请求的地址并不含 /api
          '^/api': ''
          /* 当我们在浏览器中看到请求的地址为：http://localhost:8080/api/data/getdata 时
          因为重写了 /api ，所以实际上访问的地址是：http://x.x.x.x:x/data/getdata，
          */
        },
      }
      // 3.5 以后不需要再配置
    },
    // https:true,
  },

};