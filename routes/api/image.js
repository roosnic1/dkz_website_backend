//var mongoose = require('mongoose');
//var Member = require('../../models/member');
var rs = require('randomstring');
var fs = require('fs');

module.exports.addImage = function(req, res) {
  //TODO: Error handling
  var base64Data = req.body.base64img;
  var fileExt = req.body.fileType.substr(req.body.fileType.indexOf('/') + 1);
  var fileName = rs.generate(12) + '.' + fileExt;
  fs.writeFile('public/img/' + fileName, base64Data, 'base64', function(err) {
    console.log(err);
    res.status(500).json({error:err});
  }, function() {
    res.json({
      name: 'media/' + fileName
    });
  });
};

module.exports.deleteImage = function(req, res) {
  //TODO: Error handling
  var fileName = req.body.fileName;
  fs.unlink('public/img/' + fileName, function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({error:err});
    } else {
      res.sendStatus(200);
    }
  });
};
