var mongoose = require('mongoose');
var History = require('../../models/history');

module.exports.addHistory = function(req, res) {
  var history = new History(req.body.history);
  history.save(function(err) {
    if (err) res.send(err);
    res.json({history: history});
  });
};

module.exports.getAllHistories = function(req, res) {
  History.find(function(err, histories) {
    if (err) res.send(err);
    res.json({histories: histories});
  })
};

module.exports.getSingleHistory = function(req, res, id) {
  History.findById(id, function(err, history) {
    if (err) res.send(err);
    res.json({history: history});
  });
};

module.exports.updateHistory = function(req, res, id) {
  History.findByIdAndUpdate(id, {$set: req.body.history}, {new: true}, function(err, history) {
    if (err) res.send(err);
    res.json({history: history});
  });
};

module.exports.deleteHistory = function(req, res, id) {
  History.findByIdAndRemove(id, function(err) {
    if (err) res.send(err);
    res.json({});
  });
};
