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

  let gotoConfig = {
    text: String,
    action: {
      random: Boolean,
      items: [
        {
          item_type: String,
          block_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'block', required: false}]

        }
      ]
    }
  }

  let jsonConfig = {
    url: String,
    method: String,
    user_attributes: [String],
    show_error_messages: Boolean
  }

  let galleryConfig = new mongoose.Schema({
    gallery_card: {
      title: String,
      item_url: String,
      image_url: String,
      buttons: [Object]
    }
  })

  let elementConfig = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: String,
    image_url: String,
    default_action: Object,
    buttons: [Object]
  })

  let xCardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    builtin: {type: Boolean, required: true, default: true},
    image_aspect_ratio: String,
    elements: [elementConfig],
    // name of plugin i.e. text, gallery, ai,json_plugin, go_to_plugin, etc
    template_type: {
      type: String,
      required: true,
      enum: ['image', 'video', 'audio', 'file', 'template'],
      default: 'draft'
    },
    // is determined by the type which each have a unique config type: Object
    payload: Object,
    is_valid: Boolean
  })

  let CardSchema = new mongoose.Schema({
    // "id": "58927d59e4b099e9389e51f5",
    // "plugin_id": "ai",
    // name of plugin i.e. text, gallery, ai,json_plugin, go_to_plugin, etc
    plugin_id: {
      type: String,
      required: true
    },
    is_valid: {type: Boolean, required: true, default: true},
    // is determined by the plugin_id which each have a unique config type: Object
    config: {type: Object, required: true},
    localization: {type: Object, required: false}
  })

  let BlockSchema = new mongoose.Schema({
    title: {type: String, required: true},
    bot_id: {type: mongoose.Schema.Types.ObjectId, ref: 'bot', required: true},
    parent_group: {type: String, required: false},
    builtin: {type: Boolean, required: true, default: false},
    cards: [CardSchema],
    referral_active: {type: Boolean, required: true, default: false},
    is_valid: {type: Boolean, required: true, default: true}
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
