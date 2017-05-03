'use strict';

var models = {
  UserModel: require('./lib/user')(),
  BotModel: require('./lib/bot')(),
  BlockModel: require('./lib/block')(),
  GroupModel: require('./lib/group')(),
  LogModel: require('./lib/log')(),
  EventModel: require('./lib/event')(),
  TokenModel: require('./lib/token')()
};

module.exports.Models = models;
module.exports.Connect = require('./connect');
//# sourceMappingURL=index.js.map