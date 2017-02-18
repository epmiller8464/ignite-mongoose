'use strict'
var mongoose = require('mongoose')

module.exports = function () {
  let textConfig = {
    text: String,
    buttons: [
      {
        title: String,
        block_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false}]
      }]
  }

  let jsonConfig = {
    url: String,
    method: String,
    user_attributes: [String],
    show_error_messages: Boolean
  }

  let galleryConfig = {
    gallery_cards: [{
      title: String,
      item_url: String,
      image_url: String,
      buttons: [Object]
    }]
  }

  let BlockSchema = new mongoose.Schema({
    referral_active: Boolean,
    title: String,
    builtin: Boolean,
    cards: [{
      // "id": "58927d59e4b099e9389e51f5",
      // "plugin_id": "ai",
      // name of plugin i.e. text, gallery, ai,json_plugin,etc
      plugin_id: String,
      // is determined by the plugin_id which each have a unique config type: Object
      config: Object
    }],
    is_valid: Boolean
  })

  let Model;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('block')
  } catch (e) {
    Model = mongoose.model('block', BlockSchema)
  }
  return Model
}