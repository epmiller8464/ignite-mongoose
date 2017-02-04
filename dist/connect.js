'use strict';

var connect = function connect(connectionString, options) {
  var mongoose = require('mongoose');
  options = options || {};

  mongoose.connect(connectionString, options);
  // mongoose.Promise = require('bluebird')
  return mongoose.connection;
};

module.exports = connect;
//# sourceMappingURL=connect.js.map