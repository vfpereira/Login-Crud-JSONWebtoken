const http = require('http')

http.createServer(function (req, res) {
  res.write('Init')
  res.end()
}).listen(8080)
