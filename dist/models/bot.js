'use strict';

var mongoose = require('mongoose');
var moment = require('moment')();

module.exports = function () {

  var PageInfoSchema = new mongoose.Schema({
    page_id: { type: String, required: true },
    title: { type: String, required: true },
    picture: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    bot_id: { type: String },
    access_token: { type: String }
  }, { _id: false });

  var StatusSchema = new mongoose.Schema({
    read_only: { type: Boolean, required: true, default: false },
    status: {
      type: String, required: true, enum: ['draft', 'connected', 'disabled'], default: 'draft'
    },
    page: { type: String },
    page_info: { type: PageInfoSchema },
    payments_status: { type: String }
  }, { _id: false });
  var GroupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    built_in: { type: Boolean, required: true, default: false },
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false }]
  });

  var BotSchema = new mongoose.Schema({
    title: { type: String, require: true, maxLength: 80, minLength: 1 },
    date_added: { type: Number, required: true, default: moment.valueOf() },
    timezone: { offset: { type: String }, name: { type: String } },
    default_block: { type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false },
    default_group_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    starting_block: { type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false },
    help_block: { type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false },
    setting_block: { type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false },
    ai_block: { type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false },
    // blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false}],
    description: {
      type: String, require: true, maxLength: 640, minLength: 1
      // type: String, trim: true, lowercase: true, required: false, minLength: 1, match: /.+\@.+\..+/
    },
    status: { type: StatusSchema, required: false },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false }],
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    groups: [GroupSchema],
    is_valid: { type: Boolean, required: true, default: false },
    history: [mongoose.Schema.Types.Object],
    tags: [String]
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }, { collection: 'bot' });

  BotSchema.index({ title: 1, description: 1 });
  BotSchema.index({ admins: 1 });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('bot');
  } catch (e) {
    Model = mongoose.model('bot', BotSchema);
  }
  return Model;
};
//# sourceMappingURL=bot.js.map