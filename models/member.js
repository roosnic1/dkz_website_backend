var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  name: String,
  mail: String,
  description: String,
  image: String,
  created: Number,
  updated: Number
});

module.exports = mongoose.model('Member', MemberSchema);
