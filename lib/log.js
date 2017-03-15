'use strict'
var mongoose = require('mongoose')

module.exports = function () {
  let LogSchema = new mongoose.Schema({
    entity_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    entity_type: {type: String, required: true},
    subject: {type: String},
    entry: {type: String},
    created_at: {type: Number, required: true, default: Date.now()},
  })
  let Model;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('log')
  } catch (e) {
    Model = mongoose.model('log', LogSchema)
  }
  return Model

}