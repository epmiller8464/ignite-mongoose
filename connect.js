'use strict'

const connect = (connectionString, options) => {
  const mongoose = require('mongoose')
  options = options || {}

  mongoose.connect(connectionString, options)
  // mongoose.Promise = require('bluebird')
  return mongoose.connection
}

module.exports = connect
