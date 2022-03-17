const path = require('path');
// const webpack = require('webpack');
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV); // 环境判断
const resolve = dir => path.join(__dirname, dir);
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
  lintOnSave: false, // process.env.NODE_ENV === 'development',
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    host: "0.0.0.0",
    port: 8888,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/': {
        // target: `http://8.141.60.170:8111/`,
        target: `http://192.168.1.7:8081`, // http://47.97.4.36:18082/swagger-ui.html 
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 别名设置
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@views', resolve('src/view'))
      .set('@store', resolve('src/store'))
      .set('@router', resolve('src/router'));
    if (isProduction) {
      // 移除预加载
      config.plugins.delete('prefetch');
      config.optimization.minimize(true); // 压缩代码
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // 权重 必须高于其他包
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    }
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10 }));
  },
  configureWebpack: config => {
    if (isProduction) {
      // config.plugins.push(new webpack.DllReferencePlugin({
      //   context: process.cwd(), // 当前目录
      //   manifest: require('./public/static/vender-manifest.json')
      // }))
      // config.plugins.push(
      //   new AddAssetHtmlPlugin({
      //     // dll文件位置
      //     filepath: path.resolve(__dirname, './public/static/vender.dll.js'),
      //     // dll 引用路径
      //     publicPath: '/static/',
      //     outputPath: '/static/' // 输出的目录地址
      //   })
      // )
    }
  }
};
