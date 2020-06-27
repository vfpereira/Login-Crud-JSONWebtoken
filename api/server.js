const express = require('express')
const app = express()
const { resolve } = require('path')
const http = require('http')

app.use(express.static(resolve(__dirname, '..', 'client', 'dist')))
app.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html')))

const server = http.createServer(app)
server.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
