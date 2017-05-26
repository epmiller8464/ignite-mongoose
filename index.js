'use strict'

const models = {
  UserModel: require('./models/user')(),
  BotModel: require('./models/bot')(),
  BlockModel: require('./models/block')(),
  // GroupModel: require('./models/group')(),
  LogModel: require('./models/log')(),
  EventModel: require('./models/event')(),
  TokenModel: require('./models/token')()
}

module.exports.Models = models
module.exports.Connect = require('./connect')



