var express = require('express');
var router = express.Router();

var request = require('request');
var createJWT = require('jsonwebtoken');
var bodyParser = require('body-parser');

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



router.post('/get-token', function(req, res) {
  var googleToken = req.body.password;

  request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Google token valid');
      var userId = JSON.parse(body).user_id;
      var userEmail = JSON.parse(body).email;
      console.log(userId);
      console.log(userEmail);
      sendToken(res, userId);
    } else {
      console.log('Failed to validate Google token');
      res.send({});
    }
  });
});


router.post('/refresh-token', bodyParser.json(), function(req, res) {
  var oldToken = req.body.token;
  createJWT.verify(oldToken, app.secret, function(err, decodedToken) {
    if (!err) {
      console.log('Refreshing token for user', decodedToken.userId);
      sendToken(res, decodedToken.userId);
    } else {
      console.log('Error while trying to refresh token', err);
      res.send({});
    }
  });
});

module.exports = router;