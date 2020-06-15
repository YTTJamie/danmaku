const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: {
    // index: './src/index.js', // 发布时
    index: './example/index.js',
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  // devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [path.resolve(__dirname, 'src')], // 指定检查的目录
      //   options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
      //       formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true //压缩css
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    overrideBrowserslist: [
                      'defaults',
                      'not ie < 11',
                      'last 2 versions',
                      '> 1%',
                      'iOS 7',
                      'last 3 iOS versions',
                    ],
                  }),
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        }),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
            {
                loader: 'url-loader',
                options: {
                    // limit: 1024 * 500,
                    name: '[name].[ext]',
                    outputPath: 'images',
                },
            }
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: './index.html',
      chunks: ['vendor', 'index', 'demo'],
    }),
    new ExtractTextWebpackPlugin('[name].css'),
    // new ExtractTextWebpackPlugin('index.css'),
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     output: {
    //       beautify: true,
    //       // comments: false,
    //     },
    //     compress: {
    //       drop_console: false,
    //       collapse_vars: true,
    //       reduce_vars: true,
    //     },
    //   },
    // }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名
          priority: 10
        },
      }
    }
  },
  devServer: {
    port: 3003,             // 端口
    open: true,             // 自动打开浏览器
    hot: true,               // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true,
  },
  // mode: "production", //压缩输出
};