'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var GroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'block', required: true }],
    bot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bot', required: true },
    built_in: { type: Boolean, required: true, default: false }
  }, { collection: 'group' });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('group');
  } catch (e) {
    Model = mongoose.model('group', GroupSchema);
  }
  return Model;
};
//# sourceMappingURL=group.js.map