const path = require("path")
const glob = require('glob')
const os = require('os')
const Webapck = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

const config = {
  entry: {
    index: './src/index.js',
    // other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-0', 'react'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.jsx/,
        // 增加新的happypack构建loader
        loader: 'happypack/loader?id=happy-babel-js',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!stylus-loader!postcss-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true, // bundled js add hash
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash:9].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new Webapck.HotModuleReplacementPlugin(),
    new PurifyCSSPlugin({ // 去除无用的css
      paths: glob.sync(path.join(__dirname, 'src/*.html')) // 路径扫描，路径检查
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, // no fromat
          comments: false // no comments
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new Webapck.DllReferencePlugin({ // 打包出一个个动态连接库
      manifest: path.join(__dirname, 'manifest.json')
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new ProgressBarPlugin({
      format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'pages/static'),
        ignore: ['.*']
      }
    ])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 8090,
    open: true,
    hot: true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialReqests: 5,
          minSize: 0,
          name: 'common',
        },
        verdors: { // 创建了一个vendors块，包含整个应用中来自node_modules的所有代码。
          test: /[\\/]node_modules[\\/]/, // 注意：这会导致用户不必要地下载更多代码。
          priority: -10
        }
      }
    },
    runtimeChunk: true // 会给每个入口文件的输出再添加一个块，其中只包含运行时。
  }
}

module.exports = config