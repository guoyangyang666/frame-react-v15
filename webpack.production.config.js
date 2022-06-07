const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成新的html文件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清缓存
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

let ROOT_PATH = path.resolve(__dirname); // 项目根路径
let APP_PATH = path.resolve(ROOT_PATH, "src"); // 项目src目录
let BUILD_PATH = path.resolve(ROOT_PATH, "./demoUI/dist"); // 发布文件所存放的目录

module.exports = {
  entry: path.join(__dirname, "src", "app.jsx"),
  output: {
    path: BUILD_PATH,
    publicPath: "./dist/",
    filename: "[name].[hash].min.js"
  },
  mode: "production",
  // 配置额外的解决方案
  resolve: {
    modules: [
      APP_PATH,
      "node_modules"
    ],
    extensions: [".js", ".jsx", ".less", ".css"], // 后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "./src"), // 别名@：代表src目录
      "@statistics": path.resolve(__dirname, "./src/statistics") // 别名: 统计平台相关代码
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"},
          {loader: "less-loader"}
        ]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "../images/", // 输入文件目录
            publicPath: "../images/",
            limit: 8129 // 当图片大小超过8129个字节的时候，将打包的图片存在/images/文件夹中，否则直接改为base64格式放在mian.js中，可以减少http请求
          }
        }
      }
    ]
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      // chunks: 'all',// initial表示提取入口文件的公共css及js部分
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        base: {
          chunks: "initial",   // initial表示提取入口文件的公共css及js部分
          minChunks: 1, // 表示提取公共部分最少的文件数
          minSize: 0, // 表示提取公共部分最小的大小
          name: "base" // 提取出来的文件命名
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin("demoUI", {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      filename: "../index.html",
      favicon: "./favicon2.ico",
      inject: "body", // 是否将js放在body的末尾
      hash: false // 是否为本页面所有资源文件添加一个独特的hash值
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./src/iconfont/iconfont.js"),
        to: "../",
        ignore: [".*"]
      }
    ]),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].min.css",
      ignoreOrder: true
    }),
    new OptimizeCSSAssetsPlugin()
  ]
}
