/**
 * Module dependencies.
 */
var express = require('express')
  , oauth2server = require('./auth/server')
  , clientAuth = require('./auth/client')
  , userAuth = require('./auth/user')
  , passport = require('passport');

exports = module.exports = function(config) {
  config = config || {};

  var oauth2 = oauth2server(config)
    , client = clientAuth(config)
    , user = userAuth(config)
    , app = express();

  app.use(express.bodyParser());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(oauth2.errorHandler());

  // API
  app.post('/token', client.verifyApp(), oauth2.token());

  // Interactive user
  app.get('/authorize', user.ensureUserPassLogin('/authorize', '/login'), config.app.authorizePage);
  app.post('/authorize', user.ensureUserPassLogin('/authorize', '/login'), config.app.authorizePage);

  return app;
}
