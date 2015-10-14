var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  title: String,
  text: String,
  year: Number,
  created: Number,
  updated: Number
});

module.exports = mongoose.model('History', HistorySchema);
