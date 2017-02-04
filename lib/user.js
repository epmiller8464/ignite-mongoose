'use strict'
var mongoose = require('mongoose')

module.exports = function () {

  let Model;

  let UserSchema = new mongoose.Schema({
    name: {type: String},
    displayName: {type: String},
    date_added: {type: Number, require: true, default: Date.now()},
    profile_url: {type: String},
    email: {
      type: String, trim: true, lowercase: true, required: false, minLength: 1, match: /.+\@.+\..+/
    },
    accessToken: {type: String},
    refreshToken: {type: String},
    email_verified: {type: Boolean},
    provider_id: {type: String},
    provider: {type: String},
    profile: {type: Object},
    flags: [String],
    picture_url: {type: String},
    has_connected_bots: {type: Boolean, required: true, default: false},
    pages_access: {type: Boolean, required: true, default: false},
    subscriptions_access: {type: Boolean, required: true, default: false},
    payments_access: {type: Boolean, required: true, default: false}
  }, {collection: 'user'})
  UserSchema.index({name: 1})
  UserSchema.index({email: 1})
  UserSchema.index({provider_id: 1})

  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('user')
  } catch (e) {
    Model = mongoose.model('user', UserSchema)
  }
  return Model
}
