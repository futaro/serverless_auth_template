'use strict'

const serverless = require('serverless-http')
  , bodyParser   = require('body-parser')
  , express      = require('express')
  , app          = express()


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/test', async (req, res) => {

  const authorizer = req.context.authorizer

  const sub    = authorizer.claims ? authorizer.claims.sub : null
    , username = authorizer.claims ? authorizer.claims.username : null

  if (!sub) return res.status(401).json({message: 'Unauthorized'})

  res.json({sub: sub, username: username})
})

module.exports.main = serverless(app, {
  request: (req, event, context) => {
    req.context = event.requestContext;
    req.awsRequestId = context.awsRequestId;
    req.eventAws = event;
    req.contextAws = context;
  }
})