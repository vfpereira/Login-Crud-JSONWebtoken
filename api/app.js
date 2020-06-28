const express = require('express')
const app = express()
const createError = require('http-errors')

app.use('/api', require('./api'))

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.status(err.status || 501)
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  })
})

module.exports = app
