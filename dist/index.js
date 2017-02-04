'use strict';

var models = {
  UserModel: require('./lib/user')(),
  BotModel: require('./lib/bot')()
};

module.exports.Models = models;
module.exports.Connect = require('./connect');
//# sourceMappingURL=index.js.map