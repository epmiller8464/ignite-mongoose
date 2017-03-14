'use strict'
var mongoose = require('mongoose')

module.exports = function () {
  let LogSchema = new mongoose.Schema({
    subject: {type: String},
    entry: {type: String},
    createdAt: {type: Number, required: true, default: Date.now()},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
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