var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  Name: String,
  mail: String,
  description: String,
  image: String,
  created: Date,
  updated: Date
});

module.exports = mongoose.model('Member', MemberSchema);
