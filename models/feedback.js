var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  text: String,
  name: String,
  email: String,
  created: Number,
  updated: Number
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
