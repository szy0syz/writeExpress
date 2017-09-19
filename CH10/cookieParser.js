"use strict";

var querystring = require('querystring');
function myCookie(name, val, options) {
  var opts = options || {};
  var parts = [name + '=' + val];
  if (opts.maxAge) {
    parts.push('Max-Age=' + Number(opts.maxAge));
  }
  if (opts.domain) {
    parts.push('Domain=' + opts.domain);
  }
  if (opts.path) {
    parts.push('Path=' + opts.path);
  }
  if (opts.expires) {
    parts.push('Expires=' + opts.expires.toUTCString());
  }
  if (opts.httpOnly) {
    parts.push('HttpOnly');
  }
  if (opts.secure) {
    parts.push('Secure');
  }

  this.append('Set-Cookie', parts.join('; '));

  return this;
}

module.exports = function (app) {
  app.use(function (req, res, next) {
    req.cookies = querystring.parse(req.headers.cookie, '; ', '=');
    res.myCookie = myCookie;
    next();
  });
}
