'use strict'
var mongoose = require('mongoose')
let moment = require('moment')()

module.exports = function () {

  let PageInfoSchema = new mongoose.Schema({
    page_id: {type: String, required: true},
    title: {type: String, required: true},
    picture: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false},
    bot_id: {type: String},
    access_token: {type: String}
  }, {_id: false})

  let StatusSchema = new mongoose.Schema({
    read_only: {type: Boolean, required: true, default: false},
    status: {
      type: String, required: true, enum: ['draft', 'connected', 'disabled'], default: 'draft'
    },
    page: {type: String},
    page_info: {type: PageInfoSchema},
    payments_status: {type: String}
  }, {_id: false})

  let BotSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date_added: {type: Number, required: true, default: moment.valueOf()},
    timezone: {offset: {type: String}, name: {type: String}},
    default_block: {type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false},
    starting_block: {type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false},
    help_block: {type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false},
    menu_block: {type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false},
    ai_block: {type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false},
    blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false}],
    description: {type: String, require: true},
    status: {type: StatusSchema, required: false},
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false}],
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    default_group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'group', required: false},
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'group', required: false}],
    is_valid: {type: Boolean, required: true, default: false},
    history: [mongoose.Schema.Types.Object]
  }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}, {collection: 'bot'})

  BotSchema.index({title: 1, description: 1})
  BotSchema.index({admins: 1})

  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('bot')
  } catch (e) {
    Model = mongoose.model('bot', BotSchema)
  }
  return Model
}
