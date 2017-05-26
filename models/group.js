// 'use strict'
// var mongoose = require('mongoose')
//
// module.exports = function () {
//   let GroupSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     bot_id: {type: mongoose.Schema.Types.ObjectId, ref: 'bot', required: true},
//     built_in: {type: Boolean, required: true, default: false}
//   }, {collection: 'block_group'})
//
//   GroupSchema.index({title: 1})
//   GroupSchema.index({bot_id: 1, blocks: 1})
//
//   let Model
//   try {
//     // Throws an error if "Name" hasn't been registered
//     Model = mongoose.model('block_group')
//   } catch (e) {
//     Model = mongoose.model('block_group', GroupSchema)
//   }
//   return Model
// }
