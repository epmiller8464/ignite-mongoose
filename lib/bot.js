'use strict'
var mongoose = require('mongoose')

module.exports = function () {

  let GroupSchema = new mongoose.Schema({
    title: {type: String},
    blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'block', required: true}],
    built_in: {type: Boolean}
  }, {_id: false})

  let PageInfo = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String},
    picture: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false},
    bot_id: {type: String}
  }, {_id: false, id: false})

  let StatusSchema = new mongoose.Schema({
    read_only: {type: Boolean, required: true, default: false},
    status: {
      type: String, required: true, enum: ['draft', 'connected', 'disabled'], default: 'draft'
    },
    page: {type: String},
    page_info: {type: PageInfo},
    payments_status: {type: String}
  }, {_id: false, id: false})

  let BotSchema = new mongoose.Schema({
    id: {type: String},
    title: {type: String},
    date_added: {type: Number, default: Date.now()},
    timezone_offset: {type: String},
    timezone_name: {type: String},
    default_group_id: {type: String},
    default_block: {type: String},
    first_block: {type: String},
    help_block: {type: String},
    ai_block: {type: String},
    description: {type: String},
    status: {type: StatusSchema},
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}],
    groups: [GroupSchema],
    has_botan_app: {type: Boolean, required: true, default: false}
  })

  let Model;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('bot')
  } catch (e) {
    Model = mongoose.model('bot', BotSchema)
  }
  return Model
}
