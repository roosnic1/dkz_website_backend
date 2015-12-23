//TODO: return proper error status

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var unless = require('express-unless');

var createJWT = require('jsonwebtoken');
var validateJWT = require('express-jwt');

mongoose.connect('mongodb://localhost/dkz_website');

var app = express();

var api = require('./routes/api');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With, Origin');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.secret = '09htfahpkc0qyw4ukrtag0gy20ktarpkcasht';




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use('/media', express.static(path.join(__dirname, 'public')));

app.use(validateJWT({secret: app.secret}).unless({
  path: [
    { url: '/api/feedbacks', methods: ['POST'] },
    '/get-token',
    '/refresh-token',
    { url: '/api/posts', methods: ['GET'] },
    { url: '/api/plays', methods: ['GET'] },
    { url: '/api/members', methods: ['GET'] },
    { url: '/api/histories', methods: ['GET'] }
  ]
}));

app.use('/api', api);



app.sendToken = function(res, userId) {
  var token = createJWT.sign(
      //payload
      {userId: userId},
      app.secret,
      {expiresInSeconds: 600}
    );
  res.json({token:token});
  console.log('token sent');
};

app.post('/get-token', function(req, res) {
  var googleToken = req.body.password;

  request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Google token valid');
      var userId = JSON.parse(body).user_id;
      var userEmail = JSON.parse(body).email;
      console.log(userId);
      console.log(userEmail);
      app.sendToken(res, userId);
    } else {
      console.log('Failed to validate Google token');
      res.send({});
    }
  });
});


app.post('/refresh-token', bodyParser.json(), function(req, res) {
  var oldToken = req.body.token;
  createJWT.verify(oldToken, app.secret, function(err, decodedToken) {
    if (!err) {
      console.log('Refreshing token for user', decodedToken.userId);
      app.sendToken(res, decodedToken.userId);
    } else {
      console.log('Error while trying to refresh token', err);
      res.send({});
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'DEV') {
  app.use(function(err, req, res, next) {
    console.log(req.originalUrl);
    console.log(err);
    res.sendStatus(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});

module.exports = app;
