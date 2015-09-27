var mongoose = require('mongoose');
var Play = require('../../models/play');

module.exports.addPlay = function(req, res) {
  var play = new Play(req.body.play);
  play.save(function(err) {
    if (err) res.send(err);
    res.json({play: play});
  });
};

module.exports.getAllPlays = function(req, res) {
  Play.find(function(err, plays) {
    if (err) res.send(err);
    res.json({plays: plays});
  })
};

module.exports.getSinglePlay = function(req, res, id) {
  Play.findById(id, function(err, play) {
    if (err) res.send(err);
    res.json({play: play});
  });
};

module.exports.updatePlay = function(req, res, id) {
  Play.findByIdAndUpdate(id, {$set: req.body.play}, {new: true}, function(err, play) {
    if (err) res.send(err);
    res.json({play: play});
  });
};

module.exports.deletePlay = function(req, res, id) {
  Play.findByIdAndRemove(id, function(err) {
    if (err) res.send(err);
    res.json({});
  });
};
