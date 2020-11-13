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

module.exports = router
