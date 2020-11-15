const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const bodyParser = require('body-parser')
const userSchema = require('../../model/user.js')
const jwt = require('jsonwebtoken')
require('dotenv-safe').config()
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.get('/', function (req, res, next) {
  res.send('Hello v1.0 GET API')
})

router.post('/', function (req, res, next) {
  res.send('Hello v1.0 POST API')
})

router.post('/register-user', function (req, res, next) {
  const user = {
    email: req.body.email,
    password: sha1(req.body.password)
  }

  const userModel = userSchema

  userModel.find({ email: user.email }, function (err, docs) {
    if (err) {
      res.send({ error: true, msg: err })
    }

    if (docs.length) {
      res.send({ error: true, msg: 'User already exist' })
    } else {
      userModel(user).save().then(() => res.send({ error: false, msg: 'User saved with success' })).catch((e) => console.log(res.send({ error: true, msg: err })))
    }
  })
})

router.post('/login-user', function (req, res, next) {
  const userModel = userSchema
  userModel.findOne({ email: req.body.email, password: sha1(req.body.password) }, function (err, user) {
    if (err) {
      res.send({ error: true, msg: err })
    }

    if (!user) {
      res.send({ error: true, msg: 'User wrong' })
    } else {
      const id = user._id
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      })
      res.send({ error: false, msg: 'User Logged', token: token })
    }
  })
})

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

function verifyJWT (req, res, next) {
  console.log(req.headers)
  const token = extractToken(req)
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
    req.userId = decoded.id
    next()
  })
}

router.post('/authorization', verifyJWT, function (req, res) {
  res.send({ auth: true })
})

module.exports = router
