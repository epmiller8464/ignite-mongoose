'use strict';

var models = {
  UserModel: require('./lib/user')(),
  BotModel: require('./lib/bot')(),
  BlockModel: require('./lib/block')(),
  TokenModel: require('./lib/token')()
};

module.exports.Models = models;
module.exports.Connect = require('./connect');
//# sourceMappingURL=index.js.map