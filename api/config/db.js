
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const config = {
  uri: 'mongodb://root:example@localhost:27017/JsonWebToken?authSource=admin',
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

module.exports = {
  connect: () => mongoose.connect(config.uri, config.options)
}
