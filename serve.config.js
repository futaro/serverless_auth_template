const serve = require('webpack-serve')

const convert = require("koa-connect")
const historyApiFallback = require("connect-history-api-fallback")
const addon = (app, middleware, option) => {
  app.use(convert(historyApiFallback()))
}

const config = require('./webpack.config.js')({}, {mode: 'development'})
const argv = {}
const options = {
  config,
  content: 'public/',
  open   : true,
  port   : 5656,
  add    : addon
}

serve(argv, options)