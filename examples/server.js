const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const path = require('path')
const publicPath = webpackConfig.output.publicPath

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

// app.use(express.static(path.resolve(__dirname, publicPath), {
//   setHeaders (res) {
//     res.cookie('TOKEN', '123abc')
//     res.abc = '123'
//   }
// }))
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

handleBasicRouter()
handleInstanceRouter()
handleInterceptorsRouter()
handleCancellationRouter()
handleMore()

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

function handleMore () {
  router.get('/csrf/get', function (req, res) {
    res.json(req.query)
  })
  router.get('/more/getA', function (req, res) {
    res.json(req.query)
  })
  router.get('/more/getB', function (req, res) {
    res.json(req.query)
  })
}

module.exports = app.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}/, Ctrl + C to stop`)
})
