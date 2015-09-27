var mongoose = require('mongoose');
var Member = require('../../models/member');

module.exports.addMember = function(req, res) {
  var member = new Member(req.body.member);
  member.save(function(err) {
    if (err) res.send(err);
    res.json({member: member});
  });
};

module.exports.getAllMembers = function(req, res) {
  Member.find(function(err, members) {
    if (err) res.send(err);
    res.json({members: members});
  })
};

module.exports.getSingleMember = function(req, res, id) {
  Member.findById(id, function(err, member) {
    if (err) res.send(err);
    res.json({member: member});
  });
};

module.exports.updateMember = function(req, res, id) {
  Member.findByIdAndUpdate(id, {$set: req.body.member}, {new: true}, function(err, member) {
    if (err) res.send(err);
    res.json({member: member});
  });
};

module.exports.deleteMember = function(req, res, id) {
  Member.findByIdAndRemove(id, function(err) {
    if (err) res.send(err);
    res.json({});
  });
};
