const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const bodyParser = require('body-parser')
const userSchema = require('../../model/user.js')

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

router.post('/login', function (req, res, next) {
  res.send('Login')
})

module.exports = router
