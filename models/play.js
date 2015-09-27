var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaySchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  year: Number,
  director: String,
  writer: String,
  orgWriter: String,
  music: String,
  created: Date,
  updated: Date
});

module.exports = mongoose.model('Play', PlaySchema);
