const path            = require('path')
  , VueLoaderPlugin   = require('vue-loader/lib/plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')

const src  = path.resolve(__dirname, 'src'),
      dist = path.resolve(__dirname, 'public')

module.exports = (env, args) => {

  const mode             = args.mode,
        enabledSourceMap = mode === 'development'

  return {
    mode   : mode,
    entry  : src + '/scripts/main.js',
    output : {
      path      : dist,
      publicPath: '/',
      filename  : 'bundle.js'
    },
    resolve: {
      modules   : [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.vue'],
      alias     : {
        'vue$': 'vue/dist/vue.esm.js'
      },
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: src + "/html/index.html"
      })
    ],
    devtool: enabledSourceMap ? 'source-map' : 'none',
    module : {
      rules: [
        {
          test: /\.vue$/,
          use : [
            {
              loader: "vue-loader"
            }
          ]
        },

        {
          test   : /\.js$/,
          exclude: /node_modules/,
          use    : [
            {
              loader: 'babel-loader',
            }
          ]
        },

        {
          test: /\.scss/,
          use : [
            'style-loader',
            {
              loader : 'css-loader',
              options: {
                url          : false,
                sourceMap    : enabledSourceMap,
                importLoaders: 2
              }
            },
            {
              loader : 'sass-loader',
              options: {
                sourceMap: enabledSourceMap
              }
            }
          ]
        },

        {
          test  : /\.html$/,
          loader: "html-loader"
        }
      ]
    }
  }
}