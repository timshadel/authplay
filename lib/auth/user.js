
var login = require('connect-ensure-login')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */

exports = module.exports = function(config) {
  if (!config || !config.passport || !config.passport.user) {
    throw new Error("Local user password validation required to run the server.");
  }
  passport.use(new LocalStrategy(config.passport.user));
  return exports;
}

exports.ensureUserPassLogin = function(targetPage, failurePage) {
  return passport.authenticate('local', { successReturnToOrRedirect: targetPage, failureRedirect: failurePage });
};

