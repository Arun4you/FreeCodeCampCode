const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/usersModel")
const config = require("../config/secret")
const jwt = require('jsonwebtoken')
var passport = require('passport')

module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  console.log("Hello jwt")
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
          console.log("Hello jwt entry")
    console.log(jwt_payload)
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}  