'use strict'

const models = {
  UserModel: require('./lib/user')(),
  BotModel: require('./lib/bot')()
}

module.exports.Models = models
module.exports.Connect = require('./connect')



