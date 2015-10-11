var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var rs = require('randomstring');
var fs = require('fs');

var PlaySchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  year: Number,
  director: String,
  writer: String,
  orgWriter: String,
  music: String,
  backImg: String,
  prevImg: String,
  created: Number,
  updated: Number
});

//TODO: Refactor this shit!!!

var saveToFile = function(dataURL) {
  return new Promise(function(resolve, reject) {
    if (dataURL.indexOf('data:image/') === -1) {
      resolve(false);
    }
    var fileExt = dataURL.substr(dataURL.indexOf('image/') + 6, 4);
    if (fileExt.indexOf(';') > -1) {
      fileExt = fileExt.substr(0, 3);
    }
    var base64data = dataURL.substr(dataURL.indexOf(',') + 1);

    var fileName = rs.generate(12) + '.' + fileExt;
    fs.writeFile('public/img/' + fileName, base64data, 'base64', function(err) {
      if (err) {
        reject(err);
      } else {
        resolve('media/img/' + fileName);
      }
    });
  });
};

PlaySchema.pre('save', function(next) {
  var self = this;
  saveToFile(this.backImg).then(function(data) {
    if (data) {
      self.backImg = data;
    }
    saveToFile(self.prevImg).then(function(data) {
      if (data) {
        self.prevImg = data;
      }
      next();
    }).catch(function(err) {
      console.log(err);
      self.prevImg = '';
      next();
    });
  }).catch(function(err) {
    console.log(err);
    self.backImg = '';
    next();
  });
});

PlaySchema.pre('findOneAndUpdate', function(next) {
  var self = this;
  saveToFile(this._update.$set.backImg).then(function(data) {
    if (data) {
      self._update.$set.backImg = data;
    }
    saveToFile(self._update.$set.prevImg).then(function(data) {
      if (data) {
        self._update.$set.prevImg = data;
      }
      next();
    }).catch(function(err) {
      console.log(err);
      self._update.$set.prevImg = '';
      next();
    });
  }).catch(function(err) {
    console.log(err);
    self._update.$set.backImg = '';
    next();
  });
});

module.exports = mongoose.model('Play', PlaySchema);
