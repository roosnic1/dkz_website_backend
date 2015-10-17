var mongoose = require('mongoose');
var Feedback = require('../../models/feedback');

module.exports.add = function(req, res) {
  var item = new Feedback(req.body.feedback);
  item.save(function(err) {
    if (err) res.send(err);
    res.json({feedback: item});
  });
};

module.exports.getAll = function(req, res) {
  Feedback.find(function(err, items) {
    if (err) res.send(err);
    res.json({feedbacks: items});
  })
};

module.exports.getSingle = function(req, res, id) {
  Feedback.findById(id, function(err, item) {
    if (err) res.send(err);
    res.json({feedback: item});
  });
};

module.exports.update = function(req, res, id) {
  Feedback.findByIdAndUpdate(id, {$set: req.body.feedback}, {new: true}, function(err, item) {
    if (err) res.send(err);
    res.json({feedback: item});
  });
};

module.exports.delete = function(req, res, id) {
  Feedback.findByIdAndRemove(id, function(err) {
    if (err) res.send(err);
    res.json({});
  });
};
