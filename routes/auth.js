var express = require('express');
var router = express.Router();

var request = require('request');
var createJWT = require('jsonwebtoken');
var bodyParser = require('body-parser');
var fs = require('fs');

router.secret = '09htfahpkc0qyw4ukrtag0gy20ktarpkcasht';

sendToken = function(res, userId) {
  var token = createJWT.sign(
      //payload
      {userId: userId},
      router.secret,
      {expiresIn: 600}
    );
  res.json({token:token});
  console.log('token sent');
};

var users = {allowedUsers: ['nobody']};

try {
  var users = JSON.parse(fs.readFileSync('./users.json','utf8'));2
} catch(e) {
  console.log(e);
}


router.post('/get-token', function(req, res) {
  var googleToken = req.body.password;

  request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Google token valid');
      var userId = JSON.parse(body).user_id;
      var userEmail = JSON.parse(body).email;
      if(users.allowedUsers.indexOf(userEmail) > -1) {
        sendToken(res, userId);
        console.log(userId + " - " + userEmail);
      } else {
        console.log('User is not allowed');
        res.status(400).send('User is not allowed');
      }
    } else {
      console.log('Error while validating token');
      res.status(400).send('Error while validating token');
    }
  });
});


router.post('/refresh-token', bodyParser.json(), function(req, res) {
  var oldToken = req.body.token;
  createJWT.verify(oldToken, router.secret, function(err, decodedToken) {
    if (!err) {
      console.log('Refreshing token for user', decodedToken.userId);
      sendToken(res, decodedToken.userId);
    } else {
      console.log('Error while trying to refresh token', err);
      res.status(400).send('Error while refreshing token');
    }
  });
});

module.exports = router;