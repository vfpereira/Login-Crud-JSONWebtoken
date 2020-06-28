const express = require('express')
const appExpress = express()
const { resolve } = require('path')
const http = require('http')
const app = require('./app')
appExpress.use(express.static(resolve(__dirname, '..', 'client', 'dist')))
appExpress.use(app)
appExpress.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html')))

const server = http.createServer(appExpress)
server.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
