'use strict'
var mongoose = require('mongoose')

module.exports = function () {

  let ComponentSchema = new mongoose.Schema({
    // "id": "58927d59e4b099e9389e51f5",
    // "plugin_id": "ai",
    // name of plugin i.e. text, gallery, ai,json_plugin, go_to_plugin, etc
    component_type: {
      type: String,
      required: true
    },
    is_valid: {type: Boolean, required: true, default: false},
    // is determined by the plugin_id which each have a unique config type: Object
    payload: {type: Object, required: true},
    localization: {type: Object, required: false}
  }, { _id: false })

  let BlockSchema = new mongoose.Schema({
    title: {type: String, required: true},
    bot_id: {type: mongoose.Schema.Types.ObjectId, ref: 'bot', required: true},
    group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'group', required: false},
    builtin: {type: Boolean, required: true, default: false},
    components: [ComponentSchema],
    referral_active: {type: Boolean, required: true, default: false},
    is_valid: {type: Boolean, required: true, default: false},
    history: [mongoose.Schema.Types.Object]
  }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}, {collection: 'block'})

  BlockSchema.index({bot_id: 1})
  BlockSchema.index({title: 1})

  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('block')
  } catch (e) {
    Model = mongoose.model('block', BlockSchema)
  }
  return Model
}
