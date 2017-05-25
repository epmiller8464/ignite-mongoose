'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var GroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false }],
    bot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bot', required: true },
    built_in: { type: Boolean, required: true, default: false }
  }, { collection: 'block_group' });

  GroupSchema.index({ title: 1 });
  GroupSchema.index({ bot_id: 1, blocks: 1 });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('block_group');
  } catch (e) {
    Model = mongoose.model('block_group', GroupSchema);
  }
  return Model;
};
//# sourceMappingURL=group.js.map