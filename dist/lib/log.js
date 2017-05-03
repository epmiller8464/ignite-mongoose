'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var LogSchema = new mongoose.Schema({
    pid: String,
    hostname: String,
    level: Number,
    msg: String,
    time: Number,
    status: Number,
    req: {
      method: String,
      url: String,
      headers: {
        host: String,
        connection: String
      },
      remoteAddress: String,
      remotePort: Number
    }
  }, { capped: 5242880 }, { collection: 'log' });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('log');
  } catch (e) {
    Model = mongoose.model('log', LogSchema);
  }
  return Model;
};
//# sourceMappingURL=log.js.map