const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成新的html文件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清缓存
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let ROOT_PATH = path.resolve(__dirname); // 项目根路径
let APP_PATH = path.resolve(ROOT_PATH, "src"); // 项目src目录

module.exports = {
  entry: path.join(__dirname, "src", "app.jsx"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
    port: 8190,
    contentBase: path.join(__dirname, "build"),
    open: true,
    progress: true,
    proxy: {
      // 代理服务器
      "/api": {
        target: "http://adr.th-ehealth.com:10006/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  // 配置额外的解决方案
  resolve: {
    modules: [APP_PATH, "node_modules"],
    extensions: [".js", ".jsx", ".less", ".css"], // 后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "./src") // 别名@：代表src目录
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          { loader: "css-loader" },
          { loader: "less-loader" }
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
            outputPath: "images", // 输入文件目录
            // publicPath: '../images/',
            limit: 8129 // 当图片大小超过8129个字节的时候，将打包的图片存在/images/文件夹中，否则直接改为base64格式放在mian.js中，可以减少http请求
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, 'index.html'),
      // filename: 'index.html'
      template: path.join(__dirname, "index.html"),
      filename: "./index.html",
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
};
