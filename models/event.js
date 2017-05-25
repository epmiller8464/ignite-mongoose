'use strict'
var mongoose = require('mongoose')
let moment = require('moment')()
module.exports = function () {
  let EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    data: {type: mongoose.Schema.Types.Object},
    context: {type: mongoose.Schema.Types.Object},
    // context: {
    //   type: {
    //     target_id: {type: mongoose.Schema.Types.ObjectId},
    //     context_type: {
    //       type: String,
    //       required: true
    //       // enum: ['user', 'bot', 'block', 'session']
    //     }
    //   }
    // },
    event_time: {type: Number, required: true, default: moment.valueOf()}
  }, {collection: 'event'})
  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('event')
  } catch (e) {
    Model = mongoose.model('event', EventSchema)
  }
  return Model

}