'use strict'

const models = {
  UserModel: require('./lib/user')(),
  BotModel: require('./lib/bot')(),
  BlockModel: require('./lib/block')(),
  LogModel: require('./lib/log')(),
  TokenModel: require('./lib/token')()
}

module.exports.Models = models
module.exports.Connect = require('./connect')



