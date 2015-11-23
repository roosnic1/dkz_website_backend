//var mongoose = require('mongoose');
//var Member = require('../../models/member');
var rs = require('randomstring');
var fs = require('fs-extra');
var sizeOf = require('image-size');

module.exports.addImage = function(req, res) {
  var imgsize = sizeOf(req.file.path);

  res.json({
      url: 'media/tmp/' + req.file.filename,
      size: [imgsize.width, imgsize.height]
    });
};

module.exports.insertImage = function(req, res) {
  console.log('insertImage');
  console.log(req.body);
  var file = req.body.url.substr(req.body.url.lastIndexOf('/') + 1);
  fs.copy('public/tmp/' + file, 'public/img/' + file, {replace: false}, function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({error:err});
    } else {
      var imgsize = sizeOf('public/img/' + file);
      res.json({
        url: 'media/img/' + file,
        size: [imgsize.width, imgsize.height],
        alt: 'Content Image'
      });
    }
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
