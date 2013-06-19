
var stack = require('./lib/stack')
  , config = require('./lib/config');


config.app = {
  loginPage: function(req, res, next) {
    res.render('login');
  },
  authorizePage: function(req, res, next) {
    res.render('authorize');
  }
}

var app = module.exports = stack(config);
