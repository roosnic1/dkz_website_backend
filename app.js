//TODO: return proper error status

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var unless = require('express-unless');
var validateJWT = require('express-jwt');

//mongoose.connect(process.env.DATABASE || 'mongodb://localhost/dkz_website_prod');
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/dkz_website');

var app = express();

var api = require('./routes/api');
var auth = require('./routes/auth');

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




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use('/media', express.static(path.join(__dirname, 'public')));

app.use('/api',validateJWT({secret: auth.secret}).unless({
  path: [
    { url: '/api/feedbacks', methods: ['POST'] },
    { url: '/api/posts', methods: ['GET'] },
    { url: '/api/plays', methods: ['GET'] },
    { url: '/api/members', methods: ['GET'] },
    { url: '/api/histories', methods: ['GET'] }
  ]
}));

app.use('/auth',auth);
app.use('/api', api);
app.use('/assets', express.static(path.join(__dirname, 'client/assets')));

app.get('*', function(req, res, next) {
  var options = {
    root: __dirname + '/client/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile('index.html', options, function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent index.html');
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
