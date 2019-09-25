const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

handleBasicRouter()
handleInstanceRouter()
handleInterceptorsRouter()
handleCancellationRouter()

app.use(router)

const port = process.env.PORT || 8099

function handleBasicRouter () {
  router.get('/basic/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/basic/post', function (req, res) {
    res.json(req.body)
  })
}

function handleInstanceRouter () {
  router.get('/instance/get', function (req, res) {
    res.json(req.query)
  })
  router.post('/instance/post', function (req, res) {
    res.json(req.body)
  })
}

function handleInterceptorsRouter () {
  router.get('/interceptors/get', function (req, res) {
    res.json(req.query)
  })
}

function handleCancellationRouter () {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('cancellation')
    }, 3000)
  })
  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 3000)
  })
}

module.exports = app.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}/, Ctrl + C to stop`)
})
